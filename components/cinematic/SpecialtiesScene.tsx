"use client";

/**
 * SpecialtiesScene — sticky full-bleed stage on the dark field.
 *
 * Desktop + motion: images fill the viewport (subject on the right);
 * copy sits on a left scrim. Mobile / reduced-motion: stacked editorial list.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { StorySpine } from "@/components/brand/StorySpine";
import { MediaWell } from "@/components/ui/MediaWell";
import type { Specialty } from "@/content/specialties";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SpecialtiesSceneProps {
  specialties: Specialty[];
}

function SpecialtiesMobileList({
  specialties,
}: {
  specialties: Specialty[];
}) {
  return (
    <ul role="list" className="flex flex-col gap-16 pb-(--section-py) md:gap-24">
      {specialties.map((specialty, index) => {
        const n = String(index + 1).padStart(2, "0");
        return (
          <li key={specialty.id}>
            <article className="flex flex-col gap-6">
              <div className="px-(--section-px)">
                <span className="font-mono text-xs tracking-label text-gold uppercase">
                  {n}&nbsp;/&nbsp;08
                </span>
                <h3 className="mt-3 font-display text-2xl tracking-display text-text-primary md:text-3xl">
                  {specialty.name}
                </h3>
                <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-text-secondary">
                  {specialty.sceneCopy}
                </p>
              </div>
              {specialty.imageSrc ? (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={specialty.imageSrc}
                    alt={specialty.imageAlt ?? specialty.name}
                    fill
                    sizes="100vw"
                    className="object-cover object-[70%_center]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <MediaWell
                  assetId={specialty.assetId}
                  aspectRatio="16/9"
                  surface="dark"
                  className="w-full"
                />
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}

function SpecialtiesDesktopScene({
  specialties,
}: {
  specialties: Specialty[];
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const STATES = specialties.length;

  useGSAP(
    () => {
      const shell = shellRef.current;
      if (!shell) return;

      const stateStart = 0.08;
      const stateEnd = 0.88;
      const stateRange = stateEnd - stateStart;
      const stateWidth = stateRange / STATES;
      let lastIndex = -1;

      const st = ScrollTrigger.create({
        trigger: shell,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
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

          const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
          const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
          gsap.killTweensOf(images);
          gsap.killTweensOf(texts);

          images.forEach((el, i) => {
            if (i === idx) {
              gsap.to(el, { opacity: 1, scale: 1.02, duration: 0.8, ease: "power2.out", overwrite: true });
            } else {
              gsap.to(el, { opacity: 0, scale: 1, duration: 0.45, ease: "power1.in", overwrite: true });
            }
          });

          texts.forEach((el, i) => {
            if (i === idx) {
              gsap.fromTo(
                el,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.55, delay: 0.12, ease: "power2.out", overwrite: true },
              );
            } else {
              gsap.set(el, { opacity: 0, y: -10 });
            }
          });

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
    <div ref={shellRef} className="specialties-stage-shell">
      <div className="specialties-stage sticky top-0 h-dvh overflow-hidden">
        {specialties.map((specialty, index) => (
          <div
            key={specialty.id}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="specialties-stage-image absolute inset-0 overflow-hidden"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            {specialty.imageSrc ? (
              <Image
                src={specialty.imageSrc}
                alt={specialty.imageAlt ?? specialty.name}
                fill
                sizes="100vw"
                className="object-cover object-[78%_center]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <MediaWell
                assetId={specialty.assetId}
                aspectRatio="16/9"
                surface="dark"
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        ))}

        <div className="specialties-stage-scrim" aria-hidden="true" />
        <StorySpine tone="dark" columns={2} />

        <div className="specialties-stage-copy">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm tracking-[0.22em] text-gold tabular-nums">
              {n}
            </span>
            <span className="font-mono text-xs tracking-[0.22em] text-text-secondary">
              / 08
            </span>
          </div>

          <div className="relative mt-8 min-h-[11rem]">
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
                <h3 className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.05] tracking-display text-text-primary">
                  {specialty.name}
                </h3>
                <p className="mt-6 max-w-md font-sans text-lg font-light leading-relaxed text-text-secondary md:text-xl">
                  {specialty.sceneCopy}
                </p>
              </div>
            ))}
          </div>
        </div>

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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [isDesktopMotion]);

  return isDesktopMotion ? (
    <SpecialtiesDesktopScene specialties={specialties} />
  ) : (
    <SpecialtiesMobileList specialties={specialties} />
  );
}
