"use client";

/**
 * PROTOTYPE — pinned Manifesto scene with a golden SVG hairline.
 * Load draws like a short clip; scroll continues the same path; wash paper→dark.
 * Throwaway. Do not import into production page composition.
 */

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy } from "@/content/copy";
import type { ManifestoLineVariantKey } from "./variants";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

const PAPER = "#f3efe6";
const DARK = "#080808";
const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8c97a";
const LOAD_PROGRESS = 0.42;
const PIN_HOLD = 2.6;

type StrokeProps = {
  fill: "none";
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
  vectorEffect: "non-scaling-stroke";
};

export type LineEls = {
  pin: HTMLDivElement;
  wash: HTMLDivElement;
  svg: SVGSVGElement;
  copy: HTMLDivElement;
};

type BuildMaster = (tl: gsap.core.Timeline, els: LineEls) => void;

interface ManifestoLineSceneProps {
  variant: ManifestoLineVariantKey;
}

export function ManifestoLineScene({ variant }: ManifestoLineSceneProps) {
  const build = BUILDERS[variant];
  const figure = FIGURES[variant];

  return (
    <ManifestoLineFrame build={build}>{figure}</ManifestoLineFrame>
  );
}

function ManifestoLineFrame({
  children,
  build,
}: {
  children: (stroke: StrokeProps) => ReactNode;
  build: BuildMaster;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const reactId = useId().replace(/:/g, "");
  const gradientId = `ml-gold-${reactId}`;

  const stroke: StrokeProps = {
    fill: "none",
    stroke: `url(#${gradientId})`,
    strokeWidth: 1.35,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke",
  };

  useLayoutEffect(() => {
    setLayoutReady(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const wash = washRef.current;
      const copyEl = copyRef.current;
      const svg = svgWrapRef.current?.querySelector("svg");
      if (!pin || !wash || !copyEl || !svg || !layoutReady) {
        return;
      }

      const drawables = svg.querySelectorAll<SVGGeometryElement>(".ml-draw");

      if (reduced) {
        gsap.set(copyEl, { autoAlpha: 1 });
        gsap.set(wash, { backgroundColor: PAPER });
        gsap.set(drawables, { drawSVG: "100%" });
        return;
      }

      gsap.set(copyEl, { autoAlpha: 0, y: 0 });
      gsap.set(wash, { backgroundColor: PAPER });
      gsap.set(svg, { autoAlpha: 1 });
      gsap.set(drawables, { drawSVG: "0%" });

      const els: LineEls = { pin, wash, svg, copy: copyEl };
      const master = gsap.timeline({ paused: true });

      master.to(copyEl, { autoAlpha: 1, duration: 0.16, ease: "sine.out" }, 0.14);
      build(master, els);
      master.to(
        wash,
        { backgroundColor: DARK, duration: 0.28, ease: "power2.inOut" },
        0.72,
      );
      master.to(
        copyEl,
        { autoAlpha: 0, y: -16, duration: 0.16, ease: "sine.in" },
        0.78,
      );
      master.to(svg, { autoAlpha: 0.2, duration: 0.18, ease: "sine.in" }, 0.82);

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
    { dependencies: [layoutReady, reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={pinRef}
      className="manifesto-line-pin relative h-dvh w-full overflow-hidden"
      aria-labelledby="manifesto-line-heading"
    >
      <div
        ref={washRef}
        className="ml-wash absolute inset-0"
        style={{ backgroundColor: PAPER }}
      />

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
              <stop offset="50%" stopColor="#fff6d4" />
              <stop offset="60%" stopColor={GOLD_LIGHT} />
              <stop offset="100%" stopColor={GOLD} />
            </linearGradient>
          </defs>
          {children(stroke)}
        </svg>
      </div>

      <div
        ref={copyRef}
        className="ml-copy relative z-[2] flex h-full items-center px-(--section-px)"
      >
        <div className="max-w-3xl">
          <p className="mb-8 font-mono text-xs tracking-label text-gold-on-paper uppercase md:mb-10">
            {copy.manifesto.eyebrow}
          </p>
          <h2
            id="manifesto-line-heading"
            className="font-display text-3xl tracking-display text-text-paper md:text-[clamp(2.5rem,5.5vw,5rem)] md:leading-[1.06]"
          >
            {copy.manifesto.headline}
          </h2>
          <p className="mt-10 max-w-xl font-sans text-lg font-light leading-relaxed text-text-paper-muted md:mt-14 md:text-xl">
            {copy.manifesto.body}
          </p>
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

function buildPlotter(tl: gsap.core.Timeline, els: LineEls) {
  const crops = qa(els.svg, ".ml-crop");
  const baseline = q(els.svg, ".ml-baseline");
  const tick = q(els.svg, ".ml-tick");
  const diag = q(els.svg, ".ml-diag");
  const cage = els.svg.querySelector(".ml-plotter");

  tl.to(crops, { drawSVG: "100%", duration: 0.12, stagger: 0.04, ease: "power1.out" }, 0);
  if (baseline) {
    tl.to(baseline, { drawSVG: "100%", duration: 0.14, ease: "power1.inOut" }, 0.16);
  }
  if (tick) {
    tl.to(tick, { drawSVG: "100%", duration: 0.08, ease: "power1.out" }, 0.26);
  }
  if (diag) {
    tl.to(diag, { drawSVG: "42%", duration: 0.14, ease: "power1.inOut" }, 0.26);
    tl.to(diag, { drawSVG: "100%", duration: 0.2, ease: "none" }, 0.42);
    tl.to(
      diag,
      {
        scaleX: 2.15,
        scaleY: 1.08,
        transformOrigin: "20% 90%",
        duration: 0.22,
        ease: "power2.in",
      },
      0.58,
    );
  }
  if (cage) {
    tl.to(cage, { autoAlpha: 0.12, duration: 0.16, ease: "sine.in" }, 0.64);
  }
}

function buildArcHorizon(tl: gsap.core.Timeline, els: LineEls) {
  const arc = q(els.svg, ".ml-arc");
  const horizon = q(els.svg, ".ml-horizon");
  if (!arc || !horizon) {
    return;
  }

  tl.to(arc, { drawSVG: "58%", duration: 0.4, ease: "power1.inOut" }, 0);
  tl.to(arc, { drawSVG: "100%", duration: 0.16, ease: "none" }, 0.42);
  tl.to(
    arc,
    { morphSVG: horizon, duration: 0.28, ease: "power2.inOut" },
    0.55,
  );
}

function buildThread(tl: gsap.core.Timeline, els: LineEls) {
  const thread = q(els.svg, ".ml-thread");
  if (!thread) {
    return;
  }

  tl.to(thread, { drawSVG: "48%", duration: 0.4, ease: "power1.inOut" }, 0);
  tl.to(thread, { drawSVG: "100%", duration: 0.28, ease: "none" }, 0.42);
  tl.to(thread, { autoAlpha: 0, duration: 0.18, ease: "sine.in" }, 0.66);
}

function buildGrid(tl: gsap.core.Timeline, els: LineEls) {
  const verts = qa(els.svg, ".ml-vert");
  const horiz = qa(els.svg, ".ml-horiz");
  const ticks = qa(els.svg, ".ml-grid-tick");
  const closing = q(els.svg, ".ml-closing");
  const grid = els.svg.querySelector(".ml-grid");

  tl.to(verts, { drawSVG: "100%", duration: 0.16, stagger: 0.05, ease: "power1.inOut" }, 0);
  tl.to(horiz, { drawSVG: "68%", duration: 0.14, stagger: 0.04, ease: "power1.inOut" }, 0.18);
  tl.to(ticks, { drawSVG: "100%", duration: 0.1, stagger: 0.03, ease: "power1.out" }, 0.3);

  tl.to(horiz, { drawSVG: "100%", duration: 0.14, ease: "none" }, 0.42);
  if (closing) {
    tl.to(closing, { drawSVG: "100%", duration: 0.12, ease: "power1.inOut" }, 0.5);
  }
  if (grid) {
    tl.to(
      grid,
      {
        scale: 0.92,
        transformOrigin: "50% 50%",
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0.64,
    );
  }
}

function buildMix(tl: gsap.core.Timeline, els: LineEls) {
  const crops = qa(els.svg, ".ml-crop");
  const verts = qa(els.svg, ".ml-vert");
  const baseline = q(els.svg, ".ml-baseline");
  const tick = q(els.svg, ".ml-tick");
  const horiz = q(els.svg, ".ml-horiz");
  const ticks = qa(els.svg, ".ml-grid-tick");
  const arc = q(els.svg, ".ml-arc");
  const horizon = q(els.svg, ".ml-horizon");
  const plate = els.svg.querySelector(".ml-plate");
  const arcGroup = els.svg.querySelector(".ml-arc-group");

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
  if (plate) {
    tl.to(
      plate,
      { autoAlpha: 0, duration: 0.16, ease: "sine.in" },
      0.62,
    );
  }
  if (arcGroup) {
    tl.to(arcGroup, { autoAlpha: 0.85, duration: 0.12, ease: "sine.in" }, 0.64);
  }
}

function MixFigure(stroke: StrokeProps) {
  const plate: StrokeProps = { ...stroke, strokeWidth: 1.15 };
  return (
    <g className="ml-mix">
      <g className="ml-plate">
        <path className="ml-draw ml-crop" {...plate} d="M 72 168 V 72 H 168" />
        <path className="ml-draw ml-crop" {...plate} d="M 1272 72 H 1368 V 168" />
        <path className="ml-draw ml-crop" {...plate} d="M 72 732 V 828 H 168" />
        <path className="ml-draw ml-vert" {...plate} d="M 480 48 V 852" />
        <path className="ml-draw ml-vert" {...plate} d="M 960 48 V 852" />
        <path className="ml-draw ml-horiz" {...plate} d="M 48 600 H 1392" />
        <path className="ml-draw ml-baseline" {...plate} d="M 176 428 H 820" />
        <path className="ml-draw ml-tick" {...plate} d="M 176 428 V 456" />
        <path className="ml-draw ml-grid-tick" {...plate} d="M 696 450 H 744" />
        <path className="ml-draw ml-grid-tick" {...plate} d="M 720 426 V 474" />
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
  );
}

function PlotterFigure(stroke: StrokeProps) {
  return (
    <g className="ml-plotter">
      <path className="ml-draw ml-crop" {...stroke} d="M 72 168 V 72 H 168" />
      <path className="ml-draw ml-crop" {...stroke} d="M 1272 72 H 1368 V 168" />
      <path className="ml-draw ml-crop" {...stroke} d="M 72 732 V 828 H 168" />
      <path className="ml-draw ml-baseline" {...stroke} d="M 176 428 H 820" />
      <path className="ml-draw ml-tick" {...stroke} d="M 176 428 V 456" />
      <path className="ml-draw ml-diag" {...stroke} d="M 240 800 L 620 168" />
    </g>
  );
}

function ArcFigure(stroke: StrokeProps) {
  return (
    <g className="ml-arc-group">
      <path
        className="ml-horizon"
        fill="none"
        stroke="none"
        d="M 80 640 C 480 640 960 640 1360 640"
      />
      <path
        className="ml-draw ml-arc"
        {...stroke}
        d="M 80 680 C 400 820 1040 800 1360 600"
      />
    </g>
  );
}

function ThreadFigure(stroke: StrokeProps) {
  return (
    <g className="ml-thread-group">
      <path
        className="ml-draw ml-thread"
        {...stroke}
        d="M -80 368 C 220 368 420 368 560 382 S 900 342 1520 374"
      />
    </g>
  );
}

function GridFigure(stroke: StrokeProps) {
  return (
    <g className="ml-grid">
      <path className="ml-draw ml-vert" {...stroke} d="M 480 48 V 852" />
      <path className="ml-draw ml-vert" {...stroke} d="M 960 48 V 852" />
      <path className="ml-draw ml-horiz" {...stroke} d="M 48 300 H 1392" />
      <path className="ml-draw ml-horiz" {...stroke} d="M 48 600 H 1392" />
      <path className="ml-draw ml-grid-tick" {...stroke} d="M 696 450 H 744" />
      <path className="ml-draw ml-grid-tick" {...stroke} d="M 720 426 V 474" />
      <path className="ml-draw ml-closing" {...stroke} d="M 480 600 H 960" />
    </g>
  );
}

const BUILDERS: Record<ManifestoLineVariantKey, BuildMaster> = {
  a: buildPlotter,
  b: buildArcHorizon,
  c: buildThread,
  d: buildGrid,
  e: buildMix,
};

const FIGURES: Record<ManifestoLineVariantKey, (stroke: StrokeProps) => ReactNode> = {
  a: PlotterFigure,
  b: ArcFigure,
  c: ThreadFigure,
  d: GridFigure,
  e: MixFigure,
};
