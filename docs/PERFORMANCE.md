# Performance — Class Odontologia MVP

**Authority: HIGH**
All agents must respect these targets. Performance regressions are not accepted without documented justification.

## Web Vitals — Hard Release Targets

| Metric | Target | Classification |
|---|---|---|
| LCP | < 2.5 seconds | HARD GATE |
| INP | < 200 ms | HARD GATE |
| CLS | < 0.1 | HARD GATE |

These targets must be met on a simulated Fast 4G connection in Lighthouse. Failures block release.

## Engineering Budgets

| Asset | Budget | Classification |
|---|---|---|
| Initial JS (gzipped) | < 150 KB | TARGET |
| CSS (gzipped) | < 30 KB | TARGET |
| Display font subset | < 50 KB | TARGET |
| Body font subset | < 40 KB | TARGET |
| Hero poster (tooth) | < 30 KB (WebP) | TARGET |
| Golden logo poster | < 20 KB (WebP) | TARGET |
| Individual photos | < 120 KB (WebP) | WARNING |
| Desktop cinematic video | Result of Spike A | WARNING (not a hard gate) |
| Mobile cinematic video | Result of Spike C | WARNING |

> Video file-size targets are optimization targets, not encoding inputs. Do not degrade cinematic quality or seek responsiveness to hit an arbitrary byte number. Measure real-world performance.

## LCP Strategy

**Intended LCP candidates (in order of preference):**
1. The `<h1>` Hero heading — server-rendered HTML, no download required
2. The tooth poster image — preloaded WebP

**LCP must NOT be:** Either cinematic video element.

**How to achieve this:**
- Render `<h1>` as SSR HTML in a Server Component
- Add `<link rel="preload" as="image" href="/assets/cinematic/tooth/tooth-cinematic-v1-poster.webp" fetchpriority="high">` in `<head>`
- Use `next/image` with `priority` on the poster when rendered as an `<img>`
- Defer cinematic video loading — initial `preload="metadata"`; upgrade to `preload="auto"` after Hero is visible

**How to verify:** Run Lighthouse on the Vercel Preview deployment. Inspect the "LCP element" field in the report. Adjust if the actual LCP element differs from intent.

## Media Loading Priority

Design intent (measure and confirm with Lighthouse):

```
1. Critical HTML + CSS
2. Hero poster image (preloaded, fetchpriority="high")
3. Display fonts
4. Golden identity video (small; needed immediately in Hero)
5. Tooth cinematic video (larger; needed only when user begins scrolling)
```

Do not set both videos to `preload="auto"` on page load — they will compete for bandwidth with fonts and the poster.

## CLS Prevention

- All media containers must declare explicit `width`/`height` or `aspect-ratio` before media loads
- Use `aspect-ratio: 16/9` or equivalent on video containers
- Use `width` and `height` attributes on `<img>` elements or `next/image` (which handles this automatically)
- Font loading uses `font-display: swap` via `next/font` (no CLS from FOIT)

## Code Splitting

Next.js App Router handles code splitting per-route automatically. Client Components in `components/cinematic/` are bundled separately and loaded only when the Hero renders. GSAP and ScrollTrigger are part of the cinematic bundle only.

## Caching

See [ASSET_CONTRACT.md](ASSET_CONTRACT.md) for the cache-control strategy.

All `vercel.json` cache headers should be confirmed to apply correctly in Wave 5 performance audit.

## Measurement Commands

```bash
# Build and analyze bundle
pnpm build
# (Optional) pnpm add -D @next/bundle-analyzer — add to devDependencies in Foundation

# Lighthouse CI via CLI
npx lighthouse https://{preview-url} --output=html --output-path=./lighthouse-report.html

# TypeScript validation
pnpm typecheck

# Build only (checks for Next.js build errors)
pnpm build
```

## Performance Audit Gate (Wave 5)

Before release, a Cloud Agent runs:
1. Lighthouse on the production-equivalent Vercel Preview build
2. Bundle size analysis via `@next/bundle-analyzer`
3. Verify LCP element matches intended candidate
4. Verify CLS is 0.0 or near-zero
5. Verify no render-blocking resources

If any hard gate fails, the issue must be corrected before Wave 6 begins.
