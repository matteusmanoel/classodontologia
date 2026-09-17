/**
 * Legacy — ACT 03 / Since 1998 (Scene Contract LEGACY.md).
 *
 * Paper field, editorial. The year is the scene; the headline is a three-line label.
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const LEGACY_HEADING_ID = "legacy-heading";

export function LegacySection() {
  return (
    <section
      id="legacy"
      aria-labelledby={LEGACY_HEADING_ID}
      className="relative bg-bg-paper py-(--section-py)"
    >
      <StorySpine tone="paper" columns={2} />
      <div className="relative z-[2] mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="legacy-stage">
            <div className="legacy-year relative select-none">
              <StoryLine kind="crop-tr" tone="paper" className="legacy-year-crop" />
              <span className="legacy-numeral" aria-hidden="true">
                {copy.legacy.year}
              </span>
              <h2 id={LEGACY_HEADING_ID} className="legacy-label">
                <span className="sr-only">{copy.legacy.headline}</span>
                <span aria-hidden="true" className="legacy-label-lines">
                  {copy.legacy.headlineLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </h2>
            </div>
            <p className="legacy-body">{copy.legacy.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
