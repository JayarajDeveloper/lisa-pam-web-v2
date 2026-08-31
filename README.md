# lisa-pam-web-v2

Admin ops UI — login + dashboard. No API.

```
src/auth/         session stub + login
src/pages/        Overview
src/components/   shell, brand, cards, charts
src/data/         mock fleet
src/types.ts      shared UI types
```

```bash
npm install
npm run dev        # http://localhost:5173
```

Any email + password (4+ characters) signs in locally (`sessionStorage`).
