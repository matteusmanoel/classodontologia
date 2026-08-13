# ADR-005 — Video Delivery Codec

**Status: ACCEPTED** (codec selection); encoding parameters governed by Spike A
**Date: 2026-08-12**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision

**Primary delivery format: H.264 MP4** for all cinematic assets in the MVP.

H.264 MP4 is the only required codec. WebM/VP9 is not generated for the MVP unless Spike D demonstrates a concrete bandwidth or performance benefit.

Exact encoding parameters (CRF, GOP size, resolution) are determined by Spike A and documented in [ASSET_CONTRACT.md](../ASSET_CONTRACT.md) after the spike completes.

---

## Context

Two cinematic video assets exist:

1. **Tooth cinematic** — 5.042s, 24fps, 121 frames, HEVC source. Used for scroll scrubbing.
2. **Golden identity** — 2.4s, 30fps, 72 frames, HEVC+AAC source in `.MOV` container. Used for autoplay loop.

Both must be re-encoded for web delivery. The HEVC source codec has incomplete browser support and long GOP intervals that cause seeking latency.

---

## Why H.264

**Universal browser support.** H.264 is supported natively in Chrome, Firefox, Safari, iOS Safari, Android Chrome, and Edge. No browser detection or codec negotiation required.

**Predictable decode behavior.** H.264 decoders have consistent implementation across hardware and OS layers, making scroll-scrubbing behavior predictable across the browser matrix.

**Seeking with short GOP.** H.264 can be encoded with short keyframe intervals (e.g., 5–15 frames), enabling fast seeking. The source HEVC has only 6 keyframes in 121 frames (~1 keyframe per second) — a seek to any non-keyframe requires decoding up to 23 frames before the target. Re-encoding H.264 with shorter GOPs solves this.

**Simpler QA.** Single codec means single seek behavior to validate. Dual codec (H.264 + WebM) doubles QA surface and can produce different seeking behaviors per browser.

---

## What is Simpler That We Are Not Choosing

HEVC (keep source as-is): Simpler (no encoding step), but incomplete browser support (Firefox), long GOP intervals, and the golden logo source is in `.MOV` (not web-native), making it unusable without container conversion regardless.

---

## Why Not HEVC as Primary

HEVC browser support is not universal. While Safari and Chrome on modern hardware support it, Firefox requires hardware-accelerated HEVC (not guaranteed on all platforms). For a professional clinic site targeting all users, this gap is not acceptable. H.264 is available on 100% of the target browser matrix.

> This does not mean HEVC is categorically unsupported in all browsers. It means H.264 provides more predictable cross-platform compatibility for this specific use case (scroll-scrubbed cinematic in a diverse browser matrix).

---

## Why Not WebM/VP9 as Secondary

Adding WebM doubles the asset pipeline (encoding, storage, QA). The `<source>` ordering would mean WebM-capable browsers (Chrome, Firefox) never use H.264, making H.264 effectively the Safari-only codec — defeating the single-codec simplicity. WebM may reduce file size vs H.264 at equivalent quality, but for videos under 3MB this is not a meaningful production concern. Spike D validates whether bandwidth warrants it.

---

## Encoding Invariants (non-negotiable)

- Container: MP4
- Codec: H.264 (libx264)
- Pixel format: `yuv420p`
- `faststart`: required (moov atom before mdat)
- Audio: stripped (`-an`) on all cinematic assets
- Poster: extracted from frame 0 as WebP

## Encoding Targets (Spike A determines final values)

- GOP: test range 5–15 frames; select largest GOP where seeking is imperceptible during scroll
- CRF: tune experimentally for quality vs file size
- Desktop resolution: 1920×1080
- Mobile resolution: determined by Spike C

---

## Spike A — Final encoding parameters

**Not recorded.** Spike A (ISSUE-002) stopped at the watermark pre-condition on 2026-08-13 (STOP-06).

The only tooth cinematic source (`vidu-video-3419599273445859.mp4`) contains a visible “Vidu AI” production watermark at 0%, 25%, 50%, 75%, and 100% of duration. No approved clean substitute was available. Encoding was not started. The Accepted H.264 MP4 codec decision in this ADR is unchanged.

Evidence: [docs/spikes/spike-a-stop-06/STOP-06.md](../spikes/spike-a-stop-06/STOP-06.md).

Append CRF, GOP, resolution, preset, and output measurements here only after a clean source passes inspection.

---

## Revisit Condition

If browser market share data shows HEVC support becoming universal, or if bandwidth measurements from Spike D strongly favor WebM. Any codec change requires a new ADR.

---

## What Agents Must Do

- Output all cinematic assets as H.264 MP4 with faststart
- Strip audio from all cinematic assets
- Do not generate WebM without explicit instruction
- Do not use HEVC as a delivery format
- Reference final encoding parameters from `ASSET_CONTRACT.md` after Spike A
