"use client";

/**
 * Hero cinematic island.
 *
 * ToothScrubber (scroll-scrubbed) + CLASS wordmark.
 * Golden identity video is deferred — background mismatch with the tooth
 * field. Pinning is CSS sticky at 100dvh inside a 300vh scroll shell.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ToothScrubber } from "@/components/cinematic/ToothScrubber";

export interface HeroCinematicProps {
  heading: string;
  tagline: string;
  /** Server-authored `<h1>` from HeroSection. Falls back to `heading`. */
  children?: ReactNode;
}

export function HeroCinematic({
  heading,
  tagline,
  children,
}: HeroCinematicProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={shellRef} className="hero-cinematic relative">
      <div className="hero-cinematic-pin sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden">
        <ToothScrubber triggerRef={shellRef} />
        <div className="hero-cinematic-scrim pointer-events-none absolute inset-0" />
        <div
          className={[
            "hero-identity relative z-[--z-content] flex w-full max-w-[1280px] flex-col items-center px-[--section-px] text-center md:items-start md:text-left",
            ready ? "is-ready" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children ?? (
            <h1 className="font-sans text-hero font-light tracking-label text-gold uppercase">
              {heading}
            </h1>
          )}
          <p className="hero-tagline mt-8 max-w-xl font-sans text-base font-light text-text-primary md:text-lg">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
