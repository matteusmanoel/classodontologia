import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { specialties, type Specialty } from "@/content/specialties";

interface SpecialtyRowProps {
  specialty: Specialty;
  index: number;
}

function SpecialtyRow({ specialty, index }: SpecialtyRowProps) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <article className="specialty-row group grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-border py-10 last:border-b md:grid-cols-[5rem_minmax(0,22rem)_1fr] md:items-baseline md:gap-x-12 md:py-14">
      <span className="font-sans text-sm tracking-label text-gold tabular-nums">
        {n}
      </span>
      <h3 className="font-display text-2xl tracking-display text-text-primary transition-colors duration-[var(--duration-normal)] group-hover:text-gold md:text-3xl">
        {specialty.name}
      </h3>
      <p className="col-span-2 max-w-xl font-sans text-base font-light leading-relaxed text-text-primary md:col-span-1 md:justify-self-end md:text-lg">
        {specialty.description}
      </p>
    </article>
  );
}

export function SpecialtiesSection() {
  return (
    <section
      aria-labelledby="specialties-heading"
      className="bg-bg-secondary py-(--section-py)"
    >
      <Container>
        <Reveal>
          <header className="mb-20 max-w-2xl md:mb-28">
            <SectionHeading id="specialties-heading" accent>
              {copy.specialties.heading}
            </SectionHeading>
            <p className="mt-8 font-sans text-lg font-light leading-relaxed text-text-primary md:mt-10">
              {copy.specialties.subheading}
            </p>
          </header>
        </Reveal>
        <ul role="list">
          {specialties.map((specialty, index) => (
            <li key={specialty.id}>
              <Reveal delayMs={Math.min(index * 70, 280)}>
                <SpecialtyRow specialty={specialty} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
