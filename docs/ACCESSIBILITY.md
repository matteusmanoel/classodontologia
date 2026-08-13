# Accessibility — Class Odontologia MVP

**Authority: HIGH**
Accessibility requirements are non-negotiable. No agent may remove, skip, or defer these without explicit human approval.

## Semantic Structure

```html
<html lang="pt-BR">
<body>
  <a href="#main-content" class="skip-link">Ir para o conteúdo principal</a>
  <header role="banner"><!-- nav, logo --></header>
  <main id="main-content">
    <section aria-label="Hero">...</section>
    <section aria-labelledby="manifesto-heading">...</section>
    <section aria-labelledby="specialties-heading">...</section>
    <section aria-labelledby="specialists-heading">...</section>
    <section aria-labelledby="cta-heading">...</section>
  </main>
  <footer role="contentinfo">...</footer>
</body>
```

## Heading Hierarchy

```
h1 — Hero main heading (once per page)
h2 — Section headings (Manifesto, Especialidades, Especialistas, Agende)
h3 — Card headings (specialist names, specialty names)
```

Never skip levels. Never use headings for visual styling alone.

## Focus Treatment

All interactive elements must have a visible focus ring:

```css
:focus-visible {
  outline: 2px solid var(--color-focus);  /* #E8C97A */
  outline-offset: 3px;
}
```

Never suppress focus rings for visual reasons.

The skip-to-content link must be visible when focused (it may be visually hidden but must become visible on Tab).

## Keyboard Navigation

- All interactive elements (links, buttons, CTAs) reachable via Tab
- Tab order follows visual reading order
- No keyboard traps
- Enter and Space activate buttons
- Escape closes any overlay if one exists in the future

## Decorative Media

Both cinematic videos communicate no essential information that does not exist elsewhere in the page. Therefore:

```html
<video aria-hidden="true" ...>
```

Poster images used as fallbacks: `alt=""` (decorative).

Real specialist photographs: `alt="Foto de [Nome do Especialista]"` — descriptive but not fabricated. Do not include credentials in alt text that have not been approved.

Clinic and treatment photographs: `alt` text describing the image contents (e.g., "Interior da clínica Class Odontologia" — do not make clinical claims).

## Color Contrast

| Pair | Ratio | Status |
|---|---|---|
| `#F5F5F5` on `#080808` | ~20:1 | ✓ AAA |
| `#9A9A9A` on `#080808` | ~5.4:1 | ✓ AA |
| `#C9A84C` on `#080808` | ~7.2:1 | ✓ AA |

`--color-text-secondary` must not be used for meaningful body text. Decorative use only.

All color combinations introduced during implementation must be verified for WCAG AA compliance (4.5:1 for normal text, 3:1 for large text).

## Reduced Motion

Under `prefers-reduced-motion: reduce`:

- All GSAP animations must be disabled using `gsap.matchMedia()`
- All CSS reveal animations must be suppressed using scoped CSS rules (not a global reset)
- The cinematic Hero shows the static poster image
- The scroll section height reduces to `100vh` (no scroll room required)
- Text content renders in its final state, fully visible

The experience under reduced motion must be **visually composed and complete** — not a blank or broken page.

Do not use:
```css
/* PROHIBITED — breaks functional transitions */
*, *::before, *::after {
  animation-duration: 0.01ms !important;
}
```

Use targeted rules instead:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-reveal { opacity: 1; transform: none; transition: none; }
  .cinematic-video { display: none; }
  .cinematic-poster { display: block; }
}
```

## No-JS Behavior

The page must be legible without JavaScript. Server-rendered HTML renders the complete content structure. GSAP animations and video scrubbing are progressive enhancements. The poster image renders via the `poster` attribute of the `<video>` element and the fallback `<img>` if the video element is not rendered.

## ARIA

- Cinematic videos: `aria-hidden="true"`
- CTA buttons: descriptive label (`aria-label` if icon-only; button text otherwise)
- Section landmarks: `aria-label` or `aria-labelledby` as shown in semantic structure above
- Any future overlay or dialog: `role="dialog"`, `aria-modal="true"`, focus trap

## QA

- Run `axe-core` (via Playwright or browser extension) — zero critical violations before release
- Manual keyboard navigation check on the production build
- Manual VoiceOver check (macOS Safari) — spot-check heading structure and interactive elements

See [QA_STRATEGY.md](QA_STRATEGY.md) for test automation details.
