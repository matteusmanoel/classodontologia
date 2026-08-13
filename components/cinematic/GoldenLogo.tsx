"use client";

import { useEffect, useRef, useState } from "react";
import { GOLDEN_POSTER_PATH, GOLDEN_VIDEO_PATH } from "@/lib/video";

export interface GoldenLogoProps {
  className?: string;
}

const GOLDEN_WIDTH = 1280;
const GOLDEN_HEIGHT = 646;

export function GoldenLogo({ className }: GoldenLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [preload, setPreload] = useState<"metadata" | "auto">("metadata");

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
    }
  }, [videoFailed]);

  useEffect(() => {
    if (videoFailed) {
      return;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pauseForReducedMotion = () => {
      if (!motionQuery.matches) {
        return;
      }
      video?.pause();
    };

    pauseForReducedMotion();
    motionQuery.addEventListener("change", pauseForReducedMotion);

    if (motionQuery.matches) {
      return () => {
        motionQuery.removeEventListener("change", pauseForReducedMotion);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setPreload("auto");
        if (video) {
          video.preload = "auto";
        }
        observer.disconnect();
      },
      { root: null, threshold: 0 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", pauseForReducedMotion);
    };
  }, [videoFailed]);

  const rootClassName = ["golden-logo relative w-full", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={{ aspectRatio: `${GOLDEN_WIDTH} / ${GOLDEN_HEIGHT}` }}
    >
      {!videoFailed ? (
        <video
          ref={videoRef}
          className="golden-logo-video motion-reduce:hidden absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          poster={GOLDEN_POSTER_PATH}
          aria-hidden="true"
          preload={preload}
          width={GOLDEN_WIDTH}
          height={GOLDEN_HEIGHT}
          onError={() => setVideoFailed(true)}
        >
          <source
            src={GOLDEN_VIDEO_PATH}
            type="video/mp4"
            onError={() => setVideoFailed(true)}
          />
        </video>
      ) : null}
      {/* Native img is the contracted decorative fallback (ISSUE-009 / ACCESSIBILITY.md). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GOLDEN_POSTER_PATH}
        alt=""
        width={GOLDEN_WIDTH}
        height={GOLDEN_HEIGHT}
        className={
          videoFailed
            ? "golden-logo-poster absolute inset-0 block h-full w-full object-contain"
            : "golden-logo-poster absolute inset-0 hidden h-full w-full object-contain motion-reduce:block"
        }
      />
    </div>
  );
}
