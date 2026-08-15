/**
 * Brand wordmark — Mark centered above CLASS; ODONTOLOGIA as a mono signature.
 */

export interface ClassWordmarkProps {
  className?: string;
}

const MARK_SRC = "/assets/cinematic/logo/logo_class_simples.svg";

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
          width={1261}
          height={745}
          className="wordmark-mark"
        />
        <span className="wordmark-class">
          CL
          <span className="wordmark-lambda">Λ</span>
          SS
        </span>
        <span className="wordmark-sub">ODONTOLOGIA</span>
      </span>
    </h1>
  );
}
