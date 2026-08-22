# ADR-009 — Manifesto on paper, Smile cinematic in a dark well

**Status: ACCEPTED**
**Date: 2026-08-14**
**Authority: Project Owner**

After the last Hero copy line leaves, the page enters Manifesto as a **paper** field (warm off-white, not raw `#ffffff`). Specialties and the rest of the site remain on the dark field. This is a deliberate contrast beat — cinematic dark room → editorial paper — not a white flash inside the Hero.

The Smile cinematic cannot sit on that paper: a very white smile would disappear. Copy stays on paper; the video (or its poster, until the asset exists) sits in a **dark well** beside it (stacked below on small screens). Play once on viewport entry; no scroll scrub (the Hero already owns Level 4).

**Considered:** entire Manifesto dark; white wash then dark Manifesto; white interstitial; full-bleed video under paper type. Rejected: they either ignore the requested paper beat or kill contrast on the smile.

**Consequence:** Manifesto needs on-paper text tokens (dark type, gold still allowed). Header over paper stays the existing dark strip. Axe contrast on Manifesto must be rechecked.

---

## Update note — 2026-08-21 (class-experience-v1, ADR-013)

The paper-field decision for the Manifesto **stands**. What changes: per owner decision D11, the Manifesto becomes **typographic** and the **Smile cinematic well is removed** from it (the smile video was never produced; only a poster exists). The human/emotional counterpoint moves to the new **ACT 03 Legacy**. `components/cinematic/SmileWell.tsx` is archived (not deleted) in case Legacy composition later needs it. See `docs/class-experience-v1/scenes/MANIFESTO.md`. The "dark → paper" beat is preserved and now also marks the entry into the paper block (Manifesto → Legacy → Specialties) defined in ADR-013.
