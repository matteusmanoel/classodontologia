# ADR-001 — Pre-rendered Video over Runtime 3D

**Status: ACCEPTED**
**Date: 2026-08-12**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision

All cinematic visual experiences in the MVP are delivered as pre-rendered video assets (MP4). Runtime 3D rendering (Three.js, React Three Fiber, Spline, custom WebGL/shaders) is excluded from the MVP.

---

## Context

The Hero requires a premium cinematic visual: a sculptural tooth that deconstructs from whole to exposed anatomy as the user scrolls. Two implementation paths exist:

1. **Runtime 3D** — A 3D model rendered in real-time in the browser (Three.js, R3F, Spline), with scroll-driven animation controlling camera/material/decomposition.
2. **Pre-rendered video** — An AI-generated image sequence converted to video (via tools like Vidu), encoded as MP4, and controlled by mapping `video.currentTime` to scroll progress.

---

## Why Pre-rendered Video

**Visual quality.** AI-generated imagery (Gemini, Midjourney, etc.) and AI video (Vidu) produce photorealistic cinematic results that exceed real-time 3D in visual sophistication for this use case. The tooth cinematic concept — sculptural, lit like a luxury product — is achievable through AI generation in a way that would require months of 3D modeling and rendering to replicate.

**Performance.** A decoded video frame costs one GPU texture upload per frame. A full 3D scene with materials, lighting, and post-processing can cost tens of draw calls per frame. The pre-rendered path produces better Lighthouse scores and a lower INP.

**Predictability.** Pre-rendered video behavior is deterministic across browsers and devices. Runtime 3D introduces unpredictable variance in rendering quality, frame rate, and compatibility (especially on low-power mobile devices and older GPUs).

**Implementation speed.** Pre-rendered assets exist or can be generated without developing a 3D scene. The scroll-scrubbing implementation is simpler than equivalent 3D animation orchestration.

---

## What is Simpler That We Are Not Choosing

CSS transforms and static imagery — simpler than both options, but insufficient for the cinematic impact required by the brand positioning.

---

## Consequences

- **Easier:** Predictable performance, simpler implementation, better accessibility fallback, asset replacement without code change
- **Harder:** Asset replacement requires re-encoding; visual changes require new AI generation; scene is not interactive in 3D
- **Accepted trade-off:** The tooth cinematic is a cinematic experience, not an interactive 3D model. The lack of 3D interactivity is not a product requirement.

---

## Revisit Condition

If a product requirement emerges that cannot be satisfied by pre-rendered video (e.g., real-time user interaction with the 3D model), a new ADR must be proposed before introducing runtime 3D.

---

## What Agents Must Do

- Use only `<video>` elements for cinematic visuals
- Do not install `three`, `@react-three/fiber`, `@splinetool/react-spline`, or any WebGL library
- If a design request seems to require 3D, escalate to the Project Owner before implementing
