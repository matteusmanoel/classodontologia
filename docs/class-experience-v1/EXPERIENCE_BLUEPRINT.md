# CLASS Odontologia — Experience Blueprint

**Status:** v1.1 — Homepage narrative architecture  
**Depends on:** `BRAND_EXPERIENCE.md`  
**Purpose:** Translate the brand thesis into a page-level sequence of acts, hero moments, evidence and conversion logic without prematurely prescribing every implementation detail.

---

## 1. Experience model

The homepage must not be treated as:

`Hero + Section + Section + Section + Footer`

The preferred model is:

`Act → transition → act → evidence → act → human turn → reality → conversion`

Each section must have a narrative job.

A component that has no narrative purpose should not exist simply because conventional clinic websites usually include it.

---

## 2. Macro narrative

The current preferred arc is:

1. **Encounter** — What is this?
2. **Positioning** — Why does it feel different?
3. **Legacy** — Is there substance behind it?
4. **Mastery** — What can they do?
5. **Method / Technology** — How do they sustain this standard?
6. **People** — Who is behind it?
7. **Selection** — What tools/brands meet their criterion?
8. **Place** — Does this exist as a real physical experience?
9. **Action** — How do I begin?

This is the homepage story. Specialties, technology, professionals and selected technologies/brands are proofs inside that story.

---

## 3. Proposed homepage acts

The section names below are working labels, not final public copy.

### ACT 01 — CLASS

**Role:** Identity / encounter  
**Intensity:** Hero Moment 01 — very high  
**Current state:** Already substantially implemented.

#### Visitor question

> “What is this?”

#### Intended takeaway

> “This does not look or behave like a conventional dental clinic.”

#### Narrative job

- establish CLASS as a brand;
- establish precision as a behavioral language;
- create curiosity before explanation;
- set visual and motion expectations.

#### Working copy direction

Primary brand expression:

> **CLASS**

Historical support:

> **Desde 1998, um padrão próprio de fazer odontologia.**

Do not use “três décadas” or “mais de três décadas” as factual copy in the current version.

#### Visual territory

- dark;
- controlled;
- abstract;
- object-led;
- cinematic;
- sparse.

#### Implementation policy

The hero is temporarily **frozen for strategic expansion**.

Allowed work:

- factual corrections;
- technical defects;
- performance fixes;
- accessibility fixes;
- asset replacement;
- small polish with measurable benefit.

Avoid adding more spectacle while downstream sections remain weaker.

---

### ACT 02 — THE STANDARD

**Role:** Manifesto / meaning  
**Intensity:** Low-to-medium editorial breathing space.

#### Visitor question

> “Why is this different?”

#### Intended takeaway

> “CLASS is not only a name; it represents a way of doing dentistry.”

#### Narrative job

- introduce the concept of a CLASS standard;
- connect precision, experience and judgment;
- prepare the visitor for later evidence.

#### Working copy V1

> **O padrão não nasce pronto. É construído.**

> Experiência cria critério. Precisão transforma esse critério em resultado. Evolução mantém esse padrão em movimento.

Copy remains subject to final composition review, but implementation should respect this approximate density.

#### Visual territory

- transition from dark toward paper/light;
- editorial typography;
- short copy;
- few visual elements;
- deliberate silence.

#### Avoid

- long institutional paragraphs;
- generic mission/vision language;
- premature list of services.

---

### ACT 03 — SINCE 1998 / EXPERIENCE THAT EVOLVES

**Role:** Legacy as criterion  
**Intensity:** Medium, emotional/editorial.

#### Visitor question

> “Is there substance behind this positioning?”

#### Intended takeaway

> “The CLASS standard was not invented for this website. It was refined through experience.”

#### Narrative job

- establish historical legitimacy;
- avoid nostalgia;
- communicate evolution;
- create a bridge between founders and current practice.

#### Preferred conceptual movement

`origin → accumulated judgment → continuous updating`

#### Potential evidence

- founding year;
- founder presence;
- selected milestone(s), if meaningful;
- transition into current generation and current techniques.

#### Avoid

- long corporate timelines;
- “family dynasty” framing;
- excessive archival treatment unless assets genuinely support it.

#### Historical anchor — confirmed

CLASS Odontologia was founded on **25/03/1998**.

#### Working copy V1

> **O tempo aperfeiçoa o olhar.**

> Desde 1998, evoluímos sem abrir mão daquilo que sempre orientou nosso trabalho: atenção aos detalhes.

Historical milestones beyond the founding date must still be verified before publication.

---

### ACT 04 — ONE STANDARD, MULTIPLE DISCIPLINES

**Role:** Mastery / specialties  
**Intensity:** Hero Moment 02 — very high.

#### Visitor question

> “What can they actually do?”

#### Intended takeaway

> “Different disciplines are practiced under the same precise CLASS standard.”

#### Narrative principle

Specialties must not behave like independent service cards.

The UI should communicate unity across disciplines.

#### Preferred experience model

One persistent composition transforms as the active specialty changes.

Conceptually:

```text
same visual system
      ↓
state 01 — specialty A
      ↓
state 02 — specialty B
      ↓
state 03 — specialty C
      ↓
...
```

The structure remains recognizably CLASS while the content changes.

#### Specialty set — V1 confirmed

The homepage must support these eight specialties:

1. **Prótese**
2. **Estética**
3. **Implantodontia**
4. **Periodontia**
5. **Sensibilidade**
6. **Ortodontia**
7. **Cirurgias**
8. **ATM — Disfunção Temporomandibular**

The list is confirmed. The final editorial order/pacing inside the scene may still be adjusted through the Scene Contract.

#### Working section copy V1

> **Um padrão. Diferentes especialidades.**

> Cada tratamento exige uma abordagem. Todos compartilham o mesmo rigor.

#### Working specialty microcopy territories

These lines are working copy and may be refined after composition review:

| Specialty | Working microcopy |
| --- | --- |
| Prótese | Forma, função e naturalidade em equilíbrio. |
| Estética | Detalhes que respeitam a identidade de cada sorriso. |
| Implantodontia | Planejamento preciso para reconstruir função e confiança. |
| Periodontia | Cuidado com a base que sustenta o sorriso. |
| Sensibilidade | Entender a origem do desconforto para definir o cuidado adequado. |
| Ortodontia | Movimento planejado. Equilíbrio construído ao longo do tempo. |
| Cirurgias | Planejamento e técnica em cada etapa. |
| ATM / DTM | Um olhar atento à função, ao conforto e ao equilíbrio. |

#### Potential desktop structure

- sticky scene;
- large specialty name;
- index (`01 / 08` etc.);
- one short supporting sentence;
- central visual stage;
- controlled visual changes between states.

#### Potential visual inputs

Not yet locked:

- clinical editorial photography;
- portrait detail;
- sculptural dental object;
- facial proportion imagery;
- hybrid photography + minimal graphic overlays.

Preferred direction to test: **hybrid**.

#### Technical hypothesis

Likely achievable with:

- CSS layout;
- sticky viewport;
- GSAP/ScrollTrigger;
- opacity/translate/scale;
- clip-path or masking where justified;
- optimized images or pre-rendered media.

No WebGL requirement is currently justified.

#### Important

The final Scene Contract must define exact states before coding.

---

### ACT 05 — PRECISION, PLANNED

**Role:** Method / technology as evidence  
**Intensity:** Medium.

#### Visitor question

> “How do they achieve this level of control?”

#### Intended takeaway

> “Technology exists to improve diagnosis, planning and predictability.”

#### Narrative job

- demonstrate that the standard is operational, not merely aesthetic;
- connect technology to clinical outcomes;
- reinforce planning and control.

#### Working copy V1

> **Tecnologia, com propósito.**

> Recursos que ampliam diagnóstico, planejamento e previsibilidade. Tecnologia só faz sentido quando melhora a decisão clínica.

#### Preferred presentation

Editorial and selective.

Do not default to an equipment grid.

Possible structures:

- one strong visual + short explanation;
- two or three method principles;
- process fragment;
- visualization of planning/precision.

#### Avoid

- long spec sheets;
- technology brands with no explanation;
- claims that cannot be substantiated.

---

### ACT 06 — THE PEOPLE BEHIND THE STANDARD

**Role:** Trust / humanity  
**Intensity:** Hero Moment 03 — high.

#### Visitor question

> “Who am I trusting?”

#### Intended takeaway

> “Experienced, current professionals sustain the CLASS standard.”

#### Narrative job

- humanize the previously precise/technical story;
- communicate continuity + renewal;
- establish credibility through people, not through generic corporate biography.

#### Working copy V1

> **O olhar por trás do padrão.**

> Experiência, atualização e diferentes competências reunidas por uma mesma forma de cuidar.

#### Preferred visual direction

Editorial portraits revealed through controlled light and shadow.

Reference principle:

A specialist may emerge from darkness as a moving region of light/focus reveals the portrait during scroll.

This must be an adaptation for CLASS, not a literal recreation of another website.

#### Potential narrative order

1. Experience that established the standard.
2. Renewal that keeps it current.
3. Additional competencies integrated into the same CLASS way.

Do not make family lineage the main message.

#### Technical hypothesis

Likely achievable without WebGL through:

- portrait image;
- dark overlay;
- moving radial/linear gradient;
- mask or overlay transform;
- GSAP timeline;
- fallback implementation for browsers/mobile.

#### Content principle

Initial state should show little information:

- name;
- specialty/role;
- one short supporting detail if needed.

Full credentials may be progressively disclosed or appear in a secondary layer.

For V1, use only professional information already verified in the repository. Missing CRO, specialty or credential data must remain absent/TBD rather than being inferred by an agent. The content model should tolerate later enrichment without requiring redesign.

---

### ACT 07 — SELECTED BY CLASS

**Role:** Selection / technology and brands  
**Intensity:** Low-to-medium visual accent.

#### Visitor question

> “What external systems or technologies meet their standard?”

#### Intended takeaway

> “CLASS chooses tools and systems according to the same criterion it applies clinically.”

#### Working public copy V1

**Eyebrow:**

> **SELECTED BY CLASS**

**Headline:**

> **Escolhido com critério.**

**Supporting copy:**

> **Tecnologias e marcas presentes em nossa prática clínica, selecionadas de acordo com cada indicação.**

This wording does not imply formal partnership.

#### Names currently under review

- Invisalign;
- Odontolatina;
- Ortoplan;
- additional aesthetic/clinical technologies to be confirmed.

`Ortoplan` must have its specific relationship/context verified before it is grouped with suppliers or technology systems.

#### Preferred visual treatment

- monochromatic logos;
- generous spacing;
- controlled horizontal composition;
- movement tied subtly to vertical scroll;
- no infinite SaaS-style marquee by default.

#### Relationship rule

Avoid “Nossos parceiros” unless a formal partnership is verified.

Before publication, classify each external name according to the actual relationship (technology used, supplier, accreditation, formal partnership, historical relationship or another documented category).

### ACT 08 — THE PLACE

**Role:** Reality / physical proof  
**Intensity:** Medium-to-low.

#### Visitor question

> “Is this promise reflected in a real clinic?”

#### Intended takeaway

> “The physical environment is another expression of the CLASS standard.”

#### Narrative job

- materialize the abstract brand promise;
- show the clinic as a real destination in Foz do Iguaçu;
- reinforce attention to detail and experience.

#### Working copy V1

> **Onde o padrão Class ganha forma.**

> Um ambiente pensado para transformar cuidado, conforto e atenção aos detalhes em experiência.

#### Potential evidence

- architecture/interior photography;
- selected environmental details;
- location context;
- map as functional support, not necessarily the hero of the section.

#### Avoid

- ending the story with only a utilitarian map if strong clinic visuals are available.

---

### ACT 09 — START A CONVERSATION

**Role:** Conversion  
**Intensity:** Clear, quiet and confident.

#### Visitor question

> “What do I do next?”

#### Intended takeaway

> “Starting contact is simple.”

#### Working copy V1

> **Comece por uma conversa.**

Closing brand signature:

> **A arte de sorrir com Class.**

#### Preferred behavior

- one primary CTA;
- WhatsApp/contact path;
- secondary location or scheduling option if relevant;
- minimal friction;
- no aggressive sales language.

The conversion should feel earned by the preceding narrative.

Production canonical target: **`https://classodontologia.com.br`**. Preview/deployment URLs must not replace the production canonical.

---

## 4. Intensity rhythm

The page should alternate between impact and quiet.

Suggested rhythm:

```text
ACT 01  █████  hero moment
ACT 02  ██     breathing
ACT 03  ███    editorial/emotional
ACT 04  █████  hero moment
ACT 05  ███    proof
ACT 06  ████   hero/human turn
ACT 07  ██     visual accent
ACT 08  ███    reality
ACT 09  ██     conversion
```

Do not maximize animation density across every act.

Silence is part of the premium language.

---

## 5. Narrative continuity rules

Transitions should not be added independently.

Every major transition must answer:

1. What state are we leaving?
2. What state are we entering?
3. What conceptual relationship connects them?
4. Does the movement help the visitor understand that relationship?

Examples:

### Dark → light

Not “because it looks elegant”.

Meaning:

`abstraction/precision → humanity/history/reality`

### Specialties → method

Meaning:

`what we do → how we control it`

### Method → specialists

Meaning:

`system → people who apply it`

### Specialists → selected technologies

Meaning:

`judgment → what that judgment chooses`

---

## 6. Quick-win prioritization framework

Every intervention should be scored across:

- **Brand value** — does it improve perception?
- **Narrative value** — does it improve comprehension or progression?
- **Proof value** — does it demonstrate capability or credibility?
- **Conversion value** — does it help action?
- **Implementation effort**.
- **Technical risk**.
- **Mobile/accessibility risk**.

### Complexity classes

#### A — Layout / CSS

Examples:

- composition;
- spacing;
- typography;
- static mask;
- microinteraction.

Preferred frequency: high.

#### B — Simple motion

Examples:

- reveal;
- hover;
- small timeline;
- overlay movement.

Preferred frequency: high.

#### C — Coordinated scene

Examples:

- sticky scene;
- ScrollTrigger timeline;
- media synchronization;
- multi-state composition.

Preferred frequency: selective.

#### D — Experimental runtime

Examples:

- WebGL;
- Three.js;
- custom shader;
- WebGPU;
- new heavy global runtime.

Preferred frequency: exceptional only after a successful spike.

---

## 7. Current quick-win candidates

Priority candidates discussed and aligned:

### 7.1 Typography Validation Spike

**Goal:** Validate the selected typography direction before system-wide migration.

Selected V1 direction:

- **Geist Sans** — primary/functional voice;
- **Instrument Serif** — restrained editorial/emotional voice;
- **Geist Mono** — optional utility/metadata voice only.

The spike is no longer an open-ended font search. Compare the selected system against the current Montserrat + Cormorant implementation only as a control/baseline.

Include:

- hero-like headline;
- manifesto;
- specialties title + `01 / 08`;
- specialist profile;
- button/navigation;
- mobile state.

Validate:

- weights;
- optical size where applicable;
- typography scale;
- tracking;
- line-height;
- responsive line breaks;
- Portuguese diacritics;
- font loading/performance;
- integration with motion.

No global migration before visual review and regression checks.

### 7.2 Specialties Scene Prototype

**Goal:** Validate the “one standard, multiple disciplines” interaction in a controlled scene.

Do not implement all production copy/assets first.

Prove:

- composition;
- state transitions;
- readability;
- mobile fallback;
- performance.

### 7.3 Specialists Focus/Light Prototype

**Goal:** Prove the portrait reveal language with one or two temporary portraits before building the full section.

### 7.4 Selected Brands Strip

**Goal:** Test a refined, non-marquee horizontal brand composition tied subtly to scroll.

Complexity should remain low.

### 7.5 Microinteraction Grammar

**Goal:** Make buttons, links, drawers and interactive UI feel consistently controlled and precise.

---

## 8. Implementation workflow

No large section should move directly from concept to production code.

Preferred pipeline:

```text
STRATEGY
   ↓
SCENE CONTRACT / SPIKE SPEC
   ↓
INVESTIGATOR
   ↓
DECISION
   ↓
IMPLEMENTER
   ↓
REVIEWER
   ↓
QA
   ↓
MERGE OR REVERT
```

### Investigator

Must not modify production code.

Expected output:

- feasibility;
- files affected;
- reusable code;
- dependencies;
- mobile risk;
- Safari/browser risk;
- accessibility risk;
- performance risk;
- simpler alternative;
- recommendation.

### Implementer

Implements only the approved scope.

Must not redesign adjacent scenes without explicit permission.

### Reviewer

Attempts to disprove compliance.

Checks:

- Scene Contract violations;
- regression;
- narrative mismatch;
- excessive technical complexity;
- accessibility/mobile failures;
- unintended scope changes.

---

## 9. Scene Contract requirement

Every major interactive scene must eventually define:

- narrative purpose;
- intended takeaway;
- emotional state;
- visual structure;
- scroll behavior;
- explicit states;
- motion allowed;
- motion forbidden;
- desktop behavior;
- mobile behavior;
- reduced-motion behavior;
- required assets;
- performance budget;
- file scope;
- acceptance criteria.

Agents should implement states, not interpret adjectives.

Bad instruction:

> “Make the specialties section more sophisticated and cinematic.”

Preferred instruction:

> “Maintain one sticky 100dvh composition while eight specialty states replace title, index, short copy and central visual according to explicitly defined progress ranges. Do not modify Hero or Specialists.”

---

## 10. Decisions and remaining gates

### 10.1 Decided for V1

- clinic founded on **25/03/1998**;
- production canonical target: **`https://classodontologia.com.br`**;
- tagline: **“A arte de sorrir com Class.”**;
- strategic platform: **“O padrão Class.”**;
- specialty set: Prótese, Estética, Implantodontia, Periodontia, Sensibilidade, Ortodontia, Cirurgias, ATM/DTM;
- selected typography direction: Geist Sans + Instrument Serif, with Geist Mono optional for utility metadata;
- professional content: use current verified repository data and allow later enrichment;
- selected-brand copy should communicate criterion/selection and avoid unverified partnership claims.

### 10.2 Decision Gates — Status (updated 2026-08-21, Preflight)

> All gates below were resolved during the HITL discovery (decisions D1–D13) and frozen in the Preflight (ADRs 010–013 ACCEPTED). No gate remains open for autonomous implementation. Agent guesswork is prohibited; if a conflict arises, consult the current ADR or Scene Contract.

| Gate | Resolution | Source |
|---|---|---|
| Final homepage act order | **FROZEN — 9-act narrative** | ADR-013, IMPLEMENTATION_MASTER_PLAN §7 |
| Legacy: dedicated scene vs editorial spread | **Editorial spread (ACT 03)** | LEGACY.md Scene Contract |
| Specialties order and pacing | **Defined (8 states, SPECIALTIES.md §25)** | scenes/SPECIALTIES.md |
| Technology/method evidence | **Placeholder, no fabricated claims** | METHOD.md Scene Contract, AFK_EXECUTION_POLICY |
| Specialist order and credential depth | **4 specialists; unverified credentials omitted (D7)** | scenes/SPECIALISTS.md |
| Physical-space assets | **Deferred — placeholder policy (ASSET_PLAN §17)** | AFK_EXECUTION_POLICY |
| Conversion path hierarchy | **Single WhatsApp CTA (ACT 09)** | CONVERSION.md Scene Contract |
| Selected-by-CLASS strip position | **ACT 07 — after Specialists, before Place** | ADR-013 act table |
| Mobile structure for new hero moments | **Defined per scene (editorial stack, no sticky on mobile)** | Each Scene Contract §mobile |
| Public copy and line breaks | **V1 working copy from docs is approved (D10); final line breaks deferred to composition review** | AFK_EXECUTION_POLICY |
| External brand classification | **Deferred — scaffold only, no fabricated partnerships** | AFK_EXECUTION_POLICY |
| Asset inventory and approvals | **ASSET_PLAN.md exists; Batch A approved; Batch B deferred to WP-21** | ASSET_PLAN.md, SPECIALTIES_VISUAL_DNA.md |

### 10.3 Asset dependency

`ASSET_PLAN.md` exists and is current. The placeholder policy in `AFK_EXECUTION_POLICY.md` governs asset-absent scenarios for all acts. Production delivery of real assets is WP-21 (owner-gated, runs after WP-20).
