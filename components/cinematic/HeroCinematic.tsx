"use client";

/**
 * Hero cinematic island.
 *
 * Tooth scrub (desktop) + idle identity + scroll-choreographed copy:
 *   1) Lockup + typed slogan hold, then rise out
 *   2) Giant extruded “3” spins in 3D + “décadas” + 1998 subtitle
 *   3) Copy lines occupy the slot one at a time; last line leaves
 *   4) Pin washes dark → paper as the tooth dissolves into Manifesto
 *
 * Pinning is CSS sticky at 100dvh inside a tall scroll shell.
 * ToothScrubber scrub behavior is PRESERVED.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ToothScrubber } from "@/components/cinematic/ToothScrubber";
import { StorySpine } from "@/components/brand/StorySpine";
import { INTRO_COMPLETE_EVENT } from "@/components/cinematic/IntroLoader";
import { HERO_BEATS } from "@/lib/heroMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DECADE_DEPTH_LAYERS = 18;
const DECADE_LAYER_GAP_PX = 2.4;

export interface HeroCinematicProps {
  heading: string;
  tagline: string;
  slogan: string;
  scrollCue: string;
  decadeNumeral: string;
  decadeLabel: string;
  decadeSubtitle: string;
  scrollLines: readonly string[];
  /** Server-authored `<h1>` from HeroSection. Falls back to `heading`. */
  children?: ReactNode;
}

export function HeroCinematic({
  heading,
  tagline,
  slogan,
  scrollCue,
  decadeNumeral,
  decadeLabel,
  decadeSubtitle,
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
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    const frame = requestAnimationFrame(() => setReady(true));

    const onIntroDone = () => setIntroDone(true);
    window.addEventListener(INTRO_COMPLETE_EVENT, onIntroDone);
    const immediate = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("intro-pending")) {
        onIntroDone();
      }
    }, 0);
    const fallback = window.setTimeout(onIntroDone, 4500);

    return () => {
      media.removeEventListener("change", sync);
      cancelAnimationFrame(frame);
      window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroDone);
      window.clearTimeout(immediate);
      window.clearTimeout(fallback);
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
      const cue = shell.querySelector(".hero-scroll-cue");

      gsap.set(wordmark, { autoAlpha: 1, y: 0 });
      gsap.set(decade, { autoAlpha: 0, y: 80 });
      gsap.set(numeral, {
        rotateY: -110,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
      });
      gsap.set(lines, { autoAlpha: 0, y: 56 });
      if (cue) {
        gsap.set(cue, { autoAlpha: 1 });
      }
      if (tooth) {
        gsap.set(tooth, { autoAlpha: 1 });
      }
      if (scrim) {
        gsap.set(scrim, { autoAlpha: 1 });
      }
      if (pin) {
        gsap.set(pin, { backgroundColor: "#080808" });
      }

      const letters = wordmark.querySelectorAll<HTMLElement>(
        ".lockup-class-letter, .lockup-odonto-letter",
      );
      const seals = wordmark.querySelectorAll<HTMLElement>(".lockup-seal");
      const marks = wordmark.querySelectorAll<HTMLElement>(
        ".lockup-swirl, .lockup-registered, .lockup-line",
      );

      const resetPiecesToRest = () => {
        gsap.set([...marks, ...seals, ...letters], { x: 0, y: 0, rotate: 0, scale: 1 });
        gsap.set(marks, { autoAlpha: 1 });
        gsap.set(seals, { autoAlpha: 1 });
        gsap.set(letters, { autoAlpha: 0 });
      };

      const resetHeroOrigin = () => {
        gsap.set(wordmark, { autoAlpha: 1, y: 0 });
        if (cue) {
          gsap.set(cue, { autoAlpha: 1 });
        }
        gsap.set(decade, { autoAlpha: 0, y: 80 });
        gsap.set(shell.querySelectorAll(".hero-scroll-line"), { autoAlpha: 0, y: 56 });
        if (tooth) {
          gsap.set(tooth, { autoAlpha: 1 });
        }
        if (scrim) {
          gsap.set(scrim, { autoAlpha: 1 });
        }
        if (pin) {
          gsap.set(pin, { backgroundColor: "#080808" });
        }
      };

      const snapHeroHome = (self: ScrollTrigger) => {
        if (self.progress !== 0) {
          self.animation?.progress(0);
        }
        const lockup = wordmark.querySelector<HTMLElement>("[data-lockup]");
        if (lockup?.dataset.lockup === "settled") {
          resetPiecesToRest();
        }
        resetHeroOrigin();
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          // Later pins refresh while this timeline is parked at the paper wash.
          // Re-recording `to()` starting values from those inline styles would
          // hide the tooth even after scrolling back to the top.
          invalidateOnRefresh: false,
          fastScrollEnd: true,
          onRefresh: (self) => {
            if (window.scrollY <= 2) {
              snapHeroHome(self);
            }
          },
          onEnterBack: (self) => {
            if (window.scrollY <= 2 || self.progress === 0) {
              snapHeroHome(self);
            }
          },
          onUpdate: (self) => {
            if (window.scrollY <= 2) {
              snapHeroHome(self);
            }
          },
        },
      });

      tl.addLabel("wordmarkHold", 0);
      tl.to(
        wordmark,
        { y: 0, autoAlpha: 1, duration: HERO_BEATS.wordmarkHold },
        "wordmarkHold",
      );
      if (cue) {
        tl.to(cue, { autoAlpha: 0, duration: 0.12 }, "wordmarkHold+=0.08");
      }
      if (seals.length && letters.length) {
        tl.to(seals, { autoAlpha: 0, duration: 0.08 }, "wordmarkHold+=0.16");
        tl.to(letters, { autoAlpha: 1, duration: 0.08 }, "wordmarkHold+=0.16");
        tl.to(
          letters,
          {
            x: (_i, target) => Number((target as HTMLElement).dataset.exitX),
            y: (_i, target) => Number((target as HTMLElement).dataset.exitY) - 24,
            rotate: (_i, target) => Number((target as HTMLElement).dataset.exitR),
            autoAlpha: 0,
            duration: 0.22,
            stagger: 0.01,
            ease: "power1.in",
          },
          `wordmarkHold+=${HERO_BEATS.wordmarkHold}`,
        );
      }
      if (marks.length) {
        tl.to(
          marks,
          {
            x: (_i, target) => Number((target as HTMLElement).dataset.exitX),
            y: (_i, target) => Number((target as HTMLElement).dataset.exitY),
            rotate: (_i, target) => Number((target as HTMLElement).dataset.exitR),
            scale: (_i, target) => Number((target as HTMLElement).dataset.exitS || 1),
            autoAlpha: 0,
            duration: 0.22,
            ease: "power1.in",
          },
          `wordmarkHold+=${HERO_BEATS.wordmarkHold}`,
        );
      }
      tl.to(
        wordmark,
        { y: "-28vh", autoAlpha: 0, duration: HERO_BEATS.wordmarkExit, ease: "power1.in" },
        `wordmarkHold+=${HERO_BEATS.wordmarkHold}`,
      );

      tl.addLabel("decade", ">");
      tl.fromTo(
        decade,
        { y: 90, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: HERO_BEATS.decadeEnter, ease: "power2.out" },
        "decade",
      );
      tl.fromTo(
        numeral,
        { rotateY: -120, scale: 0.72 },
        { rotateY: 360, scale: 1, duration: HERO_BEATS.decadeSpin, ease: "power2.out" },
        "decade",
      );
      tl.to(
        decade,
        { y: "-38vh", autoAlpha: 0, duration: HERO_BEATS.decadeExit, ease: "power1.in" },
        `decade+=${HERO_BEATS.decadeExitAt}`,
      );

      const enterDur = HERO_BEATS.lineEnter;
      const holdDur = HERO_BEATS.lineHold;
      const exitDur = HERO_BEATS.lineExit;
      const gapDur = HERO_BEATS.lineGap;

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

      tl.to({}, { duration: HERO_BEATS.afterLines });

      tl.addLabel("wash", ">");
      if (tooth) {
        tl.fromTo(
          tooth,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.38, ease: "power1.in", immediateRender: false },
          "wash",
        );
      }
      if (scrim) {
        tl.fromTo(
          scrim,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.28, ease: "none", immediateRender: false },
          "wash",
        );
      }
      if (pin) {
        tl.fromTo(
          pin,
          { backgroundColor: "#080808" },
          {
            backgroundColor: "#f3efe6",
            duration: HERO_BEATS.wash,
            ease: "power1.inOut",
            immediateRender: false,
          },
          "wash",
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [scrollLines, reducedMotion, introDone] },
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
              <div className="flex flex-col items-start gap-8">
                <div className="hero-beat-wordmark">
                  {children ?? (
                    <h1 className="font-sans text-hero font-light tracking-label text-gold uppercase">
                      {heading}
                    </h1>
                  )}
                  <p className="hero-slogan">{slogan}</p>
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
                  <p className="hero-slogan" aria-hidden="true">
                    {slogan}
                  </p>
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
                  <span className="hero-decade-subtitle">{decadeSubtitle}</span>
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

        <StorySpine tone="dark" columns={2} join="bottom" className="hero-story-spine" />

        {!reducedMotion && introDone ? (
          <div className="hero-scroll-cue" aria-hidden="true">
            <span className="hero-scroll-cue-label">{scrollCue}</span>
            <span className="hero-scroll-chevrons">
              <svg viewBox="0 0 24 24" className="hero-scroll-chevron" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg viewBox="0 0 24 24" className="hero-scroll-chevron" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
