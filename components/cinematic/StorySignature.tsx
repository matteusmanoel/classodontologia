"use client";

/**
 * Construction signature — CLASS drawn as plotter strokes
 * when the visit field arrives. Completes the Mix E thread.
 */

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export function StorySignature() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const reactId = useId().replace(/:/g, "");
  const gradientId = `class-gold-${reactId}`;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const parent = root?.closest("section") ?? root;
      const svg = root?.querySelector("svg");
      if (!root || !parent || !svg) return;

      const letters = svg.querySelectorAll<SVGGeometryElement>(".story-sig-letter");
      const marks = svg.querySelectorAll<SVGGeometryElement>(".story-sig-mark");

      if (reduced) {
        gsap.set([letters, marks], { drawSVG: "100%" });
        return;
      }

      gsap.set(letters, { drawSVG: "0%" });
      gsap.set(marks, { drawSVG: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top 46%",
          end: "top 10%",
          scrub: 0.65,
          invalidateOnRefresh: false,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        marks,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.18, stagger: 0.04, ease: "power1.out" },
        0.32,
      );
      tl.fromTo(
        letters,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.26, stagger: 0.1, ease: "power1.inOut" },
        0.42,
      );
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const stroke = `url(#${gradientId})`;
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <div ref={rootRef} className="story-signature" aria-hidden="true">
      <svg
        className="story-signature-svg"
        viewBox="760 240 680 450"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>CLASS</title>
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="780"
            y1="0"
            x2="1430"
            y2="0"
          >
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="50%" stopColor="#f5e6b8" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>

        <path className="story-sig-mark" {...common} d="M 770 292 V 252 H 818" />
        <path className="story-sig-mark" {...common} d="M 1368 252 H 1416 V 292" />
        <path className="story-sig-mark" {...common} d="M 770 628 V 668 H 818" />
        <path className="story-sig-mark" {...common} d="M 1416 628 V 668 H 1368" />
        <path className="story-sig-mark" {...common} d="M 790 580 H 1396" />

        <g data-word="CLASS">
          <path
            className="story-sig-letter"
            {...common}
            d="M 910 320 C 818 320 790 372 790 440 C 790 508 818 560 910 560"
          />
          <path className="story-sig-letter" {...common} d="M 936 320 V 560 H 1012" />
          <path
            className="story-sig-letter"
            {...common}
            d="M 1058 560 L 1119 320 L 1180 560"
          />
          <path className="story-sig-letter" {...common} d="M 1090 464 H 1148" />
          <path
            className="story-sig-letter"
            {...common}
            d="M 1304 320 C 1220 320 1218 364 1218 384 C 1218 430 1304 436 1304 500 C 1304 548 1220 560 1218 560"
          />
          <path
            className="story-sig-letter"
            {...common}
            d="M 1416 320 C 1332 320 1330 364 1330 384 C 1330 430 1416 436 1416 500 C 1416 548 1332 560 1330 560"
          />
        </g>
      </svg>
    </div>
  );
}
