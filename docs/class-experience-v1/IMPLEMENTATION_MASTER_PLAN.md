# CLASS Experience v1 — Implementation Master Plan

**Status:** v1.1 — Updated after Preflight (2026-08-21). ADRs 010–013 ACCEPTED; WP-00 complete; WP-03/WP-13 absorbed; typography tokens defined; visual DNA approved.
**Depends on:** `BRAND_EXPERIENCE.md`, `EXPERIENCE_BLUEPRINT.md`, `MOTION_AND_TYPE_SYSTEM.md`, `ASSET_PLAN.md`, `scenes/*.md`
**Governs:** the full homepage reflow into 9 narrative acts on `develop`.
**Engineering governance:** `docs/AGENT_CONTRACT.md` remains in force (single-writer, ADR flow, no new deps, reduced-motion, no runtime 3D).

> This document is the durable orchestration source for implementation agents. Agents implement **states and scope**, not adjectives. Where a Scene Contract exists, it outranks this plan for scene detail. Where repository reality conflicts materially with a contract, **stop and report** (AGENT_CONTRACT §11) — do not resolve unilaterally.

---

## 1. Source-of-truth hierarchy (this initiative)

1. Explicit product-owner decision (recorded in §3 below).
2. `BRAND_EXPERIENCE.md`.
3. `EXPERIENCE_BLUEPRINT.md`.
4. `MOTION_AND_TYPE_SYSTEM.md`.
5. Approved Scene Contract (`scenes/*.md`).
6. Accepted ADR (`docs/DECISIONS/`).
7. Technical convenience.

The legacy MVP docs (`CONTEXT.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`) are **updated/annotated as superseded** where they conflict with `class-experience-v1/*`. They are not deleted; they remain valid for anything not overridden here.

---

## 2. Relevant current repository state

- **Stack:** Next.js 16.3 (App Router) · React 19 · TS 5 · Tailwind v4 · GSAP 3.15 + `@gsap/react` · Playwright. Branch `develop`. No WebGL, no smooth-scroll.
- **Page (`app/page.tsx`):** `Hero → Manifesto → Specialties → Specialists → Location` (5 sections). Net-new acts (Legacy, Method, Selected by CLASS) do not exist. `AppointmentCTA.tsx` exists but is **orphaned** (not rendered; conversion lives inside `LocationSection`).
- **Specialties:** `content/specialties.ts` has **5 grouped** items with divergent naming; rendered as a **vertical list** on the dark field. Verified: `Specialty` / `copy.specialties` are consumed **only** by `SpecialtiesSection.tsx` — safe to migrate to 8 without external reuse.
- **Typography:** Montserrat + Cormorant via `next/font/google`, tokenized (`--font-sans`, `--font-display`). Geist / Instrument Serif not installed. All three (Geist Sans, Geist Mono, Instrument Serif) are available on `next/font/google` → **no new dependency, no unlicensed font files**.
- **Hero:** cinematic frozen; scrub + copy beats. Central copy is factually wrong/brand-forbidden ("Três décadas" / giant "3"; clinic founded 1998 → 28 years in 2026).
- **Specialists:** 4 professionals with real photos in `public/assets/people/`. Two `title` fields are the literal placeholder `"Especialistas"` (Matheus, Mohamed) — unverified credential.
- **`config/site.ts`:** `url` is a Vercel preview URL; `description` contains "há mais de três décadas". Consumed by `layout.tsx` (metadataBase/canonical), `sitemap.ts`, `robots.ts`.
- **Assets present:** 4 professional portraits; `map.webp`. **Missing:** `public/images/specialties/`; clinic interior/technology photos; smile video (poster only); clean watermark-free hero media.
- **Reusable patterns:** `Reveal` (IntersectionObserver, Level 2), motion tokens in `styles/tokens.css`, `lib/motion.ts` easings, `HeroCinematic`/`ToothScrubber` GSAP+sticky pattern, throwaway prototype route (`app/prototype/golden-bridge` + `PrototypeSwitcher`), Playwright suite (`smoke`, `viewports`, `reduced-motion`, `a11y`, `keyboard`, `media-failure`, `scrub`) + `e2e/helpers.ts`.

---

## 3. Final decisions (product owner — HITL discovery)

| # | Decision |
| --- | --- |
| D1 | **Scope:** full homepage reflow into all 9 acts. |
| D2 | **Source of truth:** `class-experience-v1/*` supersedes legacy docs (updated/annotated); `AGENT_CONTRACT` stays in force as the engineering layer. |
| D3 | **Hero factual fix:** remove the "décadas" numeral beat, anchor copy in 1998, **preserve** the scrub/pin/wash envelope (mini Hero Scene Contract). |
| D4 | **`config/site.ts`:** set `url` → `https://classodontologia.com.br` (canonical/metadataBase/sitemap) and rewrite `description` without "três décadas". |
| D5 | **Typography:** ~~run a spike early~~ **→ tokens defined in ADR-010 Preflight acceptance record (2026-08-21)** → one global migration WP (WP-10). Acts built token-driven. No throwaway spike required. |
| D6 | **Palette choreography:** paper block (Manifesto→Legacy→Specialties) → dark block (Method→Specialists→Selected) → Place paper → Conversion dark. |
| D7 | **Specialists credentials:** omit the credential line where unverified; data model tolerates later enrichment. Never invent CRO. |
| D8 | **Governance artifacts:** batch of Proposed ADRs (010 typography, 011 sticky scene, 012 specialists reveal, 013 nine-act reorder) → owner accepts → implement. |
| D9 | **Asset-dependent acts:** build editorial scaffolds with neutral placeholders + V1 copy. Real photos, official logos, and brand relationship classification are owner-gated and drop in later without redesign. ACT 07 renders **no real third-party marks** until official files + classification are provided. |
| D10 | **Copy policy:** the docs' working V1 copy is the implementation copy for every act; divergent on-page copy is replaced; agents do not rewrite copy — only line breaks are deferred to composition review. |
| D11 | **Manifesto:** typographic (remove SmileWell); human counterpoint moves to Legacy; note appended to ADR-009. |
| D12 | **Place/Conversion:** split `LocationSection` into ACT 08 Place + ACT 09 Conversion; consolidate the conversion into one component (retire the orphan `AppointmentCTA.tsx`); update `CONTEXT.md`. |
| D13 | **Prototypes:** ~~throwaway spike for Typography and Specialists reveal~~ **→ both resolved in Preflight.** Typography tokens defined in ADR-010. Specialists technique defined in ADR-012. No spikes required; both WP-03 and WP-13 are absorbed. Editorial acts go straight to production scaffold. Specialties static first (WP-12), then motion (WP-16). |

---

## 4. Proposed architecture

### 4.1 Page composition target (`app/page.tsx`)

```text
HeroSection            ACT 01  dark        (factual fix; envelope preserved)
ManifestoSection       ACT 02  dark→paper  (typographic; SmileWell removed)
LegacySection          ACT 03  paper       (net-new; editorial spread)
SpecialtiesSection     ACT 04  paper       (rebuild: sticky multi-state Hero Moment 02)
MethodSection          ACT 05  dark        (net-new; editorial + placeholder media)
SpecialistsSection     ACT 06  dark        (rebuild: light/shadow reveal Hero Moment 03)
SelectedByClassSection ACT 07  dark        (net-new; brand strip scaffold, no real marks yet)
PlaceSection           ACT 08  paper       (map now; interior photos gated)
ConversionSection      ACT 09  dark        (net-new dedicated close + signature)
```

### 4.2 Server/Client boundaries (ADR-007 preserved)

- Server Components by default (all `sections/*` shells, `ui/*`).
- Client islands only where a browser API / GSAP is required: `HeroCinematic` (existing), `SpecialtiesScene` (new), `SpecialistsReveal` (new). `Reveal` stays the Level-2 primitive for editorial acts.
- Content flows Server → Client as serializable props; client islands never import `content/*` directly.

### 4.3 Motion levels (DESIGN_SYSTEM + ADR-002, amended by ADR-011)

- Level 1–2 (CSS + `Reveal`): Manifesto, Legacy, Method, Selected, Place, Conversion.
- Level 3 (GSAP timeline, no scrub): optional Specialists reveal on non-desktop / entry.
- Level 4 (GSAP ScrollTrigger scrub / sticky): Hero (existing) **and** Specialties sticky scene — explicitly authorized by **ADR-011** (amends "Level 4 = Hero only").

### 4.4 Palette tokens

Reuse existing tokens (`--color-bg-primary`, `--color-bg-paper`, `--color-text-paper*`, gold family). No new palette. Paper acts use the Manifesto paper field tokens; dark acts use the primary/secondary dark tokens.

### 4.5 Data model

- `content/specialties.ts` → 8 records per Scene Contract (`id`, `name`, `description`/`sceneCopy`, optional `assetId`, `imageSrc`, `imageAlt`, `imagePosition`). Migration is safe (single consumer).
- `content/specialists.ts` → add optional/nullable credential handling so unverified titles render nothing rather than a placeholder (D7).
- Net-new content (`content/legacy.ts`? / fields in `copy.ts`) — see WP specs. New content files require the Content writer (AGENT_CONTRACT ownership).

---

## 5. Assets & placeholder strategy

- **Placeholders:** fixed aspect-ratio media wells with neutral charcoal/paper fields and dev-only asset-ID labels. **No random stock, no unrelated dental imagery, no external remote URLs** (ASSET_PLAN §19, Scene Contract §7).
- **Specialties:** eight 4:5 wells consuming the eight `specialties-*-01` asset IDs; AI Batch A (Prótese, Estética, Ortodontia) then Batch B, per `ASSET_PLAN §9.5`.
- **Specialists:** existing real portraits kept; treated as `real_person`; the reveal must degrade cleanly if a portrait is missing (existing monogram fallback pattern).
- **Selected by CLASS:** monochrome text placeholders only; **official SVG marks + relationship classification are an owner gate** (ASSET_PLAN §12). Never recreate third-party logos with AI.
- **Place:** `map.webp` as functional support now; interior/exterior photos are `SOURCE_REAL` gates.
- **Hero:** watermark-free replacement media is a P0 asset gate (ASSET_PLAN §8.1) but does **not** block the factual copy fix.

---

## 6. Desktop / mobile / reduced-motion strategy

- **Desktop:** sticky/scrub only where a contract authorizes it (Specialties; Hero already). Editorial acts are static compositions with Level-2 reveals.
- **Mobile / touch:** no long sticky scrubs. Specialties becomes an editorial vertical sequence (contract §12). Specialists becomes sequential portraits with simple reveals. No horizontal scroll, no scroll lock, no gesture requirement.
- **`prefers-reduced-motion: reduce`:** every scene defines a complete static/low-motion path in its contract. No scene may hide essential content behind scrubbed motion. No artificial scroll shells under reduced motion. All specialty names, specialist identities, and CTAs remain directly readable.

---

## 7. Performance & accessibility guardrails

- No new runtime dependency (fonts via `next/font/google`; motion via existing GSAP).
- Reserve media dimensions to avoid CLS; below-fold media lazy; do not mark all images `priority`.
- Per-frame motion via GSAP timelines/quick-setters/refs — **no React `setState` per scroll frame**.
- Clean ScrollTrigger teardown; no leaked instances/listeners.
- Semantic sections with valid heading hierarchy; all content discoverable to assistive tech regardless of opacity/motion.
- Focus rings preserved (`--color-focus`); keyboard access on all interactive elements.
- Contrast rechecked on every paper act (axe) after palette assignment.
- Re-run Lighthouse/Web Vitals after real assets land (Scene Contract §23).

---

## 8. Testing & acceptance strategy

- Extend the existing Playwright suite (QA owns `e2e/`). Reuse `e2e/helpers.ts` (`gotoHome`, `collectPageErrors`, `blockCinematicVideos`, media-failure helpers).
- Per major scene: DOM presence of all states, active-state progression at representative scroll points, no horizontal overflow, reduced-motion path, media-failure resilience, no console errors.
- Keep axe (`a11y.spec.ts`), keyboard, viewports, reduced-motion suites green.
- **Global gates (every WP):** `pnpm typecheck`, `pnpm lint`, `pnpm build`, existing e2e remain green. No fabricated content. No out-of-scope file edits.
- Avoid brittle per-frame pixel snapshots for animation.

---

## 9. Risks & mitigation

| Risk | Mitigation |
| --- | --- |
| Typography migration shifts line breaks page-wide | Spike + owner-approved tokens before migration; acts token-driven; re-screenshot QA after migration WP. |
| Specialties sticky scene regresses Hero | Contract §18 forbids touching Hero; separate file scope; QA regression on scrub. |
| Specialists CSS-mask reveal fails on Safari/iOS | ~~Throwaway spike.~~ Technique + fallback defined in ADR-012 acceptance record. Feature detection via `CSS.supports()` selects path at runtime. Fallback proven sufficient. |
| Palette flip (Specialties dark→paper) breaks contrast | Recheck axe on paper acts; reuse validated paper tokens. |
| Level-4 outside Hero contradicts ADR-002/DESIGN_SYSTEM | ADR-011 formally amends; owner accepts before implementation. |
| Asset gates (logos, photos) block acts | Scaffolds with geometry-preserving placeholders; assets drop in without redesign (ASSET_PLAN §19). |
| Orphan `AppointmentCTA` double-writes conversion | Consolidate into one Conversion component; remove orphan. |
| Parallel agents collide on shared files | Single-writer ownership + sequenced phases (§11); `content/*`, `tokens.css`, `globals.css`, `page.tsx` have controlled writers. |

---

## 10. Execution order (orchestration flow)

```text
PHASE 0 — Investigation & Foundation
PHASE 1 — Data / Content
PHASE 2 — Static Composition (editorial acts + static scaffolds)
PHASE 3 — Motion (Hero fix, Specialties scene, Specialists reveal)
PHASE 4 — Responsive / Accessibility hardening
PHASE 5 — Assets integration (gated)
PHASE 6 — QA / Review
```

Parallelization is allowed only where file ownership does not collide and there is no rework risk. Integration into `app/page.tsx` is serial (single writer).

---

## 11. Work packages

Each WP is scoped, independent where possible, and objectively verifiable. `AGENT_CONTRACT` DoD template applies to every WP in addition to the criteria below. **Forbidden files** are hard boundaries; touching them requires an integration request.

Legend — **P** = phase, **∥** = may run in parallel with, **→** = depends on.

---

### ~~WP-00~~ · Foundation ADRs ✅ COMPLETE (Preflight 2026-08-21)

ADR-010, ADR-011, ADR-012, ADR-013 are **ACCEPTED**. ADR-009 note appended. All gates from WP-00 are cleared. Implementation agents may proceed to motion/typography WPs immediately.

### ~~WP-01~~ · Investigation notes — ABSORBED (Preflight 2026-08-21)

Investigation notes are superseded:
- **Typography:** tokens defined in ADR-010 acceptance record. No investigation file needed.
- **Specialists reveal:** technique + fallback defined in ADR-012 acceptance record. No spike needed.
- **Specialties:** Scene Contract §25 provides the full implementation map. Agent executing WP-12 reads it directly.

No separate investigation files required. Agents proceed to WP-04/WP-12 reading the Scene Contracts and accepted ADRs.

### WP-02 · Factual corrections — site config
- **P0.** Objective: implement D4.
- **Context:** BRAND §4.1; BLUEPRINT ACT 09.
- **Allowed:** `config/site.ts` (Content writer).
- **Forbidden:** `layout.tsx`, `sitemap.ts`, `robots.ts` (they only *consume* the config — no edits needed), any component.
- **Entry:** current preview URL + "três décadas" description.
- **Deliverable:** `url = https://classodontologia.com.br`; rewritten description without "três décadas".
- **Acceptance:** typecheck/build green; canonical/OG/sitemap now emit production domain; no "décadas" string remains in config.
- **Parallel:** WP-00, WP-01, WP-03.

### ~~WP-03~~ · Typography spike — ABSORBED INTO ADR-010 (Preflight 2026-08-21)

Throwaway spike not required. Token values defined definitively in `docs/DECISIONS/ADR-010-typography-migration-geist-instrument-serif.md` acceptance record:
- **Loaders:** Geist Sans (300/400/500), Instrument Serif (400), Geist Mono (400 optional).
- **Tracking:** `--tracking-display: -0.02em`, `--tracking-label: 0.12em` (unchanged).
- **Line-height adjustments:** `--text-hero--line-height: 1.0`, `--text-wordmark--line-height: 0.88`.
- **Scale:** existing clamp values unchanged.
- **Loading:** `display: swap`; `latin-ext` subset.

**WP-10 is now unblocked.** No human approval gate required before proceeding.

### WP-04 · Specialties data migration (5 → 8)
- **P1.** Objective: Scene Contract §24 Phase A — content correctness before cinematic complexity.
- **Context:** `scenes/SPECIALTIES.md` §2/§3/§15; D10.
- **Allowed:** `content/specialties.ts` **ONLY**. ⚠️ `content/copy.ts` is owned by WP-06 (sole writer); do NOT touch it.
- **Forbidden:** `content/copy.ts`, `SpecialtiesSection.tsx` visuals, `app/page.tsx`, other content.
- **Entry:** current 5 grouped records.
- **Deliverable:** 8 typed specialty records with contract IDs, labels, microcopy fields (id, name, description, assetId, imageSrc, imageAlt, imagePosition). Section heading/subheading copy lives in WP-06's `content/copy.ts` scope.
- **Acceptance:** eight specialties in order 01→08; ATM label intact; typecheck/build/e2e green; no invented content; `content/copy.ts` untouched.
- **Depends on:** none. **Parallel:** WP-02, WP-05, WP-06 (no shared files with WP-06 — different file scope).

### WP-05 · Specialists content model hardening
- **P1.** Objective: implement D7 — unverified credential renders nothing (no placeholder).
- **Context:** BLUEPRINT ACT 06; ASSET_PLAN §11.
- **Allowed:** `content/specialists.ts`, `components/ui/SpecialistCard.tsx` (credential-line render guard only).
- **Forbidden:** Specialists scene motion/layout rebuild (that is WP-17).
- **Entry:** two `title: "Especialistas"` placeholders.
- **Deliverable:** nullable/optional credential; card omits the line when absent; existing grid still renders.
- **Acceptance:** no "Especialistas" placeholder visible; no invented CRO; a11y/build green.
- **Parallel:** WP-04, WP-06, WP-07.

### WP-06 · Net-new content authoring — sole `content/copy.ts` writer
- **P1.** Objective: add typed V1 copy for ALL sections that need new copy.ts fields (D10).
- **Context:** BLUEPRINT ACT 02/03/05/07/08/09; all Scene Contracts; Specialties heading/subheading from SPECIALTIES.md.
- **Allowed:** `content/copy.ts` (**EXCLUSIVE WRITER** — no other WP may write to this file), new `content/*.ts` if a list is needed.
- **Forbidden:** components, `app/page.tsx`, `content/specialties.ts` (that's WP-04).
- **Deliverable:** typed copy objects for Manifesto (verify existing), Specialties heading/subheading, Legacy, Method, Selected by CLASS, Place, Conversion — matching Scene Contracts verbatim. No invented facts/brands.
- **Acceptance:** copy matches docs; all new acts have typed copy exported; no fabricated content; typecheck green.
- **Parallel:** WP-02, WP-04, WP-05 (no shared files — WP-04 owns specialties.ts, WP-05 owns specialists.ts; no collision).

### WP-07 · Placeholder media wells + asset ID map
- **P1.** Objective: define geometry-preserving placeholder components/paths for all gated assets.
- **Context:** ASSET_PLAN §19; Scene Contracts §7.
- **Allowed:** a shared `MediaWell` placeholder in `components/ui/` (Design System writer) or scene-local; `public/images/specialties/` placeholder dir.
- **Forbidden:** real/stock imagery; remote URLs.
- **Deliverable:** neutral charcoal/paper wells with fixed aspect ratios + dev-only ID labels.
- **Acceptance:** no external images; dimensions reserved (no CLS); reused by later WPs.
- **Parallel:** WP-04, WP-05, WP-06.

### WP-08 · Manifesto rebuild (typographic, ACT 02)
- **P2.** Objective: implement `scenes/MANIFESTO.md` — remove SmileWell, typographic dark→paper transition (D11).
- **Context:** ADR-009 note; palette D6.
- **Allowed:** `components/sections/ManifestoSection.tsx`, Tailwind utility classes and inline styles only. ⚠️ Do NOT edit `app/globals.css`. If a custom CSS class is required that cannot be expressed in Tailwind, add a comment in the component: `// GLOBALS-NEEDED: .class-name { ... }` — WP-18 consolidates all such requests. Copy from WP-06.
- **Forbidden:** `components/cinematic/SmileWell.tsx` deletion beyond removing its use here (archive, don't repurpose elsewhere in this WP), Hero, Specialties.
- **Depends on:** WP-06. **Parallel:** WP-09 (Legacy), WP-11 (Method scaffold), WP-14 (Selected), WP-15 (Place).
- **Deliverable:** paper typographic Manifesto with approved copy; no SmileWell.
- **Acceptance:** visual matches contract; contrast (axe) passes on paper; reduced-motion readable; build/e2e green.

### WP-09 · Legacy scaffold (ACT 03, net-new)
- **P2.** Objective: implement `scenes/LEGACY.md` — editorial paper spread anchored on 1998.
- **Allowed:** new `components/sections/LegacySection.tsx`, content from WP-06, scoped styles.
- **Forbidden:** other sections; invented archival material.
- **Depends on:** WP-06. **Parallel:** WP-08, WP-11, WP-14, WP-15.
- **Deliverable:** typographic Legacy act; optional human placeholder well (WP-07).
- **Acceptance:** no fabricated history; paper contrast passes; reduced-motion readable.

### WP-10 · Typography global migration
- **P2.** Objective: implement ADR-010 — single global token swap to approved fonts.
- **Context:** D5; ADR-010 ACCEPTED (tokens defined in acceptance record). **No spike gate; proceed immediately.**
- **Allowed:** `styles/tokens.css` (`--font-*` + line-height per ADR-010 record), `app/layout.tsx` (`next/font/google` loaders per ADR-010 record).
- **Forbidden:** rewriting section markup for layout; per-component font hacks.
- **Depends on:** ADR-010 Accepted ✓ (done). **Serial-ish:** coordinate with in-flight section WPs (token-driven, so low collision, but re-QA screenshots).
- **Deliverable:** Geist Sans + Instrument Serif (+ Geist Mono utility) live via tokens with the exact values in ADR-010 acceptance record.
- **Acceptance:** no new dependency; PT-BR diacritics fine; no CLS regression from font loading; visual regression reviewed; build/e2e green.

### WP-11 · Method scaffold (ACT 05, net-new)
- **P2.** Objective: implement `scenes/METHOD.md` — dark editorial evidence act with placeholder media.
- **Allowed:** new `components/sections/MethodSection.tsx`, content from WP-06, placeholder well (WP-07).
- **Forbidden:** invented equipment/tech claims; real logos.
- **Depends on:** WP-06, WP-07. **Parallel:** WP-08, WP-09, WP-14, WP-15.
- **Acceptance:** dark contrast passes; no unsubstantiated claims; reduced-motion readable.

### WP-12 · Specialties static composition (Phase B)
- **P2.** Objective: Scene Contract §24 Phase B — desktop editorial geometry + mobile vertical sequence, **no scrub yet**.
- **Allowed:** `components/sections/SpecialtiesSection.tsx`, new `components/cinematic/SpecialtiesScene.tsx` (client shell, static), placeholder wells, scoped styles.
- **Forbidden:** Hero, Specialists, `app/page.tsx` order beyond ACT 04 slot, GSAP scrub (Phase C).
- **Depends on:** WP-04, WP-07. **Parallel:** WP-08/09/11/14/15.
- **Deliverable:** coherent static scene (paper field, dark 4:5 wells) surviving long titles (ATM).
- **Acceptance:** static screenshots coherent desktop + mobile; no overflow; all 8 in DOM; build/e2e green.

### ~~WP-13~~ · Specialists reveal spike — ABSORBED INTO WP-17 (Preflight 2026-08-21)

Throwaway spike not required. Technique + fallback are fully defined in `docs/DECISIONS/ADR-012-specialists-light-shadow-reveal.md` acceptance record (CSS radial-gradient mask, CSS custom property animation, `CSS.supports()` feature detection, opacity/brightness fallback). **WP-17 is now unblocked.** Agent executes the production reveal directly, guided by ADR-012.

### WP-14 · Selected by CLASS scaffold (ACT 07, net-new)
- **P2.** Objective: implement `scenes/SELECTED_BY_CLASS.md` strip with **placeholder text marks only** (D9).
- **Allowed:** new `components/sections/SelectedByClassSection.tsx`, content from WP-06.
- **Forbidden:** real third-party marks, AI-recreated logos, "parceiros" language, infinite marquee.
- **Depends on:** WP-06. **Parallel:** WP-08/09/11/12/15.
- **Acceptance:** monochrome placeholders; no unverified partnership claim; slot ready to accept official SVGs later.

### WP-15 · Place + Conversion split (ACT 08 / 09)
- **P2.** Objective: implement D12 + `scenes/PLACE.md` + `scenes/CONVERSION.md`.
- **Allowed:** new `components/sections/PlaceSection.tsx`, `components/sections/ConversionSection.tsx`; retire/absorb `AppointmentCTA.tsx`; `map.webp` reuse.
- **Forbidden:** AI clinic interiors presented as real; duplicate conversion components.
- **Depends on:** WP-06. **Parallel:** WP-08/09/11/12/14.
- **Deliverable:** Place (map now, interior gated) + dedicated Conversion with signature "A arte de sorrir com Class." and one primary WhatsApp CTA.
- **Acceptance:** one conversion component; production canonical CTA target; contrast/build/e2e green.

### WP-16 · Specialties motion (Phase C)
- **P3.** Objective: Scene Contract §24 Phase C — sticky shell + single ScrollTrigger timeline, repeatable transition grammar; preserve mobile/reduced-motion static path.
- **Context:** ADR-011 Accepted; contract §8–§10.
- **Allowed:** `components/cinematic/SpecialtiesScene.tsx`, scoped styles.
- **Forbidden:** Hero timeline, new deps, per-frame `setState`.
- **Depends on:** WP-12, ADR-011. **Parallel:** WP-17 (different files).
- **Deliverable:** deterministic 01→08 progression, reversible, stable under fast scroll; clean teardown.
- **Acceptance:** contract §20/§21 checklists; sticky only at approved desktop+motion condition; e2e scrub test added.

### WP-17 · Specialists production rebuild (ACT 06, Hero Moment 03)
- **P3.** Objective: implement `scenes/SPECIALISTS.md` — light/shadow reveal on dark.
- **Allowed:** `components/sections/SpecialistsSection.tsx`, new `components/cinematic/SpecialistsReveal.tsx`, scoped styles.
- **Forbidden:** Specialties files, Hero, invented credentials.
- **Depends on:** WP-05, ADR-012 ✓ (accepted; ~~WP-13 spike replaced by ADR-012 acceptance record~~). **Parallel:** WP-16 (different files).
- **Deliverable:** editorial portrait reveal + fallback (per ADR-012 code contract); identity/name/specialty always readable; enrichment-tolerant.
- **Acceptance:** `CSS.supports()` feature detection present; reduced-motion + no-mask fallback readable; no per-frame `setState`; a11y/build/e2e green.

### WP-18 · Hero factual fix (ACT 01)
- **P3.** Objective: implement `scenes/HERO.md` — remove "décadas" beat, anchor 1998, preserve scrub/pin/wash.
- **Context:** D3; ADR-013; frozen-hero policy (factual correction allowed).
- **Allowed:** `components/cinematic/HeroCinematic.tsx`, hero copy fields from `content/copy.ts` (read-only; edited by WP-06), `app/globals.css` (**EXCLUSIVE WRITER** — WP-18 is the sole agent that may write to `app/globals.css` across all WPs. Before completing, also apply any `// GLOBALS-NEEDED:` comments found in WP-08..WP-17 component files).
- **Forbidden:** `ToothScrubber` scrub behavior, adding hero complexity/spectacle, new deps.
- **Depends on:** ADR-013 Accepted ✓. **After Wave 1** (run in Wave 2, after sections exist). WP-16/17 do not touch globals.css — no coordination needed.
- **Deliverable:** Hero with 1998-anchored copy; no false "décadas"; scrub/pin/wash intact; reduced-motion path intact.
- **Acceptance:** no "décadas"/"3-decades" claim; scrub e2e still green; reduced-motion static still composed.

### WP-19 · Page integration (ACT order)
- **P3→P4.** Objective: compose the 9 acts in `app/page.tsx` in the D6 order.
- **Allowed:** `app/page.tsx` (Integration writer).
- **Forbidden:** editing the section internals here.
- **Depends on:** WP-08, WP-09, WP-11, WP-12, WP-14, WP-15 (sections must exist). Motion WPs (16/17/18) can land before or after order integration since they touch internals.
- **Deliverable:** full 9-act page renders top to bottom with correct palette transitions.
- **Acceptance:** SSR renders all acts; no console errors; heading hierarchy valid; build/e2e green.

### WP-20 · Responsive & accessibility hardening
- **P4.** Objective: enforce §6/§7 across all new acts.
- **Allowed:** scoped responsive/a11y fixes in the owning section files + `e2e/` additions (QA).
- **Forbidden:** redesigns.
- **Depends on:** WP-08..WP-19.
- **Deliverable:** 375px + 1280px verified; reduced-motion complete; axe clean; keyboard OK.
- **Acceptance:** viewports/reduced-motion/a11y/keyboard specs green; no overflow.

### WP-21 · Assets integration
- **P5.** Objective: complete the full asset set. Part is autonomous (Batch B); part is owner-gated (real photos/logos).
- **Allowed:** `public/images/specialties/`, `public/assets/*`, `content/*` asset fields, `alt` text.
- **Forbidden:** structural redesign; unverified partnership claims; fabricated logos; invented clinic interiors.

#### Batch B — Specialties (AUTONOMOUS, no human gate)
Generate the 5 remaining specialty images following `docs/class-experience-v1/SPECIALTIES_VISUAL_DNA.md` exactly:
- Implantodontia, Periodontia, Sensibilidade, Cirurgias, ATM/DTM
- Generate **1 candidate per specialty** initially.
- Allow **max 1 corrective regeneration** per specialty if the result has a clear problem (watermark, text, wrong background, clinical catalog aesthetics).
- If a second attempt still has issues, use the best valid candidate and continue. Do not seek perfection.
- Record filenames in `SPECIALTIES_VISUAL_DNA.md §Batch B — Results`.

#### Owner-gated items (defer, do not block)
- Hero clean video (replace watermark-cropped prototype)
- Place interior/exterior photos
- ACT 07 official partner SVGs + relationship classification
- Specialist credential enrichment

- **Depends on:** sections built (for drop-in to work); Batch B is autonomous immediately.
- **Deliverable:** Batch B assets in `public/images/specialties/`; placeholders replaced; owner-gated items remain as known-deferred per AFK_EXECUTION_POLICY.
- **Acceptance:** Batch B assets follow Visual DNA; no fabricated logos/facts; ASSET_PLAN §17 truth classification correct; re-run Lighthouse after assets land.

### WP-22 · QA / Review / doc reconciliation
- **P6.** Objective: full-suite QA + finalize the legacy-doc annotations + move ADRs to Accepted record in this plan.
- **Allowed:** `e2e/`, `docs/*` (non-ADR annotations), `docs/reports/*`.
- **Deliverable:** green suite, reviewer PASS per contract §27, updated `CONTEXT/DESIGN_SYSTEM/ARCHITECTURE` reflecting shipped reality.
- **Acceptance:** all contract DoDs met; no scope creep; owner sign-off.

---

## 12. Integration points between phases

- **~~WP-03 → WP-10~~:** ~~token approval gates font migration.~~ **Tokens defined in ADR-010. WP-10 unblocked.**
- **~~WP-00 → WP-16/17/18/10~~:** ~~ADR acceptance gates.~~ **All ADRs ACCEPTED (Preflight). All motion/typography WPs unblocked.**
- **WP-04 → WP-12 → WP-16:** Specialties data → static → motion (strict order, unchanged).
- **~~WP-13 → WP-17~~:** ~~spike approval → production reveal.~~ **Technique defined in ADR-012. WP-17 unblocked.**
- **WP-06 → WP-08/09/11/14/15:** content authored before section builds. WP-06 is the exclusive `content/copy.ts` writer; WP-04 writes only to `content/specialties.ts` (no collision — they can run in parallel).
- **All sections → WP-19:** page integration is the single-writer join.
- **Sections built → WP-21:** placeholders must exist before assets swap in.
- **`app/globals.css`** is owned exclusively by **WP-18** (Hero fix). All other WPs (WP-08..WP-17) must use Tailwind utility classes and inline styles. If a WP identifies an exceptional need for a global CSS rule it cannot express in Tailwind, it leaves a `// GLOBALS-NEEDED: .class-name { ... }` comment in the component file; WP-18 consolidates all such comments before completing.

---

## 13. Recommended AFK Orchestration (Sonnet 4.6)

> Preflight is complete. ADRs accepted. All spike gates removed. The following is the recommended flow for a full autonomous execution.

### Active WP count: 16

WP-00, WP-01, WP-03, WP-13 are complete or absorbed. Active: WP-02, WP-04–WP-12, WP-14–WP-22.

### Wave 0 — Parallel (no dependencies)

All four can run simultaneously. Each has a narrow file scope and no shared files.

| WP | Description | Files | Est. |
|---|---|---|---|
| WP-02 | site config correction | `config/site.ts` | 15 min |
| WP-04 | Specialties data 5→8 | `content/specialties.ts` **ONLY** | 20 min |
| WP-05 | Specialists credential hardening | `content/specialists.ts`, `SpecialistCard.tsx` (guard only) | 15 min |
| WP-06 | Net-new content (Legacy/Method/Selected/Place/Conversion) | `content/copy.ts`, new `content/*.ts` | 30 min |

### Wave 1 — Parallel (needs Wave 0 for content)

Run after Wave 0 completes. WP-10 and WP-12 are independent of each other.

| WP | Description | Deps | Files |
|---|---|---|---|
| WP-10 | Typography migration (token swap) | WP-04 ✓ (ADR-010 ✓) | `styles/tokens.css`, `app/layout.tsx` |
| WP-07+WP-12 | Specialties static + MediaWell | WP-04 | `SpecialtiesSection.tsx`, `SpecialtiesScene.tsx` (static), `MediaWell` ui component |
| WP-08 | Manifesto rebuild | WP-06 | `ManifestoSection.tsx` |
| WP-09 | Legacy scaffold | WP-06 | `LegacySection.tsx` (new) |
| WP-11 | Method scaffold | WP-06 | `MethodSection.tsx` (new) |
| WP-14 | Selected by CLASS scaffold | WP-06 | `SelectedByClassSection.tsx` (new) |
| WP-15 | Place + Conversion split | WP-06 | `PlaceSection.tsx` (new), `ConversionSection.tsx` (new) |

> `WP-07` (MediaWell component) is merged into `WP-12`. Agent creates `components/ui/MediaWell.tsx` as part of building the Specialties static composition.

> **`app/globals.css` — STRICT SINGLE WRITER = WP-18.** Agents WP-08 through WP-15 must NOT edit `app/globals.css`. Use Tailwind utilities and inline styles exclusively. If a custom CSS rule is unavoidable, leave a `// GLOBALS-NEEDED: .class-name { ... }` comment in the component; WP-18 applies all such comments.

> **`content/copy.ts` — STRICT SINGLE WRITER = WP-06.** WP-04 writes only to `content/specialties.ts`. No other Wave 0/1 WP may write to `content/copy.ts`.

### Wave 2 — Motion (needs Wave 1)

Run after Wave 1 completes (or after the relevant section exists). WP-16/17/18 can run in parallel.

| WP | Description | Deps |
|---|---|---|
| WP-16 | Specialties motion (sticky scrub) | WP-12, ADR-011 ✓ |
| WP-17 | Specialists reveal (mask + fallback) | WP-05, ADR-012 ✓ |
| WP-18 | Hero factual fix (1998 anchor) | ADR-013 ✓ |

### Wave 3 — Integration (serial, single writer)

| WP | Description | Deps |
|---|---|---|
| WP-19 | Compose 9 acts in `app/page.tsx` | All sections from Wave 1–2 |

### Wave 4 — Hardening (SERIAL: WP-20 → WP-22)

⚠️ These run sequentially. WP-22 tests the stable, hardened state — not a moving target.

| Step | WP | Description |
|---|---|---|
| 1 | WP-20 | Responsive + a11y hardening — complete and verify (375/1280, axe, reduced-motion) |
| 2 | WP-22 | QA / Review — full suite, fix loop, doc reconciliation |

**WP-22 internal sequence:** (1) run full Playwright + axe + typecheck + build; (2) fix any failures; (3) retest until green; (4) doc reconciliation + completion report.

### Wave 5 — Owner-gated (async)

| WP | Description |
|---|---|
| WP-21 | Drop approved assets into placeholders |

### Shared context recommendations

- Agents for WP-08, WP-09, WP-11, WP-14, WP-15 should each load: their Scene Contract + `content/copy.ts` (read-only) + `AFK_EXECUTION_POLICY.md`. They don't need to read the entire plan.
- Agent for WP-12+WP-16 (same file scope) can be a single agent or two sequential agents on `SpecialtiesScene.tsx`: build static first, verify, then add motion.
- Agent for WP-17 must read: `scenes/SPECIALISTS.md` + `ADR-012` acceptance record (verbatim code contract).
- Agent for WP-10 must read: `ADR-010` acceptance record (exact loaders + token values).
- Agent for WP-19 (integration) is the most context-heavy: must know all 9 section component names and the act-palette mapping from ADR-013.

### Single-writer invariants

| File | Owner WP | Others |
|---|---|---|
| `app/page.tsx` | WP-19 | read-only |
| `styles/tokens.css` | WP-10 | read-only |
| `app/layout.tsx` | WP-10 | read-only |
| `app/globals.css` | **WP-18** (Hero fix) — exclusive writer | NO edits; Tailwind utilities + inline styles only; use `// GLOBALS-NEEDED:` comment if exception required |
| `content/copy.ts` | **WP-06** — exclusive writer | read-only; WP-04 writes only to `content/specialties.ts` |
| `content/specialties.ts` | **WP-04** — exclusive writer | read-only |
| `content/specialists.ts` | **WP-05** — exclusive writer | read-only |
| `public/assets/cinematic/tooth/*` | WP-21 (owner-gated) | read-only |

---

## 14. Definition of Done (this initiative)

1. Homepage renders all 9 acts in the D6 order with meaningful dark↔paper transitions.
2. No factually false or brand-forbidden copy (no "três décadas"); Hero anchored in 1998 with envelope preserved.
3. Specialties reads as a coherent sticky Hero Moment 02 across 8 disciplines (desktop) and an editorial sequence (mobile), fully readable under reduced motion.
4. Specialists reads as a light/shadow Hero Moment 03 with a proven fallback; no invented credentials.
5. Manifesto is typographic paper; Legacy/Method/Selected/Place/Conversion exist as editorial acts/scaffolds with placeholders; no fabricated assets, logos, or partnerships.
6. Typography migrated to the approved system via tokens, or explicitly deferred by owner — no piecemeal replacement.
7. `config/site.ts` emits the production canonical domain and a corrected description.
8. No new runtime dependency; no runtime 3D; ADR-007 boundaries respected.
9. ADRs 010–013 Accepted and reflected; ADR-009 noted; legacy docs reconciled.
10. `typecheck` + `lint` + `build` + full Playwright suite green; axe clean; 375/1280 verified; reviewer PASS.
