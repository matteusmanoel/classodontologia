# Content Map — Class Odontologia MVP

**Authority: MEDIUM**
Defines content schema, file locations, and placeholder conventions.
Owned by the Content Agent (Wave 1D).

## Content Status Legend

- `APPROVED` — real, verified, safe to render
- `PLACEHOLDER` — template value; must be replaced before launch
- `REQUIRED BEFORE LAUNCH` — content that cannot ship as placeholder

## Configuration Files

### `config/site.ts`

Global site configuration. Not a CMS. Typed TypeScript constant.

```typescript
export const siteConfig = {
  name: "Class Odontologia",
  tagline: "[TAGLINE — REQUIRED BEFORE LAUNCH]",
  description: "[META_DESCRIPTION — 150–160 chars — REQUIRED BEFORE LAUNCH]",
  url: "[CANONICAL_URL — REQUIRED BEFORE LAUNCH]",
  locale: "pt_BR",
  phone: "[PHONE — REQUIRED BEFORE LAUNCH]",
  whatsapp: "[WHATSAPP_NUMBER — REQUIRED BEFORE LAUNCH]",
  address: {
    street: "[STREET — REQUIRED BEFORE LAUNCH]",
    city: "Foz do Iguaçu",
    state: "PR",
    postalCode: "[CEP — REQUIRED BEFORE LAUNCH]",
    country: "BR",
  },
  hours: "[OPENING_HOURS — REQUIRED BEFORE LAUNCH]",
  instagram: "https://www.instagram.com/classodontologiafoz/",
  facebook: "https://www.facebook.com/ClassOdontologiaFoz/",
} as const
```

Status: `instagram` and `facebook` URLs are APPROVED. All other fields are PLACEHOLDER.

### `content/specialists.ts`

```typescript
export interface Specialist {
  id: string
  name: string                    // APPROVED (names known)
  title: string                   // PLACEHOLDER — awaiting credentials
  specialty: string               // PLACEHOLDER — awaiting confirmation
  bio: string                     // PLACEHOLDER — awaiting approved biography
  photo: string                   // PLACEHOLDER — path to specialist photo
}

export const specialists: Specialist[] = [
  {
    id: "alessandro-schwertner",
    name: "Dr. Alessandro Schwertner",
    title: "[TITLE — PLACEHOLDER]",
    specialty: "[SPECIALTY — PLACEHOLDER]",
    bio: "[BIOGRAPHY — PLACEHOLDER]",
    photo: "/assets/people/specialist-alessandroschwertner-portrait.webp",
  },
  {
    id: "renata-schwertner",
    name: "Dra. Renata Schwertner",
    title: "[TITLE — PLACEHOLDER]",
    specialty: "[SPECIALTY — PLACEHOLDER]",
    bio: "[BIOGRAPHY — PLACEHOLDER]",
    photo: "/assets/people/specialist-renataSchwertner-portrait.webp",
  },
  {
    id: "matheus-schwertner",
    name: "Dr. Matheus Schwertner",
    title: "[TITLE — PLACEHOLDER]",
    specialty: "[SPECIALTY — PLACEHOLDER]",
    bio: "[BIOGRAPHY — PLACEHOLDER]",
    photo: "/assets/people/specialist-matheusschwertner-portrait.webp",
  },
  {
    id: "mohamed-ismail",
    name: "Dr. Mohamed Ismail",
    title: "[TITLE — PLACEHOLDER]",
    specialty: "[SPECIALTY — PLACEHOLDER]",
    bio: "[BIOGRAPHY — PLACEHOLDER]",
    photo: "/assets/people/specialist-mohamedismail-portrait.webp",
  },
]
```

Specialist names are APPROVED. All other fields are PLACEHOLDER.

### `content/specialties.ts`

```typescript
export interface Specialty {
  id: string
  name: string      // PLACEHOLDER
  description: string // PLACEHOLDER
  icon?: string     // Optional SVG path or icon identifier
}

export const specialties: Specialty[] = [
  // PLACEHOLDER — awaiting approved list of clinical services
  // Example entries only:
  { id: "ortodontia", name: "[Ortodontia]", description: "[PLACEHOLDER]" },
  { id: "implantes", name: "[Implantes]", description: "[PLACEHOLDER]" },
  { id: "estetica", name: "[Estética Dental]", description: "[PLACEHOLDER]" },
  { id: "endodontia", name: "[Endodontia]", description: "[PLACEHOLDER]" },
]
```

All entries are PLACEHOLDER. Do not fabricate specialties.

### `content/copy.ts`

```typescript
export const copy = {
  hero: {
    heading: "[HERO_HEADING — REQUIRED BEFORE LAUNCH]",
    tagline: "[HERO_TAGLINE — REQUIRED BEFORE LAUNCH]",
  },
  manifesto: {
    headline: "[MANIFESTO_HEADLINE — REQUIRED BEFORE LAUNCH]",
    body: "[MANIFESTO_BODY — REQUIRED BEFORE LAUNCH]",
  },
  specialties: {
    heading: "[SPECIALTIES_SECTION_HEADING — PLACEHOLDER]",
    subheading: "[SPECIALTIES_SUBHEADING — PLACEHOLDER]",
  },
  specialists: {
    heading: "[SPECIALISTS_SECTION_HEADING — PLACEHOLDER]",
  },
  cta: {
    heading: "[CTA_HEADING — PLACEHOLDER]",
    body: "[CTA_BODY — PLACEHOLDER]",
    buttonLabel: "[CTA_BUTTON_LABEL — PLACEHOLDER]",
  },
  footer: {
    copyright: "© {year} Class Odontologia. Todos os direitos reservados.",
  },
} as const
```

## Placeholder Rendering Rules

- In development, placeholder values render visibly as `[PLACEHOLDER TEXT]` format
- In production, no component should display literal `[...]` strings — all required content must be approved before release
- The CI/build process should optionally warn when `[PLACEHOLDER` strings are detected in rendered output

## Pre-Launch Content Checklist

The following content is REQUIRED BEFORE LAUNCH and blocks production deployment:

- [ ] Canonical URL
- [ ] Site meta description (150–160 chars)
- [ ] Hero heading and tagline
- [ ] Manifesto headline and body
- [ ] All section headings
- [ ] CTA copy and button label
- [ ] CTA WhatsApp number or URL
- [ ] Phone number
- [ ] Physical address and postal code
- [ ] Opening hours
- [ ] Specialist credentials (title, specialty, bio) × 4
- [ ] Specialist photography × 4
- [ ] Approved specialty list

The following content is optional for launch:
- [ ] Testimonials (requires real patient quotes and consent)
- [ ] Clinic photography (enables Technology/Facility section)
- [ ] Treatment photography (enables Results section)
