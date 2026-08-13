# ADR-003 — Scroll Video Architecture

**Status: PROPOSED**
**Date: 2026-08-12**
**Pending: Spike B result → seek scheduler selection**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision (Partially Accepted)

The following elements are accepted:
- CSS `position: sticky` for Hero viewport pinning
- GSAP ScrollTrigger for scroll progress measurement
- `video.currentTime` as the baseline seek API

The following element is **not yet decided** and is pending Spike B:
- Seek scheduling mechanism (direct in `onUpdate` vs rAF vs GSAP ticker)

---

## Context

The tooth scroll cinematic requires mapping scroll position (0–1) to a video's `currentTime` (0–5.042 seconds). This requires:
1. A way to pin the cinematic section to the viewport while the user scrolls through its scroll room
2. A way to measure scroll progress
3. A way to translate that progress into video time updates

---

## Accepted: CSS Sticky Pinning

**Why CSS sticky:** Native CSS `position: sticky` pins the inner container to the top of the viewport while the user scrolls through the outer section's height (set to `300vh`). This requires zero JavaScript for the pin behavior, is more reliable on iOS Safari and low-power Android than GSAP's pin implementation (which manipulates `position: fixed` and injects spacer divs), and eliminates a class of scroll jank.

**Alternative not chosen:** GSAP ScrollTrigger `pin: true`. Achieves the same visual result but adds JS complexity and has historically caused issues on iOS Safari with some timing behaviors. Revisit if CSS sticky proves problematic.

**DOM structure:**
```html
<section style="height: 300vh">          <!-- scroll room -->
  <div style="position: sticky; top: 0; height: 100vh">  <!-- pinned -->
    <video ... />
    <div><!-- text content --></div>
  </div>
</section>
```

---

## Accepted: GSAP ScrollTrigger for Progress Measurement

ScrollTrigger handles scroll position tracking, progress normalization, and lifecycle callbacks. The `onUpdate` callback provides a `self.progress` value (0–1) that maps to the video's normalized playback time.

```javascript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const mapped = gsap.utils.clamp(0, 1,
      gsap.utils.mapRange(0.05, 0.95, 0, 1, self.progress)
    )
    targetTime = mapped * duration
  }
})
```

The 5%/95% margins reserve an intro hold (whole tooth fully visible) and an outro hold (anatomy exposed) to prevent jarring immediate motion on arrival and allow a text CTA to read before the section ends.

---

## Accepted: `video.currentTime` as Baseline Seek API

`video.currentTime = targetTime` is the cross-browser baseline for seeking.

`video.fastSeek()` is **not adopted by default**. It sacrifices frame accuracy for speed. During scroll scrubbing, the scroll position maps to specific visual states; imprecise frame delivery means the expected visual is not shown at the expected scroll position. `fastSeek()` may be adopted as an adaptive optimization after Spike B demonstrates that it materially improves frame delivery in WebKit at acceptable accuracy cost. Feature detection: `if ('fastSeek' in video)`. Never use browser-name detection.

---

## Pending: Seek Scheduling Mechanism

Three strategies are under evaluation in Spike B (see [SPIKES.md](../SPIKES.md)):

| Strategy | Description |
|---|---|
| B1 | Direct: `video.currentTime = progress * dur` inside `onUpdate` |
| B2 | Decoupled: `onUpdate` sets `targetTime`; `requestAnimationFrame` loop seeks |
| B3 | Decoupled: `onUpdate` sets `targetTime`; `gsap.ticker.add()` seeks |

Success criteria: no visible frame stall at natural scroll speed, main thread not saturated, acceptable WebKit behavior.

The winning strategy from Spike B will be documented here with `Status: ACCEPTED`.

---

## Revised Sections After Spike B

When Spike B is complete, add:

```
## Seek Scheduler Decision

Winner: [B1 / B2 / B3]
Reason: [measurement summary]
fastSeek() optimization: [adopted / not adopted]

## Status updated to: ACCEPTED
```

---

## What Agents Must Do

- Use CSS sticky for Hero pinning — do not use `gsap.pin()`
- Use GSAP ScrollTrigger `onUpdate` for scroll progress capture
- Use `video.currentTime` as the seek API baseline
- Do not implement the production `ToothScrubber` seek loop until Spike B is complete
- In the provisional implementation (before Spike B), use B1 (simplest) as a placeholder

---

## Revisit Condition

If CSS sticky proves unreliable on a supported browser. If ScrollTrigger's `onUpdate` frequency causes performance issues not resolved by any scheduling strategy.
