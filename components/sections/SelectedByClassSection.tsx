/**
 * Selected by CLASS — ACT 07 (Scene Contract SELECTED_BY_CLASS.md).
 *
 * Dark field. Placeholder typographic brand names only — official SVGs owner-gated (D9).
 * No "parceiros" language. No infinite marquee.
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const SELECTED_HEADING_ID = "selected-heading";

export function SelectedByClassSection() {
  const { eyebrow, heading, body, placeholderBrands } = copy.selected;

  return (
    <section
      id="selected-by-class"
      aria-labelledby={SELECTED_HEADING_ID}
      className="bg-bg-primary py-(--section-py) border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 font-mono text-xs tracking-label text-gold uppercase">
              {eyebrow}
            </p>
            <h2
              id={SELECTED_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.25rem,4.5vw,3.75rem)]"
            >
              {heading}
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-text-secondary max-w-lg md:text-lg">
              {body}
            </p>
          </div>
        </Reveal>

        {/* Placeholder brand strip — ready to accept official SVGs without redesign */}
        <Reveal delayMs={80}>
          <ul
            role="list"
            className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-16"
            aria-label="Marcas e tecnologias selecionadas"
          >
            {placeholderBrands.map((brand) => (
              <li key={brand.id}>
                <span
                  className="font-sans text-base font-light tracking-wide text-text-secondary opacity-60 uppercase"
                  aria-label={`${brand.label} (relação a verificar)`}
                >
                  {brand.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
