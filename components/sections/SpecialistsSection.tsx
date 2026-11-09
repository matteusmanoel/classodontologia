import { existsSync } from "node:fs";
import { join } from "node:path";

import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { SpecialistCard } from "@/components/ui/SpecialistCard";
import { copy } from "@/content/copy";
import { specialists, type Specialist } from "@/content/specialists";

function resolveSpecialistPhoto(photo: string): string | undefined {
  const relativePath = photo.startsWith("/") ? photo.slice(1) : photo;
  const absolutePath = join(process.cwd(), "public", relativePath);
  return existsSync(absolutePath) ? photo : undefined;
}

const SPECIALISTS_HEADING_ID = "specialists-heading";

/** Founder-led first row; the rest of the team opens on demand. */
const FEATURED_COUNT = 3;

function SpecialistGrid({
  items,
  offset = 0,
}: {
  items: readonly Specialist[];
  offset?: number;
}) {
  return (
    <ul role="list" className="specialists-grid">
      {items.map((specialist, index) => (
        <li key={specialist.id}>
          <Reveal
            className="h-full w-full"
            delayMs={Math.min((offset + index) * 70, 210)}
          >
            <SpecialistCard
              name={specialist.name}
              title={specialist.title}
              specialty={specialist.specialty}
              photo={resolveSpecialistPhoto(specialist.photo)}
              bio={specialist.bio}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function SpecialistsSection() {
  const { pair } = copy.specialists;
  const featured = specialists.slice(0, FEATURED_COUNT);
  const rest = specialists.slice(FEATURED_COUNT);

  return (
    <section
      id="specialists"
      aria-labelledby={SPECIALISTS_HEADING_ID}
      className="relative bg-bg-primary py-(--section-py)"
    >
      <StorySpine tone="dark" columns={2} />
      <div className="specialists-shell relative z-[2]">
        <Reveal>
          <header className="specialists-header">
            <h2 id={SPECIALISTS_HEADING_ID} className="specialists-heading">
              <span className="sr-only">{copy.specialists.heading}</span>
              <span aria-hidden="true" className="display-pair">
                <span className="display-pair-block">
                  <span className="display-pair-kicker">{pair.lead}</span>
                  <span className="display-pair-word">{pair.leadMark}</span>
                </span>
                <span className="display-pair-block">
                  <span className="display-pair-kicker">{pair.trail}</span>
                  <span className="display-pair-word display-pair-word--gold">
                    {pair.trailMark}
                  </span>
                </span>
              </span>
            </h2>
            <p className="specialists-body">{copy.specialists.subheading}</p>
          </header>
        </Reveal>
        <SpecialistGrid items={featured} />
        <details className="specialists-more">
          <summary className="specialists-more-summary">
            <span className="specialists-more-open">{copy.specialists.moreLabel}</span>
            <span className="specialists-more-close">{copy.specialists.lessLabel}</span>
            <span className="specialists-more-icon" aria-hidden="true" />
          </summary>
          <SpecialistGrid items={rest} offset={featured.length} />
        </details>
      </div>
    </section>
  );
}
