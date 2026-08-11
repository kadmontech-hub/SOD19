# SØD V3.1.1 — Hub-native Conversation Oracle

## Visual contract
- Background plate: `https://i.imgur.com/6Mn5t2W.png`.
- The image is decorative only. All title, messages, controls, input and history buttons are coded HTML/CSS.
- Clicking the central SØD core or the SØD portal in `/hub` opens the conversation in-place.
- The panorama pauses while the conversation is open and resumes on close.
- `/experiencia` renders the same interface as a direct-access fallback.

## UI
- `Conversación de claridad` centered at the top.
- `Presente / Procesando` live state.
- Coded user and SØD message bubbles.
- Composer fixed to the lower part of the luminous frame.
- Three floating left controls for current/history/new conversation.
- Local prototype history snapshots are session-only and explicitly not longitudinal memory.

## Backend boundary
The existing structured `/api/dialogue` contract remains untouched. Supabase Auth, persistent conversation history and the real SØD intelligence can replace the local adapter without rebuilding this UI.
