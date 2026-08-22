/**
 * Method — ACT 05 / Precision, Planned (Scene Contract METHOD.md).
 *
 * Dark field. Editorial scaffold; no invented equipment or brand claims.
 * Opens the dark block after the paper Specialties (paper→dark boundary).
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import { Reveal } from "@/components/ui/Reveal";
import { MediaWell } from "@/components/ui/MediaWell";
import { copy } from "@/content/copy";

// GLOBALS-NEEDED: none — Tailwind utilities sufficient here.

const METHOD_HEADING_ID = "method-heading";

export function MethodSection() {
  return (
    <section
      id="method"
      aria-labelledby={METHOD_HEADING_ID}
      className="bg-bg-primary py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <div className="grid md:grid-cols-[1fr_0.85fr] md:items-center md:gap-16 lg:gap-24">
          {/* Copy */}
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-label text-gold uppercase">
              05 / 09
            </p>
            <h2
              id={METHOD_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5vw,4.25rem)] md:leading-tight"
            >
              {copy.method.headline}
            </h2>
            <p className="mt-8 font-sans text-lg font-light leading-relaxed text-text-secondary max-w-lg md:mt-10">
              {copy.method.body}
            </p>
          </Reveal>

          {/* Placeholder media well — gated asset (ASSET_PLAN method-planning-01) */}
          <Reveal delayMs={100}>
            <MediaWell
              assetId="method-planning-01"
              aspectRatio="16/10"
              surface="dark"
              className="w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
