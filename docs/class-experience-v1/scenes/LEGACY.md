# Scene Contract — Legacy / Since 1998

**Scene ID:** `legacy`
**Status:** v1.0 — Implementation-ready (editorial scaffold)
**Homepage act:** ACT 03 — SINCE 1998 / EXPERIENCE THAT EVOLVES
**Intensity:** Medium, emotional/editorial
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../ASSET_PLAN.md`
**Owner decision:** D6 (paper), D9 (scaffold, no fabricated archive), D10 (docs copy), D11 (human counterpoint may live here).

---

## 1. Narrative purpose

Establish historical legitimacy without nostalgia: experience created criterion, and the standard is continuously updated.

### Visitor question
> "Is there substance behind this positioning?"

### Intended takeaway
> "The CLASS standard was not invented for this website. It was refined through experience."

### Conceptual movement
`origin → accumulated judgment → continuous updating`

---

## 2. Approved copy — V1

**Headline:**

> **O tempo aperfeiçoa o olhar.**

**Supporting copy:**

> Desde 1998, evoluímos sem abrir mão daquilo que sempre orientou nosso trabalho: atenção aos detalhes.

Editorial metadata (Geist Mono utility permitted): `EST. 1998` or `25 / 03 / 1998`.

### Copy policy
Working V1 copy. **No milestones beyond the founding date** may be published without verification. No "dynasty"/"family lineage" framing. No fabricated timeline.

---

## 3. Visual structure

- Paper field (continues the paper block from Manifesto).
- Editorial spread: strong 1998 anchor (mono metadata) + serif headline + short sans paragraph + generous negative space.
- **Optional** human counterpoint via a placeholder well (WP-07) **only if** the composition needs it. `ASSET_PLAN` marks `legacy-founders-01` / `legacy-archive-01` as **TBD** — do not fabricate archival imagery. If no authentic asset exists, **solve typographically**.

No new palette. Token-driven type.

---

## 4. Motion

- Level 2 `Reveal` on entry only. No scrub, no GSAP.
- `EST. 1998` may use a restrained reveal; nothing autonomous.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** editorial two-region layout (metadata/headline vs paragraph) or centered spread.
- **Mobile:** stacked, readable, strong 1998 anchor.
- **Reduced motion:** fully readable static.

---

## 6. Scope

### Allowed
- New `components/sections/LegacySection.tsx`.
- `content/copy.ts` — `legacy` fields (or a small `content/legacy.ts` if structured milestones are later verified).
- Placeholder well from WP-07 if used; scoped styles via Foundation request.

### Forbidden
- Fabricated archival photos/milestones; AI "vintage" imagery; other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved copy present; founding date accurate (25/03/1998 / "Desde 1998").
- [ ] No invented milestones, no dynasty framing.
- [ ] Paper contrast (axe) passes.
- [ ] If a human well is used, it is a neutral placeholder (no fabricated person presented as real).
- [ ] Reduced motion readable; no overflow; build/e2e green.

## 8. Definition of done

Legacy legitimizes the present with an accurate 1998 anchor, resolved editorially, with no fabricated history and correct paper contrast.
