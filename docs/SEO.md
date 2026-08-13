# SEO Baseline — Class Odontologia MVP

**Authority: MEDIUM**

## Language

`lang="pt-BR"` on `<html>`. Brazilian Portuguese is the sole language for the MVP.

## Metadata (Next.js App Router)

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Class Odontologia | Foz do Iguaçu",
    template: "%s | Class Odontologia",
  },
  description: "[META_DESCRIPTION — 150–160 chars — REQUIRED BEFORE LAUNCH]",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "[CANONICAL_URL]",
    siteName: "Class Odontologia",
    title: "Class Odontologia | Foz do Iguaçu",
    description: "[OG_DESCRIPTION]",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class Odontologia",
    description: "[TWITTER_DESCRIPTION]",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "[CANONICAL_URL]",
  },
}
```

All placeholder values must be replaced before production deployment.

## Sitemap and Robots

```typescript
// app/sitemap.ts — Next.js native
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "[CANONICAL_URL]",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}

// app/robots.ts — Next.js native
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "[CANONICAL_URL]/sitemap.xml",
  }
}
```

## Open Graph Image

Create a static branded image at `public/og-image.jpg` (1200×630 px). This image can be generated from brand assets during the Foundation wave. It does not require a real photograph — a brand mark + clinic name on the dark background is sufficient.

## Structured Data — LocalBusiness

Emit `Dentist` schema (a subtype of `LocalBusiness`) as a `<script type="application/ld+json">` in `app/layout.tsx`.

**Important:** Structured data provides machine-readable business context that enables search engines to understand the entity, which may enable eligibility for rich result features (Knowledge Panel, local search cards). It does not guarantee ranking improvements.

**Do not emit structured data with placeholder values.** The following fields must be confirmed before the JSON-LD block ships:
- `address` (street, city, postal code)
- `telephone`
- `openingHours`
- `url`

Schema template (once real data is available):

```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Class Odontologia",
  "description": "[APPROVED_DESCRIPTION]",
  "url": "[CANONICAL_URL]",
  "telephone": "[PHONE]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET]",
    "addressLocality": "Foz do Iguaçu",
    "addressRegion": "PR",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "openingHours": "[HOURS]",
  "sameAs": [
    "https://www.instagram.com/classodontologiafoz/",
    "https://www.facebook.com/ClassOdontologiaFoz/"
  ]
}
```

## Heading Semantics for SEO

- Single `<h1>` per page — Hero heading
- `<h2>` for all section headings
- `<h3>` for card-level headings (specialists, specialties)

This structure supports both accessibility and search engine understanding.

## What is NOT in Scope for MVP

- Blog or editorial content
- hreflang (single language)
- Advanced content SEO architecture
- CMS-driven metadata
- Product/service individual pages
- Google Business Profile optimization (separate concern)

## Favicon and App Icons

Required assets in `public/`:
- `favicon.ico`
- `apple-touch-icon.png` (180×180 px)
- `og-image.jpg` (1200×630 px)

These should be created during the Foundation wave using brand assets.
