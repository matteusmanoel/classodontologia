# Scene Contract — Specialists / Hero Moment 03

**Scene ID:** `specialists`
**Status:** v1.0 — Implementation-ready (spike-gated for the reveal)
**Homepage act:** ACT 06 — THE PEOPLE BEHIND THE STANDARD
**Intensity:** Hero Moment 03 — high
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../ASSET_PLAN.md`, `../../DECISIONS/ADR-012-specialists-light-shadow-reveal.md`
**Owner decision:** D6 (dark), D7 (omit unverified credential), D9/D13 (spike-first for the mask reveal).

---

## 1. Narrative purpose

Turn authority into trust: experienced, current professionals sustain the CLASS standard. Humanize the previously technical story.

### Visitor question
> "Who am I trusting?"

### Intended takeaway
> "Experienced, current professionals sustain the CLASS standard."

### Transition meaning (Method → Specialists)
`system → people who apply it`

### Emotional goal
> From system to person. From technical confidence to human trust.

---

## 2. Content — V1 verified

Use only the four professionals already in `content/specialists.ts`. **Do not invent** people or credentials.

| Order | id | Name | Specialty | Credential (title) |
| ---: | --- | --- | --- | --- |
| 1 | `alessandro-schwertner` | Dr. Alessandro Schwertner | Ortodontia e Ortopedia Facial | CRO 9278-PR |
| 2 | `renata-schwertner` | Dra. Renata Schwertner | Dentística Estética | CRO 9438-PR |
| 3 | `matheus-schwertner` | Dr. Matheus Schwertner | Reabilitação e estética | *(unverified — omit line)* |
| 4 | `mohamed-ismail` | Dr. Mohamed Ismail | Implantodontia e prótese | *(unverified — omit line)* |

Order follows `experience → renewal → additional competency`. Per D7, the credential line renders **nothing** when unverified — never the literal "Especialistas" placeholder. The content model must tolerate later enrichment without redesign.

**Section copy — V1:**

> **O olhar por trás do padrão.**
> Experiência, atualização e diferentes competências reunidas por uma mesma forma de cuidar.

---

## 3. Core experience model

**Visual hypothesis: focus through light and shadow.** A portrait begins partially obscured on a dark field; a controlled light/focus region reveals the specialist + associated info during scroll; the portrait may return partly to shadow as attention moves on.

This is an **adaptation for CLASS**, not a literal recreation of another site. It is **spike-gated** (WP-13) before production.

### Initial content state
Show little: name, specialty/role, one short detail. Full credentials may be progressively disclosed or in a secondary layer.

---

## 4. Visual structure

- Dark field (`--color-bg-primary`) — required for the light/shadow reveal (part of the dark block).
- Real portraits from `public/assets/people/*` (`real_person`); 3:4 framing; dark/neutral background suits the spotlight.
- Persistent: section heading + editorial rhythm. Changing: which specialist is in focus/light.

Existing monogram fallback stays for any missing portrait.

---

## 5. Motion

Approved verbs: `REVEAL`, `FOCUS`, `TRANSITION`.

### Reveal technique (from spike)
- Portrait + dark overlay + moving radial/linear gradient or CSS mask + GSAP progress.
- **Mandatory fallback:** opacity/contrast reveal without advanced mask (Safari/iOS/older browsers), selected via feature detection — never browser-name detection.

### Forbidden
- Bounce/elastic; cursor-follow; autonomous motion at rest; per-frame `setState`; drama for its own sake; new deps; runtime 3D.

### GSAP rule
`gsap.matchMedia` + `useGSAP`; scoped context; clean teardown; no leaked ScrollTrigger.

---

## 6. Desktop / mobile / reduced-motion

- **Desktop (`min-width: 1024px` + no-preference):** the light/shadow reveal (sequence of focused portraits). Sticky only if the spike proves it adds value; otherwise entry-driven timeline.
- **Mobile / touch:** sequential portraits in normal flow with simple reveals; no scrub, no mask dependency, no gesture requirement.
- **Reduced motion:** all portraits + names + specialties visible directly; no mask/gradient dependency to read identity; no scroll trap.

---

## 7. Progressive enhancement & resilience

- Names/specialties/bios present in server HTML; JS only enhances.
- Missing portrait → monogram fallback (existing).
- No essential identity information hidden behind opacity/mask for assistive tech.

---

## 8. Scope

### Allowed
- `components/sections/SpecialistsSection.tsx`.
- New `components/cinematic/SpecialistsReveal.tsx` (client island).
- `components/ui/SpecialistCard.tsx` (credential-guard from WP-05).
- `content/specialists.ts` (data shape only).
- Scoped styles via Foundation request; `app/prototype/specialists-reveal/*` for the spike.

### Forbidden
- Specialties files; Hero; Location/Place/Conversion; invented credentials; new deps.

---

## 9. Acceptance criteria

- [ ] Four verified professionals present in correct order; no invented data.
- [ ] Unverified credential line omitted (no "Especialistas" placeholder).
- [ ] Reveal works on Chrome desktop; fallback proven on Safari/iOS.
- [ ] Reduced motion: identities fully readable, no mask/scrub dependency.
- [ ] Mobile: sequential, no horizontal interaction, images reserve space.
- [ ] No leaked ScrollTrigger; no per-frame `setState`; no console errors.
- [ ] a11y (axe/keyboard) + `typecheck`/`lint`/`build`/e2e green.

## 10. Definition of done

Specialists reads as a controlled light/shadow human turn on the dark field, with a proven fallback, complete reduced-motion readability, verified content only, and no regression to adjacent scenes.
