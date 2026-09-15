"use client";

/**
 * Manifesto cinematic — production of prototype variant E
 * (plotter marks + proportion grid + arc→horizon).
 *
 * Paper field. Load draws the construction plate; scroll completes the arc,
 * morphs it to a horizon, and lets the cage recede. The following PaletteWash
 * carries paper→dark. Reduced motion: static complete lines, no pin.
 */

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy } from "@/content/copy";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

const PAPER = "#f3efe6";
const GOLD = "#7a5e14";
const GOLD_LIGHT = "#c9a84c";
const LOAD_PROGRESS = 0.42;
const PIN_HOLD = 2;
const HEADING_ID = "manifesto-heading";

type StrokeProps = {
  fill: "none";
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
  vectorEffect: "non-scaling-stroke";
};

export function ManifestoLine() {
  const pinRef = useRef<HTMLElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const reactId = useId().replace(/:/g, "");
  const gradientId = `manifesto-gold-${reactId}`;

  const stroke: StrokeProps = {
    fill: "none",
    stroke: `url(#${gradientId})`,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke",
  };
  const plate: StrokeProps = { ...stroke, strokeWidth: 1.35 };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const svg = svgWrapRef.current?.querySelector("svg");
      if (!pin || !svg) {
        return;
      }

      const drawables = svg.querySelectorAll<SVGGeometryElement>(".ml-draw");

      if (reduced) {
        gsap.set(drawables, { drawSVG: "100%" });
        return;
      }

      gsap.set(svg, { autoAlpha: 1 });
      gsap.set(drawables, { drawSVG: "0%" });

      const master = gsap.timeline({ paused: true });
      buildMix(master, svg);
      master.to(
        svg.querySelector(".ml-plate"),
        { autoAlpha: 0, duration: 0.18, ease: "sine.in" },
        0.68,
      );

      const shimmer = svg.querySelector(".ml-shimmer");
      const shimmerTween = shimmer
        ? gsap.fromTo(
            shimmer,
            { attr: { x1: "-480", x2: "480" } },
            {
              attr: { x1: "960", x2: "1920" },
              duration: 1.65,
              repeat: -1,
              ease: "none",
            },
          )
        : null;

      const introP = { v: 0 };
      const scrollP = { v: 0 };
      const apply = () => {
        master.progress(introP.v + scrollP.v * (1 - introP.v));
      };

      const intro = gsap.to(introP, {
        v: LOAD_PROGRESS,
        duration: 2.55,
        ease: "power1.inOut",
        paused: true,
        onUpdate: apply,
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && introP.v < LOAD_PROGRESS - 0.01) {
            intro.play();
          }
        },
        { threshold: 0.45 },
      );
      io.observe(pin);

      ScrollTrigger.create({
        trigger: pin,
        pin: true,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * PIN_HOLD)}`,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter() {
          intro.play();
        },
        onEnterBack() {
          intro.play();
        },
        onUpdate(self) {
          if (self.progress < 0.008) {
            return;
          }
          scrollP.v = self.progress;
          apply();
        },
        onLeaveBack() {
          intro.pause();
          gsap.to(introP, {
            v: 0,
            duration: 0.55,
            ease: "power1.inOut",
            onUpdate: apply,
          });
        },
      });

      return () => {
        io.disconnect();
        shimmerTween?.kill();
        intro.kill();
      };
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={pinRef}
      id="manifesto"
      aria-labelledby={HEADING_ID}
      className={
        reduced
          ? "relative overflow-hidden bg-bg-paper py-(--section-py)"
          : "manifesto-line-pin relative h-dvh w-full overflow-hidden bg-bg-paper"
      }
      style={{ backgroundColor: PAPER }}
    >
      <div
        ref={svgWrapRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient
              id={gradientId}
              className="ml-shimmer"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
            >
              <stop offset="0%" stopColor={GOLD} />
              <stop offset="40%" stopColor={GOLD_LIGHT} />
              <stop offset="50%" stopColor="#e8c97a" />
              <stop offset="60%" stopColor={GOLD_LIGHT} />
              <stop offset="100%" stopColor={GOLD} />
            </linearGradient>
          </defs>
          <g className="ml-mix">
            <g className="ml-plate">
              <path className="ml-draw ml-crop" {...plate} d="M 72 168 V 72 H 168" />
              <path className="ml-draw ml-crop" {...plate} d="M 1272 72 H 1368 V 168" />
              <path className="ml-draw ml-crop" {...plate} d="M 72 732 V 828 H 168" />
              <path className="ml-draw ml-horiz" {...plate} d="M 48 600 H 1392" />
              <path className="ml-draw ml-baseline" {...plate} d="M 176 428 H 820" />
              <path className="ml-draw ml-tick" {...plate} d="M 176 428 V 456" />
              <path className="ml-draw ml-grid-tick" {...plate} d="M 696 450 H 744" />
              <path className="ml-draw ml-grid-tick" {...plate} d="M 720 426 V 474" />
            </g>
            <g className="ml-spine">
              <path className="ml-draw ml-vert" {...plate} d="M 480 0 V 900" />
              <path className="ml-draw ml-vert" {...plate} d="M 960 0 V 900" />
            </g>
            <g className="ml-arc-group">
              <path
                className="ml-horizon"
                fill="none"
                stroke="none"
                d="M 80 600 C 480 600 960 600 1360 600"
              />
              <path
                className="ml-draw ml-arc"
                {...stroke}
                d="M 80 660 C 400 800 1040 780 1360 560"
              />
            </g>
          </g>
        </svg>
      </div>

      <div
        className={
          reduced
            ? "relative z-[2] px-(--section-px)"
            : "relative z-[2] flex h-full items-center px-(--section-px)"
        }
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="max-w-3xl">
            <p className="mb-8 font-mono text-xs tracking-label text-gold-on-paper uppercase md:mb-10">
              {copy.manifesto.eyebrow}
            </p>
            <h2
              id={HEADING_ID}
              className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5.5vw,5rem)] md:leading-[1.06]"
            >
              {copy.manifesto.headline}
            </h2>
            <p className="mt-10 max-w-xl font-sans text-lg font-light leading-relaxed text-text-paper-muted md:mt-14 md:text-xl">
              {copy.manifesto.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function q(svg: SVGSVGElement, sel: string) {
  return svg.querySelector<SVGGeometryElement>(sel);
}

function qa(svg: SVGSVGElement, sel: string) {
  return svg.querySelectorAll<SVGGeometryElement>(sel);
}

function buildMix(tl: gsap.core.Timeline, svg: SVGSVGElement) {
  const crops = qa(svg, ".ml-crop");
  const verts = qa(svg, ".ml-vert");
  const baseline = q(svg, ".ml-baseline");
  const tick = q(svg, ".ml-tick");
  const horiz = q(svg, ".ml-horiz");
  const ticks = qa(svg, ".ml-grid-tick");
  const arc = q(svg, ".ml-arc");
  const horizon = q(svg, ".ml-horizon");

  tl.to(crops, { drawSVG: "100%", duration: 0.1, stagger: 0.03, ease: "power1.out" }, 0);
  tl.to(verts, { drawSVG: "100%", duration: 0.14, stagger: 0.04, ease: "power1.inOut" }, 0.08);
  if (baseline) {
    tl.to(baseline, { drawSVG: "100%", duration: 0.12, ease: "power1.inOut" }, 0.18);
  }
  if (tick) {
    tl.to(tick, { drawSVG: "100%", duration: 0.06, ease: "power1.out" }, 0.26);
  }
  if (horiz) {
    tl.to(horiz, { drawSVG: "62%", duration: 0.12, ease: "power1.inOut" }, 0.2);
  }
  tl.to(ticks, { drawSVG: "100%", duration: 0.08, stagger: 0.02, ease: "power1.out" }, 0.28);
  if (arc) {
    tl.to(arc, { drawSVG: "52%", duration: 0.16, ease: "power1.inOut" }, 0.26);
    tl.to(arc, { drawSVG: "100%", duration: 0.16, ease: "none" }, 0.42);
  }
  if (horiz) {
    tl.to(horiz, { drawSVG: "100%", duration: 0.12, ease: "none" }, 0.44);
  }
  if (arc && horizon) {
    tl.to(arc, { morphSVG: horizon, duration: 0.26, ease: "power2.inOut" }, 0.54);
  }
}
