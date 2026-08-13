# Milestones — Class Odontologia MVP

## Milestone 0 — Foundation, Spikes, and Asset Preparation

**Goal:** Running Next.js skeleton on Vercel + validated encoding profile + seek strategy confirmed.

Deliverables:
- Next.js 16 App Router application initialized (git, pnpm, TypeScript, Tailwind v4, ESLint)
- Vercel Preview deployment live
- `vercel.json` with cache headers
- Spike A complete → final encoded tooth cinematic
- Spike B complete → canonical seek scheduler selected (ADR-003 accepted)
- Spike D complete → Vercel video delivery validated
- Golden logo video encoded and renamed
- Cinematic source files visually inspected (watermark check)

**Gate:** Foundation must be merged before Milestones 1–2 begin. Spikes A and B must be complete before Hero cinematic implementation (Milestone 2).

---

## Milestone 1 — Design System, Content, and App Shell

**Goal:** The page renders complete server-side HTML with placeholder content, correct fonts, and the token system in place.

Deliverables:
- `styles/tokens.css` with Tailwind v4 `@theme` tokens
- Base UI components: `Container`, `SectionHeading`, `Button`, `SpecialistCard`
- `config/site.ts` and `content/*.ts` with typed interfaces and placeholder values
- `app/layout.tsx` — fonts loaded via `next/font`, metadata API, `lang="pt-BR"`
- `app/globals.css` — Tailwind import and global resets
- `app/sitemap.ts`, `app/robots.ts`
- OG image placeholder at `public/og-image.jpg`
- All section server components render placeholder HTML

**Gate:** Design System and Content must be complete before section development and Hero cinematic can proceed.

---

## Milestone 2 — Cinematic Hero

**Goal:** The Hero section is functional — golden logo loops, tooth scroll scrubbing works on desktop, poster and reduced-motion fallbacks confirmed.

Deliverables:
- `GoldenLogo.tsx` — autoplay loop, poster, reduced-motion CSS
- `ToothScrubber.tsx` — CSS sticky, ScrollTrigger, Spike B seek strategy, poster fallback, error fallback, reduced-motion behavior
- `HeroCinematic.tsx` — composition of the two above + text layer
- `HeroSection.tsx` — Server Component wrapper
- Manual validation: Safari macOS

**Gate:** Milestone 0 (encoded assets + Spike B result) and Milestone 1 (Design System) must be complete.

---

## Milestone 3 — MVP Content Sections

**Goal:** All 6 MVP sections render with correct layout, typography, and placeholder content.

Deliverables:
- `ManifestoSection.tsx` — typographic statement, Level 2–3 reveals
- `SpecialtiesSection.tsx` + `SpecialtyCard.tsx` — specialty grid
- `SpecialistsSection.tsx` + `SpecialistCard.tsx` — doctor cards with placeholder photos
- `AppointmentCTA.tsx` — CTA section with configurable link
- `Footer.tsx` — logo, contact placeholders, social links

**Gate:** Milestone 1 complete. Runs in parallel with Milestone 2.

---

## Milestone 4 — Integration

**Goal:** Complete landing page assembled and verified end-to-end.

Deliverables:
- `app/page.tsx` composed with all sections in correct order
- Server/Client boundary verified (no `"use client"` contamination in Server Components)
- SSR output verified (HTML includes correct headings and semantic structure)
- Metadata and Open Graph verified
- No console errors on any page load

**Gate:** Milestones 2 and 3 both complete.

---

## Milestone 5 — QA, Performance, and Accessibility

**Goal:** All release gates pass.

Deliverables:
- Playwright test suite passing (Chromium + WebKit)
- Lighthouse scores: Performance > 90, Accessibility > 90, SEO > 90
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- axe-core zero critical violations
- Manual Safari macOS validation complete
- Manual iOS Safari validation complete (Spike C result applied)
- Spike C complete → mobile cinematic behavior finalized
- Performance audit report documented

**Gate:** Milestone 4 complete.

---

## Milestone 6 — Release

**Goal:** Production deployment ready.

Deliverables:
- All placeholder content replaced with approved client content
- Vercel production deployment configured
- Environment configuration finalized
- Domain connection ready (or Vercel URL confirmed for soft launch)
- Structured data (LocalBusiness JSON-LD) emitted with real business data
- Final build validated on production URL

**Gate:** Milestone 5 complete + all `REQUIRED BEFORE LAUNCH` content from CONTENT_MAP.md delivered.
