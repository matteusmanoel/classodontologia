# Scene Contract — Manifesto / The Standard

**Scene ID:** `manifesto`
**Status:** v1.0 — Implementation-ready
**Homepage act:** ACT 02 — THE STANDARD (Manifesto / meaning)
**Intensity:** Low-to-medium editorial breathing space
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../../DECISIONS/ADR-009-manifesto-paper-field.md`
**Owner decision:** D6 (dark→paper), D10 (docs copy), D11 (typographic; remove SmileWell).

---

## 1. Narrative purpose

Introduce the idea that CLASS is a **standard**, not just a name — connecting experience, criterion and precision. This is the deliberate quiet after the Hero.

### Visitor question
> "Why is this different?"

### Intended takeaway
> "CLASS is not only a name; it represents a way of doing dentistry."

### Emotional state
Calm, editorial, deliberate silence.

---

## 2. Approved copy — V1

**Eyebrow:**

> A clínica

(Optional — may be dropped in composition review if the typographic headline reads better alone.)

**Headline:**

> **O padrão não nasce pronto. É construído.**

**Supporting copy:**

> Experiência cria critério. Precisão transforma esse critério em resultado. Evolução mantém esse padrão em movimento.

### Copy policy
This replaces the current on-page Manifesto copy ("O sorriso, em sua forma mais alta."). Agents must not rewrite; only line breaks are deferred.

---

## 3. What this scene is replacing

The current Manifesto is a paper section with the **SmileWell** dark video well beside the copy. Per D11, the SmileWell is **removed** here; the Manifesto becomes typographic. The Smile poster asset is archived (may be reused by Legacy if its composition requires — not in this WP). ADR-009 gets a note recording this.

---

## 4. Visual structure

- Paper field (`--color-bg-paper`, text `--color-text-paper` / `--color-text-paper-muted`, gold via `--color-gold-on-paper`).
- This act carries the **dark → paper transition** boundary (Hero washes to paper; Manifesto opens on paper).
- Typographic, generous negative space, few elements, no media well.
- Editorial hierarchy: eyebrow (mono/label) → serif/display headline → short sans supporting paragraph.

Layout may reuse the existing container (`max-w-[1280px]`, `--section-px/py`). No new palette.

---

## 5. Typography behavior

Token-driven; must survive the typography migration (WP-10). Headline is the editorial voice (Instrument Serif post-migration / Cormorant now); supporting copy is the functional voice (Geist Sans post-migration / Montserrat now). Do not hardcode font families.

---

## 6. Motion

- Level 2 only: `Reveal` on entry (opacity + small translate). No scrub. No GSAP required.
- Forbidden: parallax, per-frame motion, autonomous animation.

---

## 7. Desktop / mobile / reduced-motion

- **Desktop:** single-column or asymmetric editorial block; wide margins.
- **Mobile:** stacked, readable; generous vertical rhythm.
- **Reduced motion:** content fully visible without animation (existing `Reveal` reduced-motion behavior).

---

## 8. Scope

### Allowed
- `components/sections/ManifestoSection.tsx` (remove SmileWell usage; typographic layout).
- `content/copy.ts` — `manifesto` fields.
- `app/globals.css` — remove/adjust `.manifesto-section` companions for the well if needed (Foundation writer via request).

### Forbidden
- Deleting `components/cinematic/SmileWell.tsx` (archive; another act may reference it later); Hero; Specialties; other acts.

---

## 9. Acceptance criteria

- [ ] Approved V1 copy present; old Manifesto copy removed.
- [ ] No SmileWell / no media well in the Manifesto.
- [ ] Paper field with AA contrast (axe) for headline + body + gold-on-paper.
- [ ] Dark→paper boundary reads as intentional (continues Hero wash).
- [ ] Reduced motion: fully readable, no dependency.
- [ ] `typecheck` / `lint` / `build` / a11y e2e green.

## 10. Definition of done

The Manifesto is a quiet, typographic paper act that states the CLASS standard, with no residual smile media and correct on-paper contrast.
