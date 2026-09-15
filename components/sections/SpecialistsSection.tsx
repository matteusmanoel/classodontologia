import { existsSync } from "node:fs";
import { join } from "node:path";

import { StoryLine } from "@/components/brand/StoryLine";
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

function letterSpans(text: string) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="letter-reveal-char"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

const SPECIALISTS_HEADING_ID = "specialists-heading";

export function SpecialistsSection() {
  return (
    <section
      id="specialists"
      aria-labelledby={SPECIALISTS_HEADING_ID}
      className="relative bg-bg-primary py-(--section-py)"
    >
      <StorySpine tone="dark" columns={2} />
      <div className="specialists-shell relative z-[2]">
        <Reveal>
          <header className="mb-16 flex flex-col items-center text-center md:mb-24">
            <h2
              id={SPECIALISTS_HEADING_ID}
              className="letter-reveal inline-block text-center font-display text-3xl tracking-display text-gold md:text-[clamp(2.5rem,5vw,4.25rem)]"
            >
              {letterSpans(copy.specialists.heading)}
            </h2>
            <StoryLine kind="horizon" tone="dark" className="mx-auto mt-8 w-24 md:mt-10 md:w-36" />
            <p className="mt-8 max-w-[22rem] text-pretty text-center font-sans text-lg font-light leading-relaxed text-text-secondary md:mt-10 md:max-w-xl">
              {copy.specialists.subheading}
            </p>
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
