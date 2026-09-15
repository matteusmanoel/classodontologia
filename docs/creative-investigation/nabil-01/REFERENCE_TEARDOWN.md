# REFERENCE TEARDOWN — nabilissa.com

Observed: 2026-08-22 | Viewport: 1440×900 | Scroll depth: 35,284px

---

## Site Narrative Arc

| Position | Chapter | Visual State |
|---|---|---|
| 0% | Hero | Dark architecture photo + "CAN DESIGN SHAPE HOW WE FEEL?" (huge thin serif) |
| 5% | Ch.I opening | Near-total black — portrait materializing from darkness |
| 7% | Ch.I | "NABIL ISSA" label + faint portrait silhouette |
| 10% | Ch.I content | Portrait + bio + brand logos (Wallpaper*, AD, Fendi, Bugatti) |
| 20% | Ch.II content | Asymmetric floating images in dark space + "BOLD WHEN NEEDED" typography |
| 30% | Ch.III break | "UNDENIABLY HIS." — full-width huge type, near-empty stage |
| 40% | Ch.III content | Full-bleed furniture photograph — zero text |
| 50% | Ch.III | Marble table close-up with styling object |
| 60% | Ch.II–III | Background takeover: dark → white. Two sections overlapping |
| 70% | Ch.IV | Circular/arc reveal — near-total black with warm curved borders |
| 80% | Ch.IV | IMAGE CROSSING — two photos side-by-side as one exits left |
| 90% | Ch.V | Split: text left, B&W portrait right — "SPEAKS & LASTS" |
| 100% | End | "CONNECT" — huge outline stroke type, contact info |

---

## DOM Structure (Key Elements)

```
.menu-wrap         position: fixed;  z-index: 900   → nav always on top
.chapter-nav       position: fixed;  z-index: 700   → chapter HUD (bottom)
.page-wrap         static; height: 35,284px          → full scroll container

.hero              position: relative; height: 866px → one viewport
.chapter-1         height: 4,639px                   → ~5 viewports
  .sect-1          relative; height: 866px            → chapter intro screen
  .sect-2          height: 2,907px                    → main content
  .bio             height: 1,237px
  .brands          height: 67px
  .based           height: 1,570px
.chapter-2         height: 6,465px                   → ~7 viewports  
  .sect-1          relative; height: 866px            → chapter intro (big "2")
  .photos          height: 3,347px                    → floating image grid
  .quote           height: 937px
.chapter-3         height: 12,124px                  → ~13 viewports
  .sect-3          position: absolute; z-index: 10   → overlapping element
```

---

## Chapter Nav HUD — Behavioral Model

```html
<div class="chapter-nav" style="padding: 0px 16.6667px 16.6667px; gap: 17px;">
  <div class="chapter-item l1-thin _active" style="min-width: 153px;">
    <div class="chapter-text">Chapter I</div>
    <div class="chapter-line">
      <div class="chapter-line-progress" style="width: 23.8007%;"></div>
    </div>
  </div>
  <div class="chapter-item l1-thin">Chapter II / progress: 0%</div>
  ...
</div>
```

- Fixed bottom, z-index 700
- Each item has a `chapter-line-progress` bar updated by scroll progress
- Active item has `_active` class
- Progress is a percentage width (0–100%), tracking scroll within that chapter

---

## Mechanic Catalog

### 1. CHAPTER BREAK SCREEN
A full-viewport section containing ONLY:
- Dark/neutral background (full bleed)
- Oversized chapter number (20–30vw, warm copper/gold, partially off-screen)
- Minimal centered editorial text (2–3 lines)
- No images

Creates a "breath" moment between content chapters. Not pinned/sticky — just a tall section.

### 2. FLOATING IMAGE COMPOSITION IN DARKNESS
Images in a 2-column asymmetric layout:
- Different aspect ratios (1:1, 2:3, 16:9)
- Different widths: ~400–500px each, centered within a ~960px container
- Dark background creates negative space = "floating" perception
- Typography at separate z-plane overlays the grid
- A large decorative number (project counter, "9") sits beside the grid

### 3. LETTER 3D FLIP ANIMATION
Text characters use `matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)` transforms — a 90° Y-axis rotation (letters perpendicular, invisible), then animated to face-forward.

### 4. IMAGE CROSSING
At ~80%, two full-bleed images are side-by-side with a thin dark divider:
- Previous image exits LEFT (clip or transform)
- New image enters RIGHT
- Both visible simultaneously
- Controlled by scroll position

### 5. BACKGROUND TAKEOVER
At ~60%, the site flips from dark aesthetic to white/cream aesthetic:
- Previous dark content still partially visible top-left (exit animation)
- New light section enters from below
- Hard background color change during overlap

### 6. CIRCULAR REVEAL (Chapter IV opening)
At ~70%, the viewport shows near-total black with warm curved boundaries at edges:
- A circular clip-path expanding from center OR
- An extreme close-up of a curved furniture piece (dark interior, warm frame)
- Creates dramatic "aperture opening" feeling

### 7. OVERSIZED DECORATIVE NUMBERS
Chapter numbers displayed at ~20–30vw font-size:
- Warm copper/gold color
- Partially cropped off the left or right edge
- Sit in the foreground/background layer behind text
- Create scale contrast with body text

---

## Depth Model — Chapter II Floating Composition (studied at 500px into photos section)

```
LAYER -2: Page background (#000 or near-black) — static
LAYER -1: Item grid container (.items-wrap, 964px wide, left:202) — static
LAYER 0:  Image cards (.item × 9) — different aspect ratios, 2-col layout
           Item 1: top:-67, left:202, 490×300 (narrow landscape)
           Item 2: top:266, left:202, 474×600 (tall portrait — dominant)
           Item 3: top:266, left:693, 474×333 (medium landscape)
           ...
LAYER +1: Title (.title) — positioned before items in DOM, 
           sits above the entry of the images: top=-440 (scrolled)
LAYER +2: Decorative counter ("9") — left of grid, copper/gold
```

Dark negative space: 202px left, 34px right, variable gaps between images.

---

## Loading / Entry Experience

- No visible loader or preloader screen on fresh load
- Hero is immediately visible with architecture photograph and large type
- Initial scale is striking — the question "CAN DESIGN SHAPE HOW WE FEEL?" at ~30vw height
- Bottom navigation element ("SCROLL DOWN / TO BEGIN THE STORY") anchors intent

## Cursor

- Custom cursor visible (small circle) but not heavily theatrical
- Cursor blend mode not definitively observed without hover interaction
- Does not appear to be a large cursor with label — relatively subtle

## Chapters / Progress HUD

- Fixed at bottom edge of viewport
- Shows all chapter labels simultaneously (Chapter I, II, III, IV, V)
- Active chapter has a filled/animated progress bar
- Inactive chapters show empty progress bars but remain visible
- Labels use "l1-thin" typographic class — very small, light weight
- Narrative function: lets you know "where you are" in the story at all times
