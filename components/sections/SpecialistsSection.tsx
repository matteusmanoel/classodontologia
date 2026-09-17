import { existsSync } from "node:fs";
import { join } from "node:path";

import { StorySpine } from "@/components/brand/StorySpine";
import { Reveal } from "@/components/ui/Reveal";
import { SpecialistCard } from "@/components/ui/SpecialistCard";
import { copy } from "@/content/copy";
import { specialists } from "@/content/specialists";

function resolveSpecialistPhoto(photo: string): string | undefined {
  const relativePath = photo.startsWith("/") ? photo.slice(1) : photo;
  const absolutePath = join(process.cwd(), "public", relativePath);
  return existsSync(absolutePath) ? photo : undefined;
}

const SPECIALISTS_HEADING_ID = "specialists-heading";

export function SpecialistsSection() {
  const { pair } = copy.specialists;

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
        <ul role="list" className="specialists-grid">
          {specialists.map((specialist, index) => (
            <li key={specialist.id}>
              <Reveal className="h-full w-full" delayMs={Math.min(index * 70, 210)}>
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
      </div>
    </section>
  );
}
