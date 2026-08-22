/**
 * Manifesto — ACT 02 / The Standard (Scene Contract MANIFESTO.md).
 *
 * Paper field, typographic. SmileWell removed (ADR-009 note, D11).
 * Carries the dark→paper transition boundary from Hero.
 * Server Component (ADR-007). Level 2 motion only via Reveal.
 */

import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const MANIFESTO_HEADING_ID = "manifesto-heading";

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      aria-labelledby={MANIFESTO_HEADING_ID}
      className="bg-bg-paper py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-8 font-mono text-xs tracking-label text-gold-on-paper uppercase md:mb-10">
              {copy.manifesto.eyebrow}
            </p>
            <h2
              id={MANIFESTO_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5.5vw,5rem)] md:leading-[1.06]"
            >
              {copy.manifesto.headline}
            </h2>
            <p className="mt-10 max-w-xl font-sans text-lg font-light leading-relaxed text-text-paper-muted md:mt-14 md:text-xl">
              {copy.manifesto.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
