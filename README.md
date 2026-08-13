# Class Odontologia — AI-First MVP

Premium institutional landing page for Class Odontologia (Foz do Iguaçu, BR).

## Status

> **Phase: Documentation & Execution Planning**
> Application code has not been initialized. See [docs/MILESTONES.md](docs/MILESTONES.md).

## Documentation Index

| Document | Purpose |
|---|---|
| [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) | Product context, brand, audience |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture — high authority |
| [docs/TECH_STACK.md](docs/TECH_STACK.md) | Framework versions and tooling decisions |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Tokens, typography, motion hierarchy |
| [docs/CINEMATIC_ARCHITECTURE.md](docs/CINEMATIC_ARCHITECTURE.md) | Hero video system — critical detail |
| [docs/ASSET_CONTRACT.md](docs/ASSET_CONTRACT.md) | Media naming, encoding, delivery contracts |
| [docs/CONTENT_MAP.md](docs/CONTENT_MAP.md) | Content schema and placeholder inventory |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md) | Web Vitals targets and budgets |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | A11y requirements |
| [docs/SEO.md](docs/SEO.md) | Metadata, structured data, sitemap |
| [docs/QA_STRATEGY.md](docs/QA_STRATEGY.md) | QA approach and Playwright scope |
| [docs/SPIKES.md](docs/SPIKES.md) | Technical spike specifications |
| [docs/AGENT_CONTRACT.md](docs/AGENT_CONTRACT.md) | Cloud Agent rules and file ownership |
| [docs/MILESTONES.md](docs/MILESTONES.md) | Milestone plan |
| [docs/IMPLEMENTATION_WAVES.md](docs/IMPLEMENTATION_WAVES.md) | Wave dependency graph |
| [docs/IMPLEMENTATION_ISSUES.md](docs/IMPLEMENTATION_ISSUES.md) | Concrete issue backlog |
| [docs/DECISIONS/](docs/DECISIONS/) | Architectural Decision Records |

## Document Authority

```
Accepted ADR
    ↓
ARCHITECTURE.md
    ↓
System-specific docs
    ↓
AGENT_CONTRACT.md
    ↓
Milestone / Wave spec
    ↓
Issue spec
    ↓
Implementation detail
```

When documents conflict: the higher-authority document wins.
An agent must **report** a contradiction rather than resolve it unilaterally.

## ADR Summary

| ADR | Title | Status |
|---|---|---|
| [ADR-001](docs/DECISIONS/ADR-001-pre-rendered-video-over-runtime-3d.md) | Pre-rendered video over runtime 3D | **ACCEPTED** |
| [ADR-002](docs/DECISIONS/ADR-002-gsap-scrolltrigger.md) | GSAP + ScrollTrigger | **ACCEPTED** |
| [ADR-003](docs/DECISIONS/ADR-003-scroll-video-architecture.md) | Scroll video architecture | PROPOSED |
| [ADR-004](docs/DECISIONS/ADR-004-local-typed-content-no-cms.md) | Local typed content / no CMS | **ACCEPTED** |
| [ADR-005](docs/DECISIONS/ADR-005-video-delivery-codec.md) | Video delivery codec | **ACCEPTED** |
| [ADR-006](docs/DECISIONS/ADR-006-mobile-cinematic.md) | Mobile cinematic strategy | EXPERIMENT REQUIRED |
| [ADR-007](docs/DECISIONS/ADR-007-server-client-boundaries.md) | Server/Client boundaries | **ACCEPTED** |

## Quick Start (after Wave 0 initialization)

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

> These commands do not work yet. The Next.js application has not been initialized.
> See ISSUE-001 in [docs/IMPLEMENTATION_ISSUES.md](docs/IMPLEMENTATION_ISSUES.md).
