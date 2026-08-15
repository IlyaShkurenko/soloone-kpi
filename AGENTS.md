# SoloOne KPI dashboard

This Nuxt application owns the public SoloOne KPI dashboard backed by the main backend's KPI endpoints.

## Context and scope

- Discover installed harness modules in `.harness/manifest.yaml`.
- `docs/` is current project knowledge; `records/` is historical and not default context.
- For non-trivial work, start with `mq docs/ .tree` and retrieve only relevant sections.
- Current code, tests, and configuration override stale documentation.
- Update documentation only when durable metric semantics, API contracts, architecture, or important dashboard behavior changes.
- Backend metric calculation belongs to `soloone-backend`; coordinate contract changes there.

## Specification workflow

- Small/local changes require code and appropriate validation only.
- Non-trivial metric or dashboard behavior requires stable contract requirements and a feature specification.
- Architectural or cross-project changes require an RFC when the decision must be preserved.
- Executable coverage should reference the contract IDs it verifies.
- Detailed rules live in `docs/spec-process.md`.

## Validation

- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` for normal application changes.
