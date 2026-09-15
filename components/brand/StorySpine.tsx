/**
 * Construction spine — Mix E thirds (480 / 960 of 1440) as a continuous
 * vertical thread from Hero to Footer. Horizontals only at Mix joins
 * (wash cross, hero handoff), not as a box around every section.
 */

type StorySpineTone = "dark" | "paper";
type StorySpineJoin = "none" | "bottom" | "cross";

interface StorySpineProps {
  tone?: StorySpineTone;
  columns?: 1 | 2;
  join?: StorySpineJoin;
  className?: string;
}

export function StorySpine({
  tone = "dark",
  columns = 2,
  join = "none",
  className,
}: StorySpineProps) {
  return (
    <div
      className={["story-spine", `story-spine--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className="story-spine-v story-spine-v--a" />
      {columns === 2 ? <span className="story-spine-v story-spine-v--b" /> : null}
      {join === "bottom" ? <span className="story-spine-h story-spine-h--bottom" /> : null}
      {join === "cross" ? <span className="story-spine-h story-spine-h--cross" /> : null}
    </div>
  );
}
