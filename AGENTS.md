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

## Quality and security gate

These rules apply to every change, by a person or an agent. `.claude/README.md` describes the agents and the guard
that enforce them.

- **Done means the gate is green.** `pnpm run gate` runs the type check, the linter and the secret scan. There are
  no tests yet: the change that adds the first test also adds a `test` script (node's test runner, as in the other
  SoloOne apps) and puts it in the gate. Run the whole gate, not just the file you touched: a fix in one place must not
  break another. CI (`.github/workflows/ci.yml`) runs the same gate on every push and pull request.
- **Test first.** A feature or a bug fix starts with a test of the behavior that fails on the current code
  (`pnpm run fails-first -- <files>`), then the code that makes it pass. A bug fix always comes with the test that
  reproduces the bug.
- **Who writes what.** For anything beyond a one-line fix, the `test-writer` agent writes the tests and the `builder`
  agent writes the code; the builder doesn't change the tests. The `verifier` checks the result. Changes to sign-in,
  payments, wallets, deposits, personal data, webhooks or secrets also get the `security-reviewer`, and their tests
  get 2 to 4 `critic` runs.
- **Secrets.** Never open, print or commit `.env` files or keys. Configuration is read by variable name; the names are
  in SECURITY.md. A secret that reached git is rotated, not just deleted.
- **Test data is fictional.** Emails at example.com or example.test, phones 447700900000 to 447700900999, invented
  names. No real customer, creator or phone number in code, tests, fixtures or docs.
- **Logs** carry IDs and outcomes, never tokens, message text, phone numbers or emails.
