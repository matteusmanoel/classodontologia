"use client";

/**
 * Construction spine — Mix E thirds as a living hairline.
 * Base strokes draw on enter; a brighter segment travels with scroll.
 * Cross joins morph from arc to horizon (same language as Manifesto).
 */

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

type StorySpineTone = "dark" | "paper";
type StorySpineJoin = "none" | "bottom" | "cross";

interface StorySpineProps {
  tone?: StorySpineTone;
  columns?: 1 | 2;
  join?: StorySpineJoin;
  className?: string;
}

const COL_A = 480;
const COL_B = 960;
const HORIZON = 600;

export function StorySpine({
  tone = "dark",
  columns = 2,
  join = "none",
  className,
}: StorySpineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const reactId = useId().replace(/:/g, "");
  const gradientId = `spine-gold-${reactId}`;

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
      const parent = root?.parentElement;
      const svg = root?.querySelector("svg");
      if (!root || !parent || !svg) return;

      const bases = svg.querySelectorAll<SVGGeometryElement>(".story-spine-base");
      const glows = svg.querySelectorAll<SVGGeometryElement>(".story-spine-glow");
      const joins = svg.querySelectorAll<SVGGeometryElement>(".story-spine-join");
      const arc = svg.querySelector<SVGGeometryElement>(".story-spine-arc");
      const horizon = svg.querySelector<SVGGeometryElement>(".story-spine-horizon-target");
      const shimmer = svg.querySelector(".story-spine-shimmer");

      if (reduced) {
        gsap.set(bases, { drawSVG: "100%" });
        gsap.set(joins, { drawSVG: "100%" });
        if (arc) gsap.set(arc, { drawSVG: "100%" });
        gsap.set(glows, { autoAlpha: 0 });
        return;
      }

      gsap.set(bases, { drawSVG: "0%" });
      gsap.set(glows, { drawSVG: "0% 14%" });
      gsap.set(joins, { drawSVG: "0%" });
      if (arc) gsap.set(arc, { drawSVG: "0%" });

      gsap.fromTo(
        bases,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top 95%",
            end: "top 55%",
            scrub: 0.25,
            invalidateOnRefresh: false,
            fastScrollEnd: true,
          },
        },
      );

      gsap.fromTo(
        glows,
        { drawSVG: "0% 12%" },
        {
          drawSVG: "88% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
            invalidateOnRefresh: false,
            fastScrollEnd: true,
          },
        },
      );

      if (joins.length) {
        gsap.fromTo(
          joins,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: parent,
              start: "top 70%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: false,
            },
          },
        );
      }

      if (arc && horizon) {
        const morphTl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: "top 75%",
            end: "top 15%",
            scrub: 0.45,
            invalidateOnRefresh: false,
            fastScrollEnd: true,
          },
        });
        morphTl.fromTo(arc, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.45, ease: "power1.inOut" });
        morphTl.to(arc, { morphSVG: horizon, duration: 0.55, ease: "power2.inOut" });
      }

      const shimmerTween = shimmer
        ? gsap.fromTo(
            shimmer,
            { attr: { x1: "-360", x2: "360" } },
            {
              attr: { x1: "1080", x2: "1800" },
              duration: 2.4,
              repeat: -1,
              ease: "none",
              paused: true,
            },
          )
        : null;

      const vis = ScrollTrigger.create({
        trigger: parent,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: false,
        onEnter: () => shimmerTween?.play(),
        onEnterBack: () => shimmerTween?.play(),
        onLeave: () => shimmerTween?.pause(),
        onLeaveBack: () => shimmerTween?.pause(),
      });

      if (vis.isActive) shimmerTween?.play();

      return () => {
        shimmerTween?.kill();
      };
    },
    { scope: rootRef, dependencies: [reduced, columns, join], revertOnUpdate: true },
  );

  const stroke = `url(#${gradientId})`;

  return (
    <div
      ref={rootRef}
      className={["story-spine", `story-spine--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg
        className="story-spine-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            className="story-spine-shimmer"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
          >
            {tone === "paper" ? (
              <>
                <stop offset="0%" stopColor="#7a5e14" />
                <stop offset="45%" stopColor="#c9a84c" />
                <stop offset="50%" stopColor="#e8c97a" />
                <stop offset="55%" stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#7a5e14" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#c9a84c" />
                <stop offset="45%" stopColor="#e8c97a" />
                <stop offset="50%" stopColor="#f5e6b8" />
                <stop offset="55%" stopColor="#e8c97a" />
                <stop offset="100%" stopColor="#c9a84c" />
              </>
            )}
          </linearGradient>
        </defs>

        <path
          className="story-spine-base"
          d={`M ${COL_A} 0 V 900`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="story-spine-glow"
          d={`M ${COL_A} 0 V 900`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {columns === 2 ? (
          <>
            <path
              className="story-spine-base"
              d={`M ${COL_B} 0 V 900`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="story-spine-glow"
              d={`M ${COL_B} 0 V 900`}
              fill="none"
              stroke={stroke}
              strokeWidth="1.7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}

        {join === "bottom" ? (
          <path
            className="story-spine-join"
            d="M 0 899 H 1440"
            fill="none"
            stroke={stroke}
            strokeWidth="1.15"
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {join === "cross" ? (
          <>
            <path
              className="story-spine-horizon-target"
              fill="none"
              stroke="none"
              d={`M 48 ${HORIZON} H 1392`}
            />
            <path
              className="story-spine-arc"
              d={`M 80 ${HORIZON + 48} C 400 ${HORIZON + 160} 1040 ${HORIZON + 140} 1360 ${HORIZON - 36}`}
              fill="none"
              stroke={stroke}
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}
