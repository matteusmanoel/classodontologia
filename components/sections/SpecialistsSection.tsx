import { existsSync } from "node:fs";
import { join } from "node:path";

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

export function SpecialistsSection() {
  return (
    <section
      aria-labelledby="specialists-heading"
      className="bg-bg-primary py-(--section-py)"
    >
      <div className="specialists-shell">
        <Reveal>
          <header className="mb-16 text-center md:mb-24">
            <h2
              id="specialists-heading"
              className="letter-reveal font-display text-3xl tracking-display text-gold md:text-[clamp(2.5rem,5vw,4.25rem)]"
            >
              {letterSpans(copy.specialists.heading)}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-text-secondary md:mt-10">
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
