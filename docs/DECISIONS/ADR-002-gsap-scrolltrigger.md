# ADR-002 — GSAP + ScrollTrigger as Animation Library

**Status: ACCEPTED**
**Date: 2026-08-12**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision

GSAP (GreenSock Animation Platform) version 3.x and its ScrollTrigger plugin are the chosen animation library for this project. All complex, orchestrated, or scroll-driven animation uses GSAP. CSS transitions and `@keyframes` remain the preferred mechanism for simple interaction motion (hover, focus, Level 1–2 motion).

---

## Context

The project requires:
1. Scroll-driven video scrubbing in the Hero cinematic
2. Coordinated text reveals in the Manifesto section (optional, Level 3)
3. Stagger-reveal on scroll entry for content sections (Level 2)

Animation systems considered: GSAP, Framer Motion, CSS-only, Web Animations API.

---

## Why GSAP

**Scroll capability.** ScrollTrigger is the industry standard for scroll-driven animations. It handles the scroll measurement, progress normalization, and trigger lifecycle that the tooth cinematic requires.

**License.** GSAP 3.x is free for all uses including commercial, as of the Webflow acquisition (confirmed: npm registry 2026-08-12, "Standard 'no charge' license").

**Performance.** GSAP uses a single `requestAnimationFrame` loop (ticker) shared across all animations. It is optimized to minimize layout thrashing and unnecessary DOM reads.

**`useGSAP` hook.** The `@gsap/react` package provides `useGSAP()`, a drop-in replacement for `useEffect()` that handles GSAP cleanup automatically on component unmount and React Strict Mode.

**`gsap.matchMedia()`** provides a clean API for respecting `prefers-reduced-motion` without separate event listeners.

---

## Why Not Framer Motion

Framer Motion is React-specific, adds ~35KB to the client bundle, and its scroll animation API (useScroll, useTransform) is not as capable as ScrollTrigger for the continuous per-frame scrubbing required by the tooth cinematic.

---

## CSS First Principle (preserved)

GSAP does not replace CSS. The motion hierarchy is:

| Level | Mechanism |
|---|---|
| 0 | No motion |
| 1 | CSS `transition` |
| 2 | CSS `@keyframes` + IntersectionObserver class toggle |
| 3 | GSAP timelines for orchestrated sequences |
| 4 | GSAP ScrollTrigger + video seek (Hero only) |

An agent must not use GSAP where CSS suffices. A card fade-in that can be achieved with a CSS reveal does not need a GSAP ScrollTrigger instance.

---

## Reduced Motion

All GSAP code must be wrapped in `gsap.matchMedia()`:

```javascript
const mm = gsap.matchMedia()
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Full animation initialization
})
mm.add("(prefers-reduced-motion: reduce)", () => {
  // Static or composed fallback state
})
```

---

## What Agents Must Do

- Do not install Framer Motion, Motion One, Anime.js, or any other animation library
- Register plugins once: `gsap.registerPlugin(ScrollTrigger)` in the cinematic Client Component
- Use `useGSAP()` from `@gsap/react` instead of raw `useEffect()` for GSAP code
- Use `gsap.matchMedia()` for all motion that must respect reduced-motion preferences
- CSS for Level 0–2 motion; GSAP only for Level 3–4

---

## Revisit Condition

If GSAP's licensing changes materially, or if ScrollTrigger's API proves insufficient for a specific requirement. Neither is anticipated.
