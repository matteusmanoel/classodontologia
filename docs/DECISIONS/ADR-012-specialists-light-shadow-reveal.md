# ADR-012 — Specialists light/shadow reveal (mask + fallback)

**Status: ACCEPTED**
**Date: 2026-08-21**
**Accepted: 2026-08-21 — Preflight close. Spike gate removed; technique defined definitively below.**
**Authority: Product Owner / Lead Preflight Architect**

---

## Decision

Implement the Specialists scene (Hero Moment 03) as a **focus-through-light-and-shadow** reveal on the dark field, built with CSS mask / gradient overlay + GSAP progress, **with a mandatory non-mask fallback** (opacity/contrast reveal) selected by **feature detection**. **No new dependency; no runtime 3D.** Production is gated by a throwaway spike proving Safari/iOS behavior.

---

## Context

`EXPERIENCE_BLUEPRINT.md` ACT 06 and `MOTION_AND_TYPE_SYSTEM.md §16` describe a portrait emerging from shadow as a controlled light/focus region crosses it. Advanced CSS masking has uneven support and must always have a tested fallback (MOTION §22). The scene must remain fully readable under reduced motion and on mobile.

---

## Alternatives considered

- **WebGL/shader reveal.** Rejected: ADR-001 (no runtime 3D); unjustified by the roadmap.
- **Mask-only, no fallback.** Rejected: Safari/iOS risk; violates MOTION §22.
- **Static portraits, no reveal.** Acceptable as the reduced-motion/fallback state, but not as the desktop Hero Moment.

---

## Consequences

- A narrow client island (`components/cinematic/SpecialistsReveal.tsx`) using `gsap.matchMedia` + `useGSAP`.
- Feature detection (e.g., `CSS.supports('mask-image', ...)`) chooses mask vs opacity/contrast — **never** browser-name detection.
- Reduced motion + no-mask path must present all identities without motion.
- Content model omits unverified credentials (D7) and tolerates enrichment.

---

## What agents must do

- Implement as entry-driven GSAP timeline (Level 3), **not** a sticky scrub scene. Each specialist card triggers its own timeline on viewport entry.
- Provide and test the fallback path; identity/name/specialty must never depend on mask/opacity to be discoverable by assistive tech.
- No per-frame `setState`; clean timeline teardown.
- No new dependency; no runtime 3D.
- Use feature detection only — never browser-name detection.

## Accepted technique definition — 2026-08-21

### Primary path (mask supported)

Feature detection gate:
```ts
const supportsMask =
  CSS.supports('mask-image', 'radial-gradient(black, transparent)') ||
  CSS.supports('-webkit-mask-image', 'radial-gradient(black, transparent)')
```

DOM model:
```html
<!-- Specialist card: position relative, overflow hidden, dark background -->
<div class="specialist-card">
  <!-- Portrait fills container -->
  <Image ... />
  <!-- Dark overlay — mask creates the light window -->
  <div class="reveal-overlay" />
</div>
```

CSS (initial state — fully dark):
```css
.reveal-overlay {
  position: absolute; inset: 0;
  background: #080808;
  --cx: 50%; --cy: 60%; --r: 0%;
  mask-image: radial-gradient(
    circle at var(--cx) var(--cy),
    transparent 0%,
    transparent var(--r),
    rgba(0,0,0,0.92) calc(var(--r) + 18%),
    rgba(0,0,0,0.92) 100%
  );
  -webkit-mask-image: radial-gradient(
    circle at var(--cx) var(--cy),
    transparent 0%,
    transparent var(--r),
    rgba(0,0,0,0.92) calc(var(--r) + 18%),
    rgba(0,0,0,0.92) 100%
  );
}
```

GSAP entry timeline:
```ts
gsap.to(overlay, {
  '--r': '55%',    // light window opens
  '--cy': '50%',
  duration: 1.2,
  ease: 'power2.out',
})
```

### Fallback path (mask not supported)

```ts
gsap.fromTo(portrait, { opacity: 0.1 }, { opacity: 1, duration: 1.0, ease: 'power2.out' })
```

### Reduced motion

Both paths: skip GSAP animation entirely; render portrait at `opacity: 1` (no overlay). All identities visible statically.

## Revisit condition

If an accepted WP build shows the CSS custom property animation does not trigger mask repaint smoothly on Safari iOS 17+, default to the fallback path as primary and record here.

