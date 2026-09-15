"use client";

/**
 * PROTOTYPE — Manifesto golden hairline treatments.
 * Scrollable scenes (A–E). Homepage Manifesto is untouched.
 *
 * Run: pnpm dev → http://localhost:3000/prototype/manifesto-line
 * Throwaway. Do not ship.
 */

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "@/components/ui/PrototypeSwitcher";
import { copy } from "@/content/copy";
import { ManifestoLineScene } from "./ManifestoLineScene";
import { MANIFESTO_LINE_VARIANTS } from "./variants";

function ManifestoLinePrototypeInner() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("variant") ?? "a";
  const variant =
    raw === "b" || raw === "c" || raw === "d" || raw === "e" ? raw : "a";

  return (
    <>
      <div className="border-b border-white/10 bg-[#080808] px-6 py-8 text-center">
        <p className="font-sans text-xs tracking-label text-gold uppercase">
          Prototype — throwaway
        </p>
        <h1 className="mt-3 font-display text-2xl text-text-primary md:text-3xl">
          Manifesto — linha dourada
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-sans text-sm font-light text-text-secondary">
          Flip variants with ← → or the bar below. Each scene is a full
          scroll: fake Hero → auto-draw → scrub → wash into Especialidades.
        </p>
        <p className="mt-2 font-mono text-xs text-text-secondary">
          state: variant={variant}
        </p>
      </div>

      <div className="flex h-[70vh] items-end justify-center bg-[#080808] px-(--section-px) pb-16">
        <p className="max-w-xl text-center font-display text-xl tracking-display text-text-primary/80 md:text-2xl">
          {copy.hero.scrollLines[1]}
        </p>
      </div>

      <ManifestoLineScene key={variant} variant={variant} />

      <div className="flex min-h-[80vh] flex-col items-start justify-center bg-[#080808] px-(--section-px) py-24">
        <p className="font-mono text-xs tracking-label text-gold uppercase">
          Especialidades (mock)
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-3xl tracking-display text-text-primary md:text-[clamp(2.5rem,5vw,4.5rem)]">
          {copy.specialties.heading}
        </h2>
        <p className="mt-6 max-w-xl font-sans text-lg font-light text-text-secondary">
          {copy.specialties.subheading}
        </p>
      </div>

      <PrototypeSwitcher
        variants={[...MANIFESTO_LINE_VARIANTS]}
        param="variant"
      />
    </>
  );
}

export default function ManifestoLinePrototypePage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#080808] px-6 py-20 text-center text-text-secondary">
          Loading prototype…
        </div>
      }
    >
      <ManifestoLinePrototypeInner />
    </Suspense>
  );
}
