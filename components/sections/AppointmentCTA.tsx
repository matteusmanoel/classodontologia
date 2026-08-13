/**
 * Appointment CTA section — ISSUE-015.
 */

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

const CTA_HEADING_ID = "cta-heading";

export function AppointmentCTA() {
  return (
    <section
      aria-labelledby={CTA_HEADING_ID}
      className="relative overflow-hidden bg-bg-secondary py-[--section-py]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-[1280px] px-[--section-px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id={CTA_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5vw,4.5rem)] md:leading-[1.08]"
            >
              {copy.cta.heading}
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-sans text-lg font-light leading-relaxed text-text-primary">
              {copy.cta.body}
            </p>
            <div className="mt-12">
              <Button href={siteConfig.whatsapp} variant="primary">
                {copy.cta.buttonLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
