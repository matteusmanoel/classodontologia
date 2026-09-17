# Scene Contract — Precision, Planned / Method & Technology

**Scene ID:** `method`
**Status:** v1.0 — Implementation-ready (editorial scaffold)
**Homepage act:** ACT 05 — PRECISION, PLANNED (Method / technology as evidence)
**Intensity:** Medium
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../ASSET_PLAN.md`
**Owner decision:** D6 (dark — enters the dark block after Specialties), D9 (scaffold, no invented tech), D10 (docs copy).

---

## 1. Narrative purpose

Show that the standard is **operational**, not merely aesthetic: technology exists to improve diagnosis, planning and predictability.

### Visitor question
> "How do they achieve this level of control?"

### Intended takeaway
> "Technology exists to improve diagnosis, planning and predictability."

### Transition meaning (Specialties → Method)
`what we do → how we control it` — this is the **paper → dark** boundary.

---

## 2. Approved copy — V1

**Headline:**

> **Tecnologia, com propósito.**

**Supporting copy:**

> Recursos que ampliam diagnóstico, planejamento e previsibilidade. Tecnologia só faz sentido quando melhora a decisão clínica.

### Copy policy
Working V1. **No equipment spec sheets, no technology brand names, no unsubstantiated claims.** Timeline copy describes field/method evolution (molde → escaneamento, radiografia plana → volume), not a dated clinic inventory.

---

## 3. Visual structure

- Dark field (`--color-bg-primary`/`secondary`) — opens the dark block.
- Editorial timeline of 5 beats (`content/method.ts`), not an equipment grid.
- Crop-marked plates: real `imageSrc` when present; otherwise SVG construction + `assetId` + “Imagem a definir”. **Do not invent equipment or fake planning UI.**

No new palette. Token-driven type.

---

## 4. Motion

- Level 2 `Reveal` on the section heading.
- Desktop + motion: sticky stage, opacity crossfade on GSAP ScrollTrigger (`invalidateOnRefresh: false`, `fastScrollEnd`). Same island pattern as Specialties.
- Forbidden: fake "scanning UI" animation, autonomous motion, parallax, brand names.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** sticky two-column stage; gold rail with era nodes; one beat visible at a time.
- **Mobile:** stacked list on a vertical gold rail; all beats readable.
- **Reduced motion:** same stacked list; no scrub.

---

## 6. Scope

### Allowed
- `components/sections/MethodSection.tsx` (server wrapper).
- `components/cinematic/MethodTimeline.tsx` (client island).
- `content/copy.ts` — `method` fields; `content/method.ts` — beats.
- Styled placeholder plates until `imageSrc` is filled.

### Forbidden
- Invented equipment/brands/claims; real logos; fake diagnostic UI; other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved copy present; no equipment/brand names, no unsubstantiated claim.
- [ ] Dark field; contrast (axe) passes.
- [ ] Timeline plates are placeholders or gated real photos (no fabricated tech shown as real).
- [ ] Specialties→Method reads as "what we do → how we control it" (paper→dark).
- [ ] Reduced motion readable; no overflow; build/e2e green.

## 8. Definition of done

Method presents control/predictability editorially on the dark field, with placeholders only and no fabricated or brand-specific technology claims.
