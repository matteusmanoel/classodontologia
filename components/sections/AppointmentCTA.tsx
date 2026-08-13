/**
 * Appointment CTA section — ISSUE-015.
 *
 * Server Component (ADR-007). Keyboard-accessible primary conversion
 * link via Button (`<a>`). Copy and WhatsApp href from content/config
 * placeholders — do not invent a number.
 */

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

const CTA_HEADING_ID = "cta-heading";

export function AppointmentCTA() {
  return (
    <section
      aria-labelledby={CTA_HEADING_ID}
      className="bg-bg-secondary py-[--section-py]"
    >
      <Container>
        <SectionHeading id={CTA_HEADING_ID} accent>
          {copy.cta.heading}
        </SectionHeading>
        <p className="mt-4 max-w-2xl font-sans text-base text-text-primary">
          {copy.cta.body}
        </p>
        <div className="mt-8">
          <Button href={siteConfig.whatsapp} variant="primary">
            {copy.cta.buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
