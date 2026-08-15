# Specification process

## Scope

Small visual fixes and local refactors need code and appropriate validation only. New metrics or changes to metric semantics, filters, aggregation, empty states, or backend response contracts require stable contract requirements and a feature specification.

## Workflow and locations

- Use an RFC for architectural or cross-project metric-pipeline decisions whose rationale must persist. Create `records/rfcs/` only when needed.
- Put feature specifications in `docs/features/` when the first contract is needed.
- Use stable IDs such as `KPI-1.1`, `KPI-2.3`, or a narrower domain ID when useful.
- Put executable specifications in root `tests/` when a suitable runner is established, or colocate narrow unit coverage where the adopted framework supports it.
- Reference verified requirements with a marker such as `// Contract: KPI-2.3`.

BDD/Gherkin is not the default. If no executable test harness covers the metric, document the gap and validate through lint, typecheck, build, and focused backend/dashboard checks without describing those checks as executable contract coverage.

## Completion

Before significant metric work is complete, compare requirement semantics, backend calculation, API response, client types, rendering, and executable coverage. Confirm that filters, date boundaries, denominators, and empty states have not drifted.
