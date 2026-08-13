# Agent Contract — Class Odontologia MVP

**Authority: HIGHEST** (for agent behavior; technical decisions defer to Accepted ADRs and ARCHITECTURE.md)

This document governs all Cursor Cloud Agents working on this project. Read this before beginning any issue.

---

## Core Rules

### 1. Follow Accepted ADRs

If an architectural decision is marked `ACCEPTED` in `docs/DECISIONS/`, implement it. Do not substitute a different approach based on personal preference or training data bias.

If you believe an Accepted ADR is wrong, draft a new ADR proposal and pause implementation of the conflicting part. Wait for the Project Owner / Human Architecture Reviewer to review before proceeding.

### 2. Do Not Replace Architecture Silently

You may not silently replace a documented architectural decision (e.g., swap CSS sticky for GSAP pin, switch from H.264 to HEVC, introduce Framer Motion) without a Proposed ADR that has received human approval.

### 3. Stay Within Issue Scope

Do not refactor, rename, or reorganize code outside your assigned issue. Even if you believe an improvement is beneficial, scope creep creates merge conflicts and unexpected side effects in parallel workstreams.

### 4. No Dependency Additions Without Justification

You may not add npm packages without explicit justification stated in the issue or PR description. Every new package must state: what problem it solves, why existing tools cannot solve it, and its approximate gzip size impact.

### 5. No Fabricated Content

Never invent clinic facts. Specialist names, credentials, addresses, phone numbers, and clinical claims must come from the approved content files in `content/` and `config/`. If real content is not available, render the placeholder token exactly as defined in `CONTENT_MAP.md`.

### 6. No Runtime 3D

Three.js, React Three Fiber, Spline, WebGL shaders — none of these may be introduced in the MVP. See [ADR-001](DECISIONS/ADR-001-pre-rendered-video-over-runtime-3d.md).

### 7. No Backend, Database, CMS, or Runtime AI

This application is a static landing page. No API routes (except Next.js metadata routes). No Supabase. No Redis. No runtime AI calls.

### 8. Do Not Regenerate Cinematic Assets

Do not re-encode or replace `tooth-cinematic-v1.mp4` or `golden-identity-v1.mp4` unless you are assigned to the Asset Pipeline workstream. Existing encoded assets are treated as immutable inputs.

### 9. Respect Reduced Motion

Every animated component must check `prefers-reduced-motion` and provide a composed static experience. Do not remove accessibility behavior for visual reasons.

### 10. Respect Performance Budgets

Do not introduce animation effects, heavy media, or large libraries without verifying impact against the budgets in [PERFORMANCE.md](PERFORMANCE.md). Hard gates are non-negotiable.

### 11. Report Conflicts, Do Not Resolve Unilaterally

If you encounter a contradiction between two documentation sources, stop, document the conflict in a PR comment, and wait for resolution. Do not choose your preferred interpretation silently.

### 12. Architecture-Changing Work Requires Approval

The cycle for any architecture change is:
```
Agent proposes ADR (draft status)
    ↓
Project Owner / Human Architecture Reviewer approves
    ↓
ADR moves to ACCEPTED
    ↓
Implementation proceeds
```

---

## File Ownership (Single-Writer Model)

Each file has one primary writer. Other agents may read. Changes to out-of-scope files require an integration request.

| File / Directory | Primary Writer | Others |
|---|---|---|
| `package.json`, `pnpm-lock.yaml` | Foundation Agent | Request additions via integration issue |
| `app/layout.tsx` | Foundation Agent | SEO Agent: submits metadata as import from `config/site.ts` |
| `app/globals.css` | Foundation Agent | — |
| `next.config.ts`, `tsconfig.json` | Foundation Agent | — |
| `styles/tokens.css` | Design System Agent | Others read; changes via PR request |
| `components/ui/` | Design System Agent | Sections Agent: consumes only |
| `components/cinematic/` | Hero Cinematic Agent | — |
| `components/sections/` | Sections Agent | — |
| `content/` | Content Agent | All read; schema changes require Content Agent |
| `config/site.ts` | Content Agent | — |
| `lib/motion.ts`, `lib/video.ts` | Foundation Agent | Others request additions |
| `public/assets/cinematic/` | Asset Pipeline Agent | Others reference by path only |
| `public/` (non-cinematic) | Foundation Agent | Add via PR |
| `app/page.tsx` | Integration Agent (Wave 3) | — |
| `app/sitemap.ts`, `app/robots.ts` | Foundation / SEO Agent | — |
| `e2e/` | QA Agent | — |
| `docs/DECISIONS/` | Project Owner / Human only (accepts); Agents: draft proposals only | — |
| `docs/` (non-ADR) | Architecture layer | Agents: propose updates via PR |

## Integration Request Process

When an agent needs a change to a file it does not own:

1. Open a brief integration issue or comment in the current PR describing: which file, what change, and why
2. The file owner or Foundation Agent makes the change
3. The requesting agent proceeds once the change is merged

Do not directly edit files outside your ownership boundary.

---

## Git Rules

- Branch naming: `wave-{N}/{workstream}-{feature}` (e.g., `wave-1/design-system-tokens`)
- Commit format: `feat(scope): brief description` (Conventional Commits)
- No `Co-authored-by: Cursor` or `Co-authored-by: cursoragent@cursor.com` trailers
- PRs target `develop` branch, not `main`
- No force-push to shared branches
- Delete source branch after PR merge (`deleteSourceBranch: true`)

---

## ADR Authority

| Role | Permission |
|---|---|
| Cloud Agent | May draft ADR proposals (`Status: Proposed`) |
| Cloud Agent | May NOT change an ADR to `Accepted` |
| Cloud Agent | Must follow `Accepted` ADRs without modification |
| Project Owner / Human Architecture Reviewer | Only entity that may approve/accept ADRs |

---

## Issue Definition of Done Template

Every issue must include a DoD checklist. Adapt from this template:

```markdown
## Definition of Done

### Implementation
- [ ] Feature implemented per architecture spec
- [ ] No deviations from Accepted ADRs without documented justification
- [ ] TypeScript: `pnpm typecheck` passes
- [ ] Lint: `pnpm lint` passes
- [ ] Build: `pnpm build` succeeds without errors

### Scope
- [ ] No files modified outside declared ownership boundary
- [ ] No new npm packages added without PR justification
- [ ] No content fabricated (placeholders used where real content is pending)
- [ ] No opportunistic refactoring of unrelated code

### Quality
- [ ] Component renders correctly at 375px and 1280px viewport widths
- [ ] No browser console errors
- [ ] Reduced motion: animated behavior absent under `prefers-reduced-motion: reduce`

### If this issue involves cinematic components:
- [ ] Tested in Playwright WebKit (automated)
- [ ] Manual validation note added for Safari macOS
- [ ] Manual validation note added for iOS Safari
- [ ] Poster visible before video loads (tested with Slow 4G throttle)
- [ ] Graceful fallback confirmed (video blocked → poster persists)

### Accessibility
- [ ] Interactive elements keyboard accessible
- [ ] Images have descriptive alt text or `aria-hidden="true"`
- [ ] No axe-core critical violations introduced
- [ ] Focus ring visible on all interactive elements

### PR
- [ ] PR targets `develop` branch
- [ ] PR description explains what changed and references the Issue ID
- [ ] No `Co-authored-by: Cursor` in commits
```
