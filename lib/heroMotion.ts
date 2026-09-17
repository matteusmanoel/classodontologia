/**
 * Shared Hero timeline beats.
 *
 * ToothScrubber maps video time onto the same shell progress as
 * HeroCinematic, so lockup scatter and enamel split stay aligned.
 */

export const HERO_BEATS = {
  wordmarkHold: 0.18,
  wordmarkExit: 0.24,
  decadeEnter: 0.22,
  decadeSpin: 0.42,
  decadeExitAt: 0.58,
  decadeExit: 0.2,
  lineEnter: 0.12,
  lineHold: 0.18,
  lineExit: 0.12,
  lineGap: 0.1,
  afterLines: 0.08,
  wash: 0.42,
} as const;

export function heroTimelineDuration(lineCount: number): number {
  const lines =
    lineCount * (HERO_BEATS.lineEnter + HERO_BEATS.lineHold + HERO_BEATS.lineExit) +
    Math.max(0, lineCount - 1) * HERO_BEATS.lineGap;

  return (
    HERO_BEATS.wordmarkHold +
    HERO_BEATS.wordmarkExit +
    HERO_BEATS.decadeExitAt +
    HERO_BEATS.decadeExit +
    lines +
    HERO_BEATS.afterLines +
    HERO_BEATS.wash
  );
}

/** Scroll progress (0–1 on the Hero shell) where the lockup starts / finishes scattering. */
export function heroDecomposeWindow(lineCount: number): {
  start: number;
  end: number;
} {
  const total = heroTimelineDuration(lineCount);
  return {
    start: HERO_BEATS.wordmarkHold / total,
    end: (HERO_BEATS.wordmarkHold + HERO_BEATS.wordmarkExit) / total,
  };
}
