# ISSUE-020 — Accessibility Audit

**Issue:** ISSUE-020  
**Date:** 2026-08-13  
**Git SHA audited:** `12b3a5e` (`origin/develop`, ISSUE-016 merged — PR #14)  
**Auditor:** automated + DOM inspection. No application source was modified.

## Target

Primary target (this audit): local production build.

```bash
pnpm build
pnpm start   # http://localhost:3000
```

Preview URL (ISSUE-016):  
`https://classodontologia-git-wave-3-page-00b23f-matteusmanoels-projects.vercel.app`

Preview was **not** independently audited in this run:

- Vercel MCP `web_fetch_vercel_url` returned HTTP 302 to SSO (no cookie jar).
- `vercel curl` failed with `The specified scope does not exist` (worktree is not linked to the Vercel project).
- Do not treat this as a Preview pass or fail.

The local production build is the same tree as merged ISSUE-016 (`12b3a5e`).

## Method

| Check | Tool | Notes |
|---|---|---|
| axe-core 4.13.0 | `@axe-core/playwright` + Playwright Chromium (HeadlessChrome/151) | Full page at 1280×800 |
| Keyboard / skip link / focus ring | Playwright Chromium `Tab` / `Enter` | Not Safari |
| Heading tree | DOM `h1–h6` query | VoiceOver **unconfirmed** |
| Images / video / landmarks | DOM inventory after `networkidle` | — |
| Reduced motion | Playwright `emulateMedia` `prefers-reduced-motion: reduce` | 1280×800 and 375×812 |

Playwright Chromium is **not** Safari. Playwright WebKit was **not** used and must not be described as Safari.

VoiceOver on macOS Safari was **not** run. Heading evidence for this placeholder RC is the DOM heading tree, as allowed by ISSUE-020.

## Acceptance criteria

| Criterion | Result |
|---|---|
| Zero axe-core **critical** violations | **Pass** — zero violations at any impact (critical / serious / moderate / minor) |
| All interactive elements reachable by keyboard in logical order | **Pass** |
| Skip link works (navigates to `#main-content`) | **Pass** (hash + scroll; sequential focus continues inside `main`) |
| VoiceOver: heading tree `h1` → `h2` → `h3` | **DOM pass / VoiceOver unconfirmed** |
| `aria-hidden` on both cinematic videos | **Pass for GoldenLogo**; tooth video **N/A** (STOP-06) |

Placeholders in copy (`[HERO_HEADING — …]`, specialty names, CTA href, etc.) are expected until ISSUE-021. They are **not** recorded as accessibility defects by themselves.

## 1. axe-core

- Engine: axe-core **4.13.0**
- URL: `http://localhost:3000/`
- Timestamp (UTC): `2026-08-13T14:44:08.415Z`

| Bucket | Count |
|---|---|
| Violations | **0** |
| Incomplete | 0 |
| Passes | 40 |
| Inapplicable | 49 |

**Critical:** 0  
**Serious:** 0  
**Moderate:** 0  
**Minor:** 0

Relevant passing rules (non-exhaustive): `bypass`, `skip-link`, `heading-order`, `page-has-heading-one`, `image-alt`, `color-contrast`, `html-has-lang`, `html-lang-valid`, `landmark-one-main`, `landmark-no-duplicate-main`, `landmark-no-duplicate-banner`, `landmark-no-duplicate-contentinfo`, `landmark-banner-is-top-level`, `landmark-contentinfo-is-top-level`, `region`, `link-name`, `aria-hidden-focus`.

`html` language is `pt-BR`.

## 2. Keyboard

Interactive tab stops in document / visual order (5 total):

| # | Element | Accessible / visible name | Focus ring (computed) |
|---|---|---|---|
| 1 | Skip link `a.skip-link` | Ir para o conteúdo principal | `rgb(232, 201, 122) solid 2px`, offset 3px — visible at `top: 0` |
| 2 | Header logo `a[href="/"]` | Class Odontologia (from `img` alt; `link-name` passed) | `rgb(232, 201, 122) solid 2px`, offset 3px |
| 3 | CTA `a` | `[CTA_BUTTON_LABEL — PLACEHOLDER]` | `rgb(232, 201, 122) solid 2px`, offset 3px |
| 4 | Footer Instagram | INSTAGRAM | `rgb(245, 245, 245) solid 2px`, offset 3px — **visible**, not gold |
| 5 | Footer Facebook | FACEBOOK | `rgb(245, 245, 245) solid 2px`, offset 3px — **visible**, not gold |

- Tab order follows reading order: skip → banner home → main CTA → footer socials.
- No keyboard trap observed (Tab cycles back to the skip link after the last footer link).
- Gold ring `#E8C97A` / `rgb(232, 201, 122)` matches ACCESSIBILITY.md `--color-focus` on skip, logo, and CTA.
- Footer social rings use `currentColor` / text primary `#F5F5F5` instead of `--color-focus`. Still a 2px visible outline on the dark background. Optional integration request below — **not** an axe violation.

CTA `href` is the ISSUE-021 placeholder `[WHATSAPP_NUMBER — REQUIRED BEFORE LAUNCH]`. The control is keyboard-reachable; it is not a working WhatsApp URL. Content replacement owns the valid href.

## 3. Skip link

On first `Tab`:

- Focus is on `a.skip-link[href="#main-content"]`.
- Link becomes visible (`top: 0px`; unfocused rest position is `top: -100px`).
- Focus ring: gold 2px / 3px offset.

On `Enter`:

- `location.hash` = `#main-content`.
- `#main-content` is in the viewport (`mainTop: 0`, `scrollY: 303` at 1280×800).
- Next `Tab` lands on the CTA inside `main`, not the banner logo — Chromium sequential focus starting point moved to the fragment target.

`#main-content` has **no** `tabindex="-1"`. After activation, `document.activeElement` is `body`, not `main`. Hash navigation and subsequent Tab order still skip the banner. Moving programmatic focus onto `main` (recommended for AT) is **unconfirmed** without VoiceOver. See integration request IR-020-1.

axe rule `skip-link` passed.

## 4. Heading tree (DOM)

VoiceOver / macOS Safari: **unconfirmed — not run.**

DOM order (no skipped levels):

```
h1  [HERO_HEADING — REQUIRED BEFORE LAUNCH]          ← Hero, once
h2  #manifesto-heading
h2  #specialties-heading
h3  [SPECIALTY_NAME — PLACEHOLDER]  × 5
h2  #specialists-heading
h3  Dr. Alessandro Schwertner
h3  Dra. Renata Schwertner
h3  Dr. Matheus Schwertner
h3  Dr. Mohamed Ismail
h2  #cta-heading
```

Matches ACCESSIBILITY.md: one `h1` in Hero, section `h2`s, card `h3`s. axe `heading-order` and `page-has-heading-one` passed.

Five specialty `h3`s share the same placeholder string. That is ISSUE-021 content duplication, not a skipped-level defect.

## 5. Images

| Image | `alt` | Verdict |
|---|---|---|
| Header logo (`class-gray.webp`) | `Class Odontologia` (`siteConfig.name`) | Pass |
| GoldenLogo poster | `""` (decorative) | Pass |
| Specialist cards × 4 | `Foto de {name}` | Attribute present per ACCESSIBILITY.md |
| Footer logo (`class-gray.webp`) | `Class Odontologia` | Pass |

No `img` is missing the `alt` attribute. axe `image-alt` passed.

Specialist portraits are **not** in `public/assets/people/`. Cards render the brand fallback `/assets/brand/class-oficial.webp` with `alt="Foto de {Name}"`. The alt formula is correct for a real portrait; it is inaccurate while the fallback is a logo. Content / ISSUE-021 (real photos) resolves this. Optional component request: IR-020-2.

## 6. Cinematic videos

### GoldenLogo

Rendered `<video>`:

- `src`: `/assets/cinematic/logo/golden-identity-v1.mp4`
- `aria-hidden="true"`
- `muted`, `autoplay`, `loop`, `playsInline`
- `poster`: `/assets/cinematic/logo/golden-identity-v1-poster.webp`

axe `aria-hidden-focus` passed (video is not a tab stop).

### Tooth cinematic

**N/A — do not fail DoD.** STOP-06: the only tooth source is watermarked; `tooth-cinematic-v1.mp4` was not produced; ToothScrubber is omitted from the ISSUE-016 page. No second `<video>` exists. Confirmed: zero `tooth-cinematic` / `vidu-video` elements in the audited DOM.

## 7. Reduced motion

`prefers-reduced-motion: reduce` (Playwright media emulation, not a system setting):

| Check | 1280×800 | 375×812 |
|---|---|---|
| `matchMedia('(prefers-reduced-motion: reduce)')` | true | true |
| GoldenLogo `<video>` | `display: none`, `paused: true` | `display: none` |
| Poster `img.golden-logo-poster` | visible, 768×388, `alt=""` | visible, 375×189 |
| `<h1>` present | yes | yes |
| `main` sections | 5 | 5 |
| Horizontal overflow (`scrollWidth > innerWidth + 2`) | false | true (`410` vs `375`) — **same without reduced motion** |

The reduced-motion path is visually composed: poster shown, video hidden, text present, no missing section. It is not a blank page.

375px overflow (~35px) is **not** reduced-motion-specific. No overflowing child `getBoundingClientRect` was identified. Logged as a risk for ISSUE-017 viewport QA, not as an ISSUE-020 reduced-motion break.

Manifesto Level 2 reveal CSS includes a `@media (prefers-reduced-motion: reduce)` branch that keeps the body at `opacity: 1` with `animation: none`. Not separately timed in this audit beyond the composed page remaining readable.

## 8. Landmarks

Matches ACCESSIBILITY.md for this placeholder page:

| Landmark | Evidence |
|---|---|
| Skip link | `a.skip-link[href="#main-content"]` before the banner |
| Banner | one `<header role="banner">` (site header) |
| Main | one `<main id="main-content">` |
| Regions | Hero `aria-label="Hero"`; Manifesto / Specialties / Specialists / CTA via `aria-labelledby` |
| Contentinfo | `<footer role="contentinfo">` **after** `</main>` (not nested in `main`) |
| Navigation | footer `<nav aria-label="Redes sociais">` |

Section-level `<header>` elements inside Specialties / Specialists are scoped (not extra banners). axe landmark uniqueness / single main / single banner / single contentinfo passed.

## Integration requests

Documentation only — **do not patch in this issue.**

### IR-020-1 — Skip-target focus (Foundation / `app/layout.tsx`)

Add `tabindex="-1"` to `<main id="main-content">` so activating the skip link can move programmatic focus to main (WCAG 2.4.1 best practice for AT). Hash navigation already works in Chromium.

### IR-020-2 — Specialist fallback alt (ISSUE-014 / Content)

While portraits are missing, `SpecialistsSection` serves `class-oficial.webp` and `SpecialistCard` still uses `alt="Foto de {name}"`. After ISSUE-021 photos land, the current alt formula is correct. Until then, owners may choose a fallback-specific alt (or keep as-is as a known placeholder inaccuracy).

### IR-020-3 — Footer social focus color (ISSUE-015 / Design System) — optional

Instagram / Facebook show a white 2px ring (`#F5F5F5`) instead of `--color-focus` (`#E8C97A`). Visible; not an axe finding. Align with global `:focus-visible` if gold consistency is desired.

### IR-020-4 — CTA href (ISSUE-021)

Replace `[WHATSAPP_NUMBER — REQUIRED BEFORE LAUNCH]` with the approved WhatsApp URL. Not an axe critical; blocks a real destination.

## Definition of Done

| Item | Status |
|---|---|
| Zero axe-core critical violations | Satisfied |
| Keyboard: all interactive elements, logical order, visible focus ring | Satisfied |
| Skip link navigates to `#main-content` | Satisfied |
| Heading tree `h1` → `h2` → `h3` | Satisfied via **DOM**; VoiceOver **unconfirmed** |
| `aria-hidden` on cinematic videos | Satisfied for GoldenLogo; tooth **N/A** (STOP-06) |
| Reduced-motion page not visually broken; poster visible | Satisfied |
| Landmarks: skip, banner, one `main#main-content`, footer after main | Satisfied |
| No `app/` / `components/` edits | Satisfied |

**ISSUE-020 DoD: satisfied** for this placeholder RC, with VoiceOver explicitly unconfirmed and tooth video N/A.

## Unresolved risks

- VoiceOver / Safari macOS heading and skip-link announcement: **unconfirmed**.
- iOS Safari / Android: not in this issue’s required evidence; not claimed.
- Preview SSO not re-audited here; local prod build used.
- Specialist logo-as-photo alt mismatch until ISSUE-021.
- Invalid CTA href until ISSUE-021.
- ~35px horizontal overflow at 375px in Chromium (independent of reduced motion) — follow in ISSUE-017 if viewport tests fail.

## Validations executed

| Command / procedure | Result |
|---|---|
| `pnpm build` (worktree) | Pass |
| `pnpm start` → `http://localhost:3000` | Ready |
| axe-core 4.13.0 full page (Playwright Chromium) | 0 violations |
| Keyboard Tab traversal + focus-ring computed styles | 5 stops, rings visible |
| Skip link Tab + Enter | hash `#main-content`, main in view |
| DOM heading / image / video / landmark inventory | As above |
| `prefers-reduced-motion: reduce` at 1280 and 375 | Poster visible; video hidden |
| VoiceOver macOS Safari | **Not run** |
| Vercel Preview live axe/keyboard | **Not run** (SSO / CLI scope) |
