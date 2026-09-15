/**
 * Specialties — ACT 03 / Hero Moment 02 (ADR-011, Scene Contract SPECIALTIES.md).
 *
 * Dark field. Full-bleed sticky stage; SpecialtiesScene is the client enhancement.
 * Semantic specialty list always present in server HTML (progressive enhancement).
 */

import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { SpecialtiesScene } from "@/components/cinematic/SpecialtiesScene";
import { copy } from "@/content/copy";
import { specialties } from "@/content/specialties";

const SPECIALTIES_HEADING_ID = "specialties-heading";

export function SpecialtiesSection() {
  return (
    <section
      id="specialties"
      aria-labelledby={SPECIALTIES_HEADING_ID}
      className="relative bg-bg-primary"
    >
      <StorySpine tone="dark" columns={2} />
      <div className="relative z-[2] mx-auto max-w-[1280px] px-(--section-px) pt-(--section-py) pb-10 md:pb-14">
        <Reveal>
          <header className="max-w-2xl">
            <p className="mb-4 font-mono text-xs tracking-label text-gold uppercase">
              04 / 09
            </p>
            <h2
              id={SPECIALTIES_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5vw,4rem)] md:leading-tight"
            >
              {copy.specialties.heading}
            </h2>
            <StoryLine kind="baseline" tone="dark" className="mt-6 w-40 md:mt-8 md:w-56" />
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-text-secondary md:mt-8">
              {copy.specialties.subheading}
            </p>
          </header>
        </Reveal>
      </div>

      <SpecialtiesScene specialties={specialties} />

      <noscript>
        <ul
          role="list"
          className="mx-auto flex max-w-[1280px] flex-col divide-y divide-border px-(--section-px) pb-(--section-py)"
        >
          {specialties.map((specialty, index) => {
            const n = String(index + 1).padStart(2, "0");
            return (
              <li key={specialty.id} className="py-8">
                <span className="font-mono text-xs text-gold tracking-label mr-4">
                  {n} / 08
                </span>
                <strong className="font-sans text-xl text-text-primary">
                  {specialty.name}
                </strong>
                <p className="mt-2 font-sans text-base text-text-secondary">
                  {specialty.sceneCopy}
                </p>
              </li>
            );
          })}
        </ul>
      </noscript>
    </section>
  );
}
