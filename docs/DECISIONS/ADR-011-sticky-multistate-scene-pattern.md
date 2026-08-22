# ADR-011 — Sticky multi-state scene pattern (Specialties)

**Status: ACCEPTED**
**Date: 2026-08-21**
**Authority: Project Owner / Human Architecture Reviewer**
**Amends:** ADR-002 and DESIGN_SYSTEM.md — which currently confine **Level 4 (scroll-driven) motion to the Hero cinematic only**.

---

## Decision

Authorize a **second Level-4 scene**: a sticky, scroll-progress-driven multi-state composition for **Specialties** (Hero Moment 02), reusing the existing GSAP + ScrollTrigger + CSS-sticky stack. **No new dependency.** Level 4 is now permitted for the **Hero** and the **Specialties scene** only; any further Level-4 scene requires its own ADR.

---

## Context

`EXPERIENCE_BLUEPRINT.md` ACT 04 and `scenes/SPECIALTIES.md` require one persistent composition that transforms through eight specialty states on desktop, with an editorial vertical sequence on mobile and a complete reduced-motion path. This is scroll-driven (Level 4). ADR-002 / DESIGN_SYSTEM previously scoped Level 4 to the Hero. This ADR formally widens that scope for this one authorized scene.

---

## Constraints (from `scenes/SPECIALTIES.md`)

- CSS `position: sticky` for the pinned stage (per ADR-003 pinning preference); **no `gsap.pin()`** unless a proven issue requires it.
- Single normalized ScrollTrigger progress (0→1) mapping to 8 states; repeatable transition grammar; deterministic + reversible.
- **No per-frame React `setState`** — mutate via GSAP timeline / quick-setters / refs.
- Clean teardown; no leaked ScrollTrigger; `invalidateOnRefresh`.
- Desktop-class activation only (`min-width: 1024px` + `prefers-reduced-motion: no-preference`); mobile = document-flow editorial sequence; reduced motion = static sequence, no artificial shell.
- **No new animation/runtime dependency** (no Three.js, WebGL, Lenis, carousel lib). If it cannot be built cleanly with existing CSS + GSAP, stop and return an investigation note.

---

## Alternatives considered

- **Keep Specialties as a static list.** Rejected: fails the Hero Moment 02 narrative ("one standard, multiple disciplines").
- **`gsap.pin()` instead of CSS sticky.** Rejected as default: ADR-003 prefers CSS sticky for iOS reliability.
- **A carousel/slider library.** Rejected: new dependency; wrong interaction model; forbidden by the contract.

---

## Consequences

- Level-4 motion is now explicitly a **two-scene** allowance (Hero + Specialties). DESIGN_SYSTEM / ADR-002 notes updated on acceptance.
- The scene is a narrow client island (`components/cinematic/SpecialtiesScene.tsx`); sections remain Server Components (ADR-007).
- Performance budget per contract §23 applies; re-run Web Vitals after real assets.

---

## What agents must do

- Do not add Level-4/scrub motion to any scene other than Hero and Specialties without a new ADR.
- Reuse `@gsap/react` `useGSAP`, scoped context, CSS sticky; register plugins once.
- Never call React `setState` per scroll frame.
- Preserve mobile + reduced-motion non-scrub paths exactly as the contract specifies.

## Revisit condition

If CSS sticky proves unreliable for this scene on a supported browser, or if the eight-state timeline cannot meet the performance budget with CSS + GSAP.

---

## Acceptance record — 2026-08-21 (Preflight)

**Accepted without requiring a spike.** CSS sticky + GSAP ScrollTrigger scrub on the Hero (existing `ToothScrubber.tsx`) proves the pattern works in the same project. No new dependency introduced. Eight-state layout is specified fully in `docs/class-experience-v1/scenes/SPECIALTIES.md §25`. Agent may proceed to WP-12 (static composition) and WP-16 (motion) directly.
