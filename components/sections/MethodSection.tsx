/**
 * Method — ACT 04 / Precision, Planned.
 *
 * Paper field (washes in from Specialties). Dissolve declaration is the thesis; the timeline carries the argument.
 * MethodThesis + MethodTimeline are the client islands.
 */

import { StorySpine } from "@/components/brand/StorySpine";
import { MethodThesis } from "@/components/cinematic/MethodThesis";
import { MethodTimeline } from "@/components/cinematic/MethodTimeline";
import { methodBeats } from "@/content/method";

export function MethodSection() {
  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="method-section method-section--paper relative bg-bg-paper"
    >
      <StorySpine tone="paper" columns={2} />
      <div className="relative z-[2] mx-auto max-w-[1280px] px-(--section-px) pt-(--section-py) pb-8 md:pb-10">
        <MethodThesis />
      </div>

      <MethodTimeline />

      <noscript>
        <ol className="mx-auto flex max-w-[1280px] flex-col gap-10 px-(--section-px) pb-(--section-py)">
          {methodBeats.map((beat) => (
            <li key={beat.id}>
              <p className="font-mono text-xs tracking-label text-gold-on-paper uppercase">
                {beat.era}
              </p>
              <strong className="mt-2 block font-sans text-xl text-text-paper">
                {beat.from} → {beat.to}
              </strong>
              <p className="mt-2 font-sans text-base text-text-paper-muted">
                {beat.body}
              </p>
            </li>
          ))}
        </ol>
      </noscript>
    </section>
  );
}
