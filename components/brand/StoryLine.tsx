/**
 * Subtle construction hairline used as a narrative thread across acts.
 * Decorative only. Draw-in is CSS when nested in `.reveal.is-in`.
 */

type StoryLineTone = "dark" | "paper";
type StoryLineKind =
  | "horizon"
  | "baseline"
  | "rail"
  | "tick"
  | "cross"
  | "crop-tl"
  | "crop-tr"
  | "crop-bl"
  | "crop-br";

interface StoryLineProps {
  kind?: StoryLineKind;
  tone?: StoryLineTone;
  className?: string;
}

const PATHS: Record<StoryLineKind, string> = {
  horizon: "M 0 1 H 1440",
  baseline: "M 0 1 H 720",
  rail: "M 0 1 H 1440",
  tick: "M 1 0 V 28",
  cross: "M 0 12 H 24 M 12 0 V 24",
  "crop-tl": "M 0 28 V 0 H 28",
  "crop-tr": "M 0 0 H 28 V 28",
  "crop-bl": "M 0 0 V 28 H 28",
  "crop-br": "M 0 28 H 28 V 0",
};

const BOX: Record<StoryLineKind, string> = {
  horizon: "0 0 1440 2",
  baseline: "0 0 720 2",
  rail: "0 0 1440 2",
  tick: "0 0 2 28",
  cross: "0 0 24 24",
  "crop-tl": "0 0 28 28",
  "crop-tr": "0 0 28 28",
  "crop-bl": "0 0 28 28",
  "crop-br": "0 0 28 28",
};

export function StoryLine({
  kind = "horizon",
  tone = "dark",
  className,
}: StoryLineProps) {
  const toneClass = tone === "paper" ? "story-line--paper" : "story-line--dark";
  const wide = kind === "horizon" || kind === "baseline" || kind === "rail";

  return (
    <svg
      className={["story-line", `story-line--${kind}`, toneClass, className]
        .filter(Boolean)
        .join(" ")}
      viewBox={BOX[kind]}
      preserveAspectRatio={wide ? "none" : "xMidYMid meet"}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="story-line-path"
        d={PATHS[kind]}
        pathLength={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
