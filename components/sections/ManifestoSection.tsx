/**
 * Manifesto / positioning — paper field, Smile cinematic in a dark well (ADR-009).
 *
 * Server Component (ADR-007). SmileWell is the client island.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";

import { SmileWell } from "@/components/cinematic/SmileWell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";
import { SMILE_POSTER_PATH, SMILE_VIDEO_PATH } from "@/lib/video";

const MANIFESTO_HEADING_ID = "manifesto-heading";

function resolveSmileVideo(): string | undefined {
  const relativePath = SMILE_VIDEO_PATH.startsWith("/")
    ? SMILE_VIDEO_PATH.slice(1)
    : SMILE_VIDEO_PATH;
  const absolutePath = join(process.cwd(), "public", relativePath);

  return existsSync(absolutePath) ? SMILE_VIDEO_PATH : undefined;
}

export function ManifestoSection() {
  return (
    <section
      aria-labelledby={MANIFESTO_HEADING_ID}
      className="manifesto-section py-(--section-py)"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-(--section-px) md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:gap-16 lg:gap-24">
        <Reveal>
          <p className="mb-10 font-sans text-sm font-medium tracking-label uppercase text-gold-on-paper md:mb-12">
            A clínica
          </p>
          <h2
            id={MANIFESTO_HEADING_ID}
            className="max-w-xl font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5vw,4.5rem)] md:leading-[1.08]"
          >
            {copy.manifesto.headline}
          </h2>
          <p className="mt-10 max-w-lg font-sans text-lg font-light leading-relaxed text-text-paper-muted md:mt-14 md:text-xl">
            {copy.manifesto.body}
          </p>
        </Reveal>
        <Reveal delayMs={70}>
          <SmileWell
            posterSrc={SMILE_POSTER_PATH}
            videoSrc={resolveSmileVideo()}
            alt="Sorriso"
          />
        </Reveal>
      </div>
    </section>
  );
}
