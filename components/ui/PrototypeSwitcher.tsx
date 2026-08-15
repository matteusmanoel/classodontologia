"use client";

/**
 * PROTOTYPE ONLY — floating variant switcher.
 * Hidden in production builds.
 */

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PrototypeVariant {
  key: string;
  label: string;
}

export interface PrototypeSwitcherProps {
  variants: PrototypeVariant[];
  param?: string;
}

export function PrototypeSwitcher({
  variants,
  param = "variant",
}: PrototypeSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isProd = process.env.NODE_ENV === "production";

  const currentKey = searchParams.get(param) ?? variants[0]?.key ?? "1";
  const index = Math.max(
    0,
    variants.findIndex((variant) => variant.key === currentKey),
  );
  const current = variants[index] ?? variants[0];

  const go = useCallback(
    (nextIndex: number) => {
      const wrapped = (nextIndex + variants.length) % variants.length;
      const next = variants[wrapped];
      if (!next) {
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set(param, next.key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [variants, searchParams, param, router, pathname],
  );

  useEffect(() => {
    if (isProd) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, isProd]);

  if (isProd || !current) {
    return null;
  }

  return (
    <div
      className="prototype-switcher fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-black/90 px-4 py-2 text-sm text-white shadow-2xl backdrop-blur-md"
      role="group"
      aria-label="Prototype variant switcher"
    >
      <button
        type="button"
        className="rounded-full px-2 py-1 hover:bg-white/10"
        aria-label="Previous variant"
        onClick={() => go(index - 1)}
      >
        ←
      </button>
      <span className="min-w-[12rem] text-center font-sans text-xs tracking-wide">
        {current.key} — {current.label}
      </span>
      <button
        type="button"
        className="rounded-full px-2 py-1 hover:bg-white/10"
        aria-label="Next variant"
        onClick={() => go(index + 1)}
      >
        →
      </button>
    </div>
  );
}
