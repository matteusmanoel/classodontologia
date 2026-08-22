# Specialties Visual DNA — CLASS Odontologia

**Version: 1.0 — 2026-08-21 (Batch A)**
**Authority: Lead Preflight Architect (Batch A approved; owner visual review recommended before Batch B)**

---

## Batch A — Generated Assets

Three initial candidates generated to establish visual direction:

| Asset | File | Status |
|---|---|---|
| Prótese | `batch-a-protese-01.png` | ✓ APPROVED — strong object study, exact DNA target |
| Estética | `batch-a-estetica-01.png` | ✓ APPROVED — natural portrait, correct register |
| Ortodontia | `batch-a-ortodontia-01.png` | ✓ APPROVED — strong editorial abstract, geometric arc |

---

## Visual DNA

The following specifications govern all eight specialty assets (Batch A + Batch B) and any future regeneration.

### Background

- Color: near-black charcoal, `#080808`–`#101010` range
- Texture: none — flat or very subtle studio floor
- Not: white, grey, colored, patterned, or gradients as backgrounds

### Lighting

- Single directional source, warm amber/golden tone
- Direction: upper-left (primary) or upper-right (secondary, for variety within a row)
- Strong shadow: present, precise, clean (not diffused)
- Highlights: warm ivory on the primary subject surface
- Prohibited: flash/flat even lighting, cool blue tones, high-key studio setup

### Palette

- Background: near-black `#080808`
- Subject: warm ivory, cream, natural skin — within the `--color-paper`/`--color-gold` range
- Shadow: deep black, no fill
- Highlights: warm amber or warm white
- No: cyan, blue, green, clinical white (pure #ffffff)

### Framing and crop

- Aspect ratio: **3:4 portrait** (matches `ASSET_PLAN.md §6` — 4:5 master; 3:4 is acceptable at this stage)
- Subject occupies: 55–70% of frame
- Negative space: generous, on one side or above — subject is not centered
- Safe zone: subject core within inner 60% of frame (crop-safe for any 16:9 or 1:1 reformat)

### Subject matter by specialty

| Specialty | Subject direction | Abstraction |
|---|---|---|
| Prótese | Ceramic crown or prosthetic element — object study | Near-abstract (object without clinical context) |
| Estética | Lower face partial portrait — natural smile, proportion | Representative (real face; no retouching) |
| Ortodontia | Curved arc / jaw profile silhouette — alignment metaphor | Abstract editorial |
| Implantodontia | Implant post form or geometric titanium material — structure metaphor | Abstract |
| Periodontia | Organic cellular/gingival texture or botanical macro with similar organic logic | Abstract / macro |
| Sensibilidade | Fragile material — fine porcelain, thin glass edge, liquid surface | Abstract |
| Cirurgias | Precision instruments as sculptural still-life | Near-abstract |
| ATM/DTM | Lateral skull profile silhouette or jaw hinge geometry | Abstract editorial |

### Degree of abstraction

The Prótese reference is the **minimum abstraction** (a real identifiable object in a non-clinical context). Ortodontia is the **maximum abstraction** (pure form/geometry). All Batch B subjects must fall within this range — never clinical catalog photography and never purely decorative texture.

### Negative prompts (apply to all generations)

Do not include:
- Clinical context (dental chairs, operating lights, clinical trays, latex gloves)
- Text, labels, watermarks, logos, brand marks
- Multiple teeth in a row as product catalog
- Extreme tooth whitening / Hollywood beauty-ad aesthetic
- Stock photo compositions
- People identifiable as patients
- Equipment brand names (Invisalign, Straumann, etc.)
- Color backgrounds (anything other than near-black)
- Medical diagrams, X-rays, anatomical charts

### Motion tolerance

Assets are used at scale `1.03 → 1.00` (subtle parallax on scroll). Subject must remain within safe zone across this range.

---

## Batch B — Production guidance

Batch B (remaining 5 specialties) must follow this DNA without reopening art direction. The implementing agent:

1. Uses the prompt base below, substituting `[SUBJECT DIRECTION]` per the table above.
2. Generates 1–2 candidates per specialty.
3. Selects the candidate closest to the Prótese/Estética/Ortodontia benchmark.
4. Does NOT regenerate multiple times for minor differences.
5. Documents the selected filenames in this file under `## Batch B — Results`.

### Prompt base for Batch B

```
Editorial still-life/portrait photograph: [SUBJECT DIRECTION]. Deep charcoal near-black background (#080808). Single directional warm amber light from upper-left casting a precise shadow. High contrast. Subject occupies 60% of frame with deliberate negative space on one side. Warm ivory/cream highlights on the primary surface. Architectural restraint and editorial precision. No text, no logos, no watermarks, no clinical context, no laboratory setting, no medical labels.
```

---

## Batch B — Results

_(to be filled by the agent executing WP-21)_

| Specialty | File | Approved |
|---|---|---|
| Implantodontia | — | — |
| Periodontia | — | — |
| Sensibilidade | — | — |
| Cirurgias | — | — |
| ATM/DTM | — | — |

---

## Production delivery format

Per `ASSET_PLAN.md §19`:
- Source master: minimum 2560 × 3200 (4:5), or equivalent resolution
- Web delivery: WebP, progressive, ≤ 200 KB
- Naming convention: `specialty-{id}-v1.webp` (e.g., `specialty-protese-v1.webp`)
- Safe zone: subject core within inner 60%
- No embedded metadata with watermarks
