# ADR-004 — Local Typed Content / No CMS

**Status: ACCEPTED**
**Date: 2026-08-12**
**Authority: Project Owner / Human Architecture Reviewer**

---

## Decision

All editorial content for the MVP is stored in typed TypeScript objects in `config/` and `content/` directories. No CMS (headless or otherwise) is used.

---

## Context

The landing page requires manageable content: specialist biographies, specialty descriptions, section copy, contact data, CTAs. This content changes infrequently and is managed by the clinic owner or a developer.

Options considered:
1. TypeScript content files (chosen)
2. Headless CMS (Contentful, Sanity, Strapi)
3. MDX / Markdown files
4. JSON configuration files

---

## Why Typed TypeScript Files

**Zero runtime dependencies.** No CMS API key, no network request at build time or runtime, no third-party service outage.

**Type safety.** TypeScript interfaces ensure all content fields are present and correctly typed. Missing fields surface as compile errors, not silent undefined rendering.

**Agent-safe.** Cloud Agents can add placeholder entries to typed arrays without risking data format corruption. The TypeScript compiler enforces the schema.

**Sufficient for the MVP.** A 6-section landing page with 4 specialists and ~8 specialties does not require a CMS. The overhead of introducing one would exceed the benefit.

**Immediate replacement.** When approved copy arrives, a developer replaces the `[PLACEHOLDER]` strings in the content files. No CMS configuration, no content migration, no API change.

---

## What is Simpler That We Are Not Choosing

JSON files — simpler syntax but no type checking. TypeScript interfaces catch errors earlier.

---

## Content File Locations

```
config/site.ts         — Brand, contact, social links, canonical URL
content/specialists.ts — Typed specialist data (names, photos, bios)
content/specialties.ts — Typed specialty list
content/copy.ts        — Section headings, body copy, CTA labels
```

See [CONTENT_MAP.md](../CONTENT_MAP.md) for schemas and placeholder conventions.

---

## Data Flow

Server Components import directly from content files. Client Components never import from content files — they receive typed props passed from their Server Component parents.

```
content/*.ts (typed data)
     ↓
Server Component (reads, passes as props)
     ↓
Client Component (receives as serializable props)
```

---

## Consequences

- **Easier:** Zero runtime dependencies, type-safe, fast builds, no CMS onboarding
- **Harder:** Content editors need code access (or a developer to update); no visual editing UI
- **Accepted trade-off:** The clinic does not require non-developer content editing for the MVP. Revisit when editorial velocity demands it.

---

## Revisit Condition

If the clinic requires non-developer content editing (e.g., updating specialist bios independently). At that point, introduce a headless CMS via a new ADR and migrate content from TypeScript files.

---

## What Agents Must Do

- All content goes in `config/site.ts` or `content/*.ts`
- Use placeholder tokens `[CONTENT_NAME — PLACEHOLDER]` as defined in `CONTENT_MAP.md`
- Server Components import content; Client Components receive props
- Do not install Contentful, Sanity, Payload, or any headless CMS
- Do not fabricate content — use the approved placeholder conventions
