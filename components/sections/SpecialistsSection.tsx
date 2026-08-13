import { existsSync } from "node:fs";
import { join } from "node:path";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialistCard } from "@/components/ui/SpecialistCard";
import { copy } from "@/content/copy";
import { specialists } from "@/content/specialists";

function resolveSpecialistPhoto(photo: string): string | undefined {
  const relativePath = photo.startsWith("/") ? photo.slice(1) : photo;
  const absolutePath = join(process.cwd(), "public", relativePath);

  return existsSync(absolutePath) ? photo : undefined;
}

export function SpecialistsSection() {
  return (
    <section
      aria-labelledby="specialists-heading"
      className="bg-bg-primary py-[--section-py]"
    >
      <Container>
        <Reveal>
          <header className="mb-16 max-w-2xl md:mb-24">
            <SectionHeading id="specialists-heading" accent>
              {copy.specialists.heading}
            </SectionHeading>
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-text-primary">
              {copy.specialists.subheading}
            </p>
          </header>
        </Reveal>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-4"
        >
          {specialists.map((specialist, index) => (
            <li key={specialist.id}>
              <Reveal delayMs={Math.min(index * 70, 210)}>
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
      </Container>
    </section>
  );
}
