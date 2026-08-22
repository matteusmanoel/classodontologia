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
Working V1. **No equipment spec sheets, no technology brand names, no unsubstantiated claims.** Prefer 2–3 method principles or one strong visual + short explanation.

---

## 3. Visual structure

- Dark field (`--color-bg-primary`/`secondary`) — opens the dark block.
- Editorial, selective: **not** an equipment grid. Options: one strong placeholder visual + short copy, or 2–3 method principles.
- Media via placeholder well (WP-07); `ASSET_PLAN` assets `method-planning-01` (abstract, TBD) / `method-clinical-tech-01` (`SOURCE_REAL`) are gated. **Do not invent equipment or fake planning UI.**

No new palette. Token-driven type.

---

## 4. Motion

- Level 2 `Reveal` on entry. No scrub, no GSAP.
- Forbidden: fake "scanning UI" animation, autonomous motion, parallax.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** asymmetric visual + copy, or a short principle triplet.
- **Mobile:** stacked; media well reserves space.
- **Reduced motion:** fully readable static.

---

## 6. Scope

### Allowed
- New `components/sections/MethodSection.tsx`.
- `content/copy.ts` — `method` fields.
- Placeholder well (WP-07); scoped styles via Foundation request.

### Forbidden
- Invented equipment/brands/claims; real logos; fake diagnostic UI; other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved copy present; no equipment/brand names, no unsubstantiated claim.
- [ ] Dark field; contrast (axe) passes.
- [ ] Media is a neutral placeholder well (no fabricated tech shown as real).
- [ ] Specialties→Method reads as "what we do → how we control it" (paper→dark).
- [ ] Reduced motion readable; no overflow; build/e2e green.

## 8. Definition of done

Method presents control/predictability editorially on the dark field, with placeholders only and no fabricated or brand-specific technology claims.
