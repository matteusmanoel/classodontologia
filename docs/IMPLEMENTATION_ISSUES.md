# Implementation Issues — Class Odontologia MVP

Each issue is sized for one Cloud Agent. Read [AGENT_CONTRACT.md](AGENT_CONTRACT.md) before beginning any issue.

---

## ISSUE-001 — Initialize Next.js 16 Foundation

**Milestone:** 0 | **Wave:** 0A

### Purpose

Create the runnable Next.js application skeleton that every subsequent issue depends on.

### Scope

- Initialize Next.js 16.x with App Router, TypeScript, Tailwind v4, ESLint via official `create-next-app` (or manual init matching the documented stack)
- Configure pnpm as the package manager
- Create `vercel.json` with cache headers per ASSET_CONTRACT.md
- Create `.gitignore`, `.nvmrc` (Node.js LTS), `tsconfig.json` (strict mode)
- Add `pnpm typecheck` and `pnpm lint` scripts to `package.json`
- Create placeholder `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create directory structure: `app/`, `components/cinematic/`, `components/sections/`, `components/ui/`, `config/`, `content/`, `lib/`, `styles/`, `e2e/`, `public/assets/`
- Deploy to Vercel (connect git repository, create project)
- Confirm Vercel Preview URL accessible

### Owned Files

- `package.json`, `pnpm-lock.yaml`
- `next.config.ts`
- `tsconfig.json`
- `.gitignore`, `.nvmrc`
- `vercel.json`
- `app/layout.tsx` (placeholder), `app/page.tsx` (placeholder), `app/globals.css` (placeholder)
- All empty directory structure

### Files That Must Not Be Modified

None — this is the initial commit. All files are new.

### Dependencies

None — this is Wave 0A.

### Inputs

- [ARCHITECTURE.md](ARCHITECTURE.md) — directory structure
- [TECH_STACK.md](TECH_STACK.md) — exact package versions
- [ASSET_CONTRACT.md](ASSET_CONTRACT.md) — cache header strategy

### Implementation Requirements

- Next.js version: `16.x` (pin exact patch)
- React version: `19.x`
- TypeScript version: `5.x`
- Tailwind CSS: `4.x`
- `tsconfig.json`: `"strict": true`, `"moduleResolution": "bundler"`, path alias `@/*` pointing to project root
- `vercel.json` cache headers:
  ```json
  {
    "headers": [
      {
        "source": "/assets/cinematic/(.*)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      },
      {
        "source": "/assets/(.*)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
        ]
      }
    ]
  }
  ```
- `app/layout.tsx` placeholder: renders `<html lang="pt-BR"><body>{children}</body></html>` with a `TODO: fonts, metadata` comment
- `app/page.tsx` placeholder: renders `<main><h1>Class Odontologia — Coming Soon</h1></main>`

### Acceptance Criteria

- [ ] `pnpm install` completes without errors
- [ ] `pnpm dev` starts the development server and renders the placeholder page
- [ ] `pnpm build` completes without TypeScript or Next.js errors
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes with zero errors
- [ ] Vercel Preview URL responds with the placeholder page
- [ ] Directory structure matches ARCHITECTURE.md

### Validation Commands

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm build
pnpm dev
```

### Definition of Done

All acceptance criteria checked. Vercel Preview URL documented in the PR description. No TypeScript `any` without explicit comment. No packages added beyond those in TECH_STACK.md.

---

## ISSUE-002 — Spike A: Tooth Video Watermark Check + Encoding

**Milestone:** 0 | **Wave:** 0B

### Purpose

Validate the source video for watermarks and produce the final encoded tooth cinematic asset.

### Scope

- Visual inspection of `vidu-video-3419599273445859.mp4` for watermarks
- If watermark confirmed: stop, escalate to Project Owner. Do not proceed until a clean asset is provided.
- Encode 2–5 variants per the Spike A procedure in [SPIKES.md](SPIKES.md)
- Measure seek latency using the chain: `currentTime` assignment → `seeked` → `requestVideoFrameCallback()` where supported
- Select winning variant based on pass criteria
- Produce final `tooth-cinematic-v1.mp4` and `tooth-cinematic-v1-poster.webp`
- Document encoding parameters in `ASSET_CONTRACT.md`

### Owned Files

- `public/assets/cinematic/tooth/tooth-cinematic-v1.mp4` (new)
- `public/assets/cinematic/tooth/tooth-cinematic-v1-poster.webp` (new)
- `docs/ASSET_CONTRACT.md` — append encoding parameters section
- `docs/DECISIONS/ADR-005-video-delivery-codec.md` — append final encoding parameters

### Files That Must Not Be Modified

- Source video files — copy, do not overwrite
- Any application code files

### Dependencies

None — runs parallel with ISSUE-001.

### Inputs

- Source: `public/assets/cinematic/tooth/vidu-video-3419599273445859.mp4`
- [SPIKES.md](SPIKES.md) Spike A procedure
- [ASSET_CONTRACT.md](ASSET_CONTRACT.md) naming and requirements

### Implementation Requirements

- FFmpeg must be available on the encoding machine
- Watermark check: play the source at 0%, 25%, 50%, 75%, 100% of duration and confirm no visible overlay
- Encode Variants A1–A3 minimum using the ffmpeg commands in SPIKES.md
- Create a minimal test HTML page to measure seek behavior
- Preferred measurement chain: `seeked` event + `requestVideoFrameCallback()` where available. Document timing in KB and ms per variant.
- Extract poster: `ffmpeg -i tooth-cinematic-v1.mp4 -vf "select=eq(n\,0)" -vframes 1 -f image2 poster.png` then convert to WebP ≤ 30KB
- Rename and move to `public/assets/cinematic/tooth/`

### Acceptance Criteria

- [ ] Watermark check passed (no visible watermark at any inspected frame)
- [ ] Final encoded file uses H.264, yuv420p, faststart, no audio (verified with ffprobe)
- [ ] Seek latency ≤ 100ms in Chrome (`seeked` timing) for the selected variant
- [ ] Seek latency ≤ 200ms in WebKit for the selected variant
- [ ] No visible compression artifacts at 1280px viewport width
- [ ] Poster file ≤ 30KB
- [ ] Encoding parameters documented in ASSET_CONTRACT.md

### Validation Commands

```bash
ffprobe -v quiet -print_format json -show_format -show_streams tooth-cinematic-v1.mp4
# Verify: codec=h264, has_b_frames>=0, no audio stream
```

### Definition of Done

Final asset in `public/assets/cinematic/tooth/`, encoding parameters documented. ISSUE-003 can now begin.

---

## ISSUE-003 — Spike B: Seek Scheduler Evaluation

**Milestone:** 0 | **Wave:** 0B

### Purpose

Determine the canonical seek scheduling strategy for scroll-driven video scrubbing.

### Scope

- Build a minimal test page (plain HTML — not the Next.js app) using the ISSUE-002 encoded video
- Implement variants B1, B2, and B3 as defined in [SPIKES.md](SPIKES.md)
- Evaluate each in Chrome and WebKit
- Evaluate `fastSeek()` as an optional addition
- Document results and select winner
- Update ADR-003

### Owned Files

- `docs/DECISIONS/ADR-003-scroll-video-architecture.md` — append decision + update status to ACCEPTED
- `docs/SPIKES.md` — append results summary

### Files That Must Not Be Modified

- Any application source code in `app/`, `components/`, `lib/`
- ISSUE-002 encoded asset (read-only input)

### Dependencies

ISSUE-002 must be complete (provides the encoded video).

### Inputs

- `public/assets/cinematic/tooth/tooth-cinematic-v1.mp4`
- [SPIKES.md](SPIKES.md) Spike B procedure

### Implementation Requirements

- Test must be performed in both Chromium and WebKit (local Safari or Playwright WebKit browser)
- Measure for each variant:
  - Subjective scroll smoothness (1–5 scale)
  - Main thread CPU during scroll (Chrome DevTools Performance recording)
  - Count of `seeked` events per second of scrolling
- Use Chrome DevTools to verify frame delivery — do not use `timeupdate` as the primary timing metric
- If `fastSeek()` is evaluated: note whether frame-level accuracy loss is perceptible during natural scroll speed
- Document raw measurements in a brief results table in the ADR or SPIKES.md

### Acceptance Criteria

- [ ] All three strategies implemented and tested
- [ ] Winning strategy identified
- [ ] `fastSeek()` decision documented (adopted or not adopted)
- [ ] ADR-003 updated with: winning strategy, measurement summary, status changed to ACCEPTED
- [ ] No Next.js application code modified

### Definition of Done

ADR-003 status is ACCEPTED. ISSUE-010 (ToothScrubber) may now begin.

---

## ISSUE-004 — Spike D: Vercel Video Delivery Validation

**Milestone:** 0 | **Wave:** 0B

### Purpose

Confirm that Vercel's CDN serves range requests for video in `public/assets/`, enabling mid-video seeking without full download.

### Scope

- Upload the ISSUE-002 encoded video to the ISSUE-001 Vercel Preview
- Inspect HTTP response headers for range request support
- Test mid-video seeking on a simulated slow connection
- Document results in SPIKES.md

### Owned Files

- `docs/SPIKES.md` — append Spike D results

### Files That Must Not Be Modified

Any application source code.

### Dependencies

ISSUE-001 (Vercel Preview must exist) and ISSUE-002 (encoded asset must exist).

### Inputs

- [SPIKES.md](SPIKES.md) Spike D procedure
- Vercel Preview URL from ISSUE-001

### Acceptance Criteria

- [ ] `Accept-Ranges: bytes` confirmed in response headers OR failure clearly documented
- [ ] Range request behavior confirmed via `206 Partial Content` OR failure documented
- [ ] Seeking on Slow 4G simulation tested
- [ ] Result documented: "Vercel is sufficient" OR "External media CDN needed (with reason)"

### Definition of Done

SPIKES.md updated with Spike D results. If Vercel is sufficient: no action. If not: escalate to Project Owner before proceeding with video delivery architecture.

---

## ISSUE-005 — Golden Logo Video Encoding

**Milestone:** 0 | **Wave:** 0B

### Purpose

Convert the golden identity `.MOV` source to a web-native H.264 MP4 with faststart and no audio.

### Scope

- Encode `copy_CDD43597-F083-4C89-ACD6-EC9311933303.mov` to H.264 MP4
- Add faststart (moov before mdat)
- Strip audio
- Rename to `golden-identity-v1.mp4`
- Extract poster as WebP ≤ 20KB
- Rename to `golden-identity-v1-poster.webp`

### Owned Files

- `public/assets/cinematic/logo/golden-identity-v1.mp4` (new)
- `public/assets/cinematic/logo/golden-identity-v1-poster.webp` (new)

### Files That Must Not Be Modified

Source `.MOV` file.

### Dependencies

None — runs parallel with ISSUE-001, 002, 004.

### Inputs

- Source: `public/assets/cinematic/logo/copy_CDD43597-F083-4C89-ACD6-EC9311933303.mov`
- [ASSET_CONTRACT.md](ASSET_CONTRACT.md)

### Implementation Requirements

```bash
ffmpeg -i source.mov \
  -c:v libx264 -crf 22 -preset slow \
  -pix_fmt yuv420p -movflags +faststart \
  -an \
  golden-identity-v1.mp4
```

No seeking optimization needed — this video is an autoplay loop, not scroll-scrubbed. Default GOP is fine.

### Acceptance Criteria

- [ ] Output: H.264, yuv420p, faststart, no audio (verified with ffprobe)
- [ ] Poster ≤ 20KB (WebP)
- [ ] Files placed in `public/assets/cinematic/logo/`

---

## ISSUE-006 — Design System: Tokens and Base Components

**Milestone:** 1 | **Wave:** 1

### Purpose

Create the design token source of truth and base UI components. All section components depend on this.

### Scope

- Create `styles/tokens.css` with `@theme` and `:root` sections per [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- Create `components/ui/Container.tsx` — max-width content wrapper
- Create `components/ui/SectionHeading.tsx` — `<h2>` with display serif styling
- Create `components/ui/Button.tsx` — primary CTA button (Server Component, `<a>` or `<button>`)
- Create `components/ui/SpecialistCard.tsx` — doctor card layout (Server Component)
- Create `lib/motion.ts` — GSAP easing constants (no GSAP import — just numeric arrays/strings)
- Create `lib/video.ts` — video path constants and duration guard constant

### Owned Files

- `styles/tokens.css`
- `components/ui/` (all files)
- `lib/motion.ts`
- `lib/video.ts`

### Files That Must Not Be Modified

- `app/globals.css` — the Foundation Agent owns this; import `styles/tokens.css` via a PR request to ISSUE-008
- Any cinematic components

### Dependencies

ISSUE-001 (Next.js initialized).

### Inputs

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- [TECH_STACK.md](TECH_STACK.md) — Tailwind v4 token syntax

### Implementation Requirements

- `@theme {}` block: colors, font families, text sizes, spacing scale used in Tailwind utilities
- `:root {}` block: motion durations, easings, z-index layers, section-level spacing (not needing Tailwind utility generation)
- `Container.tsx`: `max-w-[1280px] mx-auto px-[--section-px]` (Tailwind v4 arbitrary property syntax)
- `Button.tsx`: renders an `<a>` by default; accepts `variant: "primary" | "outline"`. Focus ring per ACCESSIBILITY.md.
- `SectionHeading.tsx`: renders `<h2>` with display serif font, gold accent option
- `SpecialistCard.tsx`: accepts `name`, `title`, `specialty`, `photo`, `bio` props; renders static HTML (Server Component)
- All UI components: TypeScript props with strict interface definitions; no `any`
- `lib/video.ts`: export `TOOTH_DURATION = 5.042` and `TOOTH_VIDEO_PATH`, `TOOTH_POSTER_PATH`, `GOLDEN_VIDEO_PATH`, `GOLDEN_POSTER_PATH`

### Acceptance Criteria

- [ ] `pnpm typecheck` passes after all components are created
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] `styles/tokens.css` contains both `@theme` and `:root` sections — no tokens duplicated between them
- [ ] All `components/ui/` are Server Components (no `"use client"`)
- [ ] `SpecialistCard.tsx` renders a semantically correct card with accessible `<img alt="">`

---

## ISSUE-007 — Content Architecture

**Milestone:** 1 | **Wave:** 1

### Purpose

Create all typed content interfaces and placeholder data. All section components depend on this for their props.

### Scope

- Create `config/site.ts`
- Create `content/specialists.ts`
- Create `content/specialties.ts`
- Create `content/copy.ts`

### Owned Files

- `config/site.ts`
- `content/specialists.ts`
- `content/specialties.ts`
- `content/copy.ts`

### Files That Must Not Be Modified

Anything in `app/`, `components/`, `styles/`.

### Dependencies

ISSUE-001 (Next.js initialized).

### Inputs

- [CONTENT_MAP.md](CONTENT_MAP.md) — full schemas and placeholder conventions

### Implementation Requirements

- Use the exact interfaces defined in CONTENT_MAP.md
- All placeholder values must use the `[CONTENT_NAME — PLACEHOLDER]` format exactly
- `specialists` array: 4 entries with confirmed names, all other fields `[PLACEHOLDER]`
- `specialties` array: 4–6 entries minimum, all `[PLACEHOLDER]`
- `siteConfig.instagram` and `siteConfig.facebook` are APPROVED and use real URLs
- All files must export typed constants — no `any`, no loose object literals

### Acceptance Criteria

- [ ] `pnpm typecheck` passes
- [ ] 4 specialists in `specialists.ts` with correct names
- [ ] All 4 specialists have distinct `id` values (kebab-case, no collisions)
- [ ] `siteConfig.instagram` and `siteConfig.facebook` match PROJECT_BRIEF.md approved values
- [ ] No fabricated credentials, specialties, or clinic claims

---

## ISSUE-008 — App Shell: Layout, Fonts, Metadata, SEO Files

**Milestone:** 1 | **Wave:** 1

### Purpose

Create the production-ready app shell: font loading, metadata API, global CSS, SEO files.

### Scope

- Update `app/layout.tsx` with: `next/font` Google fonts (Cormorant Garamond + Inter), `lang="pt-BR"`, Next.js metadata API, skip-to-content link, semantic `<header>`, `<main>`, `<footer>` landmarks
- Update `app/globals.css` with: `@import "tailwindcss"`, import `styles/tokens.css`, CSS resets, focus ring, reduced-motion rules
- Create `app/sitemap.ts`
- Create `app/robots.ts`
- Create `app/not-found.tsx` — minimal 404
- Create `public/og-image.jpg` — branded placeholder (brand mark on dark bg, 1200×630)
- Create `public/favicon.ico` and `public/apple-touch-icon.png`

### Owned Files

- `app/layout.tsx`
- `app/globals.css`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/not-found.tsx`
- `public/og-image.jpg`, `public/favicon.ico`, `public/apple-touch-icon.png`

### Files That Must Not Be Modified

- `app/page.tsx` — placeholder only; Integration Agent owns
- `styles/tokens.css` — Design System Agent owns; import via `@import` in globals.css

### Dependencies

ISSUE-006 (tokens.css must exist to import), ISSUE-007 (site.ts for metadata values).

### Inputs

- [SEO.md](SEO.md) — metadata schema
- [ACCESSIBILITY.md](ACCESSIBILITY.md) — semantic structure, focus ring, skip link
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — font families
- `config/site.ts` from ISSUE-007

### Implementation Requirements

- Font variables must be applied to `<html>` or `<body>` as CSS variables (e.g., `className={`${cormorant.variable} ${inter.variable}`}`)
- Metadata uses `[PLACEHOLDER]` for canonical URL, description — these are typed as required before launch
- `next/font` subsets: Latin extended (covers pt-BR glyphs)
- Skip link: visually hidden, visible on focus (`position: absolute; top: -100px; &:focus { top: 0 }`)
- Reduced-motion CSS in `globals.css`: scoped rules, not global animation-duration override
- `sitemap.ts` and `robots.ts`: use placeholder canonical URL constant from `config/site.ts`

### Acceptance Criteria

- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes
- [ ] `lang="pt-BR"` on `<html>`
- [ ] Skip link visible when focused with Tab key
- [ ] Cormorant Garamond and Inter loaded via `next/font`
- [ ] `@import "tailwindcss"` and token import present in `globals.css`
- [ ] `app/sitemap.ts` exports correct Next.js sitemap shape
- [ ] `app/robots.ts` exports correct Next.js robots shape

---

## ISSUE-009 — GoldenLogo Component

**Milestone:** 2 | **Wave:** 2A

### Purpose

Implement the golden identity video loop component — the decorative brand visual in the Hero.

### Scope

- Create `components/cinematic/GoldenLogo.tsx`
- Autoplay loop, muted, playsInline, aria-hidden
- Poster fallback
- `preload` upgrade to "auto" on IntersectionObserver entry
- Reduced-motion: CSS rule hides video, shows poster
- Video error: JS renders fallback `<img>` poster

### Owned Files

- `components/cinematic/GoldenLogo.tsx`

### Files That Must Not Be Modified

- `app/page.tsx`, `app/layout.tsx`, any sections

### Dependencies

ISSUE-005 (encoded asset), ISSUE-006 (design tokens, lib/video.ts).

### Inputs

- [CINEMATIC_ARCHITECTURE.md](CINEMATIC_ARCHITECTURE.md) — Section A (Golden Identity)
- `lib/video.ts` — paths and constants
- [ACCESSIBILITY.md](ACCESSIBILITY.md) — decorative video rules

### Implementation Requirements

```tsx
"use client"
// props: optional className
// Video: autoPlay muted loop playsInline aria-hidden="true"
// Initial preload="metadata"; upgrade to "auto" on intersection
// Error handler: setVideoFailed(true) → render <img> poster
// CSS reduced-motion: display:none video + display:block poster
```

### Acceptance Criteria

- [ ] Renders video with `aria-hidden="true"`
- [ ] Video loops visibly in Chromium automated test
- [ ] Under `prefers-reduced-motion: reduce`: video hidden, poster visible
- [ ] On video error: poster renders, no console error thrown to UI
- [ ] `pnpm typecheck` and `pnpm build` pass

---

## ISSUE-010 — ToothScrubber Component

**Milestone:** 2 | **Wave:** 2A

### Purpose

Implement the scroll-driven video scrubber for the tooth cinematic. This is the highest-complexity component.

### Scope

- Create `components/cinematic/ToothScrubber.tsx`
- CSS sticky pinning (outer section `300vh`, inner `sticky top:0 h-screen`)
- GSAP ScrollTrigger for scroll progress
- Seek strategy from Spike B (ADR-003 accepted value)
- `video.currentTime` as baseline; `fastSeek()` only if Spike B adopted it
- Scroll progress margins: 5% intro hold, 95% outro hold
- Poster visible before video loads
- `preload="metadata"` initial; upgrade on IntersectionObserver
- Video paused at all times (no autoPlay; `video.pause()` after `loadeddata`)
- Duration guard: `const dur = Number.isFinite(video.duration) ? video.duration : 5.042`
- Video error: fallback to poster, reduce section height to `100vh`
- Reduced motion: section `100vh`, poster, no ScrollTrigger init
- Text layer: passes through `children` prop for Hero text content

### Owned Files

- `components/cinematic/ToothScrubber.tsx`

### Files That Must Not Be Modified

- `app/page.tsx`, any sections, any design system files

### Dependencies

**ISSUE-002 must be complete** (final encoded video and poster in place).
**ISSUE-003 must be complete** (Spike B canonical seek strategy determined and documented in ADR-003).
ISSUE-006 (lib/video.ts, tokens).

### Inputs

- [CINEMATIC_ARCHITECTURE.md](CINEMATIC_ARCHITECTURE.md) — Section B (full specification)
- [ADR-003](DECISIONS/ADR-003-scroll-video-architecture.md) — CSS sticky, ScrollTrigger, seek strategy
- `lib/video.ts` — paths and TOOTH_DURATION constant
- Spike B result (from ADR-003 accepted section)

### Implementation Requirements

- `gsap.registerPlugin(ScrollTrigger)` inside `useGSAP()`
- `gsap.matchMedia()` gates all GSAP init
- Reduced-motion branch: no ScrollTrigger, no seek, set `video.currentTime = TOOTH_DURATION * 0.5`, section height `100vh`
- Preload upgrade via IntersectionObserver on the outer section
- Manual Safari macOS validation required before marking complete

### Acceptance Criteria

- [ ] Scroll-driven scrubbing functional in Chromium automated test
- [ ] Under `prefers-reduced-motion: reduce`: static poster, no animation, section = 100vh
- [ ] Video failure: poster visible, section preserved, no console error
- [ ] `duration` access always guarded against NaN/Infinity
- [ ] `pnpm typecheck` and `pnpm build` pass
- [ ] Manual Safari macOS validation note in PR

---

## ISSUE-011 — HeroSection + HeroCinematic Composition

**Milestone:** 2 | **Wave:** 2A

### Purpose

Compose the Hero section — combining GoldenLogo, ToothScrubber, and Hero text into the complete Hero visual.

### Scope

- Create `components/sections/HeroSection.tsx` — Server Component wrapper (semantic `<section>`, `<h1>`)
- Create `components/cinematic/HeroCinematic.tsx` — Client Component composing GoldenLogo + ToothScrubber + text layer
- Pass Hero text from `content/copy.ts` as serializable props to HeroCinematic
- Add `<link rel="preload" as="image">` for tooth poster to the layout (integration request to ISSUE-008/Foundation Agent)

### Owned Files

- `components/sections/HeroSection.tsx`
- `components/cinematic/HeroCinematic.tsx`

### Files That Must Not Be Modified

- `app/page.tsx` — Integration Agent only
- `components/cinematic/GoldenLogo.tsx` — owned by ISSUE-009
- `components/cinematic/ToothScrubber.tsx` — owned by ISSUE-010
- `app/layout.tsx` — submit integration request for preload link

### Dependencies

ISSUE-009 and ISSUE-010 complete.

### Acceptance Criteria

- [ ] `<h1>` in HeroSection renders in SSR HTML (confirm with `curl` or View Source)
- [ ] HeroCinematic renders as Client Component with GoldenLogo and ToothScrubber visible
- [ ] No SSR errors in build output
- [ ] `pnpm build` and `pnpm typecheck` pass

---

## ISSUE-012 — ManifestoSection

**Milestone:** 3 | **Wave:** 2B

### Purpose

Implement the Manifesto / Positioning section — typographic statement with optional GSAP word-reveal.

### Scope

- Create `components/sections/ManifestoSection.tsx` — Server Component with semantic structure
- Implement Level 2 reveal (CSS `@keyframes` + IntersectionObserver) for the statement body
- If Level 3 GSAP word-reveal is included: narrow Client Component leaf `ManifestoReveal.tsx`

### Owned Files

- `components/sections/ManifestoSection.tsx`
- `components/sections/ManifestoReveal.tsx` (if Level 3 used)

### Dependencies

ISSUE-006 (tokens, SectionHeading), ISSUE-007 (copy.ts).

### Inputs

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — motion hierarchy Level 2–3
- `content/copy.ts` — manifesto copy (placeholder)

### Acceptance Criteria

- [ ] Section renders semantically correct HTML (`<section aria-labelledby>`, `<h2>`)
- [ ] Under reduced-motion: no animation, content fully visible
- [ ] If GSAP used: `useGSAP()` and `gsap.matchMedia()` present

---

## ISSUE-013 — SpecialtiesSection + SpecialtyCard

**Milestone:** 3 | **Wave:** 2B

### Purpose

Implement the clinical specialties grid section.

### Scope

- Create `components/sections/SpecialtiesSection.tsx` — Server Component
- Reuse or specialize `components/ui/SpecialistCard.tsx` pattern for specialty items
- Grid layout responsive: 1 → 2 → 3 columns

### Owned Files

- `components/sections/SpecialtiesSection.tsx`

### Dependencies

ISSUE-006 (Container, SectionHeading, tokens), ISSUE-007 (specialties.ts).

### Acceptance Criteria

- [ ] Renders correct number of specialty cards from `content/specialties.ts`
- [ ] Responsive grid at 375, 768, 1280px viewports
- [ ] Server Component — no `"use client"`

---

## ISSUE-014 — SpecialistsSection + SpecialistCard

**Milestone:** 3 | **Wave:** 2B

### Purpose

Implement the specialists / doctors section.

### Scope

- Create `components/sections/SpecialistsSection.tsx` — Server Component
- Use `components/ui/SpecialistCard.tsx` from ISSUE-006
- `next/image` for specialist portraits (with `alt="Foto de [Name]"`)
- Placeholder image fallback for missing photos

### Owned Files

- `components/sections/SpecialistsSection.tsx`

### Dependencies

ISSUE-006 (SpecialistCard, tokens), ISSUE-007 (specialists.ts).

### Acceptance Criteria

- [ ] Renders 4 specialist cards with names from `content/specialists.ts`
- [ ] No fabricated credentials (all `[PLACEHOLDER]` values render visibly)
- [ ] Images use `next/image` with explicit width/height
- [ ] Alt text per ACCESSIBILITY.md

---

## ISSUE-015 — AppointmentCTA + Footer

**Milestone:** 3 | **Wave:** 2B

### Purpose

Implement the primary CTA section and the Footer.

### Scope

- Create `components/sections/AppointmentCTA.tsx` — Server Component with CTA link
- Create `components/sections/Footer.tsx` — Server Component with logo, contact placeholders, social links
- CTA link: WhatsApp or form link from `config/site.ts` (placeholder)

### Owned Files

- `components/sections/AppointmentCTA.tsx`
- `components/sections/Footer.tsx`

### Dependencies

ISSUE-006 (Button, Container, tokens), ISSUE-007 (siteConfig).

### Acceptance Criteria

- [ ] CTA button is a keyboard-accessible `<a>` with visible focus ring
- [ ] Footer renders correct social URLs (Instagram, Facebook from siteConfig)
- [ ] Both are Server Components — no `"use client"`
- [ ] Dynamic copyright year: `new Date().getFullYear()`

---

## ISSUE-016 — Page Integration

**Milestone:** 4 | **Wave:** 3

### Purpose

Compose `app/page.tsx` with all sections in the correct order. Verify end-to-end SSR output and section order.

### Scope

- Update `app/page.tsx` — import and render all sections in order: Hero, Manifesto, Specialties, Specialists, AppointmentCTA, Footer
- Verify `<h1>` appears in SSR HTML (curl or View Source on Preview URL)
- Verify no `"use client"` contamination leaks from cinematic components into Server Component tree
- Confirm no console errors on page load

### Owned Files

- `app/page.tsx`

### Files That Must Not Be Modified

- Any component files — Integration Agent composes only; component fixes go to the owning agent

### Dependencies

All Wave 2A (ISSUE-011) and Wave 2B (ISSUE-012–015) complete.

### Acceptance Criteria

- [ ] All 6 sections visible in Vercel Preview
- [ ] `curl {preview-url} | grep '<h1>'` returns the Hero heading
- [ ] No TypeScript errors, no build errors
- [ ] No console errors in browser (Chromium)
- [ ] Section order matches MVP IA in PROJECT_BRIEF.md

---

## ISSUE-017 — Playwright Test Suite

**Milestone:** 5 | **Wave:** 4

### Purpose

Implement the focused QA test suite per QA_STRATEGY.md.

### Scope

- Install Playwright as a dev dependency
- Configure `playwright.config.ts` for Chromium + WebKit
- Implement tests per the QA_STRATEGY.md targeted test areas (smoke, viewport, reduced-motion, media failure, keyboard, CTA, a11y)
- Point tests at the Vercel Preview URL (or localhost in CI)

### Owned Files

- `e2e/` (all files)
- `playwright.config.ts`

### Files That Must Not Be Modified

- Any component or application source files

### Dependencies

ISSUE-016 (full page must be integrated).

### Acceptance Criteria

- [ ] `pnpm exec playwright test` runs without configuration errors
- [ ] Smoke test passes in Chromium and WebKit
- [ ] Viewport screenshot tests at 375, 768, 1280, 1920px pass
- [ ] Reduced-motion test: confirms no visible animation, poster present
- [ ] Media failure test: blocks video URL, confirms no black section
- [ ] Keyboard test: Tab traversal reaches CTA button, focus ring visible
- [ ] `axe-core` test: zero critical violations

---

## ISSUE-018 — Performance Audit

**Milestone:** 5 | **Wave:** 4

### Purpose

Run Lighthouse, verify LCP candidate, confirm hard gates pass, analyze bundle size.

### Scope

- Run Lighthouse CLI on the Vercel Preview URL
- Verify LCP < 2.5s, INP < 200ms, CLS < 0.1
- Verify LCP element is `<h1>` or tooth poster (not a video)
- Run `@next/bundle-analyzer` or equivalent to inspect JS bundle
- Document results and any issues found

### Owned Files

- `docs/` — append performance audit report (lightweight summary)

### Files That Must Not Be Modified

Unless a performance fix is required — if so, submit an integration request to the component owner.

### Dependencies

ISSUE-016 (full page integrated), Vercel Preview accessible.

### Acceptance Criteria

- [ ] LCP < 2.5s on simulated Fast 4G
- [ ] CLS < 0.1
- [ ] Performance score ≥ 90 in Lighthouse
- [ ] LCP element documented (confirmed correct candidate)
- [ ] No major bundle issues (no unexpected heavy dependencies)

---

## ISSUE-019 — Spike C: Mobile Cinematic Validation

**Milestone:** 5 | **Wave:** 4

### Purpose

Determine the production mobile cinematic behavior per Spike C procedure.

### Scope

- Follow Spike C procedure in SPIKES.md
- Test on iPhone Safari (real device preferred), Android Chrome, mid-range Android
- Measure scroll smoothness, seek latency, thermal behavior
- Select primary mobile mode (C1, C2, C3, or C4)
- Update ADR-006 with result and change status to ACCEPTED

### Owned Files

- `docs/DECISIONS/ADR-006-mobile-cinematic.md` — append decision, update status
- `docs/SPIKES.md` — append Spike C results

### Implementation Note

If the selected mode (C1, C2, or C3) differs from the provisional mobile behavior in ToothScrubber, submit a focused change request to ISSUE-010's owner or apply the fix within this issue if ToothScrubber ownership is available.

### Dependencies

ISSUE-010 (ToothScrubber must exist), ISSUE-016 (full page integrated on Vercel Preview for real-device testing).

### Acceptance Criteria

- [ ] At least 3 devices tested (iPhone Safari, Android Chrome flagship, mid-range Android)
- [ ] Results documented per SPIKES.md Spike C measurement table
- [ ] ADR-006 updated with selected mode and status = ACCEPTED

---

## ISSUE-020 — Accessibility Audit

**Milestone:** 5 | **Wave:** 4

### Purpose

Manual and automated accessibility validation.

### Scope

- Run axe-core against the full page (via Playwright or axe DevTools browser extension)
- Manual keyboard navigation: Tab through all interactive elements
- Spot-check heading structure with VoiceOver (macOS Safari)
- Verify skip-to-content link works
- Verify all images have correct alt text
- Verify reduced-motion path does not produce a visually broken page

### Owned Files

Documentation only — file any issues as integration requests to component owners.

### Dependencies

ISSUE-016 (full page).

### Acceptance Criteria

- [ ] Zero axe-core critical violations
- [ ] All interactive elements reachable by keyboard in logical order
- [ ] Skip link works (navigates to `#main-content`)
- [ ] VoiceOver: heading tree correct (h1 → h2 → h3)
- [ ] `aria-hidden` on both cinematic videos confirmed

---

## ISSUE-021 — Content Replacement

**Milestone:** 6 | **Wave:** 5

### Purpose

Replace all `[PLACEHOLDER]` content with approved client content before production deployment.

### Scope

- Replace all `[PLACEHOLDER]` values in `config/site.ts`, `content/specialists.ts`, `content/specialties.ts`, `content/copy.ts`
- Add specialist photographs to `public/assets/people/`
- Update meta description, canonical URL, OG image
- Add JSON-LD LocalBusiness structured data to `app/layout.tsx`
- Confirm no `[PLACEHOLDER` strings remain in the production build HTML output

### Owned Files

- `config/site.ts`
- `content/*.ts`
- `app/layout.tsx` (JSON-LD addition only — integration request to Foundation Agent if needed)
- `public/assets/people/`

### Dependencies

All content approved by the Project Owner. Milestone 5 complete.

### Acceptance Criteria

- [ ] Zero `[PLACEHOLDER` strings in `pnpm build` output
- [ ] All 4 specialist photographs present and correctly named per ASSET_CONTRACT.md
- [ ] Canonical URL resolves correctly
- [ ] JSON-LD validates with Google Rich Results Test (manual)

---

## ISSUE-022 — Production Deployment

**Milestone:** 6 | **Wave:** 5

### Purpose

Configure and verify the production Vercel deployment.

### Scope

- Configure Vercel production environment (domain or Vercel URL for soft launch)
- Verify environment variables (none needed for static MVP — confirm no `.env` required)
- Confirm `vercel.json` cache headers apply correctly on production domain
- Run final Lighthouse on production URL
- Confirm sitemap and robots.txt accessible
- Confirm OG image renders correctly in social sharing preview (Twitter Card Validator or similar)

### Owned Files

- Vercel project settings
- `vercel.json` (minor updates only)

### Dependencies

ISSUE-021 (content replacement complete). Milestone 5 complete.

### Acceptance Criteria

- [ ] Production URL responds with correct HTML
- [ ] Lighthouse hard gates pass on production URL
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Cache headers correct for `/assets/cinematic/` (immutable) and other assets
- [ ] Social sharing preview correct (OG image renders)
