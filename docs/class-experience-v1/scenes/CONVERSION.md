# Scene Contract — Start a Conversation

**Scene ID:** `conversion`
**Status:** v1.0 — Implementation-ready
**Homepage act:** ACT 09 — START A CONVERSATION (Conversion)
**Intensity:** Clear, quiet, confident
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`
**Owner decision:** D6 (dark close), D10 (docs copy), D12 (split from Place; consolidate one conversion component).

---

## 1. Narrative purpose

Offer the earned next step. The conversion should feel like the natural result of the preceding narrative, not an aggressive pitch.

### Visitor question
> "What do I do next?"

### Intended takeaway
> "Starting contact is simple."

---

## 2. Approved copy — V1

**Headline:**

> **Comece por uma conversa.**

**Closing brand signature:**

> **A arte de sorrir com Class.**

**Primary CTA label:** existing `copy.cta.buttonLabel` ("Agende sua avaliação") or "Começar conversa" — do not invent new claims.

### Copy policy
The signature is the emotional close of the whole page and appears here (selective use — not repeated per viewport elsewhere).

---

## 3. Behavior & structure

- Dark field (final close).
- **One primary CTA** → WhatsApp (`siteConfig.whatsapp`). Optional secondary → Maps (`siteConfig.mapsUrl`) if useful.
- Minimal friction; no aggressive sales language; no repeated CTAs.
- **Production canonical target** for any absolute link/reference: `https://classodontologia.com.br`. Preview/deploy URLs must not replace the production canonical.
- Consolidate conversion into **one** component: reuse/rename the orphan `AppointmentCTA.tsx` or build `ConversionSection.tsx` and remove the orphan (single-writer — no duplicate conversion components).

---

## 4. Motion

- Level 1–2 only: button/link microinteractions per MOTION §11 (restrained), `Reveal` on entry.
- No scrub, no GSAP required.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** centered or left-anchored close with signature + primary CTA.
- **Mobile:** stacked, thumb-reachable CTA.
- **Reduced motion:** fully readable/actionable static.

---

## 6. Scope

### Allowed
- New `components/sections/ConversionSection.tsx` (or repurposed `AppointmentCTA.tsx`).
- `content/copy.ts` — `cta` / `conversion` fields; `config/site.ts` read-only.
- `components/ui/Button.tsx` reuse; scoped styles via Foundation request.

### Forbidden
- Duplicate conversion components; contact form/backend; preview URL as canonical; aggressive sales copy; other acts; new deps.

---

## 7. Acceptance criteria

- [ ] Approved headline + signature present.
- [ ] Exactly one primary CTA (WhatsApp); optional single secondary.
- [ ] Only one conversion component exists (orphan removed/absorbed).
- [ ] Absolute references use production canonical, not preview URL.
- [ ] Keyboard-accessible CTA, visible focus ring.
- [ ] Dark contrast (axe) passes; reduced motion actionable; build/e2e green.

## 8. Definition of done

The page closes on a calm, confident dark conversion act with the brand signature and a single earned primary CTA, served by one consolidated component.
