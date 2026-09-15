"use client";

/**
 * Pinned palette wash between paper and dark fields.
 *
 * Pins the wash itself (ScrollTrigger pinSpacing) so the color change
 * fills the viewport for a measurable scroll distance in both directions.
 * Reduced motion: a static color band, no pin.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { StorySpine } from "@/components/brand/StorySpine";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PaletteWashProps {
  from: string;
  to: string;
  ariaHiddenLabel?: string;
  children?: ReactNode;
  /** Distinct easing so washes don't feel identical. Prefer symmetric eases. */
  ease?: string;
  /**
   * Extra viewport-heights of pinned time after the wash fills the screen.
   * Higher = more time to read the color change (and to reverse it).
   */
  hold?: number;
}

export function PaletteWash({
  from,
  to,
  ariaHiddenLabel,
  children,
  ease = "sine.inOut",
  hold = 1.1,
}: PaletteWashProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const pin = pinRef.current;
      if (!pin || reducedMotion) {
        return;
      }

      const year = pin.querySelector<HTMLElement>(".palette-wash-year");
      const isEnter = Boolean(year?.classList.contains("palette-wash-year--enter"));
      const isExit = Boolean(year?.classList.contains("palette-wash-year--exit"));

      const tl = gsap.timeline({
        defaults: { ease },
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * hold)}`,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        pin,
        { backgroundColor: from },
        { backgroundColor: to, duration: 1, ease },
        0,
      );

      if (year && isEnter) {
        tl.fromTo(
          year,
          { autoAlpha: 0, y: 64, scale: 0.94 },
          { autoAlpha: 0.36, y: 0, scale: 1, duration: 1, ease: "power2.inOut" },
          0,
        );
      } else if (year && isExit) {
        tl.fromTo(
          year,
          { autoAlpha: 0.16, scale: 1, filter: "blur(0px)" },
          {
            autoAlpha: 0.4,
            scale: 1.4,
            filter: "blur(8px)",
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [from, to, ease, hold, reducedMotion], scope: pinRef },
  );

  if (reducedMotion) {
    return (
      <div
        className="palette-wash-static relative overflow-hidden"
        style={{ backgroundColor: to }}
        aria-hidden="true"
      >
        <StorySpine tone="dark" columns={2} join="cross" />
      </div>
    );
  }

  return (
    <div
      ref={pinRef}
      className="palette-wash-pin"
      style={{ backgroundColor: from }}
      aria-hidden="true"
    >
      <StorySpine tone="dark" columns={2} join="cross" />
      {children}
      {ariaHiddenLabel ? (
        <span className="sr-only">{ariaHiddenLabel}</span>
      ) : null}
    </div>
  );
}
