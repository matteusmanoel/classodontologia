# SCENE TRANSLATION — Specialists Depth Stage

**Reference mechanic**: Nabil Chapter II "floating portrait composition in darkness"
**CLASS scene**: Specialists section (ACT 06)
**Session**: 2026-08-22

---

## Narrative Role

This scene answers the question a prospect is forming after seeing the Manifesto and Method: *"Who are these people?"*

It should feel like a reveal — each specialist emerging from darkness into light, like the spotlight used in a stage performance or a documentary close-up.

The oversized "06" in the background is a signal: *this is a defining act of the story, not a supporting detail.*

---

## Reference Mechanic (from Nabil)

The Chapter II image composition uses:
1. Dark background as a stage (not as a container)
2. Images at 3 different sizes floating freely (not in a uniform grid)
3. A large project counter ("9") in the background — decorative, copper, partially off-screen
4. Typography ("BOLD / WHEN / NEEDED") at a separate z-plane from the images, overlapping the boundary between two images
5. Negative dark space is deliberate — you can see the stage between the images

The mechanic that creates depth: **objects that are meant to appear "closer" to the viewer are larger, and objects that are meant to appear "further back" are smaller.** The viewer's brain interprets the scale difference as distance.

---

## CLASS Composition

### What we keep
- Dark background (`bg-bg-primary`)
- Real portrait photography
- The existing copy (heading + subheading)
- The existing specialists data

### What we transform
- Grid layout → depth-staggered layout with size variation
- Small "06/09" counter → oversized `06` background decoration
- Simultaneous entry → depth-offset staggered entry
- Header positioned above portraits → header pinned while portraits scroll in

---

## Layers

```
LAYER -1  bg-bg-primary (#080808)
          Full section background. Static.

LAYER 0   Oversized "06" numeral
          font-size: clamp(16rem, 30vw, 28rem)
          color: #c9a84c (gold) at 5–8% opacity
          position: absolute, right-aligned, vertically centered
          Bleeds ~20% off the right edge.
          Drifts upward at 0.4× scroll speed (parallax).
          aria-hidden. decorative only.

LAYER 1   Section heading + subheading
          "O olhar por trás do padrão."
          Standard font-display, text-5xl, text-text-primary
          position: bottom-left of the "stage" viewport
          
LAYER 2   Portrait cards — 4 specialists
          Dr. Alessandro: larger (3/4 aspect, ~340px wide) → dominant
          Dra. Renata: medium (3/4 aspect, ~280px wide) → supporting
          Dr. Matheus: medium (3/4 aspect, ~280px wide) → supporting
          Dr. Mohamed: medium (3/4 aspect, ~280px wide) → supporting
          
          Entry animation: each card starts at different Y offset, 
          scrolls into position with slightly different speeds.
          
LAYER 3   Portrait metadata (name, specialty, bio)
          Below each portrait, no z-index change
          Enters after portrait is visible
```

---

## Scroll States

### STATE 0 — ENTRY (section enters viewport)
```
Background:    #080808, full-bleed
"06" numeral:  visible, opacity 0.06, position right-center
Heading:       visible, bottom-left
Subheading:    visible, bottom-left (below heading)
Portraits:     offset downward — each at a different starting Y:
               Alessandro: translateY(60px), opacity: 0
               Renata:     translateY(90px), opacity: 0
               Matheus:    translateY(120px), opacity: 0
               Mohamed:    translateY(150px), opacity: 0
```

### STATE 1 — REVEAL (section scrolls into view)
```
"06" numeral:  begins drifting up
Portraits:     animate to translateY(0), opacity: 1
               Stagger: 0.15s between each
               Duration: 0.8s, ease: power2.out
               Alessandro enters first (leftmost, "leader" position)
```

### STATE 2 — HOLD (section fills viewport)
```
All portraits:  visible at full opacity
"06" numeral:   at its peak position (shifted up ~40px from start)
Heading:        held at its static position
Portrait cards: portrait metadata (name, specialty, bio) visible
```

### STATE 3 — EXIT (section scrolls out)
```
Normal document flow exit.
No special exit animation — allow standard scroll-out.
```

---

## Transition IN (Manifesto/Method → Specialists)

The preceding section (Method, ACT 05) ends on dark background.
The Specialists section opens on the same dark background.

Continuity principle: the background does NOT change at the boundary. The eye stays in darkness as the content changes. This is the "parallel universe" cut — the color field continues, the content within it changes. This creates continuity, not hard-cut section boundaries.

**Entry mechanic**: The "06" numeral appears as a low-opacity presence before the portraits reveal. It's a subtle announcement: *"a new act is beginning."*

---

## Transition OUT (Specialists → Selected by CLASS)

After the Specialists section, we move to "Selected by CLASS" (ACT 07).

No special transition — standard document flow. The dark background ends when the next section begins (if SelectedByClass has a different background). The contrast itself becomes the transition.

---

## Implementation: Technology Decision

### Stack
1. **CSS** — layout, positioning, z-index, the oversized "06"
2. **GSAP + ScrollTrigger** — staggered portrait entry, "06" parallax drift
3. **Existing React/Next architecture** — no new dependencies

### No new libraries needed
The existing GSAP + ScrollTrigger installation (already present in `SpecialistsReveal.tsx`) is sufficient.

### Component Changes
- `components/sections/SpecialistsSection.tsx`: Add oversized "06", restructure header positioning
- `components/cinematic/SpecialistsReveal.tsx`: Add depth-offset stagger entry for portrait cards

---

## Rollback Path

The change is isolated to:
- `SpecialistsSection.tsx` (server component shell)  
- `SpecialistsReveal.tsx` (client animation island)

Reverting these two files to their previous git state fully restores the prior experience. No other sections are affected.
