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

/**
 * Skip the idle opening hold. Frame is still a whole tooth,
 * a few ticks before enamel starts to split (~0.85s).
 */
export const TOOTH_IN_POINT = 0.78;

/** Explode is open — pieces in air, cross-section readable. */
export const TOOTH_DECOMPOSE_END = 2.15;

/** Map Hero shell progress onto the usable tooth clip. */
export function toothTimeForProgress(
  progress: number,
  duration: number,
  decomposeStart: number,
  decomposeEnd: number,
): number {
  const inPoint = Math.min(TOOTH_IN_POINT, duration * 0.45);
  const splitEnd = Math.min(TOOTH_DECOMPOSE_END, duration);
  const p = Math.min(1, Math.max(0, progress));
  const start = Math.min(decomposeStart, 0.45);
  const end = Math.max(start + 0.02, Math.min(decomposeEnd, 0.85));

  if (p <= start) {
    return inPoint;
  }
  if (p <= end) {
    const t = (p - start) / (end - start);
    return inPoint + (splitEnd - inPoint) * t;
  }

  const t = (p - end) / (1 - end);
  return splitEnd + (duration - splitEnd) * t;
}

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
