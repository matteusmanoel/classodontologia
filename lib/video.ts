/**
 * Cinematic delivery paths.
 *
 * Prototype override (Project Owner, 2026-08-13): the watermarked Vidu
 * source is encoded to H.264 for scroll-scrub validation. The watermark
 * is cropped by overflowing the frame to the right — not blurred.
 * Replace with a clean encode before production.
 */

/** Fallback duration when `video.duration` is NaN/Infinity (source: 5.041667s). */
export const TOOTH_DURATION = 5.042;

export const TOOTH_VIDEO_PATH =
  "/assets/cinematic/tooth/tooth-cinematic-prototype.mp4";
export const TOOTH_POSTER_PATH =
  "/assets/cinematic/tooth/tooth-cinematic-prototype-poster.webp";

export const GOLDEN_VIDEO_PATH =
  "/assets/cinematic/logo/golden-identity-v1.mp4";
export const GOLDEN_POSTER_PATH =
  "/assets/cinematic/logo/golden-identity-v1-poster.webp";

export const SMILE_VIDEO_PATH =
  "/assets/cinematic/smile/smile-cinematic-v1.mp4";
export const SMILE_POSTER_PATH =
  "/assets/cinematic/smile/smile-cinematic-v1-poster.webp";
