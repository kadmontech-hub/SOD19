# SØD Ecosystem V3.1.2

Esta entrega conserva la Biblioteca/Videoteca y el universo visual del MVP, y reemplaza el antiguo wizard de `Hablar con SØD` por una conversación continua preparada para integrarse con Supabase Auth, conversaciones persistentes, Groq y memoria server-side.

> Estado actual: el diálogo funciona contra el endpoint scripted existente. La conversación invitada es temporal/local y no se presenta como memoria sincronizada.

> Estado actual: V3.0.4.9 — Videoteca exclusiva con reproducción inline.

# SØD Ecosystem Visual MVP V3.0.5 Light

A functional, immersive and navigable mockup of the SØD Mental Clarity Agent ecosystem.

This release preserves the complete V3 product logic while replacing the former 142 MB local image library with a centralized remote Imgur catalog.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm run validate
```

Validation covers syntax, static build, domain invariants, the 24-image remote catalog, the canonical panoramic Hub, V3 product requirements, local API behavior and Vercel Functions.

## Deploy to Vercel

1. Upload the repository to GitHub.
2. Import it into Vercel.
3. Keep the detected build command and output directory.
4. Deploy.

No environment variables are required for this mockup.

## Change an image

All remote images are defined in one file:

```text
public/js/visual-assets.js
```

Change the URL assigned to a role inside `VISUALS`. Do not edit individual views.

## Key routes

- `/hub` — panoramic Hub with progressive UI.
- `/experiencia` — complete transformation cycle.
- `/semillas` — canonical living knowledge.
- `/codigos` — personal evidence museum.
- `/observatorio` — living interpretation of the journey.
- `/elementos` — monumental Elementos 33 sanctuary.
- `/biblioteca` — living knowledge archive.
- `/configuracion` — calibration chamber.

## Critical conceptual rule

Seeds already exist and are discovered, unlocked, cultivated or integrated. Codes are personal assets that preserve evidence of a real transition. A conversation never creates a Seed.

## Visual reliability

Remote images never control product functionality. If Imgur is temporarily unavailable, the app remains navigable and shows a dark SØD fallback.

## Documentation

- `docs/REMOTE_VISUAL_MAPPING_V3.md`
- `docs/V3_PRODUCT_BLUEPRINT.md`
- `docs/V3_PLACEHOLDER_REGISTRY.md`
- `docs/canon/`
- `PROJECT_STATUS.md`
- `RELEASE_NOTES.md`

## Hub v3.0.5

The main Hub now uses a clean panoramic background and four independent floating image portals:

- Hablar con SØD
- Biblioteca
- Semillas
- Observatorio

Their URLs are centralized in `public/js/visual-assets.js`. The buttons preserve mouse, touch, keyboard, gyroscope and 2D fallback navigation. If a remote portal image fails, the control keeps working with a symbol fallback.
