# ADR-006 — Mobile Cinematic Strategy

**Status: EXPERIMENT REQUIRED**
**Date: 2026-08-12**
**Pending: Spike C results**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision (Pending)

The primary mobile cinematic mode is not yet determined. This decision is pending Spike C (see [SPIKES.md](../SPIKES.md)).

The architecture supports a graceful degradation chain:
```
C1 Full scroll scrubbing
    ↓
C2 Simplified/reduced-frequency scrubbing
    ↓
C3 Section-triggered progressive playback
    ↓
C4 Static poster (always available as fallback)
```

The poster fallback (C4) is always implemented regardless of outcome. It serves as the `prefers-reduced-motion` fallback and the network/JS failure fallback.

---

## Context

The Hero cinematic is a primary product differentiator. The goal is to give mobile users the best achievable experience, not to automatically degrade them.

However, scroll-driven video seeking on touch devices has real constraints:
- iOS Safari has different seeking behavior than desktop browsers
- Touch momentum scrolling means scroll events arrive in unpredictable bursts
- Mid-range Android devices may throttle video decode under thermal pressure
- Battery impact of continuous video seeking during scroll

These constraints require empirical measurement, not assumption.

---

## Variants Under Evaluation

| Option | Description | Risk |
|---|---|---|
| C1 | Full scroll scrubbing with 720p mobile video | Thermal, seek latency on mid-range Android |
| C2 | Seek updates every N pixels (reduced frequency) | Less precise mapping; potentially smoother |
| C3 | Video plays through normally when Hero is in viewport | Different experience than desktop; simpler |
| C4 | Static poster only | Simplest; weakest brand differentiator on mobile |

---

## Implementation Architecture (common to all options)

Regardless of the Spike C outcome:
- The poster image is always rendered (server-side HTML attribute and via `poster` on the `<video>`)
- The `prefers-reduced-motion` path always shows the poster
- The error/failure path always shows the poster
- The section never renders as a black void

---

## Expected Spike C Timeline

Spike C runs during Wave 4 (concurrently with QA). It does not block Wave 2 Hero cinematic development, which uses a desktop-only provisional implementation. The Spike C result is applied before Wave 5 release gate.

---

## ADR Update After Spike C

When Spike C is complete, add:

```
## Mobile Strategy Decision

Primary mode: [C1 / C2 / C3 / C4]
Test results summary: [brief]
Devices tested: [list]
Performance observations: [thermal, seek latency, smoothness]

## Status updated to: ACCEPTED
```

---

## What Agents Must Do

- Do not implement a permanent mobile strategy in the ToothScrubber before Spike C
- During Wave 2, implement the desktop scrubbing path; use a simple viewport-width check to show the poster on mobile as a provisional fallback: `if (window.innerWidth < 768) { showPoster() }`
- This provisional behavior is explicitly provisional and will be replaced by the Spike C result
- Do not promote the poster-only provisional to an architectural invariant
- Always implement the poster fallback path

---

## Revisit Condition

If device capabilities change significantly (e.g., all mobile browsers gain reliable 60fps video seek), revisit C1 as the default. If a product decision is made to explicitly target mobile-first, revisit the entire Hero cinematic design.
