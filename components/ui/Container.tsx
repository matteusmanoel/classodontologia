import type { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  const classes = ["max-w-[1280px] mx-auto px-[--section-px]", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
