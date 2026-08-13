import Image from "next/image";

export interface SpecialistCardProps {
  name: string;
  title: string;
  specialty: string;
  photo: string;
  bio: string;
  className?: string;
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
    "flex flex-col overflow-hidden rounded-md border border-border bg-bg-surface",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="relative aspect-square overflow-hidden bg-bg-secondary">
        <Image
          src={photo}
          alt={`Foto de ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-sans text-lg font-medium text-text-primary">
          {name}
        </h3>
        <p className="font-sans text-sm tracking-label uppercase text-gold">
          {specialty}
        </p>
        <p className="font-sans text-sm text-text-primary">{title}</p>
        <p className="mt-2 font-sans text-base text-text-primary">{bio}</p>
      </div>
    </article>
  );
}
