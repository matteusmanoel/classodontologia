# CLASS Odontologia — Asset Plan

**Status:** v1.0 — Asset production contract  
**Depends on:** `BRAND_EXPERIENCE.md`, `EXPERIENCE_BLUEPRINT.md`, `MOTION_AND_TYPE_SYSTEM.md`  
**Purpose:** Define what visual assets the CLASS website needs, what each asset must communicate, how it may be generated or sourced, how it must be delivered to implementation agents, and how to prevent synthetic media from being mistaken for clinical evidence.  
**Primary production domain:** `https://classodontologia.com.br`

---

## 1. Asset strategy

Assets are part of the brand argument. They must not be generated simply to fill empty containers.

Every asset must support at least one of the following:

1. brand perception;
2. narrative clarity;
3. proof of competence;
4. trust / humanity;
5. conversion / physical reality.

The visual system should feel closer to architectural/editorial photography and material studies than conventional dental advertising.

Preferred qualities:

- precise;
- restrained;
- editorial;
- tactile;
- high contrast where appropriate;
- natural rather than cosmetically exaggerated;
- composed with intentional negative space;
- usable as part of motion, not only as a static rectangle.

Avoid by default:

- generic smiling stock-photo aesthetics;
- extreme white teeth;
- artificial glamour;
- implausible clinical tools or anatomy;
- fake medical diagrams presented as factual;
- excessive lens flare / CGI spectacle;
- text embedded in generated images;
- watermark-dependent crops;
- fake clinic environments presented as the actual CLASS space;
- synthetic patient outcomes presented as real cases.

---

## 2. Truth classification — mandatory

Every production asset must declare a `truth_class`.

### `real_person`

A real identifiable CLASS professional or other verified person.

Allowed sources:

- original photography;
- approved identity-preserving AI rendition based on verified reference images.

If AI is used, `generation_mode` must be `ai_reference_preserving`.

### `real_place`

The actual CLASS clinic, building, neighborhood or other physical place.

Preferred source: real photography/video.

AI-generated architecture must **not** be presented as the actual clinic.

### `representative`

A generated or photographed model/object used to represent a concept, specialty or patient experience.

It must never be described as:

- an actual patient;
- a real CLASS case;
- a before/after result;
- a named person.

### `abstract`

A conceptual visual, sculptural object, material study, non-diagnostic geometry, light study or deliberately non-literal image.

This is the preferred classification for AI visuals where medical exactness is not required.

### `decorative`

Texture, gradient, grain, background field or non-semantic visual support.

Usually uses empty alt text in production.

### `external_brand`

Official third-party brand asset such as Invisalign or another technology/manufacturer mark.

These assets must come from an authorized/official source. **Do not recreate third-party logos with generative AI.**

---

## 3. Generation mode — mandatory

Use one of:

- `original_photo`
- `original_video`
- `ai_reference_preserving`
- `ai_generated`
- `3d_or_motion_render`
- `official_external_asset`
- `existing_repo_asset`

`truth_class` and `generation_mode` must be tracked separately.

Example:

```text
truth_class: real_person
generation_mode: ai_reference_preserving
```

This means the subject is a real person, but the delivered portrait is an AI-assisted rendition based on approved references.

---

## 4. Asset naming convention

Production filenames should be lowercase, ASCII, semantic and stable.

Pattern:

```text
<class>-<scene>-<subject>-<variant>.<ext>
```

Examples:

```text
class-specialties-protese-01.avif
class-specialties-protese-01.webp
class-specialists-alessandro-01.avif
class-place-interior-01.avif
class-brand-invisalign.svg
```

Do not include final UI copy in filenames.

Asset IDs in documentation omit the `class-` prefix where brevity helps, but production paths should remain explicit.

---

## 5. Source master vs web derivative

### Source master

Used for generation, art direction and future recrops.

Preferred photographic master:

- PNG or high-quality JPEG;
- wide-gamut source only if the delivery pipeline is controlled;
- no baked-in typography;
- no watermark;
- no UI frame;
- enough resolution for alternate crops.

Do not commit oversized AI source masters to the production repository unless there is an explicit reason. Keep production derivatives in the repo and retain approved masters in the project asset archive.

### Web derivative

Preferred production delivery:

- AVIF primary where supported by the framework/pipeline;
- WebP fallback where useful;
- JPEG/PNG only when technically justified;
- SVG for approved vector logos and simple vector graphics;
- MP4/WebM for pre-rendered motion where the Scene Contract requires it.

Use `next/image` or the project-standard image pipeline for raster content unless a scene-specific technical requirement says otherwise.

---

## 6. General image production rules

### 6.1 Resolution

Unless a row below overrides it:

- portrait master target: at least `2400 × 3000` or equivalent resolution;
- 3:4 portrait master target: at least `2400 × 3200`;
- landscape master target: at least `3000px` on the long edge;
- square object master: at least `2400 × 2400`.

These are source targets, not required transfer sizes.

### 6.2 Crop tolerance

Every generated editorial image must define a safe composition zone.

Preferred rule:

- keep the essential subject inside the central ~70% of the frame;
- leave at least one intentional negative-space side when typography may overlap or sit adjacent;
- do not crop eyes, mouths, instruments or clinically meaningful edges unpredictably.

### 6.3 Embedded text

Generated images must contain **no legible text, logos, labels or UI** unless the asset is explicitly an approved official brand asset.

### 6.4 Color direction

Primary territories:

- deep charcoal / near black;
- warm paper / ivory;
- natural skin;
- restrained metallic / titanium;
- controlled gold accents only when compositionally justified.

Avoid saturating every asset with the CLASS gold.

### 6.5 Medical accuracy rule

AI-generated visuals must not be used as diagnostic illustrations or exact procedural explanations unless reviewed by a qualified human and explicitly approved for that purpose.

For specialties, prefer **editorial metaphor + recognizable context** over pseudo-medical diagrams.

---

## 7. Accessibility metadata

Each final asset must declare `alt_intent`:

- `decorative` — rendered with empty alt text;
- `content` — concise factual alt text;
- `identity` — real person name/role as appropriate;
- `brand` — third-party/CLASS brand identification as appropriate.

Alt text must describe the communicative role, not the visual-generation prompt.

Do not write alt text such as “AI-generated image of…”. Synthetic-media provenance belongs in project records, not usually in image alt text.

---

## 8. Asset inventory — V1 homepage

Status vocabulary:

- `KEEP` — current asset can remain provisionally;
- `REVIEW` — usable but needs art/technical review;
- `REPLACE` — known production issue;
- `GENERATE` — create with AI / render;
- `SOURCE_REAL` — obtain real photography/video;
- `SOURCE_OFFICIAL` — obtain official external asset;
- `TBD` — do not create until the scene decision is approved.

### 8.1 ACT 01 — Hero / identity

| Asset ID | Role | truth_class | generation_mode | Master / aspect | Production | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `hero-tooth-motion-01` | Sculptural dental object controlled by scroll | `abstract` | `3d_or_motion_render` or `ai_generated` | Match current approved Hero media aspect and frame behavior | MP4/WebM + poster as required by existing scrub | **REPLACE** | Current production candidate must be replaced by a clean, watermark-free asset. Preserve current composition/timing envelope where possible to avoid reopening Hero architecture. |
| `hero-tooth-poster-01` | Mobile / failure / reduced-motion fallback | `abstract` | derived from approved hero motion | Same crop as hero media | AVIF/WebP | **REPLACE** | Must visually match the approved motion asset and work as an intentional still. |

**Production priority:** P0 because the Hero asset must not depend on hiding a watermark or generator artifact.

---

### 8.2 ACT 02 — Manifesto / standard

| Asset ID | Role | truth_class | generation_mode | Master / aspect | Production | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `manifesto-human-detail-01` | Human counterpoint after abstract Hero | `representative` or `real_person` | `ai_generated`, `ai_reference_preserving` or `original_photo` | 4:5 portrait; safe crop to 3:4 | AVIF/WebP | **REVIEW / TBD** | Only retain/create if the final Manifesto composition needs a human visual. Natural skin/teeth; no “perfect smile” advertising aesthetic. |

Do not create this solely because an empty media slot exists. Scene composition decides whether it is required.

---

### 8.3 ACT 03 — Legacy / since 1998

| Asset ID | Role | truth_class | generation_mode | Master / aspect | Production | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `legacy-founders-01` | Optional human evidence of accumulated experience | `real_person` | preferably `original_photo`; otherwise approved `ai_reference_preserving` | 3:4 or 4:5 | AVIF/WebP | **TBD** | Only use if it strengthens “experience creates criterion”. Avoid nostalgia/dynasty staging. |
| `legacy-archive-01` | Optional factual archive material | `real_person` / `real_place` | `original_photo` | preserve source ratio | AVIF/WebP | **TBD** | Never fabricate archival history with AI. If no authentic archive exists, solve the scene typographically instead. |

---

## 9. ACT 04 — Specialties — required generation set

### 9.1 Scene-level asset strategy

Hero Moment 02 requires a coherent **set**, not eight unrelated images.

All eight visuals must feel like one editorial commission:

- same contrast family;
- compatible lighting direction;
- consistent visual density;
- controlled negative space;
- no embedded text;
- no grotesque clinical imagery;
- no fake case-results;
- no need for exact diagnostic anatomy unless specifically approved.

Preferred art direction:

> **Human / material / sculptural imagery that suggests function, proportion, movement, structure and precision without becoming a literal dental catalog.**

The set should use one recurring visual grammar so the UI can communicate:

> **One standard. Different specialties.**

### 9.2 Shared specialty specification

Unless specifically overridden:

- source master: `2560 × 3200` (4:5) minimum target;
- production display: portrait 4:5 on desktop;
- mobile crop: safe for 3:4 without regenerating where possible;
- subject safe zone: central 70%;
- intentional negative space: preferably one side or top quadrant;
- light: directional, controlled, editorial;
- background: charcoal / near black or restrained neutral compatible with the scene;
- motion tolerance: must withstand `scale 1.03 → 1.00`, slight translation and clip/mask reveal;
- production: AVIF/WebP through app image pipeline;
- target derivative budget: aim for `<= 180 KB` per displayed desktop image where quality allows;
- no logo / no text / no watermark.

### 9.3 Specialty asset table

| Order | Asset ID | Specialty | Concept territory | truth_class | Status |
| ---: | --- | --- | --- | --- | --- |
| 01 | `specialties-protese-01` | Prótese | Sculptural ceramic/material study suggesting reconstruction, form and function; refined rather than laboratory catalog photography | `abstract` | **GENERATE** |
| 02 | `specialties-estetica-01` | Estética | Partial human portrait / natural smile detail emphasizing proportion and identity; no extreme whitening, no glamour retouch | `representative` | **GENERATE** |
| 03 | `specialties-implantodontia-01` | Implantodontia | Precision/structure metaphor with restrained titanium/material cues; avoid AI-invented surgical anatomy or fake implant diagram | `abstract` | **GENERATE** |
| 04 | `specialties-periodontia-01` | Periodontia | Foundation/support metaphor using organic material, tooth/soft-tissue boundary or macro texture; clinical enough to suggest care, not graphic | `abstract` or `representative` | **GENERATE** |
| 05 | `specialties-sensibilidade-01` | Sensibilidade | Light/thermal/pressure metaphor focused on a tooth or facial detail; sensation suggested through lighting rather than pseudo-scientific graphics | `abstract` | **GENERATE** |
| 06 | `specialties-ortodontia-01` | Ortodontia | Alignment/movement/proportion metaphor; subtle arc, aligner-like geometry or facial profile; do not imply Invisalign unless official relationship is being shown | `abstract` or `representative` | **GENERATE** |
| 07 | `specialties-cirurgias-01` | Cirurgias | Controlled sterile precision: gloved hand/tool silhouette or procedural preparation; no blood, fear imagery or invented procedure | `representative` | **GENERATE** |
| 08 | `specialties-atm-01` | ATM / DTM | Human side profile / jaw relationship with restrained light focus near joint region; editorial metaphor, not diagnostic anatomy | `representative` | **GENERATE** |

### 9.4 Specialty prompt constraints — global negative direction

For all specialty generation prompts, include the equivalent constraints:

```text
No text. No watermark. No logos. No fake clinic branding.
No exaggerated Hollywood smile. No hyper-white teeth.
No deformed anatomy. No duplicate teeth, fingers or tools.
No blood or graphic surgery.
No pseudo-medical labels or invented diagnostic overlays.
No obvious stock-photo pose.
No glossy beauty-ad retouching.
Preserve natural human texture where a person is shown.
```

### 9.5 Generation batches

Generate the specialty set in **two controlled batches**, not eight independent directions.

#### Batch A — establish visual language

Generate candidates for:

1. Prótese;
2. Estética;
3. Ortodontia.

Approve:

- contrast;
- background;
- crop;
- lighting;
- human/material balance;
- negative space;
- degree of abstraction.

#### Batch B — complete system

Only after Batch A is approved, generate:

- Implantodontia;
- Periodontia;
- Sensibilidade;
- Cirurgias;
- ATM / DTM.

This prevents eight visually inconsistent AI outputs.

---

## 10. ACT 05 — Method / technology

| Asset ID | Role | truth_class | generation_mode | Master / aspect | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `method-planning-01` | Visualize planning / predictability | `abstract` or `real_place` | `ai_generated` or preferably real equipment capture if available | 16:10 / 3:2 | **TBD** | Prefer light, scanning, planning interface atmosphere without unreadable fake UI. |
| `method-clinical-tech-01` | Evidence of real technology in practice | `real_place` | `original_photo` / `original_video` | 3:2 / 16:9 | **SOURCE_REAL** | Stronger proof than generated equipment. Capture actual clinic technology when available. |

AI may support the abstract layer, but actual equipment claims should use real approved photography or official product imagery where licensing permits.

---

## 11. ACT 06 — Specialists

### 11.1 Portrait strategy

The specialist scene should feel human, editorial and controlled.

Preferred master:

- 3:4 portrait;
- `2400 × 3200` target minimum;
- head + shoulders + upper torso;
- identity preserved;
- face readable under a moving light/shadow treatment;
- enough dark/neutral background for the spotlight/focus effect;
- controlled expression, not corporate stock smile;
- safe margin around head and shoulders.

### 11.2 Required portraits

Use the professionals currently represented in project content. Do not invent credentials or new people in asset generation.

| Asset ID | Role | truth_class | generation_mode | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `specialists-alessandro-01` | Editorial portrait | `real_person` | current approved photo or `ai_reference_preserving` | **REVIEW** | Must preserve identity. |
| `specialists-renata-01` | Editorial portrait | `real_person` | current approved photo or `ai_reference_preserving` | **REVIEW** | Must preserve identity. |
| `specialists-matheus-01` | Editorial portrait | `real_person` | current approved photo or `ai_reference_preserving` | **REVIEW** | Must preserve identity. |
| `specialists-mohamed-01` | Editorial portrait | `real_person` | current approved photo or `ai_reference_preserving` | **REVIEW** | Must preserve identity. |

The scene may later add professionals, but the composition must tolerate content enrichment without redesign.

---

## 12. ACT 07 — Selected by CLASS

Third-party logos must **not** be generated with AI.

Potential names discussed:

- Invisalign;
- Odontolatina;
- Ortoplan;
- additional approved aesthetic/clinical technologies.

Each relationship must be classified before publication.

Suggested metadata:

```text
relationship_type:
  - technology_used
  - supplier
  - official_partner
  - legacy_affiliation
  - other_verified
```

Do not label the whole set “partners” unless every listed relationship supports that claim.

| Asset ID | Required source | truth_class | Status |
| --- | --- | --- | --- |
| `brand-invisalign` | official vector/brand kit | `external_brand` | **SOURCE_OFFICIAL** |
| `brand-odontolatina` | official vector/brand kit | `external_brand` | **SOURCE_OFFICIAL** |
| `brand-ortoplan` | official vector/brand kit + relationship clarification | `external_brand` | **SOURCE_OFFICIAL / REVIEW** |

Preferred delivery: SVG where official guidelines permit it.

---

## 13. ACT 08 — Place / physical proof

The place scene should materially prove that CLASS exists as a real high-standard environment.

**Real photography is strongly preferred.**

Do not use an AI-generated clinic interior as if it were CLASS.

Recommended real capture set:

| Asset ID | Content | truth_class | Generation mode | Preferred ratio | Status |
| --- | --- | --- | --- | --- | --- |
| `place-interior-01` | Hero architectural interior | `real_place` | `original_photo` | 3:2 / 16:10 | **SOURCE_REAL** |
| `place-interior-02` | Treatment/technology detail | `real_place` | `original_photo` | 4:5 | **SOURCE_REAL** |
| `place-material-01` | Material/detail/lighting close-up | `real_place` | `original_photo` | 4:5 / square | **SOURCE_REAL** |
| `place-exterior-01` | Exterior / arrival context if visually useful | `real_place` | `original_photo` | 3:2 | **TBD** |
| `location-map-01` | Static dark map / location reference | `real_place` | `existing_repo_asset` or updated real map composition | landscape | **REVIEW** |

If real photography is not available at implementation time, use layout placeholders rather than inventing the clinic.

---

## 14. ACT 09 — Conversion

No unique generative asset is required by default.

The final CTA should benefit from restraint and the accumulated visual language of previous acts.

If a background image is later proposed, it must justify its narrative value and not compete with the CTA.

---

## 15. Asset production table — required metadata schema

Every generated/sourced asset should be tracked with at least:

| Field | Required | Description |
| --- | --- | --- |
| `asset_id` | yes | Stable semantic identifier |
| `scene` | yes | Homepage act / component |
| `narrative_role` | yes | Why the asset exists |
| `truth_class` | yes | Real/representative/abstract/etc. |
| `generation_mode` | yes | How it was produced |
| `subject` | yes | What the asset shows |
| `desktop_ratio` | yes | Intended primary crop |
| `mobile_ratio` | yes | Intended alternate crop |
| `master_resolution` | yes | Source target |
| `safe_zone` | yes | Typography/motion crop restrictions |
| `lighting` | yes | Direction / contrast |
| `background` | yes | Intended environment |
| `motion_use` | yes | Scale/mask/pan tolerance |
| `alt_intent` | yes | decorative/content/identity/brand |
| `source_rights` | yes | Ownership/license/approval status |
| `status` | yes | Generate/review/approved/etc. |
| `approved_by` | before prod | Human approval owner |

---

## 16. AI image generation brief template

Use this structure when producing an image in a separate generation session:

```text
ASSET ID:
SCENE:
NARRATIVE ROLE:
TRUTH CLASS:
GENERATION MODE:

SUBJECT:
COMPOSITION:
CAMERA / FRAMING:
LIGHTING:
BACKGROUND:
MATERIAL / SKIN DIRECTION:
NEGATIVE SPACE:
DESKTOP ASPECT:
MOBILE CROP REQUIREMENT:
MOTION TOLERANCE:

MUST PRESERVE:
MUST AVOID:

NO TEXT / NO WATERMARK / NO UNAPPROVED LOGOS.
```

For `real_person` assets, attach verified reference photos and explicitly require identity preservation.

---

## 17. Approval gates

An asset is production-approved only when it passes all relevant gates:

### Gate A — Brand

- feels CLASS;
- avoids generic dentistry advertising;
- supports the scene narrative.

### Gate B — Truth

- truth classification correct;
- synthetic content is not being presented as real evidence;
- no invented credentials, clinic environments, cases or partnerships.

### Gate C — Visual system

- crop works desktop/mobile;
- lighting is consistent with its set;
- sufficient negative space;
- no visible AI artifacts.

### Gate D — Technical

- correct production format;
- no watermark;
- reasonable transfer size;
- dimensions sufficient;
- fallback works;
- alt intent assigned.

### Gate E — Motion

- survives intended scale/reveal;
- essential content does not leave the crop during animation;
- no transition exposes low-resolution edges or generator defects.

---

## 18. Priority order

### P0 — production blockers

1. Clean Hero tooth motion/poster replacement.
2. Specialty visual language Batch A.

### P1 — Hero Moment 02 enablement

3. Complete all eight specialty visuals after Batch A approval.

### P1 — Hero Moment 03 enablement

4. Review/standardize specialist portraits.

### P1 — commercial proof

5. Real clinic/place photography.
6. Real technology-in-practice photography where useful.

### P2 — supporting evidence

7. Official third-party logos after relationship classification.
8. Optional legacy/archive assets.

---

## 19. Implementation independence rule

Code implementation must not be blocked by final asset generation when a neutral placeholder can preserve the intended geometry.

Allowed placeholder strategy:

- fixed aspect-ratio media wells;
- neutral charcoal/paper fields;
- asset ID labels in development only;
- no random stock images.

The Scene Contract must define geometry independently from final imagery so that generated assets can be dropped in later without redesign.

---

## 20. Current open asset decisions

These remain intentional gates:

1. final approved specialty art direction after Batch A;
2. whether ACT 02 requires a human image at all;
3. whether ACT 03 has authentic archival material worth using;
4. final specialist portrait versions;
5. exact real clinic photo set;
6. exact external brand list and relationship classification;
7. final Hero clean replacement asset.

These gates do **not** prevent implementation scaffolding of the Specialty scene.
