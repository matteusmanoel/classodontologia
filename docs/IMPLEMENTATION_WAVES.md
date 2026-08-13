# Implementation Waves — Class Odontologia MVP

Shows the dependency graph and parallelism for Cloud Agent execution.

```
[GATE: Architecture v2 Approved + Documentation Approved]

Wave 0A — Foundation (blocks all subsequent waves)
  ISSUE-001: Initialize Next.js 16, TypeScript, Tailwind v4, pnpm, ESLint, vercel.json

Wave 0B — Asset Spikes (parallel with 0A; Spike D requires 0A Vercel Preview)
  ISSUE-002: Watermark inspection + Spike A (encoding profile)
  ISSUE-003: Spike B (seek scheduler) — depends on ISSUE-002 encoded asset
  ISSUE-004: Spike D (Vercel delivery) — depends on ISSUE-001 Vercel Preview
  ISSUE-005: Golden logo video encoding (independent; no spike needed)

[GATE: Wave 0A complete]

Wave 1 — Core Systems (all parallel)
  ISSUE-006: Design System (tokens, base UI components)
  ISSUE-007: Content Architecture (config/site.ts, content/*.ts)
  ISSUE-008: App Shell + Fonts + SEO (layout.tsx, globals.css, sitemap, robots, OG image)

[GATE: ISSUE-002 + ISSUE-003 complete (Spikes A+B)]
[GATE: ISSUE-006 + ISSUE-007 complete (Design System + Content)]

Wave 2A — Hero Cinematic (sequential within 2A; depends on ISSUE-002, 003, 006)
  ISSUE-009: GoldenLogo component (depends on ISSUE-005 + ISSUE-006)
  ISSUE-010: ToothScrubber component (depends on ISSUE-002, 003, 006)
  ISSUE-011: HeroSection composition (depends on ISSUE-009, 010)

Wave 2B — Content Sections (all parallel; depends on ISSUE-006 + ISSUE-007)
  ISSUE-012: ManifestoSection
  ISSUE-013: SpecialtiesSection + SpecialtyCard
  ISSUE-014: SpecialistsSection + SpecialistCard
  ISSUE-015: AppointmentCTA + Footer

[GATE: Wave 2A + Wave 2B complete]

Wave 3 — Integration
  ISSUE-016: Page Integration (app/page.tsx composition + SSR verification)

[GATE: ISSUE-016 complete]

Wave 4 — QA Streams (parallel)
  ISSUE-017: Playwright suite (smoke, viewport, reduced-motion, a11y)
  ISSUE-018: Performance audit (Lighthouse, bundle analysis, LCP verification)
  ISSUE-019: Spike C — Mobile cinematic validation (runs here; result may trigger fix)
  ISSUE-020: Accessibility audit (axe-core, keyboard, manual checklist)

[GATE: All Wave 4 issues pass]

Wave 5 — Release
  ISSUE-021: Apply real content (replace all PLACEHOLDER values)
  ISSUE-022: Production deployment (Vercel, domain, env config, structured data)
```

## Parallelism Summary

| Wave | Issues | Can run in parallel |
|---|---|---|
| 0A | 1 | No (serial foundation) |
| 0B | 2, 3, 4, 5 | 2+5 parallel; 3 after 2; 4 after 0A |
| 1 | 6, 7, 8 | All parallel |
| 2A | 9, 10, 11 | 9+10 parallel; 11 after both |
| 2B | 12, 13, 14, 15 | All parallel |
| 3 | 16 | Serial (integration) |
| 4 | 17, 18, 19, 20 | All parallel |
| 5 | 21, 22 | 21 before 22 |

Maximum theoretical concurrency: **4 agents simultaneously** (during Waves 1 and 2B).

## Spike Gate Behavior

- If Spike A fails (watermark confirmed, no clean asset): production of Hero cinematic is blocked. Escalate to Project Owner for asset replacement.
- If Spike B produces unexpected results (all strategies unacceptable): escalate to Project Owner before implementing ToothScrubber.
- If Spike C shows all mobile options are unacceptable: escalate before Wave 5. The poster fallback (C4) ships as the mobile experience.
- If Spike D fails (Vercel cannot serve range requests): evaluate UX impact before adding infrastructure. Escalate if file size + UX combination is problematic.
