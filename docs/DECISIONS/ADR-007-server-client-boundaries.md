# ADR-007 — Server/Client Component Boundaries

**Status: ACCEPTED**
**Date: 2026-08-12**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision

**Server Components by default. Client Components only as narrow browser/interactivity islands.**

---

## Context

Next.js 16.x App Router renders Server Components (SC) and Client Components (CC) differently:

- **Server Components** render at build time or request time on the server. They emit HTML. They have zero client-side JavaScript unless they pass children to a CC.
- **Client Components** (marked `"use client"`) ship JavaScript to the browser. They enable browser APIs, event handlers, React state, and GSAP.

Every CC adds to the client JS bundle. Unnecessary CCs inflate INP and reduce the initial render performance advantage of SSR.

---

## Rule

> Server Components by default.
> Mark a component `"use client"` only when it uses:
> - Browser-only APIs (`window`, `document`, `navigator`, `IntersectionObserver`, `ResizeObserver`)
> - Event handlers (`onClick`, `onChange`, `onScroll`)
> - React hooks that require state or effects (`useState`, `useEffect`, `useRef`, `useGSAP`)
> - GSAP (ScrollTrigger, gsap instance)
> - The `<video>` element with JS control

---

## Client Component Inventory

| Component | Reason for CC | Status |
|---|---|---|
| `HeroCinematic.tsx` | GSAP, ScrollTrigger, `useRef`, video control | Active |
| `ToothScrubber.tsx` | GSAP ScrollTrigger, `video.currentTime`, `useRef` | Active |
| `SmileWell.tsx` | IntersectionObserver, optional `<video>` play-once | **Archived** — removed from Manifesto (D11, ADR-009 update). Do not import; do not delete source file. |
| `SpecialtiesScene.tsx` _(net-new, class-experience-v1)_ | GSAP ScrollTrigger scrub, sticky, `useRef` | Authorized by ADR-011 |
| `SpecialistsReveal.tsx` _(net-new, class-experience-v1)_ | GSAP entry timeline, CSS mask animation, `useRef` | Authorized by ADR-012 |

All `components/sections/` and `components/ui/` components are Server Components unless there is a documented reason for CC.

---

## `next/dynamic` and `ssr: false`

**`ssr: false` is not supported when `dynamic()` is called from a Server Component.** The Next.js App Router throws a build error if `dynamic(..., { ssr: false })` is used directly in a Server Component.

**Correct patterns:**

**Pattern A (recommended):** Mark cinematic components `"use client"` directly. GSAP does not throw errors during SSR — all browser API access is inside `useGSAP()` or `useEffect()` callbacks, which only run in the browser. No `dynamic()` needed.

**Pattern B (only when SSR of the video element is specifically problematic):** Create a Client Component intermediary:

```tsx
// components/cinematic/HeroCinematicLoader.tsx
"use client"
import dynamic from "next/dynamic"
const HeroCinematic = dynamic(
  () => import("./HeroCinematic"),
  { loading: () => <div className="hero-poster-placeholder" />, ssr: false }
)
export default function HeroCinematicLoader() {
  return <HeroCinematic />
}
```

Use Pattern A by default. Use Pattern B only if Pattern A causes a confirmed, reproducible SSR error in the production build.

---

## Server → Client Data Flow

Content data flows from Server Components to Client Components as serializable props. Client Components never import from `content/` or `config/` directly.

```tsx
// Server Component (OK)
import { specialists } from "@/content/specialists"
export default function SpecialistsSection() {
  return <SpecialistList specialists={specialists} />
}

// Client Component (receives data as prop — never imports from content/)
"use client"
function SpecialistList({ specialists }: { specialists: Specialist[] }) { ... }
```

---

## Section Reveals Without Client Components

Level 2 motion (section fade-in on scroll entry) can be achieved with CSS `@keyframes` + a small `IntersectionObserver` toggling a class name. This pattern does not require a Client Component — a single shared observer module is loaded client-side but is not a React component:

```typescript
// lib/reveal-observer.ts — plain TS module, loaded once
export function observeReveal(elements: NodeListOf<Element>) { ... }
```

Called from a `<script>` tag or via a minimal `"use client"` wrapper that only contains the observer init and no JSX. Reserve GSAP (a full Client Component) for Level 3+ orchestrated animations.

---

## Consequences

- **Easier:** Faster initial render, smaller JS bundle, better LCP, simpler data flow
- **Harder:** Some patterns (interactivity in the middle of a section) require explicit CC wrapping
- **Accepted trade-off:** This is the intended App Router model. The discipline pays dividends in performance.

---

## What Agents Must Do

- Default to Server Components
- Never add `"use client"` without a documented browser API or hook requirement
- Never add `"use client"` to directories (a directive in `app/` or a module boundary is for the file only)
- Never use `ssr: false` from a Server Component — use Pattern A or B above
- Keep content imports in Server Components; pass typed props to Client Components
