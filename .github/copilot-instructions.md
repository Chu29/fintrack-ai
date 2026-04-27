# Copilot instructions for `fintrack-ai`

## Build, lint, and test commands

Run from repository root (`/home/iamchu/dev/projects/fintrack-ai`):

### Client (`client/`)
- Install deps: `pnpm --dir client install`
- Dev server: `pnpm --dir client dev`
- Lint: `pnpm --dir client lint`
- Build: `pnpm --dir client build`
- Preview production build: `pnpm --dir client preview`

### Server (`server/`)
- Install deps: `pnpm --dir server install`
- Dev server: `pnpm --dir server dev`
- Start server: `pnpm --dir server start`
- Run tests (Vitest): `pnpm --dir server test`
- Run a single test file: `pnpm --dir server test -- src/path/to/file.test.js`
- Prisma generate: `pnpm --dir server prisma`
- Prisma migration (dev): `pnpm --dir server prisma:migrate`
- Prisma Studio: `pnpm --dir server prisma:studio`

## High-level architecture

This repository is split into two standalone Node projects (`client/` and `server/`) with separate `package.json` and lockfiles (no workspace orchestration at repo root).

### Frontend (`client/`)
- React + Vite app with route registration in `src/main.jsx`.
- Route pages are top-level entries (`/`, `/dashboard`, `/add-expense`, `/categories`, `/reports`) that compose feature UIs from `pages/<Feature>/_components/`.
- Shared dashboard shell lives in `src/pages/_components/AppShell.jsx` and is used by dashboard-style pages; navigation state is driven by `getNavigationItems(activeId)` from `appShellData.js`.
- Most page content is currently driven by co-located data modules (`dashboardData.js`, `addExpenseData.js`, `categoriesData.js`, `reportsData.js`), not API calls yet.
- Styling combines Tailwind v4 theme tokens in `src/index.css` with centralized class maps in `appStyles.js` and `authStyles.js`.

### Backend (`server/`)
- Express app composition is in `app.js`; process startup is in `src/index.js`.
- Middleware stack includes Helmet, CORS (`CLIENT_URL`), JSON parsing, cookies, `pino-http`, request ID injection, and centralized 404/error handlers.
- `/health` is implemented; `/api` routing is scaffolded but currently commented out in `app.js` and `src/routes/api.js` is empty.
- Environment validation is strict and centralized in `src/config/env.js` with Zod.
- Data model is defined in `prisma/schema.prisma`; Prisma client is generated under `src/generated/prisma/`.

## Key codebase conventions

- Formatting and style conventions: root Prettier config enforces `singleQuote: true` and no semicolons.
- Use ESM imports/exports across both packages (`"type": "module"` in each package).
- Frontend feature organization pattern:
  - `pages/<Feature>/<Feature>.jsx` for composition/container
  - `pages/<Feature>/_components/` for presentational parts
  - `pages/<Feature>/*Data.js` for static/mock data used by that feature
- Frontend class composition pattern uses `cx(...values)` and `appStyles`/`authStyles` tokens instead of ad-hoc repeated class strings.
- Sidebar active-state behavior should use `getNavigationItems(activeId)` rather than hardcoding `active` flags in page components.
- API error responses follow a shared JSON shape from `src/middleware/errors.js`:
  - `ok: false`
  - `error: { code, message }`
  - `requestId`
- Request correlation pattern: always preserve `req.requestId` and `x-request-id` behavior from `requestIdMiddleware` when adding middleware/routes.
- Do not hand-edit Prisma generated files under `server/src/generated/prisma/`; update `prisma/schema.prisma` and regenerate.
