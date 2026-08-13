"use client";

/**
 * Hero cinematic island.
 *
 * ToothScrubber (scroll-scrubbed, watermark cropped to the right) +
 * GoldenLogo (emerge once, no loop, blended into the field) + narrative.
 * Pinning is CSS sticky at 100dvh inside a 300vh scroll shell.
 */

import { useRef, type ReactNode } from "react";
import { GoldenLogo } from "@/components/cinematic/GoldenLogo";
import { ToothScrubber } from "@/components/cinematic/ToothScrubber";
import { Container } from "@/components/ui/Container";

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

  return (
    <div ref={shellRef} className="hero-cinematic relative">
      <div className="hero-cinematic-pin sticky top-0 flex h-dvh flex-col justify-end overflow-hidden">
        <ToothScrubber triggerRef={shellRef} />
        <div className="hero-cinematic-scrim pointer-events-none absolute inset-0" />
        <Container className="relative z-[--z-content] pb-[--section-py] pt-24">
          <GoldenLogo className="mx-auto mb-8 w-full max-w-xl md:max-w-2xl" />
          <div className="max-w-3xl">
            {children ?? (
              <h1 className="font-display text-hero tracking-display text-balance text-text-primary">
                {heading}
              </h1>
            )}
            <p className="mt-6 max-w-2xl font-sans text-lg text-text-primary">
              {tagline}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
