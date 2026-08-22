# Scene Contract — The Place

**Scene ID:** `place`
**Status:** v1.0 — Implementation-ready (map now; interior photos gated)
**Homepage act:** ACT 08 — THE PLACE (Reality / physical proof)
**Intensity:** Medium-to-low
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../ASSET_PLAN.md`, `../../DECISIONS/ADR-008-map-art-not-embed.md`
**Owner decision:** D6 (paper), D9 (scaffold; real photos gated), D10 (docs copy), D12 (split from Conversion).

---

## 1. Narrative purpose

Materialize the abstract promise: CLASS exists as a real, high-standard place in Foz do Iguaçu.

### Visitor question
> "Is this promise reflected in a real clinic?"

### Intended takeaway
> "The physical environment is another expression of the CLASS standard."

---

## 2. Approved copy — V1

**Headline:**

> **Onde o padrão Class ganha forma.**

**Supporting copy:**

> Um ambiente pensado para transformar cuidado, conforto e atenção aos detalhes em experiência.

### Copy policy
Working V1. Address/city come from `config/site.ts` (verified). No fabricated environment claims.

---

## 3. Visual structure

- Paper field (reality/space) — closes the paper territory before the dark Conversion.
- **Now:** reuse existing `map.webp` as **functional support** (ADR-008: map art, not an embed) — not necessarily the hero of the section.
- **Gated:** clinic interior/exterior/material photos (`place-interior-01/02`, `place-material-01`, `place-exterior-01`) are `SOURCE_REAL`. Until provided, use placeholder wells (WP-07). **Never** present an AI-generated interior as the real clinic.

---

## 4. Motion

- Level 2 `Reveal` on entry. No scrub, no GSAP.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** editorial composition — copy + map art / placeholder interior wells.
- **Mobile:** stacked; map/well reserves space.
- **Reduced motion:** static, fully readable.

---

## 6. Scope

### Allowed
- New `components/sections/PlaceSection.tsx`.
- `content/copy.ts` — `place` fields; `config/site.ts` address is read-only here.
- `public/assets/clinic/map.webp` reuse; placeholder wells (WP-07); scoped styles via Foundation request.

### Forbidden
- AI clinic interiors presented as real; Google Maps embed/iframe/widget (ADR-008); the conversion CTA (that is ACT 09); other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved copy present; address/city from config.
- [ ] Map is art (image), not an embed; opens Maps via link only where relevant (primary Maps action may live in Conversion).
- [ ] Interior imagery is a neutral placeholder until real photos exist.
- [ ] Paper contrast (axe) passes; reduced motion readable; build/e2e green.

## 8. Definition of done

Place proves the clinic as a real destination on the paper field using map art now, with reserved geometry for real photography, and no fabricated environment.
