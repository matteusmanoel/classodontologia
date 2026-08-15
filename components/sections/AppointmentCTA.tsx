/**
 * Appointment CTA — kept for a clean restore.
 * Home currently uses LocationSection as the combined closing field.
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
      className="relative overflow-hidden border-y border-border bg-bg-secondary py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="mb-6 font-sans text-sm font-medium tracking-label uppercase text-gold">
              Próximo passo
            </p>
            <h2
              id={CTA_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.25rem,4.5vw,3.75rem)] md:leading-[1.1]"
            >
              {copy.cta.heading}
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-text-secondary md:mt-8 md:text-lg">
              {copy.cta.body}
            </p>
            <div className="mt-10">
              <Button
                href={siteConfig.whatsapp}
                variant="primary"
                className="flex-col gap-1 px-10 py-5"
              >
                <span>{copy.cta.buttonLabel}</span>
                <span className="font-sans text-xs font-light tracking-normal normal-case opacity-80">
                  {siteConfig.phone}
                </span>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
