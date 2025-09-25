# Repository Guidelines

## Project Structure & Module Organization
- App router (Next.js): `app/` (route segments, `layout.tsx`, `page.tsx`, global styles in `app/globals.css`).
- Reusable UI: `components/` (use `PascalCase` for component files, e.g., `Navbar.tsx`; colocate styles when needed).
- Utilities: `lib/` (pure, framework-agnostic helpers; import via path alias `@/*`).
- Static assets: `public/` (served from `/`).
- Config: `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm run dev` — start Next.js dev server with Turbopack.
- `npm run build` — production build.
- `npm start` — run the built app.
- `npm run lint` — run ESLint (Next + TS rules).
Notes: Use `npm` (Project includes `package-lock.json`). If you prefer Bun, ensure parity with `bun install && bun run dev`.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Indentation: 2 spaces; max line length 100–120 where practical.
- Components: `PascalCase` in `components/` and `app/**/components/`. Hooks: `useSomething`.
- Route segment folders: kebab-case (e.g., `app/body-composition/page.tsx`).
- Imports: prefer `@/` alias (see `tsconfig.json`). Group: node → packages → `@/lib` → relative.
- Styling: Tailwind CSS v4. Keep class lists readable; extract variants with `class-variance-authority` when shared.
- Linting: ESLint flat config extends `next/core-web-vitals` and `next/typescript`. Fix lint before PRs.

## Testing Guidelines
- No formal test setup yet. If adding tests:
  - Unit: Vitest + React Testing Library (`*.test.ts[x]`) colocated with source or in `__tests__/`.
  - E2E: Playwright under `e2e/` with `*.spec.ts`.
- Aim for critical-path coverage; test UI logic and accessibility (roles, labels) over implementation details.

## Commit & Pull Request Guidelines
- Commits: Prefer Conventional Commits (e.g., `feat: add recovery chart` / `fix: debounce nav resize`). Keep changes scoped and atomic.
- PRs must include: concise description, screenshots for UI changes, reproduction or steps for bugs, and linked issues.
- Pass CI (lint/build) before requesting review. Avoid unrelated refactors.

## Security & Configuration Tips
- Secrets: never commit `.env*`. Use `.env.local` for dev. Client-exposed vars must be prefixed `NEXT_PUBLIC_`.
- Data validation: validate external inputs in server components/routes; keep client-only secrets out of the bundle.
- Accessibility: follow WAI-ARIA; use semantic HTML; verify keyboard navigation on new UI.

