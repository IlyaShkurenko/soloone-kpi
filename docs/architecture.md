# KPI dashboard architecture

## Role

This project is a focused Nuxt dashboard for SoloOne product and AI-response metrics. It consumes public KPI endpoints from `soloone-backend`; it does not own metric calculation or persistence.

## Runtime and structure

- `app/pages/index.vue` owns filtering, data loading, and dashboard composition.
- `app/types/kpi.ts` owns client projections of KPI response contracts.
- `app/components/kpi/` owns metric presentation components.
- `nuxt.config.ts` sets the backend API base, defaulting to `http://localhost:9001`.
- The preview script uses port `9003`.

The dashboard supports user/date filters, weekly active creators, GMV and revenue per active creator by currency, active chats and channel splits, automation outcomes, first AI interaction, first transaction, AI-response decisions, automation rate, reply rate, and escalation rate. See [metric and filter contracts](features/kpi-dashboard.md). Duration metrics use signup cohorts; weekly activity and existing AI rates use event dates. Filter changes invalidate older requests before new results can be displayed.

## Contract boundary

The backend's public `/api/kpi` routes own metric definitions and response semantics. A metric change must update backend computation and response types together with dashboard types, fetch logic, selection defaults, labels, and rendering.

Metric names that look similar are not automatically interchangeable; preserve denominator, time-window, user-filter, empty-state, and aggregation semantics in a feature contract when they change.

## Change boundaries

- Calculation or data-source changes belong to `soloone-backend`.
- Dashboard interaction and visualization behavior belong here.
- Durable changes to metric semantics or the backend/dashboard boundary should update this document and an applicable feature specification.
