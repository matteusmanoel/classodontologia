/**
 * Closing field — Map art as right-anchored background.
 * Shaded overlay carries the only two actions.
 */

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

const CTA_HEADING_ID = "cta-heading";
const MAP_ART_SRC = "/assets/clinic/map.webp";

export function LocationSection() {
  const { street, city } = siteConfig.address;

  return (
    <section
      aria-labelledby={CTA_HEADING_ID}
      className="visit-section"
    >
      <h2 id={CTA_HEADING_ID} className="sr-only">
        {copy.cta.heading}
      </h2>
      <Image
        src={MAP_ART_SRC}
        alt={`Mapa da Class Odontologia em ${street}, ${city}`}
        fill
        className="visit-map"
        sizes="100vw"
        priority={false}
      />
      <div className="visit-shade" aria-hidden="true" />
      <div className="visit-actions">
        <Button href={siteConfig.whatsapp} variant="primary" className="px-10 py-5">
          {copy.cta.buttonLabel}
        </Button>
        <Button
          href={siteConfig.mapsUrl}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.location.buttonLabel}
        </Button>
      </div>
    </section>
  );
}
