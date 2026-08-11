const GUEST_SESSION_KEY = 'sod-guest-conversation-session-v1';

function defaultUuid() {
  return globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeSessionStorage() {
  try {
    if (!globalThis.sessionStorage) return null;
    const probe = '__sod_session_probe__';
    globalThis.sessionStorage.setItem(probe, '1');
    globalThis.sessionStorage.removeItem(probe);
    return globalThis.sessionStorage;
  } catch {
    return null;
  }
}

function normalizeLegacy(messages = []) {
  return messages
    .filter(item => item && typeof item.text === 'string')
    .slice(-20)
    .map((item, index) => ({
      id: `legacy-${index}-${Math.abs(item.text.length)}`,
      role: item.role === 'user' ? 'user' : 'assistant',
      text: item.text,
      status: 'complete',
      createdAt: new Date(Date.now() - (messages.length - index) * 1000).toISOString(),
      legacy: true,
    }));
}

function loadGuestState(storage, legacyMessages) {
  if (storage) {
    try {
      const parsed = JSON.parse(storage.getItem(GUEST_SESSION_KEY) || 'null');
      if (parsed && Array.isArray(parsed.messages)) {
        return {
          conversationId: parsed.conversationId || null,
          messages: parsed.messages.slice(-80),
        };
      }
    } catch {}
  }
  return { conversationId: null, messages: normalizeLegacy(legacyMessages) };
}

export function createConversationController({ api, sessionProvider, legacyMessages = [], onChange = () => {}, uuid = defaultUuid } = {}) {
  if (!api?.dialogue) throw new Error('Conversation controller requires api.dialogue.');
  const storage = safeSessionStorage();
  const initial = loadGuestState(storage, legacyMessages);
  let state = {
    conversationId: initial.conversationId,
    messages: initial.messages,
    pending: false,
    error: null,
    lastClientMessageId: null,
    syncEnabled: false,
    authenticated: false,
  };

  const snapshot = () => structuredClone(state);
  const notify = () => onChange(snapshot());
  const persistGuest = () => {
    if (!storage || state.authenticated) return;
    try {
      storage.setItem(GUEST_SESSION_KEY, JSON.stringify({
        conversationId: state.conversationId,
        messages: state.messages.slice(-80),
      }));
    } catch {}
  };

  async function refreshSession() {
    let session = null;
    try { session = await sessionProvider?.getSession?.(); } catch { session = null; }
    state.authenticated = Boolean(session?.authenticated);
    state.syncEnabled = Boolean(session?.syncEnabled);
    return session;
  }

  async function send(rawMessage) {
    if (state.pending) return { ignored: true };
    const message = String(rawMessage ?? '').trim();
    if (!message) return { ignored: true };

    const clientMessageId = uuid();
    const userMessage = {
      id: clientMessageId,
      role: 'user',
      text: message,
      status: 'sending',
      createdAt: new Date().toISOString(),
    };
    state.messages.push(userMessage);
    state.pending = true;
    state.error = null;
    state.lastClientMessageId = clientMessageId;
    notify();

    try {
      const session = await refreshSession();
      const accessToken = session?.accessToken || await sessionProvider?.getAccessToken?.() || null;
      const result = await api.dialogue({
        conversationId: state.conversationId,
        clientMessageId,
        message,
        accessToken,
      });
      userMessage.status = 'complete';
      if (result?.conversationId) state.conversationId = result.conversationId;
      state.messages.push({
        id: result?.id || uuid(),
        role: 'assistant',
        text: String(result?.reply || 'SØD no pudo formular una respuesta en este momento.'),
        status: 'complete',
        createdAt: new Date().toISOString(),
        mode: result?.mode || 'unknown',
      });
      state.pending = false;
      state.error = null;
      persistGuest();
      notify();
      return { ok: true, clientMessageId, result };
    } catch (error) {
      userMessage.status = 'error';
      state.pending = false;
      state.error = {
        message: error?.message || 'No pudimos conectar con SØD.',
        clientMessageId,
        text: message,
        recoverable: true,
      };
      persistGuest();
      notify();
      return { ok: false, clientMessageId, error };
    }
  }

  async function retry(clientMessageId) {
    const failed = state.messages.find(item => item.id === clientMessageId && item.role === 'user' && item.status === 'error');
    if (!failed) return { ignored: true };
    const text = failed.text;
    state.messages = state.messages.filter(item => item.id !== clientMessageId);
    state.error = null;
    persistGuest();
    notify();
    return send(text);
  }

  function newConversation() {
    state = {
      conversationId: null,
      messages: [],
      pending: false,
      error: null,
      lastClientMessageId: null,
      syncEnabled: state.syncEnabled,
      authenticated: state.authenticated,
    };
    if (storage) storage.removeItem(GUEST_SESSION_KEY);
    notify();
  }

  return {
    getState: snapshot,
    send,
    retry,
    newConversation,
    refreshSession,
  };
}
