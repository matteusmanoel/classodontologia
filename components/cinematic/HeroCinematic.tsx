"use client";

/**
 * Hero cinematic island.
 *
 * Tooth scrub (desktop) + scroll-choreographed copy:
 *   1) Wordmark enters, then rises out
 *   2) Giant extruded “3” spins in 3D + “décadas” below
 *   3) Copy lines occupy the slot one at a time (no overlap); last line leaves
 *   4) Pin washes dark → paper as the tooth dissolves into Manifesto
 *
 * Pinning is CSS sticky at 100dvh inside a tall scroll shell.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ToothScrubber } from "@/components/cinematic/ToothScrubber";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DECADE_DEPTH_LAYERS = 18;
const DECADE_LAYER_GAP_PX = 2.4;

export interface HeroCinematicProps {
  heading: string;
  tagline: string;
  decadeNumeral: string;
  decadeLabel: string;
  scrollLines: readonly string[];
  /** Server-authored `<h1>` from HeroSection. Falls back to `heading`. */
  children?: ReactNode;
}

export function HeroCinematic({
  heading,
  tagline,
  decadeNumeral,
  decadeLabel,
  scrollLines,
  children,
}: HeroCinematicProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const decadeRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    const frame = requestAnimationFrame(() => setReady(true));
    return () => {
      media.removeEventListener("change", sync);
      cancelAnimationFrame(frame);
    };
  }, []);

  useGSAP(
    () => {
      const shell = shellRef.current;
      const wordmark = wordmarkRef.current;
      const decade = decadeRef.current;
      const numeral = numeralRef.current;
      if (!shell || !wordmark || !decade || !numeral || reducedMotion) {
        return;
      }

      const lines = linesRef.current.filter(Boolean) as HTMLParagraphElement[];

      const pin = shell.querySelector(".hero-cinematic-pin");
      const tooth = shell.querySelector(".tooth-scrubber");
      const scrim = shell.querySelector(".hero-cinematic-scrim");

      gsap.set(wordmark, { autoAlpha: 1, y: 0 });
      gsap.set(decade, { autoAlpha: 0, y: 80 });
      gsap.set(numeral, {
        rotateY: -110,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
      });
      gsap.set(lines, { autoAlpha: 0, y: 56 });
      if (pin) {
        gsap.set(pin, { backgroundColor: "#080808" });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      tl.addLabel("wordmarkHold", 0);
      tl.to(wordmark, { y: 0, autoAlpha: 1, duration: 0.16 }, "wordmarkHold");
      tl.to(
        wordmark,
        { y: "-42vh", autoAlpha: 0, duration: 0.24, ease: "power1.in" },
        "wordmarkHold+=0.16",
      );

      tl.addLabel("decade", ">");
      tl.fromTo(
        decade,
        { y: 90, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.22, ease: "power2.out" },
        "decade",
      );
      tl.fromTo(
        numeral,
        { rotateY: -120, scale: 0.72 },
        { rotateY: 360, scale: 1, duration: 0.42, ease: "power2.out" },
        "decade",
      );
      tl.to(
        decade,
        { y: "-38vh", autoAlpha: 0, duration: 0.2, ease: "power1.in" },
        "decade+=0.5",
      );

      const enterDur = 0.12;
      const holdDur = 0.16;
      const exitDur = 0.12;
      const gapDur = 0.1;

      lines.forEach((line, index) => {
        const label = `line${index}`;
        tl.addLabel(label, index === 0 ? ">" : `+=${gapDur}`);
        tl.fromTo(
          line,
          { y: 64, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: enterDur, ease: "power2.out" },
          label,
        );
        tl.to(
          line,
          { y: -56, autoAlpha: 0, duration: exitDur, ease: "power1.in" },
          `${label}+=${enterDur + holdDur}`,
        );
      });

      tl.to({}, { duration: 0.08 });

      tl.addLabel("wash", ">");
      if (tooth) {
        tl.to(
          tooth,
          { autoAlpha: 0, duration: 0.38, ease: "power1.in" },
          "wash",
        );
      }
      if (scrim) {
        tl.to(scrim, { autoAlpha: 0, duration: 0.28, ease: "none" }, "wash");
      }
      if (pin) {
        tl.to(
          pin,
          {
            backgroundColor: "#f3efe6",
            duration: 0.42,
            ease: "power1.inOut",
          },
          "wash",
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [scrollLines, reducedMotion] },
  );

  return (
    <div ref={shellRef} className="hero-cinematic relative">
      <div className="hero-cinematic-pin sticky top-0 flex h-dvh flex-col items-stretch justify-center overflow-hidden">
        <ToothScrubber triggerRef={shellRef} />
        <div className="hero-cinematic-scrim pointer-events-none absolute inset-0" />

        <div
          className={[
            "hero-identity relative z-(--z-content) mx-auto flex w-full max-w-[1280px] justify-start px-(--section-px)",
            ready ? "is-ready" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="hero-identity-copy relative min-h-[16rem] w-full md:min-h-[22rem]">
            <p className="sr-only">{tagline}</p>

            {reducedMotion ? (
              <div className="flex flex-col gap-8">
                <div>
                  {children ?? (
                    <h1 className="font-sans text-hero font-light tracking-label text-gold uppercase">
                      {heading}
                    </h1>
                  )}
                </div>
                <p className="max-w-lg font-sans text-lg font-light leading-relaxed text-text-primary">
                  {tagline}
                </p>
              </div>
            ) : (
              <>
                <div ref={wordmarkRef} className="hero-beat hero-beat-wordmark">
                  {children ?? (
                    <h1 className="font-sans text-hero font-light tracking-label text-gold uppercase">
                      {heading}
                    </h1>
                  )}
                </div>

                <div
                  ref={decadeRef}
                  className="hero-beat hero-beat-decade absolute inset-x-0 top-0"
                  aria-hidden="true"
                >
                  <span ref={numeralRef} className="hero-decade-numeral">
                    <span className="hero-decade-numeral-stack">
                      {Array.from({ length: DECADE_DEPTH_LAYERS }, (_, i) => (
                        <span
                          key={i}
                          className="hero-decade-numeral-layer"
                          style={{
                            transform: `translateZ(${-(i + 1) * DECADE_LAYER_GAP_PX}px)`,
                          }}
                        >
                          {decadeNumeral}
                        </span>
                      ))}
                    </span>
                    <span className="hero-decade-numeral-face">
                      {decadeNumeral}
                    </span>
                  </span>
                  <span className="hero-decade-label">{decadeLabel}</span>
                </div>

                <div className="hero-beat-lines absolute inset-x-0 top-0 flex flex-col justify-center">
                  {scrollLines.map((line, index) => (
                    <p
                      key={line}
                      ref={(node) => {
                        linesRef.current[index] = node;
                      }}
                      className="hero-beat hero-scroll-line absolute inset-x-0 top-0 font-sans text-xl font-light leading-snug text-text-primary md:text-3xl md:leading-tight"
                      aria-hidden="true"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
