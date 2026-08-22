# Architecture — Class Odontologia MVP

**Authority: HIGH** — superseded only by Accepted ADRs.

> **Updated by `class-experience-v1` / ADR-013 (2026-08-21).** The homepage composition moves from 5 sections to **9 narrative acts** (Hero, Manifesto, Legacy, Specialties, Method, Specialists, Selected by CLASS, Place, Conversion) with a dark↔paper block choreography. The production **canonical domain is `https://classodontologia.com.br`** (see `config/site.ts` update, D4) — the "Domain is TBD / Vercel preview" note below is superseded. Framework, no-backend, Server-first (ADR-007), and no-runtime-3D (ADR-001) constraints are unchanged.

## Framework

Next.js 16.x App Router · React 19 · TypeScript 5 · Vercel

- App Router is the routing model. Pages Router is not used.
- Pin exact patch version during Wave 0 Foundation.
- Server Components by default. See [ADR-007](DECISIONS/ADR-007-server-client-boundaries.md).

## What this is

A statically-generated / edge-rendered Next.js landing page. No backend. No database. No CMS. No runtime AI. No authentication. The production application makes zero API calls at request time.

## Proposed Directory Structure

```
classodontologia/
├── app/
│   ├── layout.tsx           # RootLayout — Server: fonts, metadata, html/body
│   ├── page.tsx             # LandingPage — Server: section composition
│   ├── globals.css          # Tailwind import + global resets
│   ├── sitemap.ts           # Next.js native sitemap
│   ├── robots.ts            # Next.js native robots
│   └── not-found.tsx        # 404
│
├── components/
│   ├── cinematic/           # "use client" — GSAP, video, scroll
│   │   ├── HeroCinematic.tsx
│   │   ├── GoldenLogo.tsx
│   │   └── ToothScrubber.tsx
│   │
│   ├── sections/            # Server Components — static HTML
│   │   ├── HeroSection.tsx
│   │   ├── ManifestoSection.tsx
│   │   ├── SpecialtiesSection.tsx
│   │   ├── SpecialistsSection.tsx
│   │   ├── AppointmentCTA.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/                  # Shared primitives — Server by default
│       ├── Container.tsx
│       ├── SectionHeading.tsx
│       ├── Button.tsx
│       └── SpecialistCard.tsx
│
├── config/
│   └── site.ts              # Brand, contact, metadata constants
│
├── content/
│   ├── specialists.ts       # Typed doctor data
│   ├── specialties.ts       # Typed treatment categories
│   └── copy.ts              # Section copy, CTAs, labels
│
├── lib/
│   ├── motion.ts            # GSAP easing presets, motion constants
│   └── video.ts             # Video path constants, duration constants
│
├── styles/
│   └── tokens.css           # Design token source of truth
│
├── public/
│   └── assets/
│       ├── brand/           # Logo variants (WebP)
│       ├── cinematic/
│       │   ├── tooth/       # Encoded MP4 + poster (post-Spike A)
│       │   └── logo/        # Encoded MP4 + poster (post-encoding)
│       ├── clinic/          # Future: clinic photography
│       ├── people/          # Future: specialist photography
│       └── treatments/      # Future: treatment photography
│
├── e2e/                     # Playwright tests
├── docs/                    # Project documentation (this directory)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Component Tree — Server/Client Boundaries

```
app/page.tsx                          SERVER
  ├── HeroSection.tsx                 SERVER (h1, semantic wrapper)
  │     └── HeroCinematic.tsx         CLIENT "use client"
  │           ├── GoldenLogo.tsx      CLIENT "use client"
  │           └── ToothScrubber.tsx   CLIENT "use client"
  │
  ├── ManifestoSection.tsx            SERVER (static markup)
  │     └── [optional] ManifestoReveal.tsx  CLIENT — only if GSAP reveal needed
  │
  ├── SpecialtiesSection.tsx          SERVER
  │     └── SpecialtyCard.tsx         SERVER (static HTML)
  │
  ├── SpecialistsSection.tsx          SERVER
  │     └── SpecialistCard.tsx        SERVER (static HTML)
  │
  ├── AppointmentCTA.tsx              SERVER (simple <a> link)
  │
  └── Footer.tsx                      SERVER
```

Section reveals (Level 2 motion) are implemented via CSS `@keyframes` + `animation-play-state` toggled by a lightweight `IntersectionObserver`. This avoids requiring Client Components for static content sections. If GSAP is needed for a specific effect, a narrow Client Component leaf is added.

## Absolute Constraints

- No Three.js / R3F / Spline / WebGL for the MVP
- No CMS, database, or backend
- No runtime AI API calls
- No Lenis or smooth-scroll library
- No Pages Router
- No global state management library (no Zustand, no Redux)
- No paid runtime dependencies without project-level approval

See full invariant list in [AGENT_CONTRACT.md](AGENT_CONTRACT.md).

## Content Model

Content lives in typed TypeScript objects under `config/` and `content/`. No CMS. Content is passed as props from Server Components. Client Components receive content as serializable props — they never import from `content/` directly.

See [ADR-004](DECISIONS/ADR-004-local-typed-content-no-cms.md) and [CONTENT_MAP.md](CONTENT_MAP.md).

## Deployment

Vercel. App Router with static generation / ISR. No custom server. Domain is TBD — Vercel preview URL used during MVP development.

See [PERFORMANCE.md](PERFORMANCE.md) for caching headers.
