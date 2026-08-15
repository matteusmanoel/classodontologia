"use client";

/**
 * PROTOTYPE — Golden Logo bridge section variants.
 * Question: What does the Golden Logo bridge section look like?
 * Three structurally different layouts, switchable via ?variant=1|2|3.
 *
 * Run: pnpm dev → http://localhost:3000/prototype/golden-bridge
 * Throwaway. Do not ship.
 */

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "@/components/ui/PrototypeSwitcher";
import {
  GOLDEN_BRIDGE_VARIANTS,
  Variant1FullBleedLoop,
  Variant2ContainedOnce,
  Variant3EditorialEyebrow,
} from "./variants";

function GoldenBridgePrototypeInner() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant") ?? "1";

  return (
    <>
      <div className="border-b border-white/10 bg-[#080808] px-6 py-8 text-center">
        <p className="font-sans text-xs tracking-label uppercase text-gold">
          Prototype — throwaway
        </p>
        <h1 className="mt-3 font-display text-2xl text-text-primary md:text-3xl">
          Golden Logo bridge
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-sans text-sm font-light text-text-secondary">
          Flip variants with ← → or the bar below. Pick one; the winner becomes
          GoldenBridgeSection between Hero and Manifesto.
        </p>
        <p className="mt-2 font-mono text-xs text-text-secondary">
          state: variant={variant}
        </p>
      </div>

      {/* Fake hero spacer so the bridge sits in context */}
      <div className="flex h-[40vh] items-end justify-center bg-[#080808] pb-10">
        <p className="font-sans text-xs tracking-label uppercase text-text-secondary">
          ← Hero (tooth scrub) ends above
        </p>
      </div>

      {variant === "2" ? (
        <Variant2ContainedOnce />
      ) : variant === "3" ? (
        <Variant3EditorialEyebrow />
      ) : (
        <Variant1FullBleedLoop />
      )}

      <div className="flex h-[40vh] items-start justify-center bg-[#080808] pt-10">
        <p className="font-sans text-xs tracking-label uppercase text-text-secondary">
          Manifesto starts below →
        </p>
      </div>

      <PrototypeSwitcher
        variants={[...GOLDEN_BRIDGE_VARIANTS]}
        param="variant"
      />
    </>
  );
}

export default function GoldenBridgePrototypePage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#080808] px-6 py-20 text-center text-text-secondary">
          Loading prototype…
        </div>
      }
    >
      <GoldenBridgePrototypeInner />
    </Suspense>
  );
}
