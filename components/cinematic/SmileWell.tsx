"use client";

/**
 * Manifesto dark well — poster until the smile video exists.
 * When `videoSrc` is present, plays once on viewport entry (ADR-007 island).
 */

import { useEffect, useRef } from "react";
import Image from "next/image";

export interface SmileWellProps {
  posterSrc: string;
  videoSrc?: string;
  alt: string;
}

export function SmileWell({ posterSrc, videoSrc, alt }: SmileWellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const well = wellRef.current;
    if (!video || !well || !videoSrc) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        void video.play().catch(() => undefined);
        io.disconnect();
      },
      { threshold: 0.28 },
    );

    io.observe(well);
    return () => io.disconnect();
  }, [videoSrc]);

  return (
    <div ref={wellRef} className="smile-well aspect-[4/5] w-full md:aspect-auto md:min-h-[36rem] md:h-full">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="smile-well-media absolute inset-0 h-full w-full"
          poster={posterSrc}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="smile-well-media"
        />
      )}
    </div>
  );
}
