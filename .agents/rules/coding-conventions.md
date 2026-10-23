---
description: FTel-Games coding conventions (naming, structure, imports)
trigger: always_on
---

# FTel-Games Coding Conventions

Project: **FTel-Games** — Next.js + TypeScript + Tailwind + Sass.

## Naming

| Kind      | Convention                 | Example                        |
| --------- | -------------------------- | ------------------------------ |
| Component | PascalCase                 | `McInfo`                       |
| Folder    | PascalCase                 | `components/common/McInfo/`    |
| Variable  | camelCase                  | `userName`                     |
| Function  | camelCase                  | `getUserData`                  |
| Hook      | camelCase + `use` prefix   | `useUser()`                    |
| Constant  | UPPER_SNAKE_CASE           | `MAX_SIZE`                     |
| Enum      | PascalCase                 | `UserRole`                     |
| Interface | PascalCase (no `I` prefix) | `interface User`               |
| Type      | PascalCase                 | `type UserData`                |

## Imports

- Always use `@/` alias: `import { McInfo } from '@/components/common/McInfo/McInfo'`
- Never use relative `../../../`

## Component file structure

Each common UI component folder contains **only** this triad:

```
common/Name/
  Name.tsx
  Name.module.sass
  Name.test.tsx   # create only when you touch the folder; not required for untouched simple comps
```

Rules:

- **Types live in the `.tsx`** — export `interface` / `type` from `Name.tsx`. No `types.ts` under `common/`.
- **No `index.ts` barrels** under `common/`. Import deep paths: `@/components/common/Button/Button`.
- **Mock / default DATA** lives in `src/mocks/` (not colocated with components). Components must not import mocks; call sites (views, layouts, `componentPage`, tests) do.
- **Prop defaults:** keep technical defaults (`variant`, `size`, `autoplayDelayMs`, booleans, `className=''`, `page`, etc.). Do **not** default content/copy/data props (`slides`, `items`, `title`, `label`, `emptyMessage`, `navItems`, `columns`, etc.) — make those required and pass them from the call site.

Shared app chrome / reusable widgets live under `src/components/common/`.

Exception: **shadcn/ui** components live in `src/components/ui/` (lowercase) — see `@shadcn.md`.

## Pages / Views

- Routes live in `src/app/**/page.tsx` (thin wrappers)
- Page UI lives in `src/views/PageName/`
- See `@pages-views.md`

## Testing

- Runner: Vitest (Vite)
- Components: React Testing Library
- See `@testing.md`

## Data fetching

- HTTP: Axios (`gameClient` / `identityClient`)
- Cache/async state: TanStack Query
- OpenAPI groups: `@api-services.md`
- See `@tanstack-axios.md`

## Client state (Zustand)

- User profile → `useUser` (`src/stores/userStore.ts`)
- Sidebar open/close → `useSidebar` (`src/stores/sidebarStore.ts`)
- See `@zustand.md`

## Cross-cutting rules

Synced for Cursor (`.cursor/rules/*.mdc`) and Antigravity (`.agents/rules/*.md`):

- Design patterns → `design-patterns` (always on)
- SEO → `seo`
- Security → `security`
- Git / CI → `git-workflow`
- Performance → `performance`
