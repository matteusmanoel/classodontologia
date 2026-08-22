# ADR-010 — Typography migration to Geist Sans + Instrument Serif

**Status: ACCEPTED**
**Date: 2026-08-21**
**Accepted: 2026-08-21 — Preflight close (Product Owner direction)**
**Authority: Product Owner / Lead Preflight Architect
**Supersedes (on acceptance):** the DESIGN_SYSTEM.md typography recommendation (Cormorant Garamond + Inter) and the current Montserrat + Cormorant implementation.

---

## Decision

Migrate the site typography system to:

- **Geist Sans** — primary/functional voice (navigation, body, UI, specialty names, professional names, buttons).
- **Instrument Serif** — restrained editorial/emotional voice (selected oversized words, emotional phrases, display headlines).
- **Geist Mono** — optional utility/metadata voice only (`01 / 08`, `EST. 1998`, `25 / 03 / 1998`, technical labels).

The migration is a **single token-level swap**, not a piecemeal per-component replacement. It is gated by an approved spike.

---

## Context

`class-experience-v1` selects this system (`MOTION_AND_TYPE_SYSTEM.md §3`). The current site uses Montserrat + Cormorant via `next/font/google`, tokenized as `--font-sans` / `--font-display` in `styles/tokens.css`. Docs require a Validation Spike before global migration and forbid piecemeal replacement.

**Verified:** Geist Sans, Geist Mono, and Instrument Serif are all available via `next/font/google`. → **No new npm dependency and no unlicensed font files** (satisfies MOTION §3.3 licensing rule and AGENT_CONTRACT §4).

---

## Alternatives considered

- **Keep Montserrat + Cormorant.** Rejected: does not deliver the selected editorial CLASS identity; leaves a permanent doc/implementation mismatch.
- **Immediate migration without spike.** Rejected: docs forbid it; risks page-wide line-break/scale regressions unverified.
- **Add a third display family.** Rejected: two families max; the selected pair already provides the semantic split.

---

## Consequences

- All type must be **token-driven** (`--font-sans` / `--font-display` / a new `--font-mono` if adopted). Scenes built during this initiative must not hardcode font families so they survive the swap.
- Migration touches only `styles/tokens.css` (font vars + approved scale/tracking/line-height) and `app/layout.tsx` (loaders). No section markup rewrites for layout.
- Re-run visual regression and CLS checks after migration (font payload/loading strategy validated in the spike).
- Amends DESIGN_SYSTEM.md typography section (annotated on acceptance).

---

## What agents must do

- Do not perform any global font change before this ADR is `Accepted` and the spike tokens are owner-approved.
- Build all new acts token-driven (no hardcoded `font-family`).
- Load fonts via `next/font/google` only; do not commit font files or add font packages.
- Verify Brazilian Portuguese diacritics and light-weight rendering in the spike.

---

## Revisit condition

If the spike shows the selected system does not measurably improve CLASS distinctiveness/legibility over the baseline, or if font payload/loading harms Web Vitals without mitigation.

## Acceptance record — 2026-08-21 (Preflight)

**Status: ACCEPTED — no spike required. Families approved by Product Owner. Token values defined below.**

### `app/layout.tsx` — font loaders

```ts
import { Geist, Instrument_Serif, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

// Optional — adopt only where Geist Mono utility voice is used (e.g., "EST. 1998")
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geist-mono',
  display: 'swap',
})
```

### `styles/tokens.css` — font variable swap

```css
--font-display: var(--font-instrument-serif), "Instrument Serif", ui-serif, Georgia, serif;
--font-sans:    var(--font-geist-sans),        "Geist",            ui-sans-serif, system-ui, sans-serif;
/* Optional: */
--font-mono:    var(--font-geist-mono),        "Geist Mono",       ui-monospace, "Cascadia Code", monospace;
```

### Tracking

| Token | Old (Cormorant) | New (Instrument Serif) | Rationale |
|---|---|---|---|
| `--tracking-display` | `-0.03em` | `-0.02em` | Instrument Serif is less condensed than Cormorant; loosened 1/100 em prevents tightness |
| `--tracking-label` | `0.12em` | `0.12em` | Unchanged — works well for Geist Sans uppercase labels |

### Line-height adjustments

| Token | Old | New | Rationale |
|---|---|---|---|
| `--text-hero--line-height` | `0.95` | `1.0` | Instrument Serif at display scale is less condensed; 0.95 clips descenders |
| `--text-wordmark--line-height` | `0.82` | `0.88` | Wordmark uses Geist Sans; 0.82 is correct for Montserrat; Geist Sans needs 0.88 |
| All others | unchanged | unchanged | Existing fluid scale values transfer cleanly |

### Responsive scale

Existing `clamp()` values in `styles/tokens.css` are retained unchanged. Both fonts perform well across the full scale range.

### Brazilian PT diacritics

`latin-ext` subset covers all required characters (ã â ç é ê õ ú).

### Loading strategy

- `display: 'swap'` on all — no invisible-text flash; `next/font` injects preload links automatically
- Geist Sans 300 + 400 are the above-fold critical weights; loaded first by `next/font` priority
- Instrument Serif 400 appears only at `text-3xl`+ — non-critical render path
- Total additional payload vs Montserrat+Cormorant: marginal (both pairs similar in WOFF2 size)

### Geist Mono adoption scope

Adopt only for: ordinal counters (`01 / 08`), date metadata (`EST. 1998`, `25 / 03 / 1998`), and any other utility/metadata label where mono rhythm adds precision. Do not use for body text or headings.

