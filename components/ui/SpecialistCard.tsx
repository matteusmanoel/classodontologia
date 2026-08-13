import Image from "next/image";

export interface SpecialistCardProps {
  name: string;
  title: string;
  specialty: string;
  photo?: string;
  bio: string;
  className?: string;
}

function initialsFromName(name: string): string {
  return name
    .replace(/^(Dr\.|Dra\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function SpecialistCard({
  name,
  title,
  specialty,
  photo,
  bio,
  className,
}: SpecialistCardProps) {
  const classes = [
    "specialist-card flex h-full flex-col border-t border-gold/30 pt-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      {photo ? (
        <div className="relative mb-8 aspect-[3/4] overflow-hidden bg-bg-surface">
          <Image
            src={photo}
            alt={`Foto de ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="specialist-monogram mb-8 flex aspect-[3/4] items-end bg-bg-surface px-6 py-8"
          aria-hidden="true"
        >
          <span className="font-display text-3xl tracking-display text-gold">
            {initialsFromName(name)}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="font-sans text-sm tracking-label uppercase text-gold">
          {specialty}
        </p>
        <h3 className="font-display text-xl tracking-display text-text-primary md:text-2xl">
          {name}
        </h3>
        <p className="font-sans text-sm font-light text-text-primary">
          {title}
        </p>
        <p className="mt-2 font-sans text-base font-light leading-relaxed text-text-primary">
          {bio}
        </p>
      </div>
    </article>
  );
}
