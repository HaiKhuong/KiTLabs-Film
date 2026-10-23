---
description: Zustand stores — user profile and sidebar UI state
trigger: glob
globs: src/{stores,components,hooks}/**/*.{ts,tsx}
---

# Zustand Rules

## Stores

| Store   | Hook         | Responsibility                                   |
| ------- | ------------ | ------------------------------------------------ |
| User    | `useUser`    | Profile info (`User`), auth flag — **no tokens** |
| Sidebar | `useSidebar` | Menu `isOpen` / `open` / `close` / `toggle`      |

Location: `src/stores/*Store.ts`

## Usage

```ts
import { useUser } from '@/stores/userStore';
import { useSidebar } from '@/stores/sidebarStore';

const user = useUser((s) => s.user);
const toggle = useSidebar((s) => s.toggle);

useUser.getState().setUser({ id, name, email });
useSidebar.getState().close();
```

## Rules

- Client components only (`'use client'`) when reading stores in UI
- **Never** persist access/refresh tokens in Zustand — profile data only
- Clear user via `clearUser()` on logout / 401
- Sidebar is ephemeral UI state (not persisted)
- User store may use `persist` for profile; guard SSR hydration before showing persisted UI

## ❌ Avoid

- Giant single “appStore” for unrelated domains
- Putting server-fetched lists in Zustand when TanStack Query fits better
- Importing stores into Server Components
