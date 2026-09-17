/**
 * Selected by CLASS — ACT 07.
 *
 * Dark field. Brands sit on a gold selection rail — the same construction
 * hairline that began in the Manifesto, now used as a criterion mark.
 */

import Image from "next/image";
import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { copy } from "@/content/copy";

const SELECTED_HEADING_ID = "selected-heading";
const BANNER_SRC = "/assets/brand/banner-marcas.webp";

export function SelectedByClassSection() {
  const { marqueeLabel } = copy.selected;

  return (
    <section
      id="selected-by-class"
      aria-labelledby={SELECTED_HEADING_ID}
      className="selected-section relative bg-bg-primary py-(--section-py)"
    >
      <h2 id={SELECTED_HEADING_ID} className="sr-only">
        {marqueeLabel}
      </h2>
      <StorySpine tone="dark" columns={2} />
      <div className="selected-rail relative z-[2]">
        <StoryLine kind="rail" tone="dark" className="selected-rail-line" />
        <span className="selected-rail-ticks" aria-hidden="true" />
        <div className="brand-marquee" role="img" aria-label={marqueeLabel}>
          <div className="brand-marquee-track">
            <Image
              src={BANNER_SRC}
              alt=""
              width={2172}
              height={724}
              className="brand-marquee-copy"
            />
            <Image
              src={BANNER_SRC}
              alt=""
              width={2172}
              height={724}
              className="brand-marquee-copy"
              aria-hidden="true"
            />
          </div>
        </div>
        <StoryLine kind="rail" tone="dark" className="selected-rail-line" />
      </div>
    </section>
  );
}
