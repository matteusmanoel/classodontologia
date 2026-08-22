/**
 * Specialists — ACT 06 / Hero Moment 03, light/shadow reveal (Scene Contract SPECIALISTS.md, ADR-012).
 *
 * Dark field. Real portraits; no invented credentials.
 * SpecialistsReveal is the client island (ADR-007 boundary).
 * Server Component shell — names/specialties always in server HTML.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";

import { Reveal } from "@/components/ui/Reveal";
import { SpecialistsReveal } from "@/components/cinematic/SpecialistsReveal";
import { copy } from "@/content/copy";
import { specialists } from "@/content/specialists";

function resolveSpecialistPhoto(photo: string): string | undefined {
  const relativePath = photo.startsWith("/") ? photo.slice(1) : photo;
  const absolutePath = join(process.cwd(), "public", relativePath);
  return existsSync(absolutePath) ? photo : undefined;
}

const SPECIALISTS_HEADING_ID = "specialists-heading";

export function SpecialistsSection() {
  const resolved = specialists.map((s) => ({
    ...s,
    photo: resolveSpecialistPhoto(s.photo) ?? s.photo,
  }));

  return (
    <section
      id="specialists"
      aria-labelledby={SPECIALISTS_HEADING_ID}
      className="bg-bg-primary py-(--section-py)"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <Reveal>
          <header className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 font-mono text-xs tracking-label text-gold uppercase">
              06 / 09
            </p>
            <h2
              id={SPECIALISTS_HEADING_ID}
              className="font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.25rem,4.5vw,3.75rem)]"
            >
              {copy.specialists.heading}
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-text-secondary max-w-xl md:text-lg md:mt-8">
              {copy.specialists.subheading}
            </p>
          </header>
        </Reveal>

        <SpecialistsReveal specialists={resolved} />
      </div>
    </section>
  );
}
