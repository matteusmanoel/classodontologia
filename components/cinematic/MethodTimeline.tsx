"use client";

/**
 * Method timeline — sticky scrolltelling of how instruments evolved.
 * Desktop + motion: one pinned stage, beats crossfade on scrub.
 * Mobile / reduced-motion: stacked editorial list on a gold rail.
 * Plates accept real images later; SVG construction stands in until then.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { copy } from "@/content/copy";
import {
  methodBeats,
  type MethodBeat,
  type MethodMotif,
} from "@/content/method";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BEATS = methodBeats.length;

function MethodMotifMark({ kind }: { kind: MethodMotif }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.15,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      className="method-motif"
      viewBox="0 0 160 100"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "face" ? (
        <>
          <ellipse cx="80" cy="52" rx="28" ry="36" {...common} />
          <path d="M 80 16 V 88" {...common} />
          <path d="M 52 52 H 108" {...common} />
        </>
      ) : null}
      {kind === "scan" ? (
        <>
          <path d="M 36 62 C 48 86, 112 86, 124 62" {...common} />
          <path d="M 48 58 C 58 74, 102 74, 112 58" {...common} />
          <path d="M 28 38 H 132" {...common} />
          <circle cx="44" cy="38" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="80" cy="38" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="116" cy="38" r="2.2" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {kind === "volume" ? (
        <>
          <rect x="38" y="28" width="52" height="44" {...common} />
          <path d="M 90 28 L 122 16 L 122 60 L 90 72 Z" {...common} />
          <path d="M 38 28 L 70 16 L 122 16" {...common} />
        </>
      ) : null}
      {kind === "form" ? (
        <>
          <path d="M 40 72 C 48 40, 72 28, 80 28 C 88 28, 112 40, 120 72" {...common} />
          <path d="M 52 72 C 60 52, 74 46, 80 46 C 86 46, 100 52, 108 72" {...common} />
          <path d="M 34 78 H 126" {...common} />
        </>
      ) : null}
      {kind === "proof" ? (
        <>
          <rect x="34" y="22" width="92" height="56" {...common} />
          <path d="M 48 64 C 64 48, 78 44, 92 50 C 104 56, 112 54, 118 46" {...common} />
          <path d="M 34 22 L 126 78" {...common} opacity={0.45} />
        </>
      ) : null}
    </svg>
  );
}

function MethodPlate({ beat, priority = false }: { beat: MethodBeat; priority?: boolean }) {
  return (
    <figure className="method-plate">
      <StoryLine kind="crop-tl" tone="dark" className="method-plate-crop method-plate-crop--tl" />
      <StoryLine kind="crop-tr" tone="dark" className="method-plate-crop method-plate-crop--tr" />
      <StoryLine kind="crop-bl" tone="dark" className="method-plate-crop method-plate-crop--bl" />
      <StoryLine kind="crop-br" tone="dark" className="method-plate-crop method-plate-crop--br" />
      <div className="method-plate-frame">
        {beat.imageSrc ? (
          <Image
            src={beat.imageSrc}
            alt={beat.imageAlt ?? ""}
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="method-plate-image object-cover"
            priority={priority}
          />
        ) : (
          <div className="method-plate-placeholder">
            <MethodMotifMark kind={beat.motif} />
            <span className="method-plate-id">{beat.assetId}</span>
            <span className="method-plate-pending">{copy.method.placeholderCaption}</span>
          </div>
        )}
        <svg
          className="method-plate-grid"
          viewBox="0 0 160 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M 53.3 0 V 100" />
          <path d="M 106.7 0 V 100" />
          <path d="M 0 33.3 H 160" />
          <path d="M 0 66.7 H 160" />
        </svg>
      </div>
    </figure>
  );
}

function BeatCopy({ beat, index }: { beat: MethodBeat; index: number }) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <>
      <p className="method-tl-kicker">
        <span className="method-tl-index">
          {n} / {String(BEATS).padStart(2, "0")}
        </span>
        <span className="method-tl-era">{beat.era}</span>
      </p>
      <h3 className="method-tl-title">{beat.title}</h3>
      <p className="method-tl-shift">
        <span className="method-tl-shift-col">
          <span className="method-tl-shift-label">{copy.method.fromLabel}</span>
          <span className="method-tl-from">{beat.from}</span>
        </span>
        <span className="method-tl-arrow" aria-hidden="true" />
        <span className="method-tl-shift-col">
          <span className="method-tl-shift-label">{copy.method.toLabel}</span>
          <span className="method-tl-to">{beat.to}</span>
        </span>
      </p>
      <p className="method-tl-body">{beat.body}</p>
    </>
  );
}

function MethodMobileList() {
  return (
    <ol className="method-tl-list">
      {methodBeats.map((beat, index) => (
        <li key={beat.id} className="method-tl-list-item">
          <span className="method-tl-list-dot" aria-hidden="true" />
          <article>
            <BeatCopy beat={beat} index={index} />
            <MethodPlate beat={beat} />
          </article>
        </li>
      ))}
    </ol>
  );
}

function MethodDesktopScene() {
  const shellRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const shell = shellRef.current;
      if (!shell) return;

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === shell) trigger.kill();
      });

      const stateStart = 0.06;
      const stateEnd = 0.9;
      const stateWidth = (stateEnd - stateStart) / BEATS;
      let lastIndex = -1;

      plateRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 });
      });
      copyRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
      });

      const st = ScrollTrigger.create({
        trigger: shell,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: false,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(progressRef.current, { scaleX: p });

          let idx = 0;
          if (p >= stateStart) {
            idx = Math.min(BEATS - 1, Math.floor((p - stateStart) / stateWidth));
          }
          if (idx === lastIndex) return;
          lastIndex = idx;

          const plates = plateRefs.current.filter(Boolean) as HTMLDivElement[];
          const texts = copyRefs.current.filter(Boolean) as HTMLDivElement[];
          gsap.killTweensOf(plates);
          gsap.killTweensOf(texts);

          plates.forEach((el, i) => {
            gsap.to(el, {
              autoAlpha: i === idx ? 1 : 0,
              zIndex: i === idx ? 2 : 1,
              duration: i === idx ? 0.55 : 0.35,
              ease: i === idx ? "power2.out" : "power1.in",
              overwrite: true,
            });
          });

          texts.forEach((el, i) => {
            if (i === idx) {
              gsap.fromTo(
                el,
                { autoAlpha: 0, y: 16 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: true,
                },
              );
            } else {
              gsap.set(el, { autoAlpha: 0, y: -8 });
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

  return (
    <div
      ref={shellRef}
      className="method-tl-shell"
      style={{ height: `${BEATS * 100}vh` }}
    >
      <div className="method-tl-stage">
        <StorySpine tone="dark" columns={2} />
        <div className="method-tl-layout">
          <div className="method-tl-copy">
            {methodBeats.map((beat, index) => (
              <div
                key={beat.id}
                ref={(node) => {
                  copyRefs.current[index] = node;
                }}
                className="method-tl-copy-panel"
                aria-hidden={index !== activeIndex}
              >
                <BeatCopy beat={beat} index={index} />
              </div>
            ))}
          </div>
          <div className="method-tl-media">
            {methodBeats.map((beat, index) => (
              <div
                key={beat.id}
                ref={(node) => {
                  plateRefs.current[index] = node;
                }}
                className="method-tl-plate-layer"
                aria-hidden={index !== activeIndex}
              >
                <MethodPlate beat={beat} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>
        <div className="method-tl-rail-track">
          <span ref={progressRef} className="method-tl-rail-progress" aria-hidden="true" />
          <ol className="method-tl-rail" aria-label={copy.method.timelineEyebrow}>
            {methodBeats.map((beat, index) => (
              <li
                key={beat.id}
                className={
                  index === activeIndex
                    ? "method-tl-node is-active"
                    : "method-tl-node"
                }
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="method-tl-node-dot" aria-hidden="true" />
                <span className="method-tl-node-label">{beat.era}</span>
              </li>
            ))}
          </ol>
        </div>
        <ul className="sr-only" aria-label={copy.method.timelineEyebrow}>
          {methodBeats.map((beat, index) => (
            <li
              key={beat.id}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {beat.from} → {beat.to}. {beat.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MethodTimeline() {
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setIsDesktopMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [isDesktopMotion]);

  return isDesktopMotion ? <MethodDesktopScene /> : <MethodMobileList />;
}
