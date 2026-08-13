"use client";

/**
 * Level 2 motion (DESIGN_SYSTEM.md): CSS keyframes + IntersectionObserver.
 * Plays once on entry. Reduced-motion skips animation.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ["reveal", className].filter(Boolean).join(" ");
  const style = {
    "--reveal-delay": `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
