import type { ReactNode } from "react";

export interface SectionHeadingProps {
  children: ReactNode;
  id?: string;
  /** Decorative gold rule above the heading. */
  accent?: boolean;
  className?: string;
}

export function SectionHeading({
  children,
  id,
  accent = false,
  className,
}: SectionHeadingProps) {
  const classes = [
    "font-display text-2xl tracking-display text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <h2 id={id} className={classes}>
      {accent ? (
        <span
          className="mb-4 block h-px w-12 bg-gold"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </h2>
  );
}
