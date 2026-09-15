# CLASS GAP ANALYSIS — vs. nabilissa.com reference

Observed: 2026-08-22 | Viewport: 1440×900

---

## Homepage Structure Comparison

| | Nabil | CLASS |
|---|---|---|
| Total scroll depth | 35,284px | 14,542px |
| Total "chapters" | 5 | 9 acts (no chapter system) |
| Dominant palette | Dark (#000) + copper/gold | Alternates dark/paper per act |
| Background switches | 2 (dark→white, white→dark) | Multiple per act structure |
| Chapter HUD | Persistent, fixed bottom | Absent |

---

## Perceptual Gap by Dimension

| Dimension | Nabil observed | CLASS current | Gap |
|---|---|---|---|
| Planes simultaneous | 3–4 (bg, img, type, overlay) | 1–2 | CRITICAL |
| Scale variation within section | 3 different sizes | Uniform | HIGH |
| Scroll-scrubbed parallax | Present (depth perception) | Absent | HIGH |
| Sticky / pinned stages | Chapter break screens | Absent | HIGH |
| Chapter break "breath" moment | Each chapter has intro screen | None | HIGH |
| Oversized decorative typography | Chapter numbers 20–30vw | Small labels (06/09 at 0.75rem) | HIGH |
| Image/text overlap | Text overlays images at diff z | Text below or beside image | HIGH |
| Negative space composition | Deliberate dark breathing room | Grid gap + padding | MEDIUM |
| Portrait entry stagger by depth | Implicit in composition | Simultaneous entry | MEDIUM |
| Background chapter transition | Hard-cut with overlap effect | Hard section boundary | MEDIUM |
| Chapter progress HUD | Yes — fixed, animated bars | Absent | MEDIUM |
| Typographic scale contrast | Extreme (3vw + 30vw together) | Moderate (section counter + h2) | MEDIUM |
| Custom cursor | Subtle circle | Default | LOW |
| Loading experience | Immediate hero | Immediate hero | NONE |

---

## Section-by-Section Assessment

### Hero (ACT 01)
- **Nabil**: Atmospheric architecture photo fills viewport. Massive 30vw thin serif overlays it. Two depth planes immediately visible (image + type).
- **CLASS**: Logo + 3D tooth model side by side. No image/text overlap. Logo competes with visual for attention.
- **Gap**: Missing layering — text and image co-exist instead of one being clearly in front of the other.

### Manifesto (ACT 02) ← closest to Nabil quality
- **Nabil** equivalent: Spare text + portrait emerging from darkness (Ch.I).
- **CLASS**: Deconstructed tooth model floating in dark space with text overlay. This is CLOSE. Dark background, multi-element composition.
- **Gap**: The floating elements may be a static composite image rather than true depth layers. If there's no parallax between text and tooth fragments, depth is perceived, not felt.

### Specialists (ACT 06) ← CHOSEN INTERVENTION
- **Nabil** equivalent: Chapter II floating portrait + bio composition.
- **CLASS**: 4 equal-size portrait cards in uniform 4-column grid, dark background, text below portrait.
- **Gap**: CRITICAL. Equal scale removes hierarchy. Grid removes compositional drama. No depth between any element. The section already has excellent portraits and a dark background — it just needs depth.

### Specialties (ACT 04)
- **Nabil** equivalent: Product showcase (Ch.III).
- **CLASS**: Counter label + specialty name + description on left; dark placeholder rectangle on right. Images not loading.
- **Gap**: Critical due to missing assets, but also the composition is a simple 2-col split.

---

## Root Cause of the Flatness

The current CLASS homepage is structurally correct (right palette, right content) but **architecturally flat** in its scroll experience:

1. Every section has one composition plane
2. Content enters via `Reveal` (simple opacity/transform from viewport entry), never via scroll-scrubbed parallax
3. No section creates a "breath" or "chapter break" moment — each section immediately fills with its content
4. Typography scale is conservative — never deliberately oversized as a visual element
5. Images and text are separated (grid cells) not overlapped (layered compositions)

---

## Highest Leverage Opportunities

**Rank 1 — Specialists: Parallax Depth Stage** 
Replace flat grid with scroll-pinned composition where portraits have depth-offset entry and the section counter becomes an oversized decorative element.
- Impact: HIGH (changes perceived quality of the whole dark section)
- Risk: LOW (no content change, isolated component)
- Scope: 1 component modification

**Rank 2 — Manifesto→Legacy: Cinematic Handoff**
Add a depth-differential between the floating tooth fragments (foreground) and the text (midground) via separate translation on scroll. Create a handoff moment before Legacy.
- Impact: HIGH (manifesto is already close to the right quality)  
- Risk: MEDIUM (requires splitting the ManifestoSection)
- Scope: 1–2 component modifications

**Rank 3 — Global Chapter Progress HUD**
Add a fixed bottom bar showing the 9 acts with scroll progress.
- Impact: MEDIUM (adds narrative orientation, raises perceived production value)
- Risk: LOW (additive, no existing component touched)
- Scope: 1 new component

**Chosen for this session: Rank 1 — Specialists Parallax Depth Stage**
