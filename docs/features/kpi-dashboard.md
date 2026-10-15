# Dashboard filters and activity metrics

The backend owns metric definitions in `soloone-backend/docs/features/kpi-dashboard.md` (KPI-1.1–KPI-3.1).

The dashboard shares one date/user filter snapshot across requests, invalidates old requests immediately on any filter change, and clears data when no users are selected (KPI-1.3). User labels distinguish accounts with identical names. Deselect all and Select all affect the full list, independently of search.

Activity overview shows totals for the full selected date range, weekly trends within the selected range, currency-separated GMV and revenue per active creator, channel chats/messages, and recorded automation outcomes (KPI-2.1–2.3). Previous-period comparisons and deltas are not displayed. The displayed headline dates match the selected range; All Time starts at the earliest eligible signup. Active users and chats are distinct across the full range. Legacy AI messages without decision events are explicitly unclassified.

Duration cards retain signup-cohort filtering and explicitly distinguish their cohort count from the selected account count (KPI-1.2). Existing AI review, reply and escalation metrics retain their denominators.

Number statistics are a manually supplied snapshot for 9–15 October 2026, separate from the API metrics. The section states its reporting cutoff and that date/user filters do not apply. Unknown block counts/rates display as unavailable; ready and active numbers remain combined. Warm-up assignment is separate from connection state (AUTH, LAUNCH, health unavailable). Additional batch updates are distinguished from the original daily breakdown.

Use the teal palette, rounded cards and green headline panels with solid light/dark backgrounds and readable axes (KPI-3.1). Validate filter races, empty selection, reselecting users and mobile/desktop rendering, plus lint, typecheck and build.
