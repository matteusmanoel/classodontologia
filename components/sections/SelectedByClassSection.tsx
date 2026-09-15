/**
 * Selected by CLASS — ACT 07.
 *
 * Dark field. Brands sit on a gold selection rail — the same construction
 * hairline that began in the Manifesto, now used as a criterion mark.
 */

import Image from "next/image";
import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const SELECTED_HEADING_ID = "selected-heading";
const BANNER_SRC = "/assets/brand/banner-marcas.webp";

export function SelectedByClassSection() {
  const { eyebrow, heading, body, marqueeLabel } = copy.selected;
  const [lead, mark] = splitCriterion(heading);

  return (
    <section
      id="selected-by-class"
      aria-labelledby={SELECTED_HEADING_ID}
      className="selected-section relative bg-bg-primary py-(--section-py)"
    >
      <StorySpine tone="dark" columns={2} />
      <div className="relative z-[2] mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <div className="mb-14 max-w-2xl md:mb-16">
            <div className="selected-eyebrow">
              <StoryLine kind="crop-tl" tone="dark" className="selected-eyebrow-crop" />
              <p className="font-mono text-xs tracking-label text-gold uppercase">
                {eyebrow}
              </p>
            </div>
            <h2
              id={SELECTED_HEADING_ID}
              className="mt-5 font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.25rem,4.5vw,3.75rem)]"
            >
              <span className="sr-only">{heading}</span>
              <span aria-hidden="true">
                <span className="block">{lead}</span>
                <span className="selected-criterion">{mark}</span>
              </span>
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-text-secondary max-w-lg md:text-lg">
              {body}
            </p>
          </div>
        </Reveal>
      </div>

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

function splitCriterion(heading: string): [string, string] {
  const idx = heading.lastIndexOf(" ");
  if (idx === -1) {
    return [heading, ""];
  }
  return [heading.slice(0, idx), heading.slice(idx + 1)];
}
