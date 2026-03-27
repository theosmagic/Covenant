# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 13 + TypeScript app rooted at `src/`. Route entry points live in `src/pages/` (`_app.tsx`, `_document.tsx`, `index.tsx`). Reusable UI lives in `src/components/ui/`, while Magic authentication flows are isolated in `src/components/magic/`. Shared logic belongs in `src/hooks/` and `src/utils/`. Global styles are in `src/styles/globals.css`, and static assets such as logos and background images are in `public/`.

## Build, Test, and Development Commands
Run commands from the repository root:

- `npm install`: install dependencies.
- `npm run dev`: start the local dev server on `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run Next.js ESLint with autofix enabled.

There is no dedicated test script in `package.json` yet, so linting and manual browser checks are the current validation path.

## Coding Style & Naming Conventions
The project uses ESLint via `next/core-web-vitals` with 2-space indentation and single quotes, as defined in `.eslintrc.json`. Follow the existing TypeScript React style: PascalCase for components (`MagicProvider.tsx`), camelCase for utilities (`showToast.ts`), and colocate related UI under the appropriate feature directory. Prefer the `@/` import alias over long relative paths.

## Testing Guidelines
Automated test tooling is not configured in this checkout. When adding tests, place them next to the feature or under a local `__tests__/` directory, and use `*.test.ts` or `*.test.tsx` naming. Until a framework is added, validate changes with `npm run lint`, then exercise the affected login, dashboard, and wallet flows manually.

## Commit & Pull Request Guidelines
Git history is not available in this exported workspace, so no repository-specific commit convention can be inferred. Use short, imperative commit subjects such as `Add wallet disconnect error handling`. Pull requests should include a concise summary, any environment or network assumptions, linked issue references when applicable, and screenshots for UI changes.

## Security & Configuration Tips
Keep environment values in local env files and avoid committing secrets. This app expects `NEXT_PUBLIC_MAGIC_API_KEY` and `NEXT_PUBLIC_BLOCKCHAIN_NETWORK`; confirm they are set before testing authentication flows.
