# AFK Execution Policy — CLASS Odontologia

**Version: 1.0 — 2026-08-21**
**Authority: Product Owner (Preflight decision)**

This document governs agent behavior during autonomous execution (AFK phases). Its purpose is to eliminate unnecessary interruptions while preserving factual, technical, and ethical integrity.

---

## CONTINUE WITHOUT OWNER

Proceed autonomously for any situation in this category. Choose the simplest reversible solution that preserves layout geometry and composition intent.

| Situation | Action |
|---|---|
| Optional asset absent (specialty image, interior photo, tech photo) | Use neutral placeholder. Preserve aspect ratio, safe zone, and layout structure. |
| External logo or brand mark absent | Typographic placeholder (`[PARTNER NAME]`) or empty brand mark container. Do not invent logos. |
| Specialist credential unverified (title, specialization details) | Omit the unverified field. Name and specialty remain; bio/title stays empty or generic (`"Especialista"`). |
| Secondary copy variation / line break | Adjust within the approved copy envelope (Scene Contract §copy). Do not invent new claims. |
| CSS mask unreliable on a specific test → has approved fallback | Use the fallback path defined in ADR-012 (opacity/brightness reveal). Do not block. |
| Final portrait image absent for a specialist | Media well placeholder. Monogram or initials as interim visual. |
| Minor visual inconsistency (spacing, sizing, opacity) | Choose the simpler, more reversible option. Log it in a `REVIEW_NOTES.md` entry. |
| A Playwright test is brittle after an unrelated change | Fix the test if the fix does not alter product behavior; otherwise skip the test with a comment and log it. |
| Hero video unavailable or video load error | Show poster image (`TOOTH_POSTER_PATH`). The section never renders as a black void. |
| Smile video path missing | The `SmileWell` component is archived (ADR-009 update). Do not render it; the Manifesto is typographic. |
| Batch B specialty images needed (WP-21) | Generate autonomously following `SPECIALTIES_VISUAL_DNA.md`. 1 candidate per specialty. Max 1 corrective regen. Use best valid result; do not seek perfection. |
| Place interior photos absent | Map asset (`map.webp`) is available; use it. Photo placeholders for future real shots. |
| Method technology media absent | Placeholder abstract visual (neutral gradient/dark well). Do not invent scanner names or interfaces. |
| `Selected by CLASS` partner logos absent | Typographic brand names in neutral type weight. No AI-generated logos. |
| Geist Mono weight not loaded | Fall back to Geist Sans for metadata labels. Not a blocker. |

---

## STOP AND REPORT

Halt work on the affected scope and report clearly. Do not attempt to workaround these categories.

| Situation | Required action |
|---|---|
| Contradiction between two accepted ADRs or between an ADR and a Scene Contract | Stop. Identify both sources, quote the conflict, and report without guessing which wins. |
| Risk of publishing a **false clinical or factual claim** (founding date, credential, partnership, medical outcome) | Stop immediately. Do not publish placeholder text that could be mistaken for verified fact. |
| A change requires adding a **new npm dependency or a new runtime library** not in `package.json` | Stop. No dependency additions without owner approval. |
| A change requires **violating an accepted ADR** (e.g., using WebGL, adding a smooth-scroll library, embedding a live Maps iframe, per-frame React state for GSAP) | Stop. Cite the ADR and propose an alternative within existing constraints. |
| Build or typecheck **fails and cannot be fixed within 3 reasonable attempts** affecting core routes | Stop. Report the error, last attempted fix, and the files in scope. |
| The planned architecture for a scene is **technically inviable** on a supported browser/device | Stop. Describe the failure mode, which device/browser, and propose the pre-approved fallback. |
| An edit would **destructively alter the Hero, ToothScrubber, or GoldenLogo** — sections outside the current WP scope | Stop. These are single-writer protected. Changes require a new WP authorization. |
| **Irreversible data loss** risk: overwriting the only copy of an asset, deleting files outside the WP's allowed scope | Stop. Additive only. Do not delete source assets. |
| A human-identity asset (specialist portrait, patient image) cannot be verified as approved for use | Stop. Use initials/monogram placeholder and flag for owner approval. |

---

## Escalation format

When stopping, report in this format:

```
STOP: [one-line reason]
Source conflict: [files/sections]
Proposed path: [if any within existing guardrails]
Owner decision needed: [specific question]
```

---

## Single-writer rules (strict)

The following files must only be modified by their designated WP. Any other agent must treat them as read-only.

| File | Exclusive owner | Rule for all others |
|---|---|---|
| `app/page.tsx` | WP-19 | read-only |
| `styles/tokens.css` | WP-10 | read-only |
| `app/layout.tsx` | WP-10 | read-only |
| `app/globals.css` | **WP-18** — Hero fix | NO edits. Use Tailwind utilities + inline styles. If a custom CSS rule is unavoidable, leave `// GLOBALS-NEEDED: .class { ... }` in the component file. WP-18 applies them all. |
| `content/copy.ts` | **WP-06** | read-only. WP-04 must not touch this file. |
| `content/specialties.ts` | **WP-04** | read-only for all others. |
| `content/specialists.ts` | **WP-05** | read-only for all others. |
| `public/assets/cinematic/tooth/*` | WP-21 (owner-gated) | read-only — do not overwrite watermark prototype |

---

## Asset placeholder specification

A **neutral placeholder** is:
- A dark rectangle with no content (dark acts) or a paper rectangle (paper acts) at the required aspect ratio.
- Optionally a centered `<span className="text-sm text-secondary uppercase tracking-label">` with the asset ID (e.g., `specialty-orthodontia`).
- Never a random stock photo, a color fill that conflicts with the palette, or invented imagery.

---

## Definition of "reversible"

A decision is reversible if:
- It can be changed by editing a single file without touching another section's markup.
- It does not introduce a new hard dependency.
- It does not change the content model schema in a way that breaks existing data files.
