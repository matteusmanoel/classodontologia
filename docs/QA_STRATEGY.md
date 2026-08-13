# QA Strategy — Class Odontologia MVP

**Authority: MEDIUM**

## Philosophy

Small, risk-focused test suite. Not a coverage exercise. The Hero cinematic receives disproportionate QA attention because it is the highest-risk component.

## Automated QA Layers

### Layer 1 — Static Checks (every commit)

```bash
pnpm typecheck     # tsc --noEmit
pnpm lint          # ESLint
pnpm build         # Next.js build — catches runtime errors
```

### Layer 2 — Playwright Automated Tests

**Automated browsers:**
- Chromium
- WebKit

Firefox is optional — use where it provides coverage Chromium and WebKit do not.

> Playwright WebKit is an automated approximation of Safari rendering. It is **not** a substitute for manual validation on Safari macOS and iOS Safari. See Manual QA below.

**Targeted test areas (not a full coverage suite):**

| Test | Browser | Priority |
|---|---|---|
| Page renders without console errors (smoke) | Chromium, WebKit | HIGH |
| `<h1>` heading is present and non-empty | Chromium | HIGH |
| Viewport screenshots at 375, 768, 1280, 1920px | Chromium, WebKit | HIGH |
| `prefers-reduced-motion: reduce` — poster visible, no animations | Chromium | HIGH |
| Video failure fallback — block video network; confirm no black area | Chromium | HIGH |
| Tab through all interactive elements — focus ring visible | Chromium | HIGH |
| CTA button/link navigates correctly | Chromium | HIGH |
| No placeholder `[PLACEHOLDER` strings in rendered HTML | Chromium | MEDIUM |
| Mobile layout correct at 375px — no horizontal overflow | Chromium | HIGH |
| Accessibility — axe-core zero critical violations | Chromium | HIGH |

### Layer 3 — Performance Audit (Wave 5 gate)

Run on Vercel Preview deployment (production build):
- Lighthouse CLI or PageSpeed Insights
- Required scores: Performance > 90, Accessibility > 90, SEO > 90
- LCP < 2.5s, INP < 200ms, CLS < 0.1 — hard gates
- Verify LCP element is the Hero heading or poster, not a video

## Manual QA (pre-release)

Required manual testing by a human:

| Platform | Validation |
|---|---|
| **Safari macOS** | Hero cinematic render, scroll scrubbing, video autoplay, poster fallback |
| **iOS Safari** (real device preferred) | Touch scroll scrubbing or mobile fallback (per Spike C), autoplay, no black area |
| **Android Chrome** | Full page render, touch scroll, CTA accessible |

These platforms require human validation because automated tools do not fully replicate their behavior for video seeking and touch scroll events.

## Hero Cinematic QA (high-risk focus)

The `ToothScrubber` component requires specific validation:

1. **Poster visible before video loads** — throttle network to Slow 4G; confirm poster renders immediately
2. **Video failure fallback** — block video URL in DevTools; confirm poster remains, section height preserved
3. **Reduced motion** — enable `prefers-reduced-motion: reduce`; confirm poster shows, section = 100vh, no animation
4. **Scroll scrubbing** — scroll through Hero section; confirm video frames advance with scroll on desktop
5. **iOS Safari** — manual test: touch scroll through the Hero; confirm mobile strategy (per Spike C) works correctly
6. **No audio** — confirm all cinematic videos play silently (no audio track)
7. **No autoplay of tooth video** — confirm the tooth video is paused and does not auto-play when page loads

## Playwright Setup

Playwright is installed as a dev dependency. Configuration targets Chromium and WebKit. Tests live in `e2e/`.

```bash
pnpm exec playwright test          # Run all tests
pnpm exec playwright test --ui     # Interactive UI mode
pnpm exec playwright show-report   # View HTML report
```

See ISSUE-019 for implementation details.

## Definition of Done for QA Issues

- All Playwright tests pass in CI
- Lighthouse scores meet hard gates
- Manual checklist completed for Safari macOS and iOS Safari
- No critical axe-core violations
- No `[PLACEHOLDER` strings in production build output
