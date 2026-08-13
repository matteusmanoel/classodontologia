# Asset Contract — Class Odontologia MVP

**Authority: HIGH**
All media assets entering `public/assets/` must conform to this contract.
Owned by the Asset Pipeline Agent during Wave 0. Read-only for all other agents.

## Naming Convention

```
{category}-{descriptor}-{variant}-v{N}.{ext}
```

Examples:
- `tooth-cinematic-v1.mp4`
- `tooth-cinematic-v1-poster.webp`
- `golden-identity-v1.mp4`
- `golden-identity-v1-poster.webp`
- `specialist-alessandroschwertner-portrait.webp`
- `clinic-reception-hero.webp`

Version suffix (`-v1`, `-v2`) is mandatory for cinematic assets. Increment version when the asset content changes. This enables long-lived immutable cache headers without stale delivery.

No spaces. No uppercase. No UUIDs in filenames (the current source filenames are temporary and must be renamed).

## Current Asset Status

| Current filename | Target filename | Status |
|---|---|---|
| `vidu-video-3419599273445859.mp4` | `tooth-cinematic-v1.mp4` | Source only — encode before use |
| `copy_CDD43597-F083-4C89-ACD6-EC9311933303.mov` | `golden-identity-v1.mp4` | Source only — encode + convert |
| `Gemini_Generated_Image_*.png` | Archive in `cinematic/tooth/source/` | Source stills — not for web delivery |

## Cinematic Video Requirements

### Tooth Cinematic

| Attribute | Requirement |
|---|---|
| Container | MP4 |
| Codec | H.264 (libx264) |
| Pixel format | `yuv420p` |
| `faststart` | Required (moov before mdat) |
| Audio | None (stripped) |
| GOP | Determined by Spike A |
| Desktop resolution | 1920×1080 |
| Mobile resolution | Determined by Spike C |
| Poster | `tooth-cinematic-v1-poster.webp` — frame 0, ≤ 30 KB |

### Golden Identity

| Attribute | Requirement |
|---|---|
| Container | MP4 |
| Codec | H.264 (libx264) |
| Pixel format | `yuv420p` |
| `faststart` | Required |
| Audio | None (stripped) |
| GOP | Default — no seeking required |
| Resolution | 1280×646 (source dimensions; acceptable) |
| Poster | `golden-identity-v1-poster.webp` — frame 0, ≤ 20 KB |

## Photography Requirements (future delivery)

| Category | Min dimensions | Format | Max weight | Aspect ratio |
|---|---|---|---|---|
| Specialist portrait | 800×800 px | WebP | 80 KB | 1:1 |
| Clinic interior | 2400×1600 px | WebP | 150 KB | 3:2 |
| Treatment detail | 1600×1200 px | WebP | 120 KB | 4:3 |

All photos must be delivered as color-graded originals. CSS filters may be applied at implementation time for the dark/gold visual treatment.

## Brand Assets (existing)

| File | Dimensions | Format | Use |
|---|---|---|---|
| `class-gray.webp` | 752×264 | WebP | Horizontal lockup — dark bg |
| `class-oficial.webp` | 765×765 | WebP | Square logomark — color |
| `class-white.webp` | 1092×1092 | WebP | Square logomark — white |

Request SVG versions from the brand if available — SVG scales infinitely and reduces file size in navigation/footer contexts.

## Directory Structure

```
public/assets/
├── brand/
│   ├── class-gray.webp
│   ├── class-oficial.webp
│   └── class-white.webp
│
├── cinematic/
│   ├── tooth/
│   │   ├── source/               # Original AI-generated stills (archive, not served)
│   │   ├── tooth-cinematic-v1.mp4
│   │   ├── tooth-cinematic-v1-poster.webp
│   │   └── [tooth-cinematic-mobile-v1.mp4]  # If Spike C requires it
│   └── logo/
│       ├── golden-identity-v1.mp4
│       └── golden-identity-v1-poster.webp
│
├── clinic/                       # EMPTY — awaiting client delivery
├── people/                       # EMPTY — awaiting specialist photography
└── treatments/                   # EMPTY — awaiting treatment photography
```

## Cache Policy

Cinematic assets use version-suffixed names → long-lived immutable caching:
```
Cache-Control: public, max-age=31536000, immutable
```

All other assets in `public/` use a revalidation-aware policy:
```
Cache-Control: public, max-age=86400, stale-while-revalidate=604800
```

Configured in `vercel.json`.

## WebM / Alternative Codecs

H.264 MP4 is the only required delivery format for the MVP. WebM/VP9 is not generated until Spike D demonstrates a concrete benefit (file size, bandwidth, or CDN cost). Do not generate WebM speculatively.
