# Cinematic Architecture — Class Odontologia MVP

**Authority: HIGH**
Read before implementing any component in `components/cinematic/`.
See also: [ADR-003](DECISIONS/ADR-003-scroll-video-architecture.md), [ADR-005](DECISIONS/ADR-005-video-delivery-codec.md), [ADR-006](DECISIONS/ADR-006-mobile-cinematic.md), [SPIKES.md](SPIKES.md).

## Overview

The Hero contains two distinct cinematic elements:

1. **Golden Identity Visual** — a 2.4-second looping video of the golden brand element, playing continuously and independently of scroll.
2. **Tooth Scroll Cinematic** — a 5.042-second video of the tooth deconstruction, controlled by scroll position.

Both are pre-rendered video assets. No runtime 3D. No WebGL. See [ADR-001](DECISIONS/ADR-001-pre-rendered-video-over-runtime-3d.md).

---

## Asset Status (pre-Spike A)

### Tooth Video — Confirmed Source Properties

| Attribute | Value |
|---|---|
| File | `vidu-video-3419599273445859.mp4` (rename required) |
| Codec | HEVC / `hvc1` |
| Frame rate | **24 fps** (confirmed via binary analysis) |
| Total frames | **121** |
| Duration | **5.042 seconds** |
| Keyframe count | **6** (at frames 1, 18, 42, 66, 90, 114) |
| GOP size | ~20–24 frames (~0.83–1 second) |
| moov position | Offset 28 — **already fast-start** |
| Resolution | 1920×1080 |
| File size | 717 KB |
| Audio | None |

**Watermark risk:** The source download URL contains `/watermarked.mp4`. Visual inspection must confirm whether a watermark is present **before Spike A encoding begins**. This is a production blocker.

**Re-encoding required because:** HEVC has incomplete browser support (Firefox); 6 keyframes in 121 frames means seeking can require decoding up to ~23 frames before the target frame, causing scrubbing latency. The moov position is already acceptable.

### Golden Logo Video — Confirmed Source Properties

| Attribute | Value |
|---|---|
| File | `copy_CDD43597-F083-4C89-ACD6-EC9311933303.mov` (rename required) |
| Codec | HEVC + MPEG-4 AAC |
| Frame rate | **30 fps** (confirmed) |
| Total frames | **72** |
| Duration | **2.4 seconds** |
| Keyframe count | **3** (frames 1, 26, 54) |
| Container | QuickTime `.MOV` — **not web-native** |
| moov position | Offset 2,441,071 — **end of file, NOT fast-start** |
| Resolution | 1280×646 |
| File size | 2.3 MB |
| Audio | Present — **must be stripped** |

**Re-encoding required because:** `.MOV` container is not reliable for web autoplay; moov is at end of file (must add faststart); audio must be removed; bitrate should be reduced.

---

## A. Golden Identity Video

### Playback model

- `autoPlay muted loop playsInline`
- No scroll control — plays and loops continuously
- `aria-hidden="true"` — decorative, communicates no essential information

### HTML contract

```html
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/assets/cinematic/logo/golden-identity-v1-poster.webp"
  aria-hidden="true"
  preload="metadata"
>
  <source src="/assets/cinematic/logo/golden-identity-v1.mp4" type="video/mp4" />
</video>
```

`preload` is upgraded to `auto` programmatically after the Hero poster and fonts are loaded. See loading priority sequence below.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .golden-logo-video { display: none; }
  .golden-logo-poster { display: block; }
}
```

### Failure fallback

If the video fails to load: show the poster image. The poster must be styled identically to the video composition so the Hero does not appear broken.

---

## B. Tooth Scroll Cinematic

### DOM Model

```html
<!-- Tall section creates scroll room (height determined by section length) -->
<section ref={sectionRef} style={{ height: "300vh" }}>
  <!-- CSS sticky pins to viewport -->
  <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

    <!-- Video layer — behind content -->
    <video
      ref={videoRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      muted
      playsInline
      preload="metadata"
      poster="/assets/cinematic/tooth/tooth-cinematic-v1-poster.webp"
      aria-hidden="true"
    >
      <source src="/assets/cinematic/tooth/tooth-cinematic-v1.mp4" type="video/mp4" />
    </video>

    <!-- Gradient scrim for text legibility -->
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.6))" }} />

    <!-- Narrative text layer -->
    <div style={{ position: "relative", zIndex: 10 }}>
      <h1>[HERO_HEADING]</h1>
      <p>[HERO_TAGLINE]</p>
    </div>

  </div>
</section>
```

**Why CSS sticky instead of GSAP pin:** Native CSS requires zero JS for the pin behavior, is more reliable on iOS Safari and low-power Android, and requires no spacer div manipulation. GSAP ScrollTrigger is still used for scroll progress measurement.

### Scroll Model

```typescript
// Conceptual — actual strategy determined by Spike B
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    // Reserve first 5% (intro hold) and last 5% (outro hold)
    const mapped = gsap.utils.clamp(0, 1,
      gsap.utils.mapRange(0.05, 0.95, 0, 1, self.progress)
    )
    targetTime = mapped * (video.duration || 5.042)
  }
})
```

The seek scheduling mechanism (direct onUpdate, rAF, or GSAP ticker) is **determined by Spike B**. Do not implement the production `ToothScrubber` until Spike B is complete.

### Seek API

Baseline: `video.currentTime = targetTime`.

`video.fastSeek()` may only be adopted as an adaptive optimization if Spike B demonstrates on Safari that it materially improves frame delivery at acceptable accuracy cost. Feature detection: `if ('fastSeek' in video)`. Never use browser name detection.

### Video State

The video must be **paused at all times** during scroll scrubbing. Do not set `autoPlay`. Call `video.pause()` once after `loadeddata` to ensure the video does not auto-advance.

Guard all duration calculations: `const dur = Number.isFinite(video.duration) ? video.duration : 5.042`.

### Preload Sequence

1. `<link rel="preload" as="image">` for the tooth poster in `<head>` — highest priority
2. Initial `preload="metadata"` on the `<video>` element
3. Upgrade to `preload="auto"` via JavaScript when the Hero section enters the viewport (IntersectionObserver)

The goal: poster is available immediately for LCP; video loads progressively without competing with fonts and poster during initial render.

### Encoding Parameters

**Governed by Spike A.** Do not hardcode. The encoding contract is:

- H.264 (libx264) — primary delivery codec
- `faststart` required (moov before mdat)
- Audio stripped (`-an`)
- GOP: test in range 5–15 frames; select the largest GOP where seek latency remains imperceptible during scroll
- CRF: tune experimentally for visual quality vs file size
- Output: `public/assets/cinematic/tooth/tooth-cinematic-v1.mp4`
- Poster: `public/assets/cinematic/tooth/tooth-cinematic-v1-poster.webp` (frame 0, ≤ 30 KB)
- Mobile variant: determined by Spike C

See [SPIKES.md](SPIKES.md) Spike A for the full procedure.

### Failure Fallback

```typescript
video.addEventListener('error', () => {
  setVideoFailed(true) // renders poster <img> instead
})
```

The section never renders as a black void. The poster image is the complete visual fallback state.

### Loading Priority Sequence (design intent — measure to confirm)

```
1. Critical HTML + CSS
2. Hero poster image (preloaded, fetchpriority="high")
3. Display fonts
4. Golden identity video (small, needed for Hero)
5. Tooth cinematic video (larger, needed only when scrolling begins)
```

The actual LCP element must be confirmed by Lighthouse measurement in Wave 5. Do not assume — measure.

---

## Mobile Strategy

**EXPERIMENT REQUIRED.** See [ADR-006](DECISIONS/ADR-006-mobile-cinematic.md) and [SPIKES.md](SPIKES.md) Spike C.

The architecture supports a graceful degradation chain:
```
Full scrubbing (C1) → Simplified scrubbing (C2) → Section-triggered play (C3) → Poster (C4)
```

The poster (`C4`) is always implemented as the baseline fallback and for `prefers-reduced-motion`.

The primary mobile experience mode is decided after Spike C results are reviewed.

---

## Reduced Motion

Under `prefers-reduced-motion: reduce`:
- Do not initialize ScrollTrigger for the video scrubber
- Do not animate any content
- Set `video.currentTime` to a visually interesting static frame (e.g., 50% of duration)
- Reduce section height from `300vh` to `100vh` (no scroll room needed)
- Show the poster image as the primary visual
- All text content renders normally in its final state

The experience must be **visually composed** under reduced motion. Use `gsap.matchMedia()` to conditionally initialize GSAP code.
