/**
 * Contracted cinematic delivery paths and duration guard.
 * Tooth encode is BLOCKED (STOP-06: Vidu watermark). Paths remain the
 * ASSET_CONTRACT destinations so ISSUE-009/010 can import them.
 * Golden identity files exist at the paths below.
 */

/** Fallback duration when `video.duration` is NaN/Infinity (source: 5.041667s). */
export const TOOTH_DURATION = 5.042;

export const TOOTH_VIDEO_PATH =
  "/assets/cinematic/tooth/tooth-cinematic-v1.mp4";
export const TOOTH_POSTER_PATH =
  "/assets/cinematic/tooth/tooth-cinematic-v1-poster.webp";

export const GOLDEN_VIDEO_PATH =
  "/assets/cinematic/logo/golden-identity-v1.mp4";
export const GOLDEN_POSTER_PATH =
  "/assets/cinematic/logo/golden-identity-v1-poster.webp";
