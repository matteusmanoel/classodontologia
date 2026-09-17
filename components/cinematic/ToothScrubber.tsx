"use client";

/**
 * Tooth scroll cinematic — prototype (owner override of STOP-06).
 *
 * ADR-003: CSS sticky pin + ScrollTrigger progress + `video.currentTime`.
 * GSAP tweens a proxy; a ticker copies that time onto the paused video.
 * Chrome will not paint seeks until the media has decoded once, so we
 * unlock with muted play() → pause() after metadata.
 *
 * Mobile / touch (Spike C → C2): no video scrub — CSS shows poster.
 * Scroll shell stays tall so copy choreography still scrubbs.
 *
 * The clip starts at TOOTH_IN_POINT (composed, about to split) so the
 * enamel explode lands on the same Hero progress as the lockup scatter.
 */

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TOOTH_DURATION,
  TOOTH_IN_POINT,
  TOOTH_POSTER_PATH,
  TOOTH_VIDEO_PATH,
  toothTimeForProgress,
} from "@/lib/video";
import { heroDecomposeWindow } from "@/lib/heroMotion";
import { copy } from "@/content/copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface ToothScrubberProps {
  /** 300vh scroll shell from HeroCinematic. */
  triggerRef: RefObject<HTMLElement | null>;
}

function durationOf(video: HTMLVideoElement): number {
  const raw = video.duration;
  return Number.isFinite(raw) && raw > 0 ? raw : TOOTH_DURATION;
}

async function unlockSeeking(video: HTMLVideoElement): Promise<void> {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = "auto";

  if (video.readyState < 1) {
    await new Promise<void>((resolve) => {
      const done = () => {
        video.removeEventListener("loadedmetadata", done);
        resolve();
      };
      video.addEventListener("loadedmetadata", done);
      video.load();
    });
  }

  try {
    await video.play();
  } catch {
    /* seek below still parks on the composed in-point */
  }

  video.pause();
  video.currentTime = TOOTH_IN_POINT;
}

function shouldDegradeScrub(): boolean {
  return (
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ToothScrubber({ triggerRef }: ToothScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const trigger =
        triggerRef.current ?? layerRef.current?.closest(".hero-cinematic");
      if (!video || !trigger) {
        return;
      }

      /* C2 degradation: poster only — no GSAP scrub on touch / narrow / reduced. */
      if (shouldDegradeScrub()) {
        video.pause();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (min-width: 769px)", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          video.pause();
          return;
        }

        const decompose = heroDecomposeWindow(copy.hero.scrollLines.length);
        const proxy = { time: TOOTH_IN_POINT };
        let tween: gsap.core.Tween | undefined;
        let cancelled = false;

        const applyFrame = () => {
          if (video.readyState < 2 || video.seeking) {
            return;
          }
          const duration = durationOf(video);
          const next = gsap.utils.clamp(
            Math.min(TOOTH_IN_POINT, duration),
            duration,
            proxy.time,
          );
          if (Math.abs(video.currentTime - next) < 1 / 48) {
            return;
          }
          video.currentTime = next;
        };

        gsap.ticker.add(applyFrame);

        const mountScrub = () => {
          if (cancelled) {
            return;
          }

          const duration = durationOf(video);
          const inPoint = Math.min(TOOTH_IN_POINT, duration * 0.45);
          tween?.scrollTrigger?.kill();
          tween?.kill();
          proxy.time = inPoint;
          video.currentTime = inPoint;

          tween = gsap.fromTo(
            proxy,
            { time: inPoint },
            {
              time: duration,
              ease: (progress: number) => {
                const target = toothTimeForProgress(
                  progress,
                  duration,
                  decompose.start,
                  decompose.end,
                );
                const span = duration - inPoint;
                return span <= 0 ? 1 : (target - inPoint) / span;
              },
              immediateRender: true,
              scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.35,
                invalidateOnRefresh: true,
                onEnterBack: () => {
                  proxy.time = inPoint;
                  if (video.readyState >= 1) {
                    video.currentTime = inPoint;
                  }
                },
                onUpdate: (self) => {
                  if (self.progress > 0 && window.scrollY > 2) {
                    return;
                  }
                  proxy.time = inPoint;
                  if (video.readyState >= 1 && !video.seeking) {
                    video.currentTime = inPoint;
                  }
                },
              },
            },
          );

          video.dataset.scrubReady = "true";
          ScrollTrigger.refresh();
        };

        void unlockSeeking(video).then(() => {
          if (cancelled) {
            return;
          }
          video.pause();
          if (video.readyState >= 1) {
            mountScrub();
            return;
          }
          video.addEventListener("loadedmetadata", mountScrub, { once: true });
        });

        return () => {
          cancelled = true;
          delete video.dataset.scrubReady;
          gsap.ticker.remove(applyFrame);
          tween?.scrollTrigger?.kill();
          tween?.kill();
          video.pause();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [] },
  );

  return (
    <div
      ref={layerRef}
      className="tooth-scrubber pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="tooth-scrubber-video motion-reduce:hidden cinematic-video"
        muted
        playsInline
        preload="auto"
        poster={TOOTH_POSTER_PATH}
        width={1920}
        height={1080}
      >
        <source src={TOOTH_VIDEO_PATH} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TOOTH_POSTER_PATH}
        alt=""
        width={1920}
        height={1080}
        className="tooth-scrubber-poster cinematic-poster"
      />
    </div>
  );
}
