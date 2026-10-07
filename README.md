# Student Placement Dashboard (Milestone Project 3)

React dashboard to monitor placement opportunities, track applications, view statistics and receive alerts.

## Quick view (no install)
Double-click **OPEN-ME-FIRST.html**. Register a new account, then explore.
(Do not open `index.html` directly: that file is the Vite source and shows a blank page.)

## Full setup (source code)
    npm install
    npm run dev

Data is served by a simulated async API (`src/data/mockApi.js`, stored in localStorage) so the app runs
without a backend. Swap each function for a `fetch()` call to connect a real API later.

## Features
| Requirement | Where |
|---|---|
| Login / Registration / Profile | pages/Login, Register, Profile, context/AuthContext |
| View jobs, search & filter, apply | pages/Jobs (CGPA eligibility check) |
| Applied jobs, interview schedule, status | pages/Applications |
| Application stats, trends, deadlines | pages/Dashboard + components/BarChart |
| Interview alerts, company updates, announcements | pages/Notifications |

## Technical requirements
Components, React Router (protected routes), Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, custom `useForm`),
Context API (`AuthContext`, `PlacementContext`), API integration (async + loading/error states),
form validation (`hooks/useForm.js`), responsive CSS.

## Deployment
Push to GitHub, import into Vercel/Netlify (build: `npm run build`, output: `dist`).
For SPA routing add a rewrite of all paths to `/index.html`.

## Deliverables checklist
- [ ] Source code repository (GitHub)
- [ ] Project documentation (use this README + architecture diagram)
- [ ] UI design screens (Figma or screenshots of Login, Dashboard, Jobs, Applications, Alerts)
- [ ] Live deployment link
- [ ] Project demonstration (screen recording)
