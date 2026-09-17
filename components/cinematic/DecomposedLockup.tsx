"use client";

/**
 * Official CLASS lockup built from the decomposed gold glyphs.
 * After the intro, fragments assemble into CLASS / ODONTOLOGIA,
 * then fuse into the official wordforms. Reduced motion: settled lockup.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_COMPLETE_EVENT } from "@/components/cinematic/IntroLoader";
import {
  LOGO_DIR,
  classLetters,
  glyphCrop,
  lockupMarks,
  lockupSeals,
  odontologiaLetters,
  type GlyphCrop,
  type LockupPieceDef,
} from "@/content/logoPieces";

gsap.registerPlugin(useGSAP);

function Glyph({
  def,
  className,
  priority = false,
  sizes,
  fit = "glyph",
}: {
  def: LockupPieceDef;
  className?: string;
  priority?: boolean;
  sizes: string;
  fit?: "glyph" | "slot";
}) {
  const crop: GlyphCrop = glyphCrop[def.crop];
  const [x, y, w, h] = crop.box;
  const [cw, ch] = crop.canvas;
  const { x: dx, y: dy, rotate, scale = 1 } = def.from;

  return (
    <span
      className={["lockup-piece", className].filter(Boolean).join(" ")}
      data-piece={def.id}
      data-exit-x={dx}
      data-exit-y={dy}
      data-exit-r={rotate}
      data-exit-s={scale}
      style={fit === "glyph" ? { aspectRatio: `${w} / ${h}` } : undefined}
    >
      <span
        className="lockup-glyph-shift"
        style={{
          position: "absolute",
          width: `${(cw / w) * 100}%`,
          height: `${(ch / h) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      >
        <Image
          src={`${LOGO_DIR}/${def.file}`}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="lockup-glyph-img"
        />
      </span>
    </span>
  );
}

export function DecomposedLockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);

    const onIntro = () => setIntroDone(true);
    window.addEventListener(INTRO_COMPLETE_EVENT, onIntro);
    const immediate = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("intro-pending")) {
        onIntro();
      }
    }, 0);
    const fallback = window.setTimeout(onIntro, 4500);

    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener(INTRO_COMPLETE_EVENT, onIntro);
      window.clearTimeout(immediate);
      window.clearTimeout(fallback);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const swirl = root.querySelector<HTMLElement>('[data-piece="swirl"]');
      const registered = root.querySelector<HTMLElement>('[data-piece="registered"]');
      const line = root.querySelector<HTMLElement>('[data-piece="line"]');
      const classRow = root.querySelectorAll<HTMLElement>(".lockup-class-letter");
      const odontoRow = root.querySelectorAll<HTMLElement>(".lockup-odonto-letter");
      const classSeal = root.querySelector<HTMLElement>('[data-piece="class-word"]');
      const odontoSeal = root.querySelector<HTMLElement>('[data-piece="odontologia-word"]');
      const letters = root.querySelectorAll<HTMLElement>(
        ".lockup-class-letter, .lockup-odonto-letter",
      );
      const marks = root.querySelectorAll<HTMLElement>(
        ".lockup-swirl, .lockup-registered, .lockup-line",
      );
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const k = mobile ? 0.42 : 1;

      const scatter = (el: HTMLElement) => ({
        x: Number(el.dataset.exitX) * k,
        y: Number(el.dataset.exitY) * k,
        rotate: Number(el.dataset.exitR),
        scale: Number(el.dataset.exitS || 1),
        autoAlpha: 0,
      });

      if (reduced) {
        gsap.set(marks, { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1 });
        gsap.set([classSeal, odontoSeal], { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1 });
        gsap.set(letters, { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 0 });
        root.dataset.lockup = "settled";
        return;
      }

      letters.forEach((el) => gsap.set(el, scatter(el)));
      marks.forEach((el) => gsap.set(el, scatter(el)));
      gsap.set([classSeal, odontoSeal], { autoAlpha: 0, x: 0, y: 0, rotate: 0, scale: 1 });

      if (!introDone) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          root.dataset.lockup = "settled";
        },
      });

      if (swirl) {
        tl.to(swirl, { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.9 }, 0);
      }
      tl.to(
        classRow,
        { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.72, stagger: 0.08 },
        0.18,
      );
      if (registered) {
        tl.to(
          registered,
          { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.42 },
          0.52,
        );
      }
      if (line) {
        gsap.set(line, { transformOrigin: "50% 50%" });
        tl.fromTo(
          line,
          { x: 0, y: 10 * k, rotate: 0, scaleX: 0.16, scaleY: 1, autoAlpha: 0 },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 0.48 },
          0.62,
        );
      }
      tl.to(
        odontoRow,
        { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.55, stagger: 0.032 },
        0.72,
      );
      tl.to(classRow, { autoAlpha: 0, duration: 0.35 }, 1.28);
      if (classSeal) {
        tl.to(classSeal, { autoAlpha: 1, duration: 0.4 }, 1.28);
      }
      tl.to(odontoRow, { autoAlpha: 0, duration: 0.35 }, 1.42);
      if (odontoSeal) {
        tl.to(odontoSeal, { autoAlpha: 1, duration: 0.4 }, 1.42);
      }
    },
    { scope: rootRef, dependencies: [introDone, reduced], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="decomposed-lockup" data-lockup="pending" aria-hidden="true">
      <div className="lockup-swirl-wrap">
        <Glyph
          def={lockupMarks[0]}
          className="lockup-swirl"
          priority
          sizes="(max-width: 768px) 58vw, 20rem"
        />
        <Glyph
          def={lockupMarks[1]}
          className="lockup-registered"
          sizes="48px"
        />
      </div>

      <div className="lockup-class-slot">
        <div className="lockup-class">
          {classLetters.map((def, index) => (
            <Glyph
              key={def.id}
              def={def}
              className="lockup-class-letter"
              priority={index < 3}
              sizes="80px"
            />
          ))}
        </div>
        <Glyph
          def={lockupSeals[0]}
          className="lockup-seal lockup-seal-class"
          fit="slot"
          sizes="(max-width: 768px) 55vw, 18rem"
        />
      </div>

      <Glyph def={lockupMarks[2]} className="lockup-line" sizes="320px" />

      <div className="lockup-odonto-slot">
        <div className="lockup-odontologia">
          {odontologiaLetters.map((def) => (
            <Glyph key={def.id} def={def} className="lockup-odonto-letter" sizes="40px" />
          ))}
        </div>
        <Glyph
          def={lockupSeals[1]}
          className="lockup-seal lockup-seal-odonto"
          fit="slot"
          sizes="(max-width: 768px) 52vw, 17rem"
        />
      </div>
    </div>
  );
}
