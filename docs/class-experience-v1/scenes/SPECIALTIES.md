# Scene Contract — Specialties / Hero Moment 02

**Scene ID:** `specialties`  
**Status:** v1.0 — Implementation-ready contract  
**Homepage act:** ACT 04 — ONE STANDARD, MULTIPLE DISCIPLINES  
**Intensity:** Hero Moment 02 — high  
**Depends on:** `../BRAND_EXPERIENCE.md`, `../EXPERIENCE_BLUEPRINT.md`, `../MOTION_AND_TYPE_SYSTEM.md`, `../ASSET_PLAN.md`  
**Primary implementation target:** current `develop` branch architecture

---

## 1. Narrative purpose

Demonstrate that CLASS applies one consistent standard of judgment and precision across different dental disciplines.

The scene must not feel like a catalog of unrelated services.

### Intended takeaway

> **Different specialties. The same CLASS standard.**

This is an internal intended takeaway, not necessarily public copy.

### Visitor question

> “What can they actually do, and does the same level of care apply across treatments?”

### Emotional state

- control;
- confidence;
- curiosity;
- precision;
- restrained sophistication.

### Commercial role

This scene must increase:

1. proof of competence;
2. perceived breadth of capability;
3. perceived consistency of standards;
4. brand distinctiveness.

---

## 2. Approved public copy — V1 working copy

### Section headline

> **Um padrão. Diferentes especialidades.**

### Section supporting line

> Cada tratamento exige uma abordagem. Todos compartilham o mesmo rigor.

### Specialty states

| Index | ID | Public label | Working microcopy |
| ---: | --- | --- | --- |
| `01 / 08` | `protese` | **Prótese** | Forma, função e naturalidade em equilíbrio. |
| `02 / 08` | `estetica` | **Estética** | Detalhes que respeitam a identidade de cada sorriso. |
| `03 / 08` | `implantodontia` | **Implantodontia** | Planejamento preciso para reconstruir função e confiança. |
| `04 / 08` | `periodontia` | **Periodontia** | Cuidado com a base que sustenta o sorriso. |
| `05 / 08` | `sensibilidade` | **Sensibilidade** | Entender a origem do desconforto para definir o cuidado adequado. |
| `06 / 08` | `ortodontia` | **Ortodontia** | Movimento planejado. Equilíbrio construído ao longo do tempo. |
| `07 / 08` | `cirurgias` | **Cirurgias** | Planejamento e técnica em cada etapa. |
| `08 / 08` | `atm` | **ATM — Disfunção Temporomandibular** | Um olhar atento à função, ao conforto e ao equilíbrio. |

### Copy policy

These lines are approved as **working V1 copy for implementation geometry**.

Agents must not rewrite them autonomously.

Later copy refinement is allowed without changing the scene architecture, provided line length remains within the defined content envelope.

---

## 3. What this scene is replacing

The current implementation is a conventional vertical list of specialty rows with index, name and description.

The implementation task replaces the **presentation model**, not the strategic purpose of the section.

The new implementation must support all eight approved specialties.

### Migration constraint

Before changing the `Specialty` data type, the implementation agent must search the repository for all usages of:

- `Specialty`;
- `specialties`;
- `copy.specialties`.

If `content/specialties.ts` is used only by the homepage, the current long descriptions may be replaced by the approved working microcopy.

If the data is reused elsewhere, preserve long-form content and add a scene-specific field such as `sceneCopy` rather than destroying reusable information.

---

## 4. Core experience model

### Desktop

A single persistent editorial composition remains in the viewport while eight specialty states replace one another.

The scene should communicate:

```text
ONE VISUAL SYSTEM
      ↓
01 PRÓTESE
      ↓
02 ESTÉTICA
      ↓
03 IMPLANTODONTIA
      ↓
...
      ↓
08 ATM / DTM
```

The composition remains recognizably the same.

Only the active content, image and selected emphasis change.

### Mobile / touch-first

Do **not** reproduce the long desktop scrub literally.

Use an editorial vertical sequence in normal document flow:

```text
section intro
↓
01 / 08 + Prótese + image + microcopy
↓
02 / 08 + Estética + image + microcopy
↓
...
↓
08 / 08 + ATM + image + microcopy
```

The mobile experience should feel designed, not like a degraded fallback.

---

## 5. Visual structure — desktop

### Scene shell

- tall scroll shell;
- sticky stage at `100dvh` / safe viewport equivalent;
- no horizontal scroll;
- no global scroll lock;
- no custom scroll hijacking.

### Preferred layout

Use a desktop composition approximately equivalent to a 12-column editorial grid:

- **text / metadata area:** ~35–42%;
- **visual stage:** ~50–58%;
- remaining space used as deliberate breathing room.

Exact grid tracks may follow existing container/tokens.

### Persistent elements

The following should remain spatially stable across specialty states:

- section context / eyebrow;
- primary text region;
- index position;
- visual-stage bounds;
- overall alignment system.

### Changing elements

- active specialty number;
- specialty title;
- microcopy;
- visual asset;
- restrained focus/accent state.

### Background

Preferred V1 territory:

- warm paper / light editorial background inherited from the post-Hero narrative;
- dark/charcoal visual media well or dark imagery providing contrast;
- gold only as a controlled accent, not a dominant surface color.

Do not introduce an unrelated new palette.

---

## 6. Typography behavior

The scene must be compatible with the selected V1 typography direction:

- Geist Sans — specialty names, body and functional text;
- Instrument Serif — optional limited editorial emphasis in the section headline;
- Geist Mono — optional `01 / 08` metadata.

### Important migration rule

The current site may still be using Montserrat + Cormorant Garamond.

Do not make the Specialty Scene task responsible for a global typography migration unless the Typography Validation Spike has already been approved and merged.

The scene must therefore be token-driven and survive the later font migration without structural redesign.

### Content envelope

Desktop target:

- specialty title: one line where practical, maximum two visual lines;
- microcopy: approximately 45–110 characters; maximum two short lines at common desktop widths where practical;
- index: fixed-width/tabular behavior where supported.

For `ATM — Disfunção Temporomandibular`, allow intentional two-line title treatment.

Do not reduce type to an unreasonably small size just to force one line.

---

## 7. Asset contract

The scene consumes the eight asset IDs defined in `ASSET_PLAN.md`:

```text
specialties-protese-01
specialties-estetica-01
specialties-implantodontia-01
specialties-periodontia-01
specialties-sensibilidade-01
specialties-ortodontia-01
specialties-cirurgias-01
specialties-atm-01
```

### Implementation may begin before final assets exist

Use geometry-preserving placeholders with the same intended aspect ratio.

Allowed placeholder:

- charcoal media well;
- subtle static gradient/noise already compatible with the design system;
- small development-only asset ID label.

Forbidden placeholder:

- random stock photography;
- unrelated dental imagery;
- external remote image URLs added just for the prototype.

### Image behavior

Desktop visual stage target:

- dominant portrait frame approximately 4:5;
- preserve crop across state changes;
- `object-fit: cover` or equivalent;
- object position should be asset-configurable if required.

Only the first/nearby media may receive eager loading if technically justified. Avoid marking all eight images as priority.

---

## 8. Motion grammar

Only approved brand verbs may be used:

- `REVEAL`;
- `ALIGN`;
- `FOCUS`;
- `TRANSITION`.

### State transition language

Use one repeatable transition grammar for all eight specialties.

Preferred V1 behavior:

#### Outgoing visual

- `opacity: 1 → 0`;
- `scale: 1.00 → ~0.985`;
- optional small opposing translate, maximum ~16px equivalent.

#### Incoming visual

- `opacity: 0 → 1`;
- `scale: ~1.03 → 1.00`;
- clip/mask reveal may be used if it remains robust and visually clean.

#### Outgoing text

- opacity down;
- small vertical shift, roughly 16–28px equivalent.

#### Incoming text

- opacity up;
- small vertical alignment movement into the exact text baseline.

### Motion must not include

- bounce;
- elastic easing;
- per-specialty unique gimmicks;
- random rotation;
- large parallax that breaks crop;
- autoplay carousel behavior;
- horizontal scroll hijacking;
- cursor-follow effects;
- continuous autonomous motion once the state is at rest.

### Rest state

Each specialty must have a readable rest window where:

- title is stable;
- microcopy is stable;
- image is stable;
- no background animation competes with reading.

---

## 9. Scroll model — desktop starting values

### Activation condition

Enhanced scrubbed version should target desktop-class layouts only.

Recommended initial media condition:

```text
min-width: 1024px
AND
prefers-reduced-motion: no-preference
```

The implementation may refine the breakpoint using existing project conventions, but must not activate the long sticky scene on narrow touch layouts merely to preserve desktop parity.

### Shell

Starting target:

```text
~460vh total shell
sticky stage: 100dvh
```

This is a starting implementation value, not sacred art direction.

After QA, total height may be tuned approximately ±10–15% without reopening the narrative contract if readability and rhythm improve.

### Progress map

Use a single normalized progress from `0.00` to `1.00`.

Initial mapping:

| Progress | Purpose |
| --- | --- |
| `0.00–0.08` | Scene entry / headline settles |
| `0.08–0.18` | 01 — Prótese |
| `0.18–0.28` | 02 — Estética |
| `0.28–0.38` | 03 — Implantodontia |
| `0.38–0.48` | 04 — Periodontia |
| `0.48–0.58` | 05 — Sensibilidade |
| `0.58–0.68` | 06 — Ortodontia |
| `0.68–0.78` | 07 — Cirurgias |
| `0.78–0.88` | 08 — ATM / DTM |
| `0.88–1.00` | Scene exit / handoff to Method |

### Transition window

Within each specialty boundary, keep the actual cross-transition concise.

Starting recommendation:

- approximately 25–35% of that state's progress window may be transitional;
- the remaining majority must read as a stable state.

Do not make the visitor scroll continuously through perpetual crossfades with no readable pause.

---

## 10. GSAP implementation constraints

Reuse the project's established GSAP/ScrollTrigger approach.

### Required

- `@gsap/react` / `useGSAP` where consistent with current architecture;
- scoped refs/context;
- clean teardown;
- no leaked `ScrollTrigger` instances;
- refresh/recalculation after material layout changes where necessary;
- CSS sticky for the persistent viewport unless a proven issue requires another approach.

### Performance rule

Do not call React `setState` on every scroll frame.

Preferred:

- GSAP timeline / quick setters / refs for visual mutation;
- React state only for infrequent semantic/UI needs if required.

### Dependencies

No new animation/runtime dependency is allowed for this scene.

Specifically, do not add:

- Three.js;
- WebGL framework;
- Lenis / smooth-scroll library;
- carousel library.

If the implementation cannot be achieved cleanly with existing CSS + GSAP, stop and return an investigation note instead of silently expanding the stack.

---

## 11. Progressive enhancement and no-JS behavior

Core specialty content must remain present in the server-authored HTML.

JavaScript enhances the presentation; it must not be required for the user to discover which specialties CLASS offers.

### No JS / enhancement failure

Render an understandable editorial list/sequence of all eight specialties.

### Media failure

If one or more specialty images fail:

- text remains readable;
- layout does not collapse;
- media well retains intentional background;
- no broken-image icon should dominate the scene where avoidable.

---

## 12. Mobile contract

### Primary rule

Mobile is **not** a 460vh sticky scene.

Use normal document flow.

### Recommended mobile composition

For each specialty:

1. `01 / 08` metadata;
2. specialty title;
3. microcopy;
4. portrait media well (approximately 3:4 or crop from approved 4:5 source);
5. generous vertical spacing;
6. next specialty.

### Motion

If `prefers-reduced-motion: no-preference`:

- simple reveal on entry is allowed;
- small image scale/reveal is allowed;
- no scrub dependency.

### Touch UX

- no horizontal swipe required;
- no hidden carousel affordance;
- no scroll locking;
- no precise gesture requirement.

### Mobile performance

- lazy load below-fold media;
- do not preload all eight images;
- preserve dimensions to avoid layout shift.

---

## 13. Reduced-motion contract

When `prefers-reduced-motion: reduce`:

- disable scrubbed scene behavior;
- remove long artificial scroll shell;
- render the editorial vertical sequence;
- do not animate masks, large scales or crossfades that are required to understand content;
- all eight specialties remain directly readable.

Reduced motion must be a complete experience, not a blank/stuck sticky scene.

---

## 14. Accessibility contract

### Structure

Use semantic section/list/article structure as appropriate.

At minimum:

- `<section aria-labelledby="specialties-heading">` or equivalent;
- one real heading for the section;
- each specialty represented semantically in the DOM;
- heading hierarchy remains valid.

### Screen readers

Do not rely on visual opacity to determine whether content exists semantically.

All eight specialty names and their working microcopy must remain discoverable to assistive technology.

Avoid unnecessary `aria-live` updates tied to scroll; scroll position should not spam announcements.

### Images

Most specialty visuals are conceptual support and may use empty alt text if the text already carries the specialty meaning.

If an image introduces unique content that is not present in nearby text, assign concise content alt text according to `ASSET_PLAN.md`.

### Keyboard

The scene contains no interaction that should require keyboard control.

Do not introduce fake tabs, buttons or carousel controls for a scroll-driven state change unless a later interaction requirement explicitly needs them.

---

## 15. Content / data model target

The implementation must support exactly eight homepage specialty records in V1.

Recommended data fields:

```ts
interface Specialty {
  id: string;
  name: string;
  description: string; // or sceneCopy if long-form description is reused elsewhere
  assetId?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
}
```

This is a recommendation, not a requirement to use these exact property names.

Keep content data separate from the GSAP timeline.

Do not hardcode eight unrelated timeline blocks containing duplicated copy strings if the timeline can derive refs/state order from the specialty data.

---

## 16. Proposed component boundary

Preferred narrow architecture:

```text
SpecialtiesSection
  ├─ server-authored section copy / semantic data
  └─ SpecialtiesScene (client enhancement only where needed)
```

Possible file structure:

```text
components/sections/SpecialtiesSection.tsx
components/cinematic/SpecialtiesScene.tsx        # optional new client island
content/specialties.ts
content/copy.ts
public/images/specialties/*
e2e/specialties.spec.ts                          # recommended
```

The implementer may choose a small subfolder instead of exactly these paths if it better matches repository conventions.

### Important

Do not convert unrelated sections into client components as collateral work.

---

## 17. Scope — allowed changes

Primary allowed scope:

- `components/sections/SpecialtiesSection.tsx`;
- new specialty-specific client component(s);
- `content/specialties.ts`;
- `content/copy.ts` — **specialties fields only** unless a factual dependency requires more;
- specialty-specific styles / existing design tokens;
- `public/images/specialties/` placeholders/final assets;
- new/updated specialty-specific E2E tests.

Conditional scope:

- shared motion helper only if it already exists or extraction clearly reduces duplication without changing unrelated behavior;
- `app/globals.css` only for scoped specialty styles or existing token reuse.

---

## 18. Scope — forbidden collateral changes

Do not alter as part of this scene implementation:

- Hero narrative or Hero timeline;
- `HeroCinematic` behavior;
- tooth scrub behavior;
- Specialists narrative/scene;
- Location scene;
- global smooth scrolling;
- unrelated copy;
- production domain;
- package dependencies;
- overall page order unless necessary to render the new section in the same ACT 04 position.

Do not “improve” unrelated components while implementing Specialties.

---

## 19. Visual acceptance criteria

The implementation passes creative review only if:

1. it no longer reads as a conventional list of services on desktop;
2. one stable composition visibly unifies all eight specialties;
3. each state is readable before the next transition dominates;
4. motion feels controlled rather than playful;
5. the scene has more visual intensity than surrounding editorial sections but does not compete with the Hero through unrelated spectacle;
6. the scene still feels CLASS with neutral placeholders;
7. replacing placeholders with final 4:5 assets does not require structural redesign;
8. the transition into the next Method/Technology act feels like `what we do → how we control it`.

---

## 20. Functional acceptance criteria

### Content

- [ ] All eight approved specialties are present.
- [ ] Order matches this contract unless explicitly approved otherwise.
- [ ] `ATM — Disfunção Temporomandibular` renders without broken layout.
- [ ] Approved V1 section headline/supporting line are used.
- [ ] Agent did not invent specialties or credentials.

### Desktop enhanced scene

- [ ] Sticky stage activates only under approved desktop + motion conditions.
- [ ] No horizontal overflow at supported desktop widths.
- [ ] No scroll lock.
- [ ] Progress traverses 01 → 08 deterministically.
- [ ] Final state hands off cleanly to the next section.
- [ ] Returning upward through the scene reverses correctly.
- [ ] Fast scrolling does not leave overlapping text/images in broken intermediate states.

### Mobile

- [ ] All eight specialties appear in normal flow.
- [ ] No horizontal interaction is required.
- [ ] Images reserve their space before load.
- [ ] Copy remains readable at narrow widths.

### Reduced motion

- [ ] No long artificial shell remains.
- [ ] All eight specialties are directly readable.
- [ ] No required information depends on animation.

### Resilience

- [ ] Scene remains understandable with images blocked/failed.
- [ ] Scene remains understandable if JavaScript enhancement fails.
- [ ] No console errors during normal scroll/resize.

---

## 21. Technical acceptance criteria

- [ ] No new runtime dependency.
- [ ] Existing GSAP stack is reused.
- [ ] ScrollTrigger instances clean up on unmount/re-render.
- [ ] No per-frame React state updates for motion.
- [ ] No uncontrolled repeated listeners on resize/scroll.
- [ ] Asset dimensions/aspect ratios are reserved to prevent avoidable CLS.
- [ ] Below-fold specialty assets are not all marked `priority`.
- [ ] Existing lint/typecheck/build remain green.
- [ ] Existing E2E suite remains green.

---

## 22. Required QA additions

Add a focused specialty test where feasible.

Recommended assertions:

### Desktop

1. section exists;
2. eight specialty labels are in the DOM;
3. enhanced scene shell/sticky stage exists at desktop viewport;
4. scroll to representative progress points and verify active state marker/data attribute changes;
5. no horizontal overflow.

### Mobile

1. no desktop artificial shell height;
2. eight specialties visible in document sequence;
3. no clipped long title;
4. no horizontal overflow.

### Reduced motion

1. emulate reduced motion;
2. verify scene is not sticky/scrub-dependent;
3. all eight specialties remain available.

### Media failure

If current media-failure helpers can be reused, block specialty images and confirm layout/text remain intact.

Do not create brittle pixel-perfect tests for animation frames.

---

## 23. Performance budget

The scene is below the Hero and should not compete for critical-load priority.

### Runtime

- no new global runtime;
- GSAP already exists in the project;
- avoid layout reads/writes in custom per-frame loops;
- prefer transform/opacity/clip where performant;
- use `will-change` selectively and only where justified.

### Images

Target for final specialty derivatives:

- aim for `<= 180 KB` each where visual quality allows;
- first visible specialty may load near scene approach;
- remaining media should not all become eager page-load assets;
- total specialty media transfer should remain deliberate and reviewed after real assets are inserted.

### Validation

After final assets are inserted, rerun a current Lighthouse/Web Vitals pass. Do not rely on performance reports generated before the current cinematic architecture.

---

## 24. Implementation phases

The scene should be built in small commits/work units.

### Phase A — semantic/data migration

- confirm all data usages;
- update the homepage specialty set to eight;
- apply approved V1 copy;
- keep current presentation functional.

**Acceptance:** content correct before cinematic complexity.

### Phase B — static editorial composition

- build desktop visual geometry with placeholders;
- build mobile vertical sequence;
- no GSAP scrub yet.

**Acceptance:** scene looks coherent in static screenshots and survives long titles.

### Phase C — desktop motion enhancement

- add sticky shell;
- add single ScrollTrigger/GSAP state timeline;
- implement repeatable transition grammar;
- preserve mobile/reduced-motion static path.

**Acceptance:** deterministic 01 → 08 progression, reversible, stable under fast scroll.

### Phase D — QA / hardening

- viewport tests;
- reduced motion;
- media failure;
- overflow;
- Safari/iOS smoke review where available;
- performance sanity check.

### Phase E — final asset integration

- replace placeholders with approved specialty assets;
- tune `object-position` only where needed;
- tune shell height/progress by allowed ±10–15% if reading rhythm requires it;
- no structural redesign unless the asset set proves the contract invalid.

---

## 25. Investigator brief — before implementation agent

The investigator must not edit code.

Return only:

```text
FEASIBILITY
CURRENT SPECIALTIES DATA USAGES
CURRENT COPY USAGES
FILES TO CHANGE
REUSABLE GSAP / RESPONSIVE PATTERNS
PROPOSED COMPONENT BOUNDARY
MOBILE RISKS
SAFARI / CSS MASK RISKS
IMAGE LOADING RISKS
TESTS TO ADD / UPDATE
SIMPLER ALTERNATIVE IF ANY
RECOMMENDATION
```

Expected outcome should be either:

- `PROCEED`;
- `PROCEED WITH CONSTRAINTS`;
- `SPIKE REQUIRED`.

Do not return production code during investigation.

---

## 26. Implementer brief

The implementer receives:

1. this Scene Contract;
2. all four source-of-truth experience docs;
3. investigator result;
4. approved placeholder/final asset paths.

Instruction priority:

```text
Scene Contract
> Experience source-of-truth docs
> repository conventions
> agent aesthetic preference
```

If repository reality conflicts with the contract in a way that materially changes scope, stop and report the conflict rather than redesigning autonomously.

---

## 27. Reviewer brief

The reviewer must try to **disprove** compliance.

Review against:

- narrative purpose;
- scope boundaries;
- desktop progression;
- mobile editorial sequence;
- reduced motion;
- semantic content;
- asset loading;
- cleanup;
- regressions;
- performance risk;
- visual consistency.

The reviewer should report:

```text
PASS
or
FAIL

BLOCKERS
MAJOR ISSUES
MINOR ISSUES
UNVERIFIED ITEMS
RECOMMENDED FIX ORDER
```

Do not expand scope with unrelated aesthetic suggestions.

---

## 28. Definition of done

The Specialty scene is done when:

1. all eight specialties are factually and editorially represented;
2. desktop communicates one standard across multiple disciplines through a persistent composition;
3. mobile is intentionally editorial and does not inherit desktop scrub complexity;
4. reduced-motion users receive complete content without artificial scroll;
5. final or placeholder assets fit the geometry contract;
6. no new animation dependency is introduced;
7. all relevant tests/build checks pass;
8. reviewer finds no Scene Contract blocker;
9. the section is ready to accept the final approved AI asset batch without redesign.

---

## 29. Explicit non-goals for V1

This implementation does **not** need to:

- add WebGL/Three.js;
- add smooth scrolling;
- build service detail pages;
- create before/after case studies;
- redesign the Hero;
- finalize all homepage copy;
- implement the Specialists spotlight scene;
- implement partner/technology banner;
- solve the global typography migration;
- generate final images inside the coding task.

The goal is narrower:

> **Turn Specialties from a premium list into a coherent, resilient, editorial Hero Moment that proves the CLASS standard across eight disciplines.**
