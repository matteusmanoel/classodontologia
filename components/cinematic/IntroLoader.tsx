"use client";

/**
 * Full-viewport intro: types the brand slogan, then fades to the Hero.
 * Dispatches `class-intro-complete` so the Hero cue and FAB can appear.
 */

import { useLayoutEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";

export const INTRO_COMPLETE_EVENT = "class-intro-complete";

export function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    document.documentElement.classList.add("intro-pending");
    document.documentElement.dataset.intro = "pending";

    const overlay = overlayRef.current;
    const node = textRef.current;
    const caret = caretRef.current;
    const timers: number[] = [];
    let cancelled = false;

    const finish = () => {
      if (cancelled) {
        return;
      }
      document.documentElement.classList.remove("intro-pending");
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
      setVisible(false);
    };

    if (!overlay || !node) {
      finish();
      return;
    }

    const slogan = copy.hero.slogan;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      node.textContent = slogan;
      if (caret) {
        caret.style.display = "none";
      }
      overlay.style.display = "none";
      timers.push(window.setTimeout(finish, 0));
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
        document.documentElement.classList.remove("intro-pending");
        document.documentElement.dataset.intro = "done";
      };
    }

    node.textContent = "";
    const durationMs = Math.max(1100, slogan.length * 55);
    const startedAt = performance.now();

    const tick = () => {
      if (cancelled) {
        return;
      }
      const progress = Math.min(1, (performance.now() - startedAt) / durationMs);
      node.textContent = slogan.slice(0, Math.round(progress * slogan.length));
      if (progress < 1) {
        timers.push(window.setTimeout(tick, 16));
        return;
      }
      if (caret) {
        caret.style.display = "none";
      }
      timers.push(
        window.setTimeout(() => {
          overlay.style.pointerEvents = "none";
          overlay.style.transition = "opacity 0.7s ease";
          overlay.style.opacity = "0";
          timers.push(window.setTimeout(finish, 700));
        }, 400),
      );
    };

    timers.push(window.setTimeout(tick, 16));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      document.documentElement.classList.remove("intro-pending");
      document.documentElement.dataset.intro = "done";
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="intro-loader"
      role="status"
      aria-live="polite"
      aria-label={copy.hero.slogan}
    >
      <p className="intro-loader-slogan">
        <span ref={textRef} />
        <span ref={caretRef} className="hero-slogan-caret" aria-hidden="true" />
      </p>
    </div>
  );
}
