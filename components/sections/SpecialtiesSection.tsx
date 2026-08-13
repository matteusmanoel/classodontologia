import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { specialties, type Specialty } from "@/content/specialties";

interface SpecialtyCardProps {
  specialty: Specialty;
}

function SpecialtyCard({ specialty }: SpecialtyCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-bg-surface p-6">
      <h3 className="font-sans text-lg font-medium text-text-primary">
        {specialty.name}
      </h3>
      <p className="mt-2 font-sans text-base text-text-primary">
        {specialty.description}
      </p>
    </article>
  );
}

export function SpecialtiesSection() {
  return (
    <section
      aria-labelledby="specialties-heading"
      className="bg-bg-primary py-[--section-py]"
    >
      <Container>
        <header className="mb-12">
          <SectionHeading id="specialties-heading" accent>
            {copy.specialties.heading}
          </SectionHeading>
          <p className="mt-4 max-w-2xl font-sans text-base text-text-primary">
            {copy.specialties.subheading}
          </p>
        </header>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3"
        >
          {specialties.map((specialty) => (
            <li key={specialty.id}>
              <SpecialtyCard specialty={specialty} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
