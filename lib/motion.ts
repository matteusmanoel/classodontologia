/**
 * GSAP easing presets as numeric cubic-bezier arrays and strings.
 * Cinematic components import `gsap` themselves — this module must not.
 * CSS motion tokens live in styles/tokens.css `:root`.
 */

/** Matches `--ease-out-expo` in tokens.css */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Matches `--ease-in-out` in tokens.css */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

export const EASE_OUT_EXPO_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_IN_OUT_CSS = "cubic-bezier(0.4, 0, 0.2, 1)";

/** GSAP named equivalents for timeline/tween `ease` strings */
export const GSAP_EASE_OUT_EXPO = "expo.out";
export const GSAP_EASE_IN_OUT = "power2.inOut";
