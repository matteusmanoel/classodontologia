# Scene Contract — Selected by CLASS

**Scene ID:** `selected-by-class`
**Status:** v1.0 — Implementation-ready (scaffold; real marks owner-gated)
**Homepage act:** ACT 07 — SELECTED BY CLASS (Selection / technology & brands)
**Intensity:** Low-to-medium visual accent
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../ASSET_PLAN.md`
**Owner decision:** D6 (dark), D9 (scaffold; no real marks / no classification until owner provides), D10 (docs copy).

---

## 1. Narrative purpose

Communicate criterion: CLASS chooses tools and systems by the same standard it applies clinically.

### Visitor question
> "What external systems or technologies meet their standard?"

### Intended takeaway
> "CLASS chooses tools and systems according to the same criterion it applies clinically."

### Transition meaning (Specialists → Selected)
`judgment → what that judgment chooses`

---

## 2. Approved copy — V1

**Eyebrow:**

> SELECTED BY CLASS

**Headline:**

> **Escolhido com critério.**

**Supporting copy:**

> Tecnologias e marcas presentes em nossa prática clínica, selecionadas de acordo com cada indicação.

### Copy policy
This wording deliberately **does not imply partnership**. Never use "Nossos parceiros" / "parceiros" unless a formal partnership is verified per name.

---

## 3. Brand list & classification — OWNER GATE

Names under review: Invisalign, Odontolatina, Ortoplan, plus additional to be confirmed. **Ortoplan requires relationship verification** before grouping with suppliers/technology systems.

Before any real mark ships, each name must be classified: `technology_used | supplier | official_partner | accreditation | legacy_affiliation | other_verified`.

**Until the owner provides (a) the confirmed list, (b) per-name classification, and (c) official SVG/brand-kit files, this scene renders placeholder monochrome text labels only.** Third-party logos must **never** be recreated with AI (`ASSET_PLAN §12`).

---

## 4. Visual structure & motion

- Dark field; monochromatic treatment; generous spacing; controlled horizontal composition.
- Motion: slow, limited translation tied subtly to vertical scroll (Level 2/3, no scrub dependency). **No infinite marquee**, no sponsorship-ticker feel.
- Placeholder marks: monochrome text set (e.g., typographic wordmark placeholders) at the intended mark geometry, ready to be swapped for official SVGs without layout change.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** single horizontal row/grid of marks with breathing room.
- **Mobile:** wrapped grid; no horizontal scroll requirement.
- **Reduced motion:** static row, no translation.

---

## 6. Scope

### Allowed
- New `components/sections/SelectedByClassSection.tsx`.
- `content/copy.ts` — `selected` fields; a typed placeholder list (names only, with `relationship: "unverified"`).
- Scoped styles via Foundation request.

### Forbidden
- Real third-party marks before the owner gate; AI-recreated logos; "parceiros" claims; infinite marquee; other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved eyebrow/headline/support copy present.
- [ ] Only monochrome **placeholder** labels render; no real/unverified marks.
- [ ] No "parceiros"/partnership language.
- [ ] Geometry ready to accept official SVGs without redesign.
- [ ] Reduced motion: static; no marquee.
- [ ] Dark contrast (axe) passes; build/e2e green.

## 8. Definition of done

The strip communicates curated selection with placeholder marks on the dark field, ready to receive owner-approved official logos and per-name relationship classification without structural change.
