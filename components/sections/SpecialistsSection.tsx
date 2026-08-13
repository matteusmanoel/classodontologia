import { existsSync } from "node:fs";
import { join } from "node:path";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialistCard } from "@/components/ui/SpecialistCard";
import { copy } from "@/content/copy";
import { specialists } from "@/content/specialists";

/** Square brand logomark used when specialist portraits are not yet in public/assets/people/. */
const SPECIALIST_PHOTO_FALLBACK = "/assets/brand/class-oficial.webp";

function resolveSpecialistPhoto(photo: string): string {
  const relativePath = photo.startsWith("/") ? photo.slice(1) : photo;
  const absolutePath = join(process.cwd(), "public", relativePath);

  return existsSync(absolutePath) ? photo : SPECIALIST_PHOTO_FALLBACK;
}

export function SpecialistsSection() {
  return (
    <section
      aria-labelledby="specialists-heading"
      className="bg-bg-secondary py-[--section-py]"
    >
      <Container>
        <header className="mb-12">
          <SectionHeading id="specialists-heading" accent>
            {copy.specialists.heading}
          </SectionHeading>
        </header>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4"
        >
          {specialists.map((specialist) => (
            <li key={specialist.id}>
              <SpecialistCard
                name={specialist.name}
                title={specialist.title}
                specialty={specialist.specialty}
                photo={resolveSpecialistPhoto(specialist.photo)}
                bio={specialist.bio}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
