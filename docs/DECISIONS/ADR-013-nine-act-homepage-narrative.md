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
