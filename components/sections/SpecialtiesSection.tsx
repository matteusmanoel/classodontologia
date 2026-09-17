/**
 * Specialties — ACT 03 / Hero Moment 02 (ADR-011, Scene Contract SPECIALTIES.md).
 *
 * Dark field. Full-bleed sticky stage; SpecialtiesScene is the client enhancement.
 * Semantic specialty list always present in server HTML (progressive enhancement).
 */

import { StorySpine } from "@/components/brand/StorySpine";
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
      <h2 id={SPECIALTIES_HEADING_ID} className="sr-only">
        {copy.specialties.heading}
      </h2>

      <SpecialtiesScene specialties={specialties} pair={copy.specialties.pair} stitch={copy.specialties.stitch} />

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
