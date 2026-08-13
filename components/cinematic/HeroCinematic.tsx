"use client";

/**
 * Hero cinematic island — ISSUE-011 placeholder composition (STOP-06).
 *
 * Composes GoldenLogo + narrative text layer. ToothScrubber is omitted:
 * ISSUE-010 is blocked because the only tooth source has a visible Vidu
 * watermark. Do not import, crop, blur, cover, or disguise that file.
 *
 * Pinning direction is CSS sticky at 100dvh — not a 300vh scrubber shell.
 * No GSAP (Foundation owns package.json; scrubber JS belongs to ISSUE-010).
 * GoldenLogo already handles prefers-reduced-motion; text stays readable
 * without cinematic JavaScript (ADR-007 Pattern A, ADR-001 no runtime 3D).
 */

import type { ReactNode } from "react";
import { GoldenLogo } from "@/components/cinematic/GoldenLogo";
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
  return (
    <div className="hero-cinematic relative min-h-dvh">
      <div className="sticky top-0 flex min-h-dvh flex-col justify-center overflow-hidden py-[--section-py]">
        <Container>
          <GoldenLogo className="mx-auto w-full max-w-3xl" />
          <div className="relative z-[--z-content] mt-10">
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
