# CLASS Odontologia — Motion & Type System

**Status:** v1.1 — Direction and implementation guardrails  
**Depends on:** `BRAND_EXPERIENCE.md`, `EXPERIENCE_BLUEPRINT.md`  
**Purpose:** Define the visual behavior of typography and motion before implementation agents create scene-specific code.

---

## 1. Design behavior thesis

The CLASS interface should communicate the same values that the clinic claims to practice:

- precision;
- control;
- judgment;
- refinement;
- restraint;
- humanity.

Motion and typography must therefore behave as part of the brand argument.

The target is not “more animation”.

The target is **more intentional composition**.

---

## 2. Editorial experience principle

The site should feel closer to a high-end magazine or architectural monograph than a conventional clinic landing page.

This means:

- short copy;
- strong typographic hierarchy;
- large image moments;
- generous negative space;
- controlled transitions;
- progressive disclosure;
- few simultaneous messages;
- no dense dashboard-like UI;
- no decorative motion overload.

The user should feel that they are moving through designed spreads.

---

## 3. Typography strategy

Typography is not a final visual garnish.

It affects:

- narrative pacing;
- line breaks;
- scene timing;
- perceived precision;
- editorial character;
- mobile composition;
- motion implementation.

### 3.1 Selected V1 direction

The selected typography direction is:

#### Primary — Geist Sans

Role:

- precision;
- technology;
- navigation;
- body copy;
- functional UI;
- specialty names;
- professional names;
- buttons.

The visual goal is a clean, contemporary, controlled voice that supports light/regular weights and precise spacing without becoming sterile.

#### Editorial — Instrument Serif

Role:

- humanity;
- history;
- aesthetic judgment;
- selected oversized editorial words;
- occasional emotional phrases.

Usage must remain restrained. Instrument Serif should create contrast and emotional depth, not dominate the whole interface.

#### Utility — Geist Mono (optional)

Permitted for limited metadata such as:

- `01 / 08`;
- `EST. 1998`;
- `25 / 03 / 1998`;
- coordinates;
- technical labels;
- small system markers.

Do not turn Geist Mono into a major visual voice unless a later approved design decision explicitly expands its role.

### 3.2 Current implementation

The current site may still contain Montserrat + Cormorant Garamond until the typography migration is explicitly implemented and approved.

Do not perform a piecemeal global font replacement outside the Typography Validation Spike / migration task.

### 3.3 Licensing rule

Do not add commercial fonts such as Gotham merely because a reference site uses them.

Fonts committed to production must have appropriate web licensing. Agents may not download, commit or redistribute unlicensed font files.

## 4. Semantic typography mapping

The selected system has a deliberate semantic split:

### Geist Sans = precision / control / technology

### Instrument Serif = humanity / history / aesthetics

### Geist Mono = metadata / measurement / utility

This mapping should remain subtle.

The visitor does not need to consciously identify the code. The goal is for typography to reinforce the emotional progression of the page without becoming a gimmick.

## 5. Typography Validation Spike — required before global migration

The family direction is selected. The spike validates **implementation quality**, not an open-ended search for new fonts.

### Selected system

- Geist Sans;
- Instrument Serif;
- Geist Mono only where utility metadata benefits from it.

### Baseline comparison

Compare against the existing Montserrat + Cormorant Garamond implementation only to judge whether the migration creates a measurable improvement.

### Must compare the same content

Include:

1. Hero-scale headline.
2. Manifesto headline + short paragraph.
3. Specialty title + `01 / 08` + short copy.
4. Specialist name + role.
5. Navigation.
6. Button/input state.
7. Mobile composition.

### Evaluation criteria

Validate:

- CLASS distinctiveness;
- precision;
- editorial quality;
- legibility;
- light-weight rendering;
- Portuguese diacritics;
- optical sizing where applicable;
- exact font weights;
- tracking;
- line-height;
- responsive scale;
- responsive line breaks;
- loading strategy and font payload;
- compatibility with motion.

The spike output should produce recommended tokens/values. It should not silently migrate the entire site.

## 6. Copy and line behavior

Copy is part of visual composition.

Preferred:

- short headline fragments;
- strong line breaks;
- one idea per visual state;
- supporting copy often limited to one or two short sentences.

Avoid:

- long paragraphs in hero moments;
- dense explanatory blocks competing with motion;
- text that requires reading before the composition makes sense.

Scene-specific line breaks may be authored deliberately when necessary.

Do not let agents rewrite approved copy only to make layout easier.

---

## 7. Motion grammar

All motion should belong to one of four approved verbs.

### 7.1 REVEAL

Something becomes visible or understandable.

Use for:

- images;
- headlines;
- supporting copy;
- content states.

Typical properties:

- opacity;
- clip/mask;
- small translate;
- controlled scale.

### 7.2 ALIGN

An element moves into its intended precise position.

Use for:

- hero objects;
- typography;
- structured composition;
- geometric elements.

The movement should feel calibrated, not elastic.

### 7.3 FOCUS

Attention shifts to a person, specialty, detail or selected object.

Use for:

- specialist portrait light reveal;
- active specialty;
- highlighted clinical detail;
- selected technology.

Potential tools:

- light/gradient overlay;
- opacity contrast;
- depth hierarchy;
- mask;
- controlled scale.

### 7.4 TRANSITION

The site changes narrative state.

Use for:

- dark → paper;
- one act → another;
- scene entry/exit;
- large compositional transformations.

Transitions must carry meaning, not simply fill time.

---

## 8. Forbidden default motion

Avoid by default:

- bounce;
- elastic easing;
- random rotation;
- playful overshoot;
- gratuitous cursor-follow effects;
- constant autonomous animation;
- endless marquees;
- horizontal scroll hijacking;
- motion added only because a library supports it;
- every element animating independently.

Exceptions require an explicit Scene Contract rationale.

---

## 9. Motion character

Preferred qualities:

- calm;
- exact;
- fluid;
- deliberate;
- restrained;
- premium without being theatrical everywhere.

The interface should communicate:

> **control**

not:

> **look how much animation we can build**

---

## 10. Easing guidance

Do not treat easing names as brand strategy, but keep the motion family consistent.

Preferred general behavior:

- smooth acceleration/deceleration;
- no springiness by default;
- more controlled than playful.

GSAP families such as `power2` / `power3` may be appropriate where they fit the Scene Contract.

Exact easing belongs to scene implementation, not universal hardcoding.

---

## 11. Microinteraction guidance

Functional UI must share the same precision language.

### Buttons

Preferred:

- restrained background or border transition;
- text shift roughly 2–4px where appropriate;
- arrow/icon movement roughly 4–8px where appropriate;
- short response, typically around 150–220ms for hover feedback.

Avoid bounce or dramatic scaling.

### Links

Preferred:

- underline reveal;
- mask/reveal;
- subtle text/arrow movement.

### Drawers / navigation panels

Preferred character:

- controlled reveal;
- opacity + translate;
- deliberate but not sluggish.

Approximate animation range may sit around 450–600ms where appropriate, but final duration must be validated in context.

### Images

Hover motion should be minimal:

- small scale change;
- crop shift;
- focus transition.

Avoid interaction that makes editorial photography feel like ecommerce cards.

### Inputs

Focus states should be clear, accessible and refined.

Visual polish never overrides usability.

---

## 12. Scroll behavior

Scroll should remain understandable and user-controlled.

Preferred:

- native scroll as the base behavior;
- ScrollTrigger for scene progress where needed;
- sticky scenes only where they create narrative value;
- no site-wide smooth-scroll dependency unless a dedicated spike proves a clear benefit.

Do not add Lenis or another smooth-scroll runtime merely because it is common on award sites.

Any new global scroll runtime must demonstrate:

- meaningful perceptual improvement;
- accessibility compatibility;
- anchor/link compatibility;
- mobile behavior;
- ScrollTrigger integration;
- no unacceptable performance cost.

---

## 13. Sticky scenes

Sticky scenes are appropriate for high-value transformations, not ordinary content.

Likely candidates:

- Specialties;
- possibly Specialists.

A typical scene may use:

- outer scroll shell;
- sticky `100dvh` stage;
- progress-driven state changes.

However, shell length must be determined from content and interaction testing, not copied from another scene.

Example only:

```text
shell: 400–500vh
sticky stage: 100dvh
```

This is not a universal token.

---

## 14. State-based specification

Implementation agents must receive explicit states instead of subjective animation language.

Bad:

> “Make the image appear dramatically.”

Better:

```text
STATE 0
opacity: 0
scale: 1.04
y: 24

STATE 1
opacity: 1
scale: 1
y: 0

TRANSITION
progress range: 0.08–0.16
```

Exact values belong to the Scene Contract.

The important rule is **state clarity**.

---

## 15. Specialties motion direction

The core interaction hypothesis is:

> **One composition. Multiple specialty states.**

The scene must support eight confirmed specialties:

1. Prótese;
2. Estética;
3. Implantodontia;
4. Periodontia;
5. Sensibilidade;
6. Ortodontia;
7. Cirurgias;
8. ATM — Disfunção Temporomandibular.

Preferred motion behavior:

- layout remains recognizably stable;
- active specialty changes;
- central visual transforms/reveals;
- title/index/copy update in controlled synchronization;
- each state feels like another application of the same system;
- the eight states must not create eight equally long mini-hero experiences.

Pacing should be designed as a complete scene: strong intro, readable state changes, selectively faster intermediate progression where appropriate, and a deliberate exit. Exact progress ranges belong to the Scene Contract.

Potential properties:

- opacity;
- translate;
- clip-path;
- mask;
- small scale changes;
- restrained background or line-state changes.

Avoid:

- random transition style per specialty;
- full scene reset between every item;
- excessively long scroll merely because there are eight states;
- 3D runtime unless later justified.

The confirmed index format should support `01 / 08` through `08 / 08`.

## 16. Specialists motion direction

The visual hypothesis is **focus through light and shadow**.

Concept:

A portrait begins partially obscured.

A controlled light/focus region crosses or expands, revealing the specialist and associated information.

The image may then return partially to shadow as attention moves to the next professional.

Potential implementation:

- image;
- dark overlay;
- radial or linear gradient;
- translated overlay;
- CSS mask where browser support and testing are satisfactory;
- GSAP progress.

Fallback:

- opacity/contrast reveal without advanced mask behavior.

The emotional goal is not drama for its own sake.

The goal is:

> **From system to person. From technical confidence to human trust.**

---

## 17. Brand strip motion direction

For selected technologies/brands:

Preferred:

- horizontal editorial composition;
- monochromatic treatment;
- slow, limited translation based on vertical scroll;
- movement that settles.

Avoid default infinite marquee behavior unless explicitly approved after testing.

The strip should feel like a curated selection, not a sponsorship ticker.

---

## 18. Dark-to-light transition system

Background transitions must support narrative meaning.

### Dark

Communicates:

- precision;
- abstraction;
- technology;
- control;
- mystery.

### Paper/light

Communicates:

- humanity;
- history;
- trust;
- reality;
- space.

The transition should therefore appear at a meaningful narrative boundary.

Do not alternate dark/light randomly for variety.

---

## 19. Mobile motion policy

Mobile is not a compressed desktop choreography.

Each Hero Moment must define a mobile-specific behavior.

Priorities:

1. clarity;
2. responsive performance;
3. touch scroll control;
4. readable text;
5. appropriate scene length;
6. preservation of narrative intent.

A desktop scrub may become:

- reduced sticky sequence;
- sequential editorial blocks;
- poster + transform;
- simpler reveal states.

Do not preserve hundreds of viewport heights on mobile if the core media/motion no longer justifies that length.

---

## 20. Reduced motion

`prefers-reduced-motion` is a design state, not an afterthought.

Requirements:

- no essential content may depend on scrubbed motion;
- all specialty states must remain accessible;
- specialist identity/content must remain visible;
- no scroll trap;
- no hidden CTA;
- transitions should degrade to readable static or low-motion equivalents.

Scene Contracts must define the reduced-motion version explicitly.

---

## 21. Performance guardrails

Default principle:

> Use the lightest technology that expresses the approved concept well.

Preferred stack:

- CSS;
- modern layout;
- transforms;
- masks/clip-path when appropriate;
- optimized images;
- pre-rendered media;
- GSAP/ScrollTrigger for high-value scenes.

Avoid adding runtime complexity without demonstrated benefit.

### Current position on WebGL / Three.js

No current narrative requirement justifies adding WebGL or Three.js.

If a future idea appears to require it:

1. create an isolated spike;
2. prove the visual gain;
3. test mobile/performance/accessibility;
4. compare with a CSS/GSAP/pre-rendered alternative;
5. only then consider production inclusion.

---

## 22. Browser and accessibility guardrails

Any production motion pattern must account for:

- Chrome desktop;
- Safari desktop;
- iOS Safari;
- responsive Android browser behavior;
- keyboard access where interactive;
- reduced motion;
- content without animation completion;
- failure of non-critical media.

Advanced CSS masking must always have a tested fallback path.

---

## 22.5 Asset interface requirement

Visual-heavy scenes must consume assets through explicit contracts rather than assumptions. A dedicated `ASSET_PLAN.md` will define production assets before generation/approval.

Each asset contract should include at minimum:

- asset ID;
- scene and narrative role;
- subject/content;
- source type;
- truth classification: `real`, `representative`, `abstract` or `decorative`;
- desktop/mobile aspect ratios;
- master dimensions;
- delivery formats;
- safe areas;
- crop and motion tolerance;
- lighting/background direction where relevant;
- accessibility/alt intent;
- AI-generation restrictions;
- approval status.

Code should reference stable asset IDs/paths defined by the scene spec. Agents must not invent factual patient cases, professional portraits, credentials or clinical outcomes when a placeholder/representative asset is required.

---

## 23. Agent implementation rule

Agents must not receive only subjective goals such as:

- “premium”;
- “Awwwards-like”;
- “cinematic”;
- “make it more sophisticated”.

Every implementation task must translate the concept into:

### Human language

Why the scene exists.

### Interface language

What the user sees and how attention moves.

### Engineering language

Explicit states, scope, timing/progress, constraints, responsive behavior and acceptance criteria.

This three-layer translation is mandatory for major scenes.

---

## 24. Decisions and remaining gates

### 24.1 Decided for V1

- typography direction: Geist Sans + Instrument Serif;
- Geist Mono is optional and limited to utility/metadata roles;
- specialty scene supports eight confirmed disciplines and index `01 / 08` → `08 / 08`;
- specialist visual territory remains focus through controlled light/shadow;
- selected-brand motion remains a restrained horizontal editorial composition rather than default infinite marquee;
- motion grammar remains `REVEAL`, `ALIGN`, `FOCUS`, `TRANSITION`;
- WebGL/Three.js is not justified by the current roadmap;
- final visual assets will be governed by a dedicated `ASSET_PLAN.md`.

### 24.2 Remaining Decision Gates

- exact typography scale, weights, tracking and responsive line-height after the Typography Validation Spike;
- exact motion token values;
- whether global smooth-scroll is ever justified;
- exact eight-state Specialties choreography and progress ranges;
- exact Specialists lighting implementation;
- exact mobile choreography for both scenes;
- final visual assets, safe areas and crop behavior;
- final public copy line breaks after real composition review.

Implementation agents may propose options during a spike, but may not silently convert a proposal into a permanent system decision.
