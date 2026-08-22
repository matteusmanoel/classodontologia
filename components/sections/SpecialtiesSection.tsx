/**
 * Specialties — ACT 04 / Hero Moment 02 (ADR-011, Scene Contract SPECIALTIES.md).
 *
 * Paper field. Server Component shell; SpecialtiesScene is the client enhancement.
 * Semantic specialty list always present in server HTML (progressive enhancement).
 */

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
      className="bg-bg-paper py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        {/* Section header — always visible */}
        <Reveal>
          <header className="mb-16 max-w-2xl md:mb-20">
            <p className="mb-4 font-mono text-xs tracking-label text-gold-on-paper uppercase">
              04 / 09
            </p>
            <h2
              id={SPECIALTIES_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5vw,4rem)] md:leading-tight"
            >
              {copy.specialties.heading}
            </h2>
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-text-paper-muted md:mt-8">
              {copy.specialties.subheading}
            </p>
          </header>
        </Reveal>

        {/* Client enhancement: desktop sticky scene / mobile list */}
        <SpecialtiesScene specialties={specialties} />

        {/* Fallback semantic list visible only when JS is off or SpecialtiesScene is mobile/reduced */}
        <noscript>
          <ul role="list" className="flex flex-col divide-y divide-border-paper">
            {specialties.map((specialty, index) => {
              const n = String(index + 1).padStart(2, "0");
              return (
                <li key={specialty.id} className="py-8">
                  <span className="font-mono text-xs text-gold-on-paper tracking-label mr-4">
                    {n} / 08
                  </span>
                  <strong className="font-sans text-xl text-text-paper">
                    {specialty.name}
                  </strong>
                  <p className="mt-2 font-sans text-base text-text-paper-muted">
                    {specialty.sceneCopy}
                  </p>
                </li>
              );
            })}
          </ul>
        </noscript>
      </div>
    </section>
  );
}
