/**
 * Brand wordmark — official gold lockup for the Hero.
 */

export interface ClassWordmarkProps {
  className?: string;
}

const MARK_SRC = "/assets/brand/logo-class-hero.webp";

export function ClassWordmark({ className }: ClassWordmarkProps) {
  const classes = ["wordmark", className].filter(Boolean).join(" ");

  return (
    <h1 className={classes}>
      <span className="sr-only">Class Odontologia</span>
      <span className="wordmark-visual" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MARK_SRC}
          alt=""
          width={1672}
          height={941}
          className="wordmark-mark"
        />
      </span>
    </h1>
  );
}
