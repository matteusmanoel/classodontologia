import Image from "next/image";

export interface SpecialistCardProps {
  name: string;
  /** Credential line. Empty string keeps the CRO row for grid alignment. */
  title?: string | null;
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
  const classes = ["specialist-card", className].filter(Boolean).join(" ");
  const cro = title?.trim() ?? "";

  return (
    <article className={classes}>
      {photo ? (
        <div className="specialist-photo">
          <Image
            src={photo}
            alt={`Foto de ${name}`}
            fill
            sizes="(max-width: 767px) 100vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="specialist-photo specialist-photo--fallback" aria-hidden="true">
          <div className="specialist-monogram">
            <span className="specialist-monogram-initials">
              {initialsFromName(name)}
            </span>
          </div>
        </div>
      )}
      <p className="specialist-specialty">{specialty}</p>
      <h3 className="specialist-name">{name}</h3>
      <p className="specialist-cro">{cro || "\u00a0"}</p>
      <p className="specialist-bio">{bio}</p>
    </article>
  );
}
