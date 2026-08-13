# STOP-06 — Tooth cinematic source contains a visible production watermark

**Issue:** ISSUE-002 — Spike A  
**Status:** STOPPED — encoding not started  
**Date:** 2026-08-13  
**Source (unchanged):** `public/assets/cinematic/tooth/vidu-video-3419599273445859.mp4`

## Finding

The only available tooth cinematic source contains a **visible production watermark** (“Vidu AI” logo + wordmark) in the **bottom-right corner**. The overlay is present at every inspected timestamp. There is no approved clean substitute in the repository.

Per ISSUE-002 Critical STOP: **do not hide, crop, blur, cover, or disguise the watermark. Do not encode.**

## Source properties (ffprobe, 2026-08-13)

| Attribute | Value |
|---|---|
| Codec | HEVC / `hvc1` |
| Resolution | 1920×1080 |
| Frame rate | 24 fps |
| Frames | 121 |
| Duration | 5.041667 s |
| Size | 734063 bytes (717 KB) |
| Audio | none |
| Format tag `AIGC` | Vidu `character2video-3.1` producer metadata |

Matches [CINEMATIC_ARCHITECTURE.md](../../CINEMATIC_ARCHITECTURE.md) (watermark risk: source URL contained `/watermarked.mp4`).

## Inspection

Frames extracted with FFmpeg 9.0.1 at 0%, 25%, 50%, 75%, and 100% of duration. No overlay was removed or altered.

| Progress | Timestamp | Full frame | Bottom-right crop | Watermark |
|---|---|---|---|---|
| 0% | 0.000 s | [000pct-full.jpg](frames/000pct-full.jpg) | [00pct-br.png](frames/00pct-br.png) | Visible — “Vidu AI” |
| 25% | 1.260 s | [025pct-full.jpg](frames/025pct-full.jpg) | [25pct-br.png](frames/25pct-br.png) | Visible — “Vidu AI” |
| 50% | 2.521 s | [050pct-full.jpg](frames/050pct-full.jpg) | [50pct-br.png](frames/50pct-br.png) | Visible — “Vidu AI” |
| 75% | 3.781 s | [075pct-full.jpg](frames/075pct-full.jpg) | [75pct-br.png](frames/75pct-br.png) | Visible — “Vidu AI” |
| 100% | 5.000 s | [100pct-full.jpg](frames/100pct-full.jpg) | [100pct-br.png](frames/100pct-br.png) | Visible — “Vidu AI” |

Primary evidence is the lossless bottom-right PNG crops. Full-frame JPEGs provide scene context only.

## What was not done

- No H.264 encode (A1–A5 not run)
- No `tooth-cinematic-v1.mp4` or poster produced
- No seek-latency measurement
- Source file not overwritten
- No WebM, no runtime 3D, no ToothScrubber, no GSAP seek scheduler

## Unblock requirement

Project Owner must provide an **approved clean substitute** (no production watermark at any frame). Spike A encoding and ISSUE-003 / ISSUE-010 remain blocked until that asset exists.

## Definition of Done (ISSUE-002)

**Not satisfied.** Watermark check failed; encoded delivery asset was not produced.
