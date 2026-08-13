/**
 * Manifesto / positioning section — ISSUE-012.
 *
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const MANIFESTO_HEADING_ID = "manifesto-heading";

export function ManifestoSection() {
  return (
    <section
      aria-labelledby={MANIFESTO_HEADING_ID}
      className="bg-bg-primary py-[--section-py]"
    >
      <div className="mx-auto max-w-[1280px] px-[--section-px]">
        <Reveal>
          <p className="mb-10 font-sans text-sm font-medium tracking-label uppercase text-gold">
            A clínica
          </p>
          <h2
            id={MANIFESTO_HEADING_ID}
            className="max-w-5xl font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.75rem,6vw,5.5rem)] md:leading-[1.05]"
          >
            {copy.manifesto.headline}
          </h2>
          <p className="mt-12 max-w-2xl font-sans text-lg font-light leading-relaxed text-text-primary md:mt-16 md:text-xl">
            {copy.manifesto.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
