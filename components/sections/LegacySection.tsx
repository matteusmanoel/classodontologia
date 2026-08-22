/**
 * Legacy — ACT 03 / Since 1998 (Scene Contract LEGACY.md).
 *
 * Paper field, editorial. Anchored on 1998; no fabricated history.
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const LEGACY_HEADING_ID = "legacy-heading";

export function LegacySection() {
  return (
    <section
      id="legacy"
      aria-labelledby={LEGACY_HEADING_ID}
      className="bg-bg-paper py-(--section-py) border-t border-border-paper"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="grid md:grid-cols-[1fr_max-content] md:items-end md:gap-16">
            <div className="max-w-2xl">
              <p className="mb-6 font-mono text-sm tracking-widest text-gold-on-paper uppercase">
                {copy.legacy.metadata}
              </p>
              <h2
                id={LEGACY_HEADING_ID}
                className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5vw,4.5rem)] md:leading-tight"
              >
                {copy.legacy.headline}
              </h2>
              <p className="mt-8 font-sans text-lg font-light leading-relaxed text-text-paper-muted max-w-xl md:mt-10">
                {copy.legacy.body}
              </p>
            </div>

            {/* Accent: large typographic year mark */}
            <div
              className="mt-14 md:mt-0 select-none"
              aria-hidden="true"
            >
              <span className="font-display text-[clamp(5rem,18vw,13rem)] leading-none tracking-tight text-border-paper block">
                1998
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
