# Plan — MVP polish (Hero, Manifesto paper, Specialists, Location)

**Date:** 2026-08-14  
**Status:** EXECUTED — 2026-08-14  
**Language:** [CONTEXT.md](../CONTEXT.md) · [ADR-008](../DECISIONS/ADR-008-map-art-not-embed.md) · [ADR-009](../DECISIONS/ADR-009-manifesto-paper-field.md)

Do not promote to production. STOP-06 still deferred. Specialties unchanged.

## Page order

Hero → Manifesto (paper + dark well) → Specialties → Specialists → Location → Appointment CTA → Footer

## Work slices (each leaves the site runnable)

### 1. Paper tokens

Add a Manifesto paper surface and on-paper type (dark text, gold still valid) in `styles/tokens.css` and the Design System color table. Do not use raw `#ffffff`. Specialties and below stay on the existing dark field.

### 2. Wordmark

Mark centered on the full CLASS width, large, **above** the letters (not behind, not covering glyphs). ODONTOLOGIA: modest tracking, left-aligned with CLASS, not `space-between` to CLASS width.

Files: `components/brand/ClassWordmark.tsx`, `app/globals.css`

### 3. Decade beat

Bigger Decade numeral. CSS Z-extrusion (stacked `translateZ` layers) so the glyph stays visible at 90° on Y. If the result is inconsistent and the WebGL path stays small, fallback is a narrow Three.js island (ADR-001 exception, owner-visible). Decade label **below** the numeral with a real gap — no overlap.

Files: `components/cinematic/HeroCinematic.tsx`, `app/globals.css`

### 4. Hero copy lines + exit

One line in the slot at a time: outgoing fade completes, short hold, then the next enters. Last line also leaves. Then the pin releases into Manifesto paper (contrast beat, not a white flash inside the Hero). Increase shell height if the timeline feels cramped. Last line does not persist.

Files: `HeroCinematic.tsx`, `.hero-cinematic` height in `globals.css`  
Risk: `e2e/scrub.spec.ts` if shell height / seek mapping changes.

### 5. Manifesto paper + Smile well

Two columns desktop: copy on paper (left), dark well (right). Mobile: copy then well. Well shows a still poster until the smile video exists. Play-once on viewport entry when the video lands (small client island; ADR-007). Reduced motion: static poster, no play.

Files: `ManifestoSection.tsx`, new cinematic island as needed, poster under `public/assets/cinematic/`  
Out of this slice: generating the smile video / prompt (follow-up).

### 6. Specialists

2×2 grid, larger portraits, card content centered. Heading stays left. Specialty (gold), name, photo prominent. Title + bio recede (`text-secondary`).

Files: `SpecialistsSection.tsx`, `SpecialistCard.tsx`

### 7. Location

New section after Specialists. Desktop: title + full address + “Abrir no Google Maps” left; Map art (`public/assets/clinic/map.webp`, 1672×941) right, quiet edge, no card chrome. Mobile: copy then image. Whole image is a link. Maps URL from `siteConfig.address` (add `mapsUrl` if missing).

Files: `components/sections/LocationSection.tsx`, `app/page.tsx`, `content/copy.ts`, `config/site.ts`

### 8. Appointment CTA

Phone leaves the canvas. Same button: label “Falar no WhatsApp” with the number inside the control (stacked). Keep centered; tighten spacing only.

File: `AppointmentCTA.tsx`

### 9. Footer

Remove the copyright divider (`border-t` on the copyright row). Keep footer top border. Copyright bottom-right. Address stays compact (secondary to Location).

File: `Footer.tsx`

### 10. Verify

`pnpm lint` · `pnpm typecheck` · `pnpm exec playwright test --project=chromium` (port **3017**)  
Axe: Manifesto paper contrast. Header over paper: keep the existing dark strip.

## Out of scope

- Specialties
- STOP-06 tooth re-encode
- Production / ISSUE-022
- Smile video generation (prompt in a later turn)
- Google Maps iframe
- Commit / push unless asked
- Three.js unless CSS extrusion fails in visual QA

## Skills at execute time

- `gsap-scrolltrigger` + `gsap-react` + `gsap-timeline` — Hero copy / decade
- `gsap-performance` — only if scrub janks after shell-height change
- `web-motion-design` — wordmark, decade, Manifesto well
- `web-design-guidelines` — paper contrast, Location, specialists
