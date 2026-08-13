# Technical Spikes — Class Odontologia MVP

Spikes are small, focused experiments that resolve empirical questions before production implementation begins.

## Gate Dependencies

```
Spike A (encoding) → blocks ISSUE-010 (ToothScrubber production implementation)
Spike B (seek scheduler) → blocks ISSUE-010 (ToothScrubber production implementation)
Spike C (mobile cinematic) → blocks final mobile behavior (Wave 5 / pre-release)
Spike D (Vercel delivery) → determines whether external media infrastructure is needed
```

Spikes A and B must be completed before the Hero cinematic is built in Wave 2.
Spike C can run concurrently with Wave 4 QA.
Spike D runs during or immediately after Wave 0 (uses the initialized Vercel Preview).

---

## Spike A — Tooth Video Encoding Profile

### Question

What H.264 encoding parameters produce visually acceptable output with sufficiently short seek latency for scroll scrubbing?

### Why this matters

The source video is HEVC with 6 keyframes in 121 frames (GOP ~20–24 frames at 24fps). Seeking to a non-keyframe requires decoding from the previous keyframe. A seek to frame 17 requires decoding frames 1–17 before the target frame becomes available. This creates visible stall during scroll scrubbing. Re-encoding with shorter GOPs reduces decode distance. The trade-off: shorter GOP → better seeking → larger file.

### Inputs

```
Source: vidu-video-3419599273445859.mp4
Codec: HEVC, 24 fps, 121 frames, 5.042s, 6 keyframes
Resolution: 1920×1080, 717 KB
```

**Pre-condition:** Visual inspection for watermark must pass before encoding begins.

### Variants

| Variant | CRF | GOP (frames) | Resolution |
|---|---|---|---|
| A1 | 20 | 5 | 1920×1080 |
| A2 | 23 | 10 | 1920×1080 |
| A3 | 23 | 15 | 1920×1080 |
| A4 | 23 | 10 | 1280×720 |
| A5 | 26 | 5 | 1280×720 |

Start with A1 and A2. Adjust CRF and GOP iteratively based on results.

### Procedure

```bash
# Variant A1 — reference command
ffmpeg -i vidu-video-3419599273445859.mp4 \
  -c:v libx264 -crf 20 -preset slow \
  -g 5 -keyint_min 5 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart \
  -an \
  tooth-cinematic-v1-a1.mp4
```

For each variant:
1. Encode with the parameters above (adjusting `-crf`, `-g`, `-vf scale` as needed)
2. Verify output with ffprobe: confirm H.264, faststart, audio stripped, keyframe count
3. Serve from a local HTTP server (or Vercel Preview from ISSUE-001)
4. Open in Chrome DevTools and observe seek behavior

### Measurement

**Primary measurement chain:**

```javascript
const t0 = performance.now()
video.currentTime = targetTime
video.addEventListener('seeked', () => {
  const seeked = performance.now() - t0
  // If requestVideoFrameCallback is supported:
  video.requestVideoFrameCallback((now, meta) => {
    const frameAvailable = now - t0
    console.log({ seeked, frameAvailable })
  })
})
```

> Do not use `timeupdate` as the primary seek timing metric. Prefer `seeked` + `requestVideoFrameCallback()` where supported. `requestVideoFrameCallback()` fires when the requested frame is actually available to the rendering pipeline. Fall back to `seeked` where unsupported.

**Record for each variant:**
- Output file size (KB)
- Number of keyframes (ffprobe: `ffprobe -select_streams v -show_frames -of csv -i file.mp4 | grep ',I,' | wc -l`)
- Subjective visual quality at normal viewing distance
- Seek latency: `seeked` event timing (ms)
- `requestVideoFrameCallback` timing where available (ms)
- Any visible stall or frame-hold during simulated scroll

**Test in Chrome and WebKit (Playwright-driven or manual).**

### Pass Criteria

- Seek latency (time to `seeked`) < 100ms in Chrome for the chosen variant
- Seek latency < 200ms in WebKit for the chosen variant
- No visible frame stall during continuous scroll at normal scroll speed
- Visual quality: no visible compression artifacts at 1280×720+ viewport width
- File weight: no specific number — let quality and seek performance drive the choice

### Decision Produced

Final encoding parameters for:
- `tooth-cinematic-v1.mp4` (desktop)
- `tooth-cinematic-mobile-v1.mp4` (if Spike C requires a mobile variant)

These parameters are documented in `ASSET_CONTRACT.md` as the production encoding profile.

### Downstream Work Blocked

ISSUE-010 (ToothScrubber implementation) cannot begin until Spike A produces the final encoded asset.

---

## Spike B — Scroll Seek Scheduler

### Question

Which seek scheduling strategy produces the smoothest scroll-driven video experience with the lowest main-thread cost?

### Why this matters

Three plausible strategies exist for translating scroll progress to `video.currentTime`:
1. Direct assignment inside `ScrollTrigger.onUpdate`
2. ScrollTrigger sets target; rAF resolves the seek
3. ScrollTrigger sets target; GSAP ticker resolves the seek

The optimal choice depends on actual browser behavior, not theoretical preference.

### Inputs

The Spike A encoded video (or best variant) — seek behavior varies with GOP structure.

### Variants

**B1 — Direct onUpdate:**
```javascript
ScrollTrigger.create({
  trigger: section,
  start: "top top", end: "bottom bottom",
  onUpdate: (self) => {
    video.currentTime = self.progress * duration
  }
})
```

**B2 — rAF decoupled:**
```javascript
let targetTime = 0
ScrollTrigger.create({
  trigger: section,
  start: "top top", end: "bottom bottom",
  onUpdate: (self) => { targetTime = self.progress * duration }
})
;(function loop() {
  if (Math.abs(video.currentTime - targetTime) > 0.033) {
    video.currentTime = targetTime
  }
  requestAnimationFrame(loop)
})()
```

**B3 — GSAP ticker decoupled:**
```javascript
let targetTime = 0
ScrollTrigger.create({
  trigger: section,
  start: "top top", end: "bottom bottom",
  onUpdate: (self) => { targetTime = self.progress * duration }
})
gsap.ticker.add(() => {
  if (Math.abs(video.currentTime - targetTime) > 0.033) {
    video.currentTime = targetTime
  }
})
```

### Procedure

1. Build a minimal test HTML page (not the full Next.js app) that loads the Spike A encoded video
2. Implement each strategy as a self-contained JS snippet
3. Scroll at natural speed and fast speed
4. Use Chrome DevTools Performance recording to measure main-thread cost
5. Count `seeked` events per second to identify redundant seeks
6. Repeat in WebKit (local Safari or Playwright WebKit)
7. Note any visible jank, frame-hold, or scrubbing lag

### Also Evaluate

`fastSeek()` as an optional addition to the chosen strategy:

```javascript
function seekTo(time) {
  if ('fastSeek' in video) {
    video.fastSeek(time)
  } else {
    video.currentTime = time
  }
}
```

Measure: does `fastSeek()` noticeably reduce seek latency in WebKit at the cost of frame precision? If yes, and if the precision loss is not visually significant during scroll, adopt as the adaptive path.

### Measurement

- Visual smoothness (subjective): 1–5 scale, at normal and fast scroll speed
- Redundant seeks per second (count `seeked` events in 1 second of scroll)
- Main thread CPU usage during scroll (DevTools Performance → Main thread flame chart)
- Chrome and WebKit results recorded separately

### Pass Criteria

- Strategy produces no visible frame-hold at normal scroll speed in Chrome
- Strategy produces acceptable smoothness in WebKit
- Main thread is not saturated during scroll (< 80% utilization)

### Decision Produced

The canonical seek scheduler for `ToothScrubber`. Documented in [ADR-003](DECISIONS/ADR-003-scroll-video-architecture.md). ADR-003 status moves from PROPOSED to ACCEPTED after this spike.

Whether `fastSeek()` is adopted as an adaptive optimization.

### Downstream Work Blocked

ISSUE-010 (ToothScrubber production implementation) requires this result.

---

## Spike C — Mobile Cinematic Experience

### Question

What is the best achievable cinematic experience on touch devices, and at what performance and UX cost do alternatives operate?

### Why this matters

The Hero cinematic is a primary product differentiator. Mobile users should not automatically receive a degraded experience. However, touch scroll + video seeking has real constraints around thermal behavior, iOS Safari seeking, and battery impact. The decision must be empirical.

### Variants

| Variant | Description |
|---|---|
| C1 | Full mobile scroll scrubbing (720p video, same seek model as desktop) |
| C2 | Simplified: seek updates every N pixels of scroll, not every scroll event |
| C3 | Section-triggered: video plays through normally when the Hero section is active |
| C4 | Static poster only — always available as ultimate fallback |

C4 is always implemented regardless of outcome — it serves as the `prefers-reduced-motion` and error fallback.

### Devices to Test

- iPhone (Safari, latest iOS) — **required**
- Modern Android flagship (Chrome) — **required**
- Mid-range Android (Chrome) — **required** (establishes the thermal baseline)

### Procedure

1. Use the Spike A encoded asset (or a 720p variant if not yet encoded)
2. Deploy test page to Vercel Preview
3. Test each variant on each device
4. Record observations per criterion below

### Measurements

| Criterion | C1 | C2 | C3 | C4 |
|---|---|---|---|---|
| Scroll smoothness (1–5) | | | | |
| Seek latency perceptible? (yes/no) | | | | |
| Thermal (device warm after 2min?) | | | | |
| Load time on 4G (seconds) | | | | |
| Battery impact (subjective) | | | | |
| Overall impression (1–5) | | | | |

### Pass Criteria for C1

- Scroll does not drop below 45fps continuously during scrubbing
- No visible seek stall on iPhone Safari at natural scroll speed
- Device does not become noticeably warm after 2 minutes of use
- Load time acceptable on 4G

If C1 does not pass → evaluate C2. If C2 does not pass → C3. C4 is always the fallback.

### Decision Produced

- Primary mobile cinematic mode (C1, C2, C3, or C4)
- Whether a separate mobile video resolution is needed
- ADR-006 status moves from EXPERIMENT REQUIRED to ACCEPTED

### Downstream Work Blocked

The production mobile implementation. This spike runs during Wave 4/5 and does not block Wave 2 Hero development (which can use a provisional desktop-only implementation).

---

## Spike D — Vercel Video Delivery

### Question

Does Vercel serve range requests for video files from `public/`, enabling mid-video seeking without full download?

### Why this matters

HTTP range requests (`Range: bytes=X-Y`) allow browsers to seek to arbitrary positions in a video without downloading the entire file first. If Vercel does not support range requests for static assets, the tooth cinematic cannot be seeked until fully downloaded, which would degrade the scrubbing experience on slow connections.

### Procedure

1. Deploy ISSUE-001 Foundation to Vercel (or use the first available Vercel Preview)
2. Upload the Spike A encoded video to `public/assets/cinematic/tooth/`
3. Open the preview URL in Chrome DevTools → Network tab
4. Load the page and observe the video network request
5. In the browser console: `videoElement.currentTime = 3.0` (mid-video seek)
6. Observe the subsequent network request

### Measurements

- Response status code for initial video request (expect `200` or `206`)
- `Accept-Ranges` header value in response
- `Content-Range` header when seeking
- Response status code for seek request (expect `206 Partial Content`)
- TTFB (Time to First Byte) for video from CDN edge
- Whether seeking works before the full video downloads (confirm with Slow 3G throttling)

### Pass Criteria

- `Accept-Ranges: bytes` present in response headers
- Seek requests return `206 Partial Content` with `Content-Range`
- Mid-video seek succeeds on Slow 3G before full download completes
- TTFB < 500ms from CDN edge (first request)

### Decision Produced

If pass: Vercel static delivery is sufficient. No external media infrastructure (S3, R2, CloudFront) needed for MVP.

If fail: Document the specific failure. Evaluate whether it affects real UX (since the tooth video is only 717KB source / likely < 3MB encoded). If the full video downloads in < 2 seconds on Fast 4G, range requests may not be necessary in practice. External media infrastructure is only introduced if there is a real UX problem to solve.
