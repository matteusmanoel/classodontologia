/**
 * Conversion — ACT 09 / Start a Conversation (Scene Contract CONVERSION.md).
 *
 * Dark close. One primary WhatsApp CTA. Brand signature.
 * Consolidates the orphan AppointmentCTA.tsx (D12). Single conversion component.
 * Server Component (ADR-007). Level 1–2 motion only.
 *
 * Production canonical: https://classodontologia.com.br (from siteConfig — WP-02 corrected).
 */

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { siteConfig } from "@/config/site";

const CONVERSION_HEADING_ID = "conversion-heading";

export function ConversionSection() {
  return (
    <section
      id="conversion"
      aria-labelledby={CONVERSION_HEADING_ID}
      className="bg-bg-primary py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="max-w-2xl">
            <h2
              id={CONVERSION_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5.5vw,5rem)] md:leading-tight"
            >
              {copy.conversion.headline}
            </h2>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-14">
              <Button
                href={siteConfig.whatsapp}
                variant="primary"
                className="px-10 py-5"
              >
                {copy.conversion.buttonLabel}
              </Button>
              <Button
                href={siteConfig.mapsUrl}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.conversion.mapsLabel}
              </Button>
            </div>

            {/* Brand signature — emotional close of the page */}
            <p className="mt-16 font-display text-lg tracking-display text-gold italic md:mt-20 md:text-xl">
              {copy.conversion.signature}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
