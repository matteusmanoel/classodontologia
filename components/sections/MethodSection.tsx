/**
 * Method — ACT 05 / Precision, Planned (Scene Contract METHOD.md).
 *
 * Dark field. The planning still is framed as a construction study:
 * crop marks, thirds, and a gold measure — technology as purpose, not spectacle.
 */

import Image from "next/image";
import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

const METHOD_HEADING_ID = "method-heading";
const METHOD_IMAGE = "/assets/treatments/method-planning-v1.webp";

export function MethodSection() {
  const [lead, rest] = splitPurpose(copy.method.headline);

  return (
    <section
      id="method"
      aria-labelledby={METHOD_HEADING_ID}
      className="method-section relative bg-bg-primary py-(--section-py)"
    >
      <StorySpine tone="dark" columns={2} />
      <div className="relative z-[2] mx-auto max-w-[1280px] px-(--section-px)">
        <div className="grid md:grid-cols-[1fr_0.92fr] md:items-center md:gap-16 lg:gap-24">
          <Reveal>
            <div className="method-copy relative max-w-lg pl-5 md:pl-6">
              <StoryLine kind="tick" tone="dark" className="method-copy-tick" />
              <p className="mb-6 font-mono text-xs tracking-label text-gold uppercase">
                05 / 09
              </p>
              <h2
                id={METHOD_HEADING_ID}
                className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5vw,4.25rem)] md:leading-[1.08]"
              >
                <span className="sr-only">{copy.method.headline}</span>
                <span aria-hidden="true">
                  <span className="block">{lead}</span>
                  <StoryLine kind="baseline" tone="dark" className="method-purpose-rule" />
                  <span className="mt-4 block text-gold md:mt-5">{rest}</span>
                </span>
              </h2>
              <p className="mt-8 font-sans text-lg font-light leading-relaxed text-text-secondary md:mt-10">
                {copy.method.body}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <figure className="method-study">
              <StoryLine kind="crop-tl" tone="dark" className="method-study-crop method-study-crop--tl" />
              <StoryLine kind="crop-tr" tone="dark" className="method-study-crop method-study-crop--tr" />
              <StoryLine kind="crop-bl" tone="dark" className="method-study-crop method-study-crop--bl" />
              <StoryLine kind="crop-br" tone="dark" className="method-study-crop method-study-crop--br" />
              <div className="method-study-frame" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={METHOD_IMAGE}
                  alt="Estudo editorial de planejamento e precisão — imagem representativa"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <svg
                  className="method-study-grid"
                  viewBox="0 0 160 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path className="story-line-path" d="M 53.3 0 V 100" pathLength={1} />
                  <path className="story-line-path" d="M 106.7 0 V 100" pathLength={1} />
                  <path className="story-line-path" d="M 0 33.3 H 160" pathLength={1} />
                  <path className="story-line-path" d="M 0 66.7 H 160" pathLength={1} />
                </svg>
              </div>
              <figcaption className="method-study-caption">estudo</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function splitPurpose(headline: string): [string, string] {
  const idx = headline.indexOf(",");
  if (idx === -1) {
    return [headline, ""];
  }
  return [headline.slice(0, idx + 1).trim(), headline.slice(idx + 1).trim()];
}
