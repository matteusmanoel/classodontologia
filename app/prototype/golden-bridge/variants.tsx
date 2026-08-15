"use client";

/**
 * PROTOTYPE — three Golden Logo bridge layouts.
 * Question: What does the Golden Logo bridge section look like?
 * Throwaway. Do not import into production page composition.
 */

import { useEffect, useRef, useState } from "react";
import { GOLDEN_POSTER_PATH, GOLDEN_VIDEO_PATH } from "@/lib/video";

const GOLDEN_WIDTH = 1280;
const GOLDEN_HEIGHT = 646;

function useOncePlayOnEnter(loop: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [emerged, setEmerged] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || failed) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        setEmerged(true);
        if (video) {
          video.muted = true;
          video.loop = loop;
          void video.play().catch(() => setFailed(true));
        }
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [failed, loop]);

  return { containerRef, videoRef, emerged, failed, setFailed };
}

function BridgeVideo({
  loop,
  className,
  maxWidth,
}: {
  loop: boolean;
  className?: string;
  maxWidth?: string;
}) {
  const { containerRef, videoRef, emerged, failed, setFailed } =
    useOncePlayOnEnter(loop);

  return (
    <div
      ref={containerRef}
      className={[
        "relative mx-auto w-full transition-[opacity,transform] duration-[1100ms] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        emerged ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        aspectRatio: `${GOLDEN_WIDTH} / ${GOLDEN_HEIGHT}`,
        maxWidth: maxWidth ?? "100%",
      }}
    >
      {!failed ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain motion-reduce:hidden"
          muted
          playsInline
          loop={loop}
          poster={GOLDEN_POSTER_PATH}
          aria-hidden="true"
          preload="auto"
          width={GOLDEN_WIDTH}
          height={GOLDEN_HEIGHT}
          onEnded={(event) => {
            if (!loop) {
              event.currentTarget.pause();
            }
          }}
          onError={() => setFailed(true)}
        >
          <source src={GOLDEN_VIDEO_PATH} type="video/mp4" />
        </video>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GOLDEN_POSTER_PATH}
        alt=""
        width={GOLDEN_WIDTH}
        height={GOLDEN_HEIGHT}
        className={
          failed
            ? "absolute inset-0 block h-full w-full object-contain"
            : "absolute inset-0 hidden h-full w-full object-contain motion-reduce:block"
        }
      />
    </div>
  );
}

/** V1 — Full-bleed loop on #080808. */
export function Variant1FullBleedLoop() {
  return (
    <section
      className="flex min-h-[70vh] items-center justify-center bg-[#080808] py-16"
      aria-label="Identidade — variação 1"
    >
      <BridgeVideo loop className="w-full px-0" />
    </section>
  );
}

/** V2 — Contained once-play, max 560px. */
export function Variant2ContainedOnce() {
  return (
    <section
      className="flex min-h-[70vh] items-center justify-center bg-[#080808] px-(--section-px) py-(--section-py)"
      aria-label="Identidade — variação 2"
    >
      <BridgeVideo loop={false} maxWidth="560px" />
    </section>
  );
}

/** V3 — Section rhythm + gold eyebrow, once-play. */
export function Variant3EditorialEyebrow() {
  return (
    <section
      className="bg-[#080808] py-(--section-py)"
      aria-labelledby="proto-bridge-heading"
    >
      <div className="mx-auto max-w-[1280px] px-(--section-px)">
        <p
          id="proto-bridge-heading"
          className="mb-10 text-center font-sans text-sm font-medium tracking-label uppercase text-gold"
        >
          Identidade
        </p>
        <BridgeVideo loop={false} maxWidth="560px" />
      </div>
    </section>
  );
}

export const GOLDEN_BRIDGE_VARIANTS = [
  { key: "1", label: "Full-bleed loop" },
  { key: "2", label: "Contained once-play" },
  { key: "3", label: "Editorial + eyebrow" },
] as const;
