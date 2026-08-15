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
    "specialist-card flex h-full w-full flex-col items-center border-t border-gold/30 pt-8 text-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      {photo ? (
        <div className="relative mb-8 aspect-[3/4] w-full overflow-hidden bg-bg-surface">
          <Image
            src={photo}
            alt={`Foto de ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-8" aria-hidden="true">
          <div className="specialist-monogram">
            <span className="specialist-monogram-initials">
              {initialsFromName(name)}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-3">
        <p className="font-sans text-sm tracking-label uppercase text-gold">
          {specialty}
        </p>
        <h3 className="font-display text-xl tracking-display text-text-primary md:text-2xl">
          {name}
        </h3>
        <p className="font-sans text-sm font-light text-text-secondary">
          {title}
        </p>
        <p className="mt-2 max-w-md font-sans text-base font-light leading-relaxed text-text-secondary">
          {bio}
        </p>
      </div>
    </article>
  );
}
