"use client";

/**
 * LoopVideo — muted ambient loop layered over a still.
 *
 * The still underneath is always the fallback: the video fades in only once it can
 * play. It never mounts for reduced motion or data-saving connections, loads only
 * when first visible, and pauses off-screen.
 */

import { useEffect, useRef, useState } from "react";

interface LoopVideoProps {
  src: string;
  className?: string;
}

type NetworkInformationLike = { saveData?: boolean; effectiveType?: string };

function motionAndDataAllowed(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  const lowData =
    Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  return !lowData;
}

export function LoopVideo({ src, className }: LoopVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(motionAndDataAllowed());
    sync();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!allowed || !wrap) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setArmed(true);
          videoRef.current?.play().catch(() => undefined);
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [allowed]);

  const classes = ["loop-video", ready && !failed ? "is-ready" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={wrapRef} className="loop-video-wrap" aria-hidden="true">
      {allowed && armed && !failed ? (
        <video
          ref={videoRef}
          className={classes}
          src={src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
