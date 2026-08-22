"use client";

/**
 * SpecialtiesScene — Hero Moment 02 (ADR-011, Scene Contract §24).
 *
 * Desktop + motion: sticky scroll-driven multi-state composition (Phase C — WP-16).
 * Mobile / reduced-motion: editorial vertical sequence in document flow.
 *
 * This file is the sole writer of the sticky/motion layer.
 * Static path is always present and functional.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MediaWell } from "@/components/ui/MediaWell";
import type { Specialty } from "@/content/specialties";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SpecialtiesSceneProps {
  specialties: Specialty[];
}

/**
 * Mobile / reduced-motion: editorial vertical sequence.
 * Each specialty renders inline with index, title, microcopy, and media well.
 */
function SpecialtiesMobileList({
  specialties,
}: {
  specialties: Specialty[];
}) {
  return (
    <ul role="list" className="flex flex-col gap-20 md:gap-28">
      {specialties.map((specialty, index) => {
        const n = String(index + 1).padStart(2, "0");
        return (
          <li key={specialty.id}>
            <article className="flex flex-col gap-6">
              <span className="font-mono text-xs tracking-label text-gold-on-paper uppercase">
                {n}&nbsp;/&nbsp;08
              </span>
              <h3 className="font-display text-2xl tracking-display text-text-paper md:text-3xl">
                {specialty.name}
              </h3>
              <p className="font-sans text-base font-light leading-relaxed text-text-paper-muted max-w-sm">
                {specialty.sceneCopy}
              </p>
              {specialty.imageSrc ? (
                <div className="relative w-full max-w-xs overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={specialty.imageSrc}
                    alt={specialty.imageAlt ?? specialty.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                    style={{ objectPosition: specialty.imagePosition ?? "center" }}
                    loading="lazy"
                  />
                </div>
              ) : (
                <MediaWell
                  assetId={specialty.assetId}
                  aspectRatio="3/4"
                  surface="dark"
                  className="w-full max-w-xs"
                />
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Desktop sticky scene — scroll-driven state transitions (Phase C, ADR-011).
 * Activation: min-width 1024px AND prefers-reduced-motion: no-preference.
 */
function SpecialtiesDesktopScene({
  specialties,
}: {
  specialties: Specialty[];
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for GSAP — avoid setState per frame
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef<HTMLSpanElement>(null);

  const STATES = specialties.length; // 8

  useGSAP(
    () => {
      const shell = shellRef.current;
      if (!shell) return;

      // Progress map: 8 states across 0.08→0.88
      const stateStart = 0.08;
      const stateEnd = 0.88;
      const stateRange = stateEnd - stateStart;
      const stateWidth = stateRange / STATES; // ~0.10 per state

      let lastIndex = -1;

      const st = ScrollTrigger.create({
        trigger: shell,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          let idx = 0;
          if (p >= stateStart) {
            idx = Math.min(
              STATES - 1,
              Math.floor((p - stateStart) / stateWidth),
            );
          }
          if (idx === lastIndex) return;
          lastIndex = idx;

          // Swap image layers via opacity/scale (no setState per frame)
          imageRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === idx) {
              gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
            } else {
              gsap.to(el, { opacity: 0, scale: 0.985, duration: 0.35, ease: "power1.in" });
            }
          });

          // Swap text layers
          textRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === idx) {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
            } else {
              gsap.to(el, { opacity: 0, y: -14, duration: 0.3, ease: "power1.in" });
            }
          });

          // React state only for the index counter (infrequent, semantic)
          setActiveIndex(idx);
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: shellRef, dependencies: [] },
  );

  const n = String(activeIndex + 1).padStart(2, "0");

  return (
    <div ref={shellRef} className="hidden lg:block motion-safe:block" style={{ height: "460vh" }}>
      <div
        ref={stageRef}
        className="sticky top-0 h-dvh flex items-center overflow-hidden"
      >
        {/* Layout: text left ~38%, visual right ~55% */}
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[38%_1fr] items-center gap-12 px-(--section-px)">
          {/* Left: persistent metadata + changing text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-3">
              <span
                ref={indexRef}
                className="font-mono text-sm tracking-label text-gold-on-paper tabular-nums"
              >
                {n}
              </span>
              <span className="font-mono text-xs text-text-paper-muted tracking-label">
                / 08
              </span>
            </div>

            {/* Stacked text layers — only active is visible */}
            <div className="relative min-h-[12rem]">
              {specialties.map((specialty, index) => (
                <div
                  key={specialty.id}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    transform: index === 0 ? "none" : "translateY(-14px)",
                  }}
                  aria-hidden={index !== activeIndex}
                >
                  <h3 className="font-display text-3xl tracking-display text-text-paper leading-tight md:text-[clamp(2.5rem,4.5vw,3.75rem)]">
                    {specialty.name}
                  </h3>
                  <p className="mt-4 font-sans text-base font-light leading-relaxed text-text-paper-muted max-w-xs md:text-lg">
                    {specialty.sceneCopy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stacked image layers */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            {specialties.map((specialty, index) => (
              <div
                key={specialty.id}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                {specialty.imageSrc ? (
                  <Image
                    src={specialty.imageSrc}
                    alt={specialty.imageAlt ?? specialty.name}
                    fill
                    sizes="(min-width: 1024px) 55vw"
                    className="object-cover"
                    style={{ objectPosition: specialty.imagePosition ?? "center" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ) : (
                  <MediaWell
                    assetId={specialty.assetId}
                    aspectRatio="4/5"
                    surface="dark"
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Semantic list hidden visually but available to assistive tech */}
        <ul className="sr-only" aria-label="Especialidades">
          {specialties.map((s, i) => (
            <li key={s.id} aria-current={i === activeIndex ? "true" : undefined}>
              {s.name}: {s.sceneCopy}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SpecialtiesScene({ specialties }: SpecialtiesSceneProps) {
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setIsDesktopMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div>
      {isDesktopMotion ? (
        <SpecialtiesDesktopScene specialties={specialties} />
      ) : (
        <SpecialtiesMobileList specialties={specialties} />
      )}
    </div>
  );
}
