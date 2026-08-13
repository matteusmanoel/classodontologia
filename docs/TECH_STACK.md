# Tech Stack — Class Odontologia MVP

**All versions verified from npm registry: 2026-08-12.**

## Core Stack

| Tool | Version | Role | Status |
|---|---|---|---|
| Next.js | `16.x` (16.3.0 current) | Framework — App Router | USE |
| React | `19.x` (19.2.8 current) | UI library | USE |
| TypeScript | `5.x` | Type safety | USE |
| Tailwind CSS | `4.x` (4.3.3 current) | Styling — CSS-first | USE |
| GSAP | `3.x` (3.15.0 current) | Animation | USE |
| `@gsap/react` | `2.x` (2.1.2 current) | `useGSAP()` hook | USE |
| pnpm | current stable | Package manager | USE |
| Vercel | — | Deployment + CDN | USE |
| FFmpeg | — | Build-time asset encoding | USE (build-time only) |

> Pin exact patch versions in `package.json` during Wave 0.

## GSAP License

GSAP 3.x is free for all uses including commercial. All plugins (ScrollTrigger, SplitText, MorphSVG, etc.) are included under the standard no-charge license. Verify at: `https://gsap.com/standard-license`.

## Tailwind v4 Configuration

Tailwind v4 is CSS-first. No `tailwind.config.ts` is required for a standard setup. Configuration lives in `styles/tokens.css` via `@theme {}` (for Tailwind utility generation) and `:root {}` (for CSS custom properties not needing Tailwind utilities). See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Tooling

| Tool | Decision | Reason |
|---|---|---|
| Playwright | USE | Automated QA — Chromium + WebKit |
| ESLint | USE | Code quality — Next.js default config |
| TypeScript strict | USE | Agent-safe codebases require strict typing |
| next/font | USE | Zero-FOUT font loading, automatic subsetting |
| next/image | USE | WebP delivery, responsive sizes, LCP optimization |

## Explicitly Excluded

| Tool | Decision | Reason |
|---|---|---|
| Three.js | DO NOT USE | Pre-rendered video achieves equivalent visual result (ADR-001) |
| React Three Fiber | DO NOT USE | Same as Three.js |
| Spline | DO NOT USE | Runtime 3D dependency |
| Framer Motion | DO NOT USE | Redundant with GSAP; heavier bundle |
| Lenis / smooth-scroll | DO NOT USE | No clear requirement; scroll conflict risk |
| Supabase | DO NOT USE | No backend needed |
| Redis | DO NOT USE | No runtime cache needed |
| shadcn/ui | OPTIONAL | Add only if a complex primitive (Dialog, etc.) is needed |
| Vercel Analytics | OPTIONAL | One-line addition post-MVP |
| Any CMS | DO NOT USE | Content is typed TypeScript (ADR-004) |
| Runtime AI APIs | DO NOT USE | All AI assets are build-time artifacts |

## next/dynamic and `ssr: false`

`ssr: false` is not supported when `dynamic()` is called from a Server Component in the App Router. The recommended pattern for cinematic components:

- Mark them `"use client"` directly.
- GSAP does not crash during SSR — all browser API access lives in `useGSAP()` / `useEffect()`.
- Use `dynamic(..., { ssr: false })` only from within a Client Component intermediary if SSR of the video element is demonstrably problematic.

Default: Pattern A — direct `"use client"` on cinematic components, no dynamic import needed.
