"use client";

/**
 * SpecialistsReveal — Hero Moment 03, light/shadow reveal (ADR-012).
 *
 * Primary path (mask supported): CSS radial-gradient mask + GSAP timeline on viewport entry.
 * Fallback (mask not supported): opacity/brightness reveal.
 * Reduced motion: all portraits visible statically, no animation.
 *
 * Feature detection via CSS.supports() — never browser-name detection.
 * Level 3 motion (GSAP timeline, no scrub). Clean teardown.
 */

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { Specialist } from "@/content/specialists";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SpecialistRevealCardProps {
  specialist: Specialist;
  supportsMask: boolean;
  reducedMotion: boolean;
}

function initialsFromName(name: string): string {
  return name
    .replace(/^(Dr\.|Dra\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function SpecialistRevealCard({
  specialist,
  supportsMask,
  reducedMotion,
}: SpecialistRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const overlay = overlayRef.current;
      const portrait = portraitRef.current;
      if (!card || reducedMotion) return;

      if (supportsMask && overlay) {
        // Primary path: radial-gradient mask reveal (ADR-012)
        gsap.set(overlay, { "--r": "0%" } as gsap.TweenVars);

        ScrollTrigger.create({
          trigger: card,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(overlay, {
              "--r": "55%",
              "--cy": "50%",
              duration: 1.2,
              ease: "power2.out",
            } as gsap.TweenVars);
          },
        });
      } else if (portrait) {
        // Fallback: opacity reveal (ADR-012)
        gsap.set(portrait, { opacity: 0.1 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(portrait, { opacity: 1, duration: 1.0, ease: "power2.out" });
          },
        });
      }
    },
    { scope: cardRef, dependencies: [supportsMask, reducedMotion] },
  );

  const hasMaskStyle = supportsMask && !reducedMotion;

  return (
    <article
      ref={cardRef}
      className="flex flex-col gap-5"
    >
      {/* Portrait container */}
      <div
        ref={portraitRef}
        className="relative overflow-hidden bg-bg-surface"
        style={{ aspectRatio: "3/4" }}
      >
        {specialist.photo ? (
          <Image
            src={specialist.photo}
            alt={`Foto de ${specialist.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-surface">
            <div className="specialist-monogram" aria-hidden="true">
              <span className="specialist-monogram-initials">
                {initialsFromName(specialist.name)}
              </span>
            </div>
          </div>
        )}

        {/* Dark overlay with radial mask — primary reveal path */}
        {hasMaskStyle && (
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={
              {
                background: "#080808",
                "--cx": "50%",
                "--cy": "60%",
                "--r": "0%",
                maskImage:
                  "radial-gradient(circle at var(--cx) var(--cy), transparent 0%, transparent var(--r), rgba(0,0,0,0.92) calc(var(--r) + 18%), rgba(0,0,0,0.92) 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle at var(--cx) var(--cy), transparent 0%, transparent var(--r), rgba(0,0,0,0.92) calc(var(--r) + 18%), rgba(0,0,0,0.92) 100%)",
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
        )}
      </div>

      {/* Identity — always readable regardless of mask/opacity */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs tracking-label text-gold uppercase">
          {specialist.specialty}
        </p>
        <h3 className="font-display text-xl tracking-display text-text-primary md:text-2xl">
          {specialist.name}
        </h3>
        {specialist.title ? (
          <p className="font-sans text-sm font-light text-text-secondary">
            {specialist.title}
          </p>
        ) : null}
        <p className="mt-1 font-sans text-sm font-light leading-relaxed text-text-secondary max-w-xs">
          {specialist.bio}
        </p>
      </div>
    </article>
  );
}

interface SpecialistsRevealProps {
  specialists: Specialist[];
}

export function SpecialistsReveal({ specialists }: SpecialistsRevealProps) {
  const [supportsMask, setSupportsMask] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mask =
      CSS.supports("mask-image", "radial-gradient(black, transparent)") ||
      CSS.supports("-webkit-mask-image", "radial-gradient(black, transparent)");
    const applyMask = () => setSupportsMask(mask);
    applyMask();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 md:gap-10"
    >
      {specialists.map((specialist) => (
        <li key={specialist.id}>
          <SpecialistRevealCard
            specialist={specialist}
            supportsMask={supportsMask}
            reducedMotion={reducedMotion}
          />
        </li>
      ))}
    </ul>
  );
}
