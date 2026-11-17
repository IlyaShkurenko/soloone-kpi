# Security

## What this app does with data

This is the SoloOne KPI dashboard: one page (`app/pages/index.vue`) that shows product and AI-response metrics per
creator over a date range. It has no database, no server code of its own and no sign-in. The browser fetches JSON
from three groups of the backend's public KPI routes: `/api/kpi/users`, `/api/kpi/metrics/<id>` and
`/api/kpi/numbers` (`app/pages/index.vue:249,305`, `app/components/kpi/NumberStatistics.vue:26`). The user list it
shows labels each creator with their business name or name and their email (built by soloone-backend,
`src/services/kpi.service.ts:293`); the metrics are counts, rates and amounts, and phone numbers appear only as counts.
Nothing is stored: the data lives in the page's memory, and the only browser storage is the colour-mode choice.

## Configuration

| Variable | What it is for |
|---|---|
| `NUXT_PUBLIC_API_BASE` | SoloOne backend URL; public, it ships in the browser bundle |

The app needs no secret.

## Who can call what

The app adds no access control: no sign-in, no route middleware, no server routes, and its requests carry no
credential. Whoever can open the dashboard sees everything it shows. The backend serves the KPI routes without an
auth check ("KPI routes are public for internal dashboard display", soloone-backend `src/routes/index.ts:43-44`,
`src/routes/kpi.routes.ts`) and with CORS open to every origin (`src/app.ts:14`).

## Logging

The app has no `console` calls. Fetch errors are shown on the page as text.

## Secret scanning

`pnpm run gate` ends with `pnpm run secret-scan`: gitleaks scans the whole git history and the staged and unstaged
changes, with values redacted (`scripts/secret-scan.mjs`). Known false positives go in `.gitleaks.toml`, each with a
reason; there are none today. CI (`.github/workflows/ci.yml`) runs the gate on every push and pull request.

## Known gaps

- **Creator names and emails without sign-in.** `/api/kpi/users` returns every listed creator's name, business name
  and email to anyone who calls it, with no auth check and CORS open (soloone-backend `src/routes/kpi.routes.ts:7`,
  `src/services/kpi.service.ts:293`, `src/app.ts:14`), and this dashboard shows them to anyone who can open it
  (`app/pages/index.vue:578-581`). Whether the hosting restricts who can open the dashboard is not in this repository.

## Reporting a problem

Report a security problem to the owner of this repository directly, not in a public issue.
