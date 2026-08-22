# Scene Contract — Hero factual correction / Hero Moment 01

**Scene ID:** `hero`
**Status:** v1.0 — Implementation-ready (narrow factual correction)
**Homepage act:** ACT 01 — CLASS (Identity / encounter)
**Intensity:** Hero Moment 01 — very high (frozen for strategic expansion)
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../../DECISIONS/ADR-003-scroll-video-architecture.md`, `ADR-013`
**Owner decision:** D3 — remove the "décadas" numeral beat, anchor copy in 1998, **preserve** the scrub/pin/wash envelope.

---

## 1. Narrative purpose

Establish CLASS as a brand and precision as a behavioral language before any service is named. This scene is **frozen for strategic expansion**: this contract authorizes a **factual correction only**, not a redesign.

### Intended takeaway

> "This does not look or behave like a conventional dental clinic."

### Why this change is necessary (fact)

The clinic was founded **25/03/1998** → 28 years in 2026, not "three decades". `BRAND_EXPERIENCE §4.1` **explicitly forbids** "três décadas" / "mais de três décadas". The current Hero animates a giant "3" + "décadas" + the line "Três décadas em Foz do Iguaçu." This is a factual and brand violation and must be corrected.

---

## 2. What changes and what is preserved

### Preserved (do not touch)

- Tooth scrub behavior (`ToothScrubber`, ADR-003) — scrub/seek untouched.
- CSS sticky pin at `100dvh` inside the tall shell.
- Dark → paper wash into Manifesto.
- Wordmark enter/exit choreography.
- Reduced-motion composed static path.
- Shell height envelope (may be tuned only if copy length requires; not a redesign).

### Changed

- **Remove** the "décadas" numeral beat entirely (the giant extruded "3" + "décadas" label). It existed only to state a now-false claim.
- **Replace** hero copy with 1998-anchored working copy (see §3).
- Rebalance the copy-beat timeline so the scroll lines occupy the freed slot without the numeral beat.

---

## 3. Approved copy — V1

Primary brand expression (server-authored `<h1>` via wordmark, unchanged intent):

> **CLASS**

Historical support line(s) after the wordmark exits (replaces the decade beat + old lines):

> **Desde 1998, um padrão próprio de fazer odontologia.**

Optional continuation lines (keep the existing one-line-at-a-time beat mechanics; final line still exits before the wash). Working set:

> Cada tratamento começa no estudo da face.
> Anatomia, proporção e o resultado que você realmente deseja.

Full sentence for screen readers / reduced motion (`tagline`), rewritten without "décadas":

> **Desde 1998, um padrão próprio de fazer odontologia em Foz do Iguaçu. Cada tratamento começa no estudo da face — anatomia, proporção e o resultado que você realmente deseja.**

### Copy policy

Agents must not invent alternative hero copy. Line breaks may be tuned in composition review. **No "décadas", "três décadas", or decade-count claim may appear** anywhere in hero copy, tagline, or config.

---

## 4. Motion

Only approved verbs: `REVEAL`, `ALIGN`, `TRANSITION`.

- Wordmark: existing enter/exit (`ALIGN`/`REVEAL`).
- Copy lines: existing one-at-a-time enter/hold/exit (`REVEAL`), re-timed to fill the removed numeral slot.
- Wash: existing dark → paper `TRANSITION`.

Forbidden: adding new spectacle, a replacement 3D beat, bounce/elastic, new dependencies, changing the scrub mechanism.

---

## 5. Desktop / mobile / reduced-motion

- **Desktop:** existing scrub + copy beats, minus the numeral beat.
- **Mobile / touch:** poster (no video scrub) + copy beats, per existing CSS (`.tooth-scrubber-poster`); shell stays tall enough for copy scrub, retuned for the removed beat.
- **Reduced motion:** existing composed static — wordmark + full `tagline` visible; no scrubbed dependency. Must show the corrected 1998 copy.

---

## 6. Scope

### Allowed
- `components/cinematic/HeroCinematic.tsx` (remove decade beat refs/markup/timeline; re-time lines).
- `content/copy.ts` — `hero` fields (remove `decadeNumeral`/`decadeLabel`; update `scrollLines`/`tagline`).
- `app/globals.css` — remove now-unused `.hero-decade-*` rules and adjust shell/beat rules (Foundation single-writer via integration request).

### Forbidden
- `components/cinematic/ToothScrubber.tsx` scrub behavior.
- Adding hero complexity or a new 3D/numeral beat.
- New dependencies; runtime 3D.
- Any other section.

---

## 7. Acceptance criteria

- [ ] No "décadas"/decade-count claim in hero markup, copy, tagline, or config.
- [ ] Giant "3" numeral beat removed; no dead `.hero-decade-*` CSS or unused refs remain.
- [ ] 1998-anchored copy renders; screen-reader `tagline` corrected.
- [ ] Tooth scrub still advances/rewinds (`e2e/scrub.spec.ts` green).
- [ ] Sticky pin + dark→paper wash intact.
- [ ] Reduced-motion static shows corrected copy; no scroll dependency.
- [ ] No horizontal overflow; no console errors.
- [ ] `typecheck` / `lint` / `build` / existing e2e green.

## 8. Definition of done

The Hero states its identity and its 1998 anchor truthfully, with the existing cinematic envelope intact and no added spectacle. The false "decades" claim is fully removed from the running experience and the codebase.
