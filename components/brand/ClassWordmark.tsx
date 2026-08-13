/**
 * Brand wordmark — CLASS (Montserrat Light, custom A) + Odontologia.
 * Passed as server-authored children into the Hero cinematic island.
 */

export interface ClassWordmarkProps {
  className?: string;
}

export function ClassWordmark({ className }: ClassWordmarkProps) {
  const classes = ["wordmark", className].filter(Boolean).join(" ");

  return (
    <h1 className={classes}>
      <span className="sr-only">Class Odontologia</span>
      <span className="wordmark-visual" aria-hidden="true">
        <span className="wordmark-class">
          CL
          <span className="wordmark-a">A</span>
          SS
        </span>
        <span className="wordmark-sub">Odontologia</span>
      </span>
    </h1>
  );
}
