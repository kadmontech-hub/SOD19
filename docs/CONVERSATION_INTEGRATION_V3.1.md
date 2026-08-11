# SØD V3.1 — Conversation UI Integration

## Executive summary

`/experiencia` is no longer a seven-step cognitive worksheet. It is now a continuous conversational experience that keeps the established SØD visual language while introducing a clean boundary for the future Supabase Auth / persistent conversations / Groq / memory milestones.

The current build remains compatible with the existing scripted `POST /api/dialogue` endpoint. It does not claim cross-device persistence, does not write assistant messages or memories to Supabase from the browser, and does not create Semillas or Códigos as a side effect of a normal assistant reply.

## Current source boundary

This package was integrated on top of the latest complete visual/product build available in this workspace: **SØD V3.0.5 Biblioteca + Videoteca Final**.

GitHub repository access to `kadmontech-hub/sod-v3` was not available through the connector during this implementation. Therefore the accepted Codex Milestone 1 migration/RLS files could not be fetched or modified here. No replacement Supabase migration or competing persistence layer was invented.

When merging into the canonical repository, the Codex backend/security branch remains authoritative whenever there is a conflict.

## UX implemented

- Route remains `/experiencia`.
- Immediate auto-growing composer.
- Empty state: `¿Qué está ocupando tu mente en este momento?` / `No necesitás formularlo perfectamente.`
- Continuous user ↔ SØD message stream.
- Enter sends; Shift+Enter creates a new line.
- Duplicate sends are disabled while a request is in flight.
- Each send generates a new `clientMessageId`.
- SØD visual core switches between listen / process / response states.
- Recoverable network errors preserve the user text and expose retry.
- Auto-scroll occurs only when the user is already near the bottom.
- Desktop contextual rail and mobile compact interaction.
- Guest state is clearly described as local/not synchronized.
- Existing legacy local dialogue can be read for continuity but is not treated as authoritative longitudinal memory.

## API compatibility layer

Browser call:

```js
api.dialogue({
  conversationId,
  clientMessageId,
  message,
  accessToken,
})
```

Wire body:

```json
{
  "conversationId": "optional server-issued UUID",
  "clientMessageId": "client UUID",
  "message": "user text"
}
```

`Authorization: Bearer <access_token>` is added only when an access token exists.

The client never sends `userId`, provider/model metadata, token counts, memory, system prompts, assistant role metadata or full conversation history.

## Conversation controller boundary

`public/js/conversation-controller.js` owns transient conversational UI state. In guest mode it uses `sessionStorage`, not authoritative longitudinal `localStorage` memory.

`public/js/session-provider.js` is the replacement boundary for the upcoming Supabase Auth implementation. The current provider returns an honest guest/no-sync state. A future approved provider can supply a session/access token without rewriting the chat renderer.

## Semilla / Código invariant

The conversation path does **not**:

- discover or mutate a Semilla automatically;
- create a Código automatically;
- assert that a transformation happened;
- write memory items;
- write assistant rows directly to Supabase.

The canonical Semillas, Códigos and Observatorio sections remain intact elsewhere in the application.

## Backend dependencies still pending

The following are intentionally not implemented in this package because they belong to later canonical backend milestones:

- Supabase browser auth/session provider;
- `POST /api/conversations`;
- `GET /api/conversations`;
- `GET /api/conversations/:id`;
- `DELETE /api/conversations/:id`;
- server-authoritative message persistence;
- server-side assistant message writes;
- server-side memory extraction/writes;
- Groq provider integration;
- cross-device restore;
- transformation-event service.

## Recommended Codex integration point

1. Keep the accepted Supabase schema/RLS migration exactly as-is.
2. Implement Auth and conversation endpoints on the server.
3. Replace/extend `public/js/session-provider.js` with the approved Supabase session adapter.
4. Keep the `api.dialogue({ conversationId, clientMessageId, message, accessToken })` browser contract.
5. Make server conversation data authoritative once authenticated mode is enabled.
6. Add transformation events later without mutating Semilla/Código state from ordinary chat responses.

## Files introduced

- `public/js/conversation-controller.js`
- `public/js/session-provider.js`
- `tests/conversation-ui.mjs`
- `docs/CONVERSATION_INTEGRATION_V3.1.md`

## Primary files modified

- `public/js/views.js`
- `public/js/api.js`
- `public/styles.css`
- `public/sw.js`
- `api/dialogue.mjs`
- `server.mjs`
- `.env.example`
- `package.json`
- `package-lock.json`
- `tests/v3.mjs`
- `tests/hub-panorama.mjs`
