# ADR-013 — Nine-act homepage narrative & dark↔paper choreography

**Status: ACCEPTED**
**Date: 2026-08-21**
**Authority: Project Owner / Human Architecture Reviewer**
**Amends:** CONTEXT.md (Specialties no longer "out of scope"; Location split), ARCHITECTURE.md (page composition + canonical domain), ADR-009 (Manifesto now typographic; see ADR-009 note).

---

## Decision

Reflow the homepage from the current 5 sections into the **9-act narrative** of `EXPERIENCE_BLUEPRINT.md`, with an explicit dark↔paper background choreography.

### Act order & palette

| Ato | Section | Palette |
| --- | --- | --- |
| 01 | Hero | dark |
| 02 | Manifesto | dark → paper |
| 03 | Legacy | paper |
| 04 | Specialties | paper (dark media wells) |
| 05 | Method | dark |
| 06 | Specialists | dark |
| 07 | Selected by CLASS | dark |
| 08 | Place | paper |
| 09 | Conversion | dark |

Territory blocks: **paper (02→04)** → **dark (05→07)** → **paper reality (08)** → **dark close (09)**. Transitions carry meaning (e.g., Specialties→Method = "what we do → how we control it"); no random alternation (MOTION §18).

---

## Context

The current page is `Hero → Manifesto → Specialties → Specialists → Location` (5 sections) on a mostly dark field with a single paper island (Manifesto). `class-experience-v1` requires nine narrative acts with a deliberate emotional progression `abstraction → mastery → evidence → humanity → reality`. The Specialties Scene Contract requires a paper field; the Specialists reveal requires dark. These constraints produce the block choreography above.

---

## Alternatives considered

- **Keep 5 sections.** Rejected: fails the chosen full-reflow scope (D1).
- **Keep everything dark except Manifesto.** Rejected: conflicts with the Specialties Scene Contract (paper) and the emotional progression.
- **Strictly one-way dark→light.** Rejected: Specialists (light/shadow) and Method (technology) require dark; a block model with meaningful transitions is the coherent resolution.

---

## Consequences

- `app/page.tsx` composes nine sections in the order above (single-writer integration, WP-19).
- `LocationSection` is split into `PlaceSection` (ACT 08) + `ConversionSection` (ACT 09); the orphan `AppointmentCTA.tsx` is consolidated/removed (D12).
- Net-new sections: `LegacySection`, `MethodSection`, `SelectedByClassSection`, `PlaceSection`, `ConversionSection`.
- Paper acts must pass axe contrast with paper tokens; dark acts with dark tokens.
- CONTEXT.md / ARCHITECTURE.md updated on acceptance; ADR-009 noted (Manifesto typographic).

---

## What agents must do

- Implement the act order and palette exactly as tabled; do not reorder without a new decision.
- Keep each section's palette consistent with its block; reuse existing tokens (no new palette).
- Integration of `app/page.tsx` is a single-writer step; sections are built in their own files first.

## Revisit condition

If composition review shows a transition boundary reads as arbitrary, or if a paper act cannot meet contrast/quality without a token change (which would require a DESIGN_SYSTEM update).

---

## Acceptance record — 2026-08-21 (Preflight)

**Frozen.** Nine-act narrative and dark↔paper choreography are the definitive homepage architecture for this initiative. Act order, palette blocks, and component mapping are fully specified in `docs/class-experience-v1/IMPLEMENTATION_MASTER_PLAN.md §7` and individual Scene Contracts. No reopening without owner-initiated decision.

---

## Addendum — 2026-11-09 (Owner-initiated): condensed spine, soft CTAs, video slots

**Trigger.** Owner review found the storytelling too long and generic (about 35 scroll screens, first in-flow CTA only at the close). This addendum is an owner-initiated amendment to the frozen act order above.

**Spine change.**
- **Legacy (ACT 03, paper) is retired** from `app/page.tsx` (component kept, unused). The "1998" anchor lives in the Hero subtitle and the Manifesto eyebrow.
- **Method becomes a paper act.** Palette blocks are now: Hero dark → Manifesto paper → Clinic folio paper→dark → Specialties dark → *wash* → Method paper → *wash* → Specialists dark → Selected dark → Place/Conversion dark. Four dark↔paper turns are preserved.
- Method timeline is 3 beats (olhar, registro, prova); the "estudo da face" claim lives there, with evidence, and not in the Hero.
- Scroll budget (estimated from CSS/GSAP values, not measured in a browser): Hero 440vh (was 560), Specialties 540vh (was 720), Method timeline 255vh (was 500), Folio hold ~1.4 (was ~1.9), washes ~1.0 and ~0.9 (were 1.85 and 1.25), Legacy removed.
- Specialists: featured first row, the rest in a native `<details>` ("Conheça toda a equipe"); all nine remain in the DOM.
- Hero numeral is computed from the founding date (25/03/1998) instead of the old hard-coded "3 décadas".

**Conversion policy change (amends `CONVERSION.md` "no repeated CTAs").**
- Four *soft CTAs* (`SoftCTA`) sit **between** acts, never over a pinned/scrubbed scene: after Folio, after Specialties, after Method, after Specialists. Text link with gold hairline and arrow; no filled button, no modal, no pop-up.
- Copy ladder: invitation early, action late. Labels live in `copy.cta.soft`.
- Every WhatsApp CTA uses `whatsappHref()` (the same pre-filled visit message, with no section name).
- Floating CTA: hidden through the Hero and over Place, two gentle pulses on arrival (no infinite loop), short label on desktop.
- Place close adds three first-visit steps and "Avaliação sem custo" (owner confirmed the evaluation is free; wording to be validated with the clinic's technical responsible against dental advertising rules — not verified here).

**Video policy.**
- No forced autoplay window. Muted ambient loops (`LoopVideo`) play only while visible and never for reduced motion or data-saving connections; the still underneath is always the fallback.
- One click-to-play story video (`VideoLightbox`, native `<dialog>`) with sound, opened from the Folio soft CTA.
- Slots are declared in `content/media.ts` and are **inert until `src` is set**; no video asset exists yet, so no player renders today.
