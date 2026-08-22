# Design System — Class Odontologia MVP

**Authority: HIGH**
Source of truth for all visual decisions. Owned exclusively by the Design System Agent.

## Philosophy

Dark, sophisticated, champagne-gold. Editorial serif for impact. Clean sans for body. No decorative excess. Premium is expressed through restraint.

The Manifesto is the one **paper** exception: a warm off-white field after the dark Hero. Specialties and every section below return to the dark field. Gold on paper uses `--color-gold-on-paper` so contrast holds.

## Token Architecture

One authoritative source: `styles/tokens.css`.

- `@theme {}` — tokens that participate in Tailwind utility generation (colors, fonts, spacing scale used in utilities)
- `:root {}` — CSS custom properties for direct CSS use (motion values, z-index, complex values not needing Tailwind utilities)

Do not duplicate tokens between CSS variables and a separate Tailwind config. `styles/tokens.css` is the single source of truth.

## Color Direction

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#080808` | Page background |
| `--color-bg-secondary` | `#111111` | Alternate section background |
| `--color-bg-surface` | `#181818` | Card backgrounds |
| `--color-bg-paper` | `#F3EFE6` | Manifesto paper field only |
| `--color-text-primary` | `#F5F5F5` | Body text, headings (dark field) |
| `--color-text-secondary` | `#9A9A9A` | Supporting text, captions (dark field) |
| `--color-text-paper` | `#1A1814` | Body and headings on paper |
| `--color-text-paper-muted` | `#5C574E` | Supporting text on paper |
| `--color-gold` | `#C9A84C` | Primary accent on dark |
| `--color-gold-light` | `#E8C97A` | Shimmer, hover, focus ring |
| `--color-gold-on-paper` | `#7A5E14` | Gold accent on paper (AA) |
| `--color-border` | `rgba(255,255,255,0.08)` | Subtle dividers, card borders |
| `--color-border-paper` | `rgba(26,24,20,0.1)` | Hairline on paper |
| `--color-focus` | `#E8C97A` | Focus ring — accessibility |

> These are design directions. The Design System Agent may refine values during implementation based on visual testing. Palette changes beyond minor refinement require human approval.

## Contrast Compliance

| Pair | Approximate ratio | Status |
|---|---|---|
| `#F5F5F5` on `#080808` | ~20:1 | ✓ AAA |
| `#9A9A9A` on `#080808` | ~5.4:1 | ✓ AA |
| `#C9A84C` on `#080808` | ~7.2:1 | ✓ AA |
| `#1A1814` on `#F3EFE6` | ~16:1 | ✓ AAA |
| `#7A5E14` on `#F3EFE6` | ~5.5:1 | ✓ AA |
| `--color-text-secondary` on `--color-bg-surface` | verify during build | Must pass AA |

`--color-text-secondary` must not be used for meaningful body content — only for decorative labels, dividers, and non-critical secondary text.

## Typography Direction

> **Superseded by ADR-010 (2026-08-21) on acceptance.** The `class-experience-v1` direction is **Geist Sans** (primary/functional) + **Instrument Serif** (editorial), with **Geist Mono** as an optional utility/metadata voice. All three are available via `next/font/google` (no new dependency, no unlicensed files). Migration is a single token-level swap gated by the Typography Validation Spike (WP-03). Until ADR-010 is Accepted and the spike tokens approved, the current Montserrat + Cormorant implementation stands. The recommendation below is retained as historical baseline.

Recommended families (historical baseline): **Cormorant Garamond** (display serif) + **Inter** (body / UI sans-serif). The shipped MVP used Montserrat + Cormorant.

This is a design recommendation, not an immutable rule. The Design System Agent may propose an alternative pair if visual testing reveals a better fit. The constraint is:
- Maximum 2 families
- Maximum 3 weights per family
- Both available via `next/font/google`
- Adequate coverage for Brazilian Portuguese glyphs

**Cormorant Garamond** — used for: Hero headlines, Manifesto statement, section display headings.
**Inter** — used for: body paragraphs, navigation labels, CTA text, specialist names, captions.

### Type Scale (fluid, using `clamp()`)

```css
--text-sm:    clamp(0.875rem, 1.5vw, 1rem);
--text-base:  clamp(1rem, 2vw, 1.125rem);
--text-lg:    clamp(1.125rem, 2.5vw, 1.375rem);
--text-xl:    clamp(1.375rem, 3vw, 1.75rem);
--text-2xl:   clamp(1.75rem, 4vw, 2.5rem);
--text-3xl:   clamp(2.25rem, 5.5vw, 4rem);
--text-hero:  clamp(3rem, 8vw, 7rem);
```

### Letter Spacing

- Display headlines: `-0.02em` to `-0.04em` (tight tracking, editorial feel)
- UI labels / navigation: `0.08em` to `0.15em` (wide tracking, premium feel on uppercase)
- Body text: `0` (normal)

## Spacing

```css
/* Section rhythm */
--section-px: clamp(1.5rem, 6vw, 5rem);
--section-py: clamp(4rem, 10vw, 10rem);
```

Component-level spacing uses Tailwind utilities directly. Only section-level rhythm is tokenized.

## Motion Hierarchy

| Level | Mechanism | Used for |
|---|---|---|
| 0 | None | Footer, legal text, structural UI |
| 1 | CSS `transition` | Button hover, link hover, focus ring |
| 2 | CSS `@keyframes` + `IntersectionObserver` | Section/card reveal on scroll entry |
| 3 | GSAP timeline | Manifesto text word-reveal, orchestrated sequences |
| 4 | GSAP ScrollTrigger + video seek | Hero cinematic only |

CSS-first. GSAP only where it materially improves the experience over CSS. Level 4 is confined to `components/cinematic/`.

> **Amended by ADR-011 (2026-08-21):** Level 4 (scroll-driven/scrub) motion, previously "Hero only", is now permitted for **two** scenes — the Hero cinematic **and** the Specialties sticky multi-state scene. Any further Level-4 scene requires a new ADR. See also ADR-012 (Specialists light/shadow reveal, Level 3–4 with mandatory fallback).

### Motion Tokens

```css
/* In :root — motion values for direct CSS use */
--duration-fast:   150ms;
--duration-normal: 300ms;
--duration-slow:   600ms;
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
```

GSAP easing presets are defined in `lib/motion.ts`, not in CSS.

### Motion Restrictions

- No Lenis or smooth-scroll libraries
- No parallax on content sections — parallax is confined to the Hero cinematic
- Maximum 2 elements animating simultaneously during section reveals (excluding Hero)
- Stagger between sibling elements: ≤ 80ms
- No re-play on scroll-back for content sections; reveals trigger once on entry

## Z-Index Layers

```css
/* In :root */
--z-content: 10;
--z-overlay: 20;
--z-nav:     40;
```

Modal and toast z-indexes are not defined — no modal/toast UI exists in the MVP.

## Focus Treatment

All interactive elements must display a visible focus ring using `--color-focus` (`#E8C97A`):

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

Never suppress focus rings for visual styling reasons.

## Reduced Motion

GSAP animations must check `gsap.matchMedia()` and provide a static or minimal state for `prefers-reduced-motion: reduce`.

CSS animations must use scoped reduced-motion rules, not a global `* { animation-duration: 0.01ms }` reset, which can break functional transitions.

The static experience under reduced motion must be visually composed — not empty. Content remains readable and styled.

## Tokens NOT in MVP Scope

The following tokens should NOT be created until an MVP component needs them:
- Modal z-index
- Toast z-index
- Form error colors
- Data visualization colors
- Multiple border radius variants (define one or two maximum)
- Spring easing (add when a specific component justifies it)
