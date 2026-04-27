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

## Backend implementation playbook (for Copilot)

Use this exact order when implementing backend logic. Do not skip steps.

1. Validate runtime setup before writing logic.

- Install deps with `pnpm --dir server install`.
- Ensure `.env` has all keys required by `src/config/env.js`.
- Run `pnpm --dir server prisma` to generate the Prisma client.
- Run `pnpm --dir server prisma:migrate` to align schema and database.

2. Fix and centralize Prisma client wiring.

- Implement `src/config/prisma.js` with a single exported Prisma client instance.
- Use Prisma v7-compatible setup with `@prisma/adapter-pg` and `DATABASE_URL`.
- Never import from `src/generated/prisma/*` in feature modules directly; import the client from `src/config/prisma.js`.
- Add safe shutdown handling where needed (`$disconnect` on process termination).

3. Define shared backend structure and naming conventions.

- For each module in `src/modules/*`, use this file layout:
  - `<module>.routes.js`
  - `<module>.controller.js`
  - `<module>.service.js`
  - `<module>.repository.js`
  - `<module>.schema.js` (Zod request validation)
- Keep controllers thin (HTTP only), services for business logic, repositories for DB access.
- Throw `AppError` for expected errors; rely on `errorHandler` for response shaping.

4. Enable API routing progressively.

- Implement `src/routes/api.js` as a versioned router (for example `/api/v1`).
- Mount module routers from `auth`, `categories`, `expenses`, and `budgets`.
- Re-enable API mounting in `app.js` only after routers compile and basic tests pass.

5. Add request validation and consistent response contracts.

- Validate request `params`, `query`, and `body` using Zod schemas per module.
- Return success responses with a stable shape:
  - `{ ok: true, data, requestId }`
- Keep error responses aligned with `src/middleware/errors.js`:
  - `{ ok: false, error: { code, message }, requestId }`

6. Implement authentication module first (`src/modules/auth`) using Firebase Auth.

- Use Firebase ID tokens as the source of identity; do not build a parallel password auth flow.
- Initialize Firebase Admin once in `src/shared/firebaseAdmin.js` using:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY` (convert `\\n` back to real newlines before initializing).
- Add auth middleware in `src/middleware` that:
  - reads `Authorization: Bearer <token>`
  - verifies the token with Firebase Admin
  - sets `req.user = { uid, email }`
  - throws `AppError(401, ...)` for missing/invalid tokens.
- Add auth routes (under `/api/v1/auth`) at minimum:
  - `POST /session`: verify token, upsert local `User` record by email, return `{ ok: true, data: { user }, requestId }`.
  - `GET /me`: return authenticated user profile from local DB.
  - `POST /logout`: stateless success response (or revoke refresh tokens if you opt in).
- Keep local `User` as the app profile source of truth; treat Firebase as identity provider only.
- Store provider linkage in `OAuthAccount` with `provider = 'firebase'` and `providerAccountId = uid`.
- Scope all protected module queries by authenticated local `user.id`, never by raw email in route handlers.
- Keep auth module split by responsibility:
  - controller: HTTP parsing/response
  - service: auth workflow
  - repository: `User`/`OAuthAccount` persistence.

Auth module acceptance checks:

- Valid Firebase token can create/load a local user via `POST /session`.
- Invalid or missing token returns `401` with standard error shape.
- `GET /me` returns the same local user linked to token uid/email.
- `x-request-id` is present on all auth success/error responses.

7. Implement categories module (`src/modules/categories`).

- Add endpoints: list, create, update, delete.
- Enforce per-user uniqueness on category name and map DB conflicts to `409` errors.
- Prevent deleting categories still used by active budgets unless explicitly reassigned.

8. Implement expenses module (`src/modules/expenses`).

- Add endpoints: list (with date/category filters), create, update, delete.
- Validate amount precision and convert decimal values safely at API boundaries.
- Ensure every expense operation is scoped to authenticated user ownership.
- Add pagination defaults and sort by `spentAt` descending.

9. Implement budgets module (`src/modules/budgets`).

- Add endpoints: list by month/year, upsert budget, delete budget.
- Enforce unique `(userId, categoryId, month, year)` behavior from schema.
- Add server-side checks for valid month range and non-negative limits.

10. Add reporting/query endpoints needed by dashboard/report screens.

- Add aggregate endpoints for:
  - spending by category
  - monthly spend trend
  - budget vs actual per category
- Prefer Prisma aggregation/grouping queries in services; keep controllers serialization-only.

11. Add tests while building each module.

- Use Vitest + Supertest for route-level tests.
- Minimum coverage per module: happy path, validation failure, unauthorized, not found, and conflict cases.
- Run tests with `pnpm --dir server test` after each module completion.

12. Final integration and hardening pass.

- Verify `helmet`, `cors`, cookies, JSON parser, and request logging are still active.
- Ensure `x-request-id` is present in success and error responses.
- Confirm all new routes are mounted under `/api` and documented in code comments near router definitions.
- Run full checks: `pnpm --dir server test`, then start server with `pnpm --dir server dev` and verify `/health` and at least one endpoint from each module.

Implementation guardrails:

- Do not hand-edit files in `src/generated/prisma/`.
- Keep ESM import style and existing Prettier conventions (`singleQuote`, no semicolons).
- Keep module boundaries strict: no direct DB calls from controllers.
- Prefer small, incremental commits per module (`auth`, `categories`, `expenses`, `budgets`).

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
