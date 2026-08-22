/**
 * Place — ACT 08 / The Place (Scene Contract PLACE.md).
 *
 * Paper field. Map art as functional support (ADR-008: image, not embed).
 * Interior photos gated (ASSET_PLAN). No AI clinic interiors presented as real.
 * Server Component (ADR-007). Level 2 motion via Reveal.
 */

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";
import { siteConfig } from "@/config/site";

const PLACE_HEADING_ID = "place-heading";
const MAP_ART_SRC = "/assets/clinic/map.webp";

export function PlaceSection() {
  const { street, city, state } = siteConfig.address;

  return (
    <section
      id="place"
      aria-labelledby={PLACE_HEADING_ID}
      className="bg-bg-paper py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <div className="grid md:grid-cols-[1fr_1fr] md:items-center md:gap-16 lg:gap-24">
          {/* Copy */}
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-label text-gold-on-paper uppercase">
              08 / 09
            </p>
            <h2
              id={PLACE_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.25rem,4.5vw,3.75rem)] md:leading-tight"
            >
              {copy.place.headline}
            </h2>
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-text-paper-muted max-w-md md:mt-8">
              {copy.place.body}
            </p>
            <address className="mt-8 not-italic font-sans text-sm font-light text-text-paper-muted leading-relaxed">
              {street}
              <br />
              {city} — {state}
            </address>
          </Reveal>

          {/* Map art — functional support, not a Google Maps embed (ADR-008) */}
          <Reveal delayMs={100}>
            <div className="relative overflow-hidden mt-12 md:mt-0" style={{ aspectRatio: "4/3" }}>
              <Image
                src={MAP_ART_SRC}
                alt={`Localização da Class Odontologia em ${street}, ${city}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[72%_center]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
