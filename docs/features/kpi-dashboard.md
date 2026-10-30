# Dashboard filters and activity metrics

The backend owns metric definitions in `soloone-backend/docs/features/kpi-dashboard.md` (KPI-1.1–KPI-4.2).

The dashboard shares one date/user filter snapshot across requests, invalidates old requests immediately on any filter change, and clears data when no users are selected (KPI-1.3). User labels distinguish accounts with identical names. Deselect all and Select all affect the full list, independently of search.

The default range is the last seven calendar dates, including today (UTC), with a 7D preset. Only Activity overview is selected initially; the earlier duration, approval, reply and escalation widgets remain available but unchecked. The number section remains visible independently of that selection. Neutral solid backgrounds and cards retain teal accents without the green panel glow.

The top-level Onboarded users card displays the owner-supplied total of 10,
independently of date and user filters. This is a fixed reported total, not the
period's active-user count or an automated database onboarding count.

Activity overview shows totals for the full selected date range, day/week/month trends within the selected range, currency-separated GMV and revenue per active creator, channel chats/messages, and recorded automation outcomes (KPI-2.1–2.3). Active creators have a successful manual send or an approved AI draft sent in the period; incoming traffic and unattended AI sends do not count as creator activity. The selectable user list uses the same dates and definition and reloads on date changes. Selecting all follows the new eligible list; deselecting all stays empty. Previous-period comparisons and deltas are not displayed. The displayed headline dates match the selected range; All Time starts at the earliest eligible signup. Active users and chats are distinct across the full range. Legacy AI messages without decision events are explicitly unclassified. No device exclusion or login telemetry is implemented.

Duration cards retain signup-cohort filtering and explicitly distinguish their cohort count from the selected account count (KPI-1.2). Existing AI review, reply and escalation metrics retain their denominators.

Number statistics use `/api/kpi/numbers`, refreshed once per 24 hours, independently of user selection. Authorization-loss events follow the selected dates (UTC); current pipeline and health states use a daily Whapi API snapshot. The Whapi Partner list defines current channel membership; DB-only stale channels are excluded. Whapi-reported unique phone numbers and channels without a phone are shown separately. Ready/warming assignments come from SoloOne, with unmatched channels shown as unassigned. Failed health checks remain unknown; Partner API failure shows an error instead of fallback DB counts. Unregistered SIM inventory and confirmed WhatsApp bans are unavailable rather than copied from the old manual snapshot. The retained server log supplies deduplicated authorization-loss transitions, excluding provisioning states and explicit disconnects. Missing/truncated history is disclosed; missing logs produce null counts, not zero. No new tables or mobile instrumentation are required (KPI-4.1–4.2).

Use the teal palette, rounded cards and green headline panels with solid light/dark backgrounds and readable axes (KPI-3.1). Validate filter races, empty selection, reselecting users and mobile/desktop rendering, plus lint, typecheck and build.

Bar trends (activity, revenue, chats, automation, approval outcomes and authorization losses) use days for ranges up to 7 days, weeks up to two calendar months, then calendar months. Edge buckets stay within the selected range. Backend aggregates distinct counts and rates per bucket. Authorization-loss bars appear below the number tables and do not follow the user filter.
