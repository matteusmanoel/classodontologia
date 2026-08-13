"use client";

/**
 * Tooth scroll cinematic — prototype (owner override of STOP-06).
 *
 * Uses the H.264 prototype encode of the watermarked Vidu source.
 * The frame is scaled and overflowed to the right so the watermark
 * sits off-canvas. CSS sticky pins; GSAP ScrollTrigger maps progress
 * to currentTime. Reduced-motion shows the poster only.
 */

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TOOTH_DURATION,
  TOOTH_POSTER_PATH,
  TOOTH_VIDEO_PATH,
} from "@/lib/video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface ToothScrubberProps {
  /** 300vh scroll shell from HeroCinematic. */
  triggerRef: RefObject<HTMLElement | null>;
}

export function ToothScrubber({ triggerRef }: ToothScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const trigger = triggerRef.current;
      if (!video || !trigger) {
        return;
      }

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) {
        video.pause();
        return;
      }

      video.pause();
      video.preload = "auto";

      let targetTime = 0;
      let ticking = false;

      const applySeek = () => {
        ticking = false;
        const duration = Number.isFinite(video.duration)
          ? video.duration
          : TOOTH_DURATION;
        if (Math.abs(video.currentTime - targetTime) < 1 / 48) {
          return;
        }
        video.currentTime = Math.min(Math.max(targetTime, 0), duration);
      };

      const st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const duration = Number.isFinite(video.duration)
            ? video.duration
            : TOOTH_DURATION;
          const mapped = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(0.05, 0.95, 0, 1, self.progress),
          );
          targetTime = mapped * duration;
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(applySeek);
          }
        },
      });

      const onLoaded = () => {
        video.pause();
        ScrollTrigger.refresh();
      };
      video.addEventListener("loadeddata", onLoaded);

      return () => {
        video.removeEventListener("loadeddata", onLoaded);
        st.kill();
      };
    },
    { scope: layerRef, dependencies: [triggerRef] },
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
        className="tooth-scrubber-poster cinematic-poster hidden motion-reduce:block"
      />
    </div>
  );
}
