/**
 * Brand wordmark — official gold lockup for the Hero,
 * composed from the decomposed logo glyphs.
 */

import { DecomposedLockup } from "@/components/cinematic/DecomposedLockup";

export interface ClassWordmarkProps {
  className?: string;
}

export function ClassWordmark({ className }: ClassWordmarkProps) {
  const classes = ["wordmark", className].filter(Boolean).join(" ");

  return (
    <h1 className={classes}>
      <span className="sr-only">Class Odontologia</span>
      <span className="wordmark-visual" aria-hidden="true">
        <DecomposedLockup />
      </span>
    </h1>
  );
}
