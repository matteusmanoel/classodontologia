# ISSUE-018 — Performance Audit

**Issue:** ISSUE-018  
**Date:** 2026-08-13  
**Git SHA audited:** `12b3a5e` (`origin/develop` at ISSUE-016 merge — PR #14). App source was unchanged by later `docs/qa` ISSUE-020 (`013c50c`).  
**Auditor:** Lighthouse CLI + Next.js production build output. No application source was modified. `PERFORMANCE.md` budgets were **not** rewritten.

**ISSUE-018 DoD: not satisfied.** CLS hard gate failed. LCP element is the GoldenLogo `<video>`, not `<h1>` or a poster.

## Target

Primary target (this audit): local production build of `12b3a5e`.

```bash
pnpm build
pnpm exec next start -p 3018   # http://127.0.0.1:3018/
```

Port 3018 was used because another process already held 3000.

Preview URLs (not independently Lighthouse-audited):

- Wave-3 / ISSUE-016: `https://classodontologia-git-wave-3-page-00b23f-matteusmanoels-projects.vercel.app` (commit `ab375d9`, same page as merge `12b3a5e`)
- `develop` alias: `https://classodontologia-git-develop-matteusmanoels-projects.vercel.app`

Preview was **not** used for Lighthouse scores:

- Vercel MCP `web_fetch_vercel_url` returned HTTP **302** to `vercel.com/sso-api`. Deployment Protection was **not** disabled.
- At audit time the `develop` alias still pointed at `33aa9b9` (ISSUE-011 merge), not `12b3a5e`.
- Local `pnpm build` + `next start` of `12b3a5e` is the production-equivalent measurement.

Do not treat this as a Vercel Preview pass or fail.

## Method

| Item | Value |
|---|---|
| Lighthouse | **12.8.2** (`npx lighthouse@12`) |
| Chrome | HeadlessChrome/151 (`/Applications/Google Chrome.app`) |
| Form factor | `mobile` (Moto G Power 2022, 412×823, DPR 1.75) |
| Throttling method | `simulate` |
| Fast 4G (simulate) | `rttMs=60`, `throughputKbps=9000` (9 Mbps), `cpuSlowdownMultiplier=4` — Chrome DevTools Fast 4G **target** RTT/throughput |
| Categories | performance, accessibility, seo |
| Fetch time (UTC) | `2026-08-13T14:48:27.080Z` |
| Runtime error | none |

Lighthouse default mobile profile is **Slow 4G** (`rttMs=150`, `throughputKbps=1638.4`). This run **overrode** simulate RTT/throughput to Fast 4G as required by ISSUE-018 / PERFORMANCE.md. Leftover `requestLatencyMs` / `downloadThroughputKbps` fields in the JSON still show Slow 4G DevTools-method numbers; those apply only when `--throttling-method=devtools` and were **not** used for scoring.

INP is a field metric. Lighthouse 12.8.2 **navigation** mode did not emit `interaction-to-next-paint`. Lab proxies below are TBT and max-potential-FID. **Do not treat INP as a lab pass.**

## Hard gates (PERFORMANCE.md)

| Metric | Target | Result | Verdict |
|---|---|---|---|
| LCP | < 2.5 s | **708 ms** (display 0.7 s) | **Pass** |
| INP | < 200 ms | **Not produced** by this lab run | **Unconfirmed** |
| CLS | < 0.1 | **0.129** | **Fail** |
| Performance score | ≥ 90 | **96** | **Pass** |

Lab proxies (not INP): Total Blocking Time **40 ms** (numeric 37.5 ms); max-potential-FID **125 ms**.

## Lighthouse category scores

| Category | Score |
|---|---|
| Performance | **96** |
| Accessibility | **100** |
| SEO | **85** |

SEO 85 is **not** a PERFORMANCE.md hard gate. Failed audits: invalid `rel=canonical` (`[CANONICAL_URL — REQUIRED BEFORE LAUNCH]`) and `robots.txt` sitemap URL using the same placeholder. Expected until ISSUE-021. No clinic copy was invented to chase SEO.

Other lab metrics (context, not gates): FCP **0.4 s** (378 ms); Speed Index **0.9 s** (942 ms); TTFB (root document) **10 ms**.

## LCP element

**Actual LCP element:** GoldenLogo `<video class="golden-logo-video">`

- Selector: `div.sticky > div.max-w-[1280px] > div.golden-logo > video.golden-logo-video`
- Snippet: `autoplay muted loop playsinline poster="/assets/cinematic/logo/golden-identity-v1-poster.webp" aria-hidden="true" preload="auto"`
- Bounding rect (mobile viewport): 412×208 px, top 383
- LCP phases: TTFB 219 ms (31%); Load Delay 71 ms (10%); Load Time 172 ms (24%); Render Delay 246 ms (35%)

**Intended candidates** (PERFORMANCE.md): (1) Hero `<h1>` SSR HTML, (2) tooth poster WebP.

**Verdict:** LCP is **not** the intended candidate. It is a cinematic **video**, which PERFORMANCE.md forbids. This is expected on the STOP-06 placeholder RC: GoldenLogo autoplays in the first viewport; the tooth poster does not exist; `<h1>` is below the logo in the sticky column.

SSR still contains the Hero `<h1>`:

```html
<h1 class="font-display text-hero tracking-display text-balance text-text-primary">[HERO_HEADING — REQUIRED BEFORE LAUNCH]</h1>
```

No application source was changed to move LCP onto the heading or poster. Mobile is **not** frozen as poster-only.

Lighthouse LCP discovery: request is in the initial document; lazy-load not applied; `fetchpriority=high` is **not** set on the LCP video (checklist `priorityHinted: false`).

## CLS

**0.129** — one layout shift, score **0.1289**.

Shifted node: `div.hero-cinematic` (the Hero column, including `[HERO_HEADING — REQUIRED BEFORE LAUNCH]`).

Cause reported by Lighthouse: **unsized image** — header logo

```
body.font-sans > header.border-b > a.inline-flex > img.h-8
```

`app/layout.tsx` renders `next/image` with `width={752} height={264}` and `className="h-8 w-auto"`. The CSS height (`h-8` = 32px) plus `w-auto` does not reserve the rendered width before the image paints, so the header grows and pushes the Hero. This is **Foundation / ISSUE-008** ownership — not patched here. See IR-018-1.

GoldenLogo containers already declare `aspect-ratio: 1280 / 646` and `width`/`height` on the video. Lighthouse did not attribute the shift to the video.

## STOP-06 / tooth cinematic

| Check | Result |
|---|---|
| `tooth-cinematic-v1.mp4` on disk | **Absent** |
| `tooth-cinematic-v1-poster.webp` on disk | **Absent** |
| Tooth video in SSR HTML | **Absent** (`tooth-cinematic` / `vidu-video` not in page) |
| Tooth poster `<link rel="preload">` | **Absent** — **expected**, not a surprise |
| Golden identity MP4 in page | Present (`/assets/cinematic/logo/golden-identity-v1.mp4`) |
| Golden poster in page | Present (14 840 bytes, under 20 KB TARGET) |

Tooth source `vidu-video-3419599273445859.mp4` remains in `public/assets/cinematic/tooth/` as the watermarked original. It is **not** referenced by the page.

GSAP / ToothScrubber / `@gsap/react` are **not** installed. That is expected under STOP-06 (ISSUE-010 blocked). ADR-002 still stands; this audit does not install GSAP.

## Bundle (Next.js 16.3.0 / Turbopack)

`pnpm build` completed. Next 16 Turbopack **did not** print a First Load JS column in the route table. Sizes below are gzip-9 of files referenced by `.next/server/app/index.html` (modern path; `nomodule` polyfill excluded). `@next/bundle-analyzer` was **not** added (`next.config.ts` untouched).

### First-load JS (home `/`)

| Chunk | Raw | Gzip |
|---|---|---|
| `1q4itoff--b7w.js` | 228 841 | 71 377 |
| `1-ndab880o1cd.js` | 159 206 | 43 147 |
| `0_j7mhjqxcy3l.js` | 37 810 | 11 514 |
| `2ty8y54py9hhi.js` | 34 137 | 9 065 |
| `turbopack-3ejpzwhwgs8el.js` | 9 652 | 3 838 |
| `349j1nyctq4cj.js` | 5 598 | 2 016 |
| `38_htdkvlkr92.js` (HeroCinematic island) | 2 455 | 1 118 |
| **Total first-load JS** | **477 699** | **142 075 (138.7 KB)** |

PERFORMANCE.md initial JS TARGET: **< 150 KB gzipped** — **under budget**.

CSS: `30y38a41168yj.css` 22 406 raw / **5 112 gzip (5.0 KB)** vs TARGET < 30 KB — **under budget**.

`38_htdkvlkr92.js` is the only extra home island vs 404 HTML (GoldenLogo / HeroCinematic). It does not contain GSAP or Three.js.

### Unexpected heavy dependencies

| Library | In `package.json` / lockfile | In `.next/static/chunks/*.js` |
|---|---|---|
| Three.js / R3F / Spline | **No** | **No** |
| GSAP / `@gsap/react` / ScrollTrigger | **No** (expected STOP-06) | **No** |
| Framer Motion | **No** | **No** |

Runtime dependencies remain `next@16.3.0`, `react@19.2.8`, `react-dom@19.2.8` only. **No major bundle issue.** ADR-001 (no runtime 3D) holds in the shipped JS.

Lighthouse unused-JS estimate: 27 KiB (not a hard gate).

### Font subsets (TARGET, not hard gate)

Preloaded `.p.` woff2 files from home HTML:

| File | Family | Raw bytes |
|---|---|---|
| `01e4147cff8141ee-s.p.…woff2` | Cormorant Garamond (latin) | 37 776 |
| `1f9e983605289f29-s.p.…woff2` | Cormorant Garamond (latin-ext) | 33 740 |
| `83afe278b6a6bb3c-s.p.…woff2` | Inter (latin) | 48 432 |
| `1bffadaabf893a1e-s.p.…woff2` | Inter (latin-ext) | 85 272 |

Display (Cormorant) latin + latin-ext preloads: **71.5 KB** vs TARGET < 50 KB — **over TARGET**.  
Body (Inter) latin + latin-ext preloads: **130.6 KB** vs TARGET < 40 KB — **over TARGET**.

`next/font` loads latin + latin-ext (pt-BR). Weight 400/600/700 for Cormorant and the Inter variable file explain the size. Not a release hard gate; Foundation may subset later. `font-display: swap` is set.

Golden poster: **14 840 bytes** vs TARGET < 20 KB — **under**. Golden MP4: **588 278 bytes** (WARNING class, not a gate).

## Integration requests

Documentation only — **do not patch in this issue.** Do not hide, crop, or pause GoldenLogo solely to game LCP. Do not freeze mobile as poster-only.

### IR-018-1 — Header logo CLS (Foundation / `app/layout.tsx`)

Lighthouse attributes CLS **0.129** to `img.h-8` in the site header (`className="h-8 w-auto"`). Reserve the rendered box (explicit CSS width matching `h-8` × 752/264 aspect, or a fixed-width wrapper) so the banner does not grow after the image decodes. This is the CLS hard-gate failure.

### IR-018-2 — LCP is GoldenLogo video (ISSUE-009 / ISSUE-011)

Observed LCP is `<video class="golden-logo-video">`, not `<h1>` and not a poster. Options for owners (after STOP-06 / tooth poster, or as a measured experiment — **not** a silent score game):

- Keep autoplay (brand requirement) but ensure the **poster** is the first painted LCP candidate (`fetchpriority` / preload already present for the golden poster; video `preload` starts at `metadata` and upgrades on intersection).
- After a clean tooth asset exists, preload `tooth-cinematic-v1-poster.webp` as specified in PERFORMANCE.md.
- Do **not** switch mobile to poster-only in this wave (ADR-006 still Proposed; ISSUE-019 owns Spike C).

### IR-018-3 — Canonical / robots placeholders (ISSUE-021)

SEO 85: placeholder canonical and `robots.txt` sitemap URL. Content replacement, not a performance fix.

## Acceptance criteria

| Criterion | Result |
|---|---|
| LCP < 2.5 s on simulated Fast 4G | **Pass** (708 ms) |
| CLS < 0.1 | **Fail** (0.129) |
| Performance score ≥ 90 | **Pass** (96) |
| LCP element documented (confirmed **correct** candidate) | **Fail** — documented; actual is GoldenLogo **video** |
| No major bundle issues | **Pass** (no Three.js / GSAP; first-load JS 138.7 KB gzip) |

## Definition of Done

| Item | Status |
|---|---|
| Lighthouse mobile + simulated Fast 4G against a production build | Executed (local `12b3a5e`) |
| LCP / INP / CLS / scores / actual LCP element recorded | Executed; INP lab-unconfirmed; CLS fail; LCP element is video |
| Bundle sizes from Next build (no analyzer config change) | Executed |
| STOP-06: no tooth video; missing tooth poster preload not treated as a surprise | Executed |
| No Hero / GoldenLogo source edits | Satisfied |
| Hard gates all pass | **Not satisfied** (CLS) |
| LCP candidate matches intent | **Not satisfied** |

**ISSUE-018 DoD: not satisfied.** This is an audit report of the placeholder RC, not a green release gate.

## Unresolved risks

- CLS 0.129 blocks the PERFORMANCE.md hard gate until IR-018-1 (or equivalent) lands.
- GoldenLogo autoplay will likely remain the LCP element until the tooth poster exists or Hero composition changes — **do not** treat a later poster-only mobile freeze as this audit’s recommendation.
- INP unmeasured in lab; field INP on real devices is unknown. TBT 40 ms is only a proxy.
- `develop` Vercel alias lagged `12b3a5e` at audit time; Wave 5 (ISSUE-022) must re-run Lighthouse on the protected Preview/production URL after Protection-aware access, without turning Protection off.
- Display/body font subset TARGETs exceeded (latin-ext). Not a hard gate; watch after ISSUE-021 real copy.
- Header `priority` logo and GoldenLogo video compete on first paint; expected on this RC.
- Lighthouse unused-JS / offscreen-images (specialist brand fallbacks, golden poster at 1280×646 for a 412×208 display) are warnings, not gates.

## Validations executed

| Command / procedure | Result |
|---|---|
| `pnpm typecheck` | Pass |
| `pnpm lint` | Pass |
| `pnpm build` (Next.js 16.3.0 Turbopack) | Pass — `/` static |
| `pnpm exec next start -p 3018` | Ready; HTTP 200; 41 580 bytes HTML |
| `curl` SSR: `<h1>` present; no tooth video URL | Pass |
| Lighthouse 12.8.2 mobile Fast 4G simulate | Perf **96**, a11y **100**, SEO **85**; LCP **708 ms**; CLS **0.129**; LCP node **video.golden-logo-video** |
| First-load JS / CSS gzip from `.next/static` | JS **138.7 KB**; CSS **5.0 KB** |
| `package.json` + chunk grep for `three` / `gsap` | Not present |
| Vercel Preview Lighthouse | **Not run** (SSO 302; Protection left on) |

## Follow-up — IR-018-1 (2026-08-13)

Header/footer logo boxes reserved in `62770cd` ([PR #18](https://github.com/matteusmanoel/classodontologia/pull/18)). Lab re-run (Lighthouse 12.8.2, mobile, simulated Fast 4G, local `pnpm start`): CLS **0** (was 0.129). Original scores above are unchanged. LCP remains GoldenLogo `<video>` (IR-018-2 deferred).
