---
description: Design patterns used in FTel-Games architecture
trigger: always_on
---

# Design Patterns (FTel-Games)

Follow these patterns when adding features. Do **not** invent parallel layers.

## Architecture overview

```text
Route (app) → View → Component
                ↓
              Hook (useX)
                ↓
            Service (*Api)
                ↓
         Client (Axios) → API
```

Client UI state (Zustand) sits beside this flow — **not** inside services.

---

## Patterns in use

### 1. Layered architecture (SoC)

| Layer | Path | Responsibility |
|-------|------|----------------|
| Route | `src/app/**/page.tsx` | URL, `metadata`, mount view only |
| View | `src/views/PageName/` | Page composition / layout |
| Component | `src/components/common/`, `ui/` | Reusable UI |
| Hook | `src/hooks/**` | Data/async UI binding (TanStack) |
| Service | `src/services/**` | Pure HTTP API functions |
| Lib | `src/lib/**` | Clients, SEO, security, utils |
| Store | `src/stores/**` | Client state (Zustand) |

Never skip layers (e.g. Axios inside a view/component).

### 2. Thin route / Presentational page (Container–Presentational)

- `page.tsx` = thin container (metadata + `<View />`)
- `views/*` = presentational page UI
- Shared chrome in `components/common/`

### 3. Repository / API Service

- One OpenAPI tag group → one `*Api.ts`
- Functions: `fetchX`, `createX`, `updateX`, `deleteX`
- Types colocated in `services/<domain>/types.ts`

### 4. Custom Hook

- Wrap `useQuery` / `useMutation` in `useX` / `useXMutation`
- Components call hooks only — never `*Api` directly

### 5. Factory

| Factory | Role |
|---------|------|
| `queryKeys.*` | Stable TanStack cache keys |
| `createApiClient` | Axios instance + interceptors |
| `createMetadata` | Next.js SEO metadata |

### 6. Singleton / shared clients

- `gameClient`, `identityClient`, `queryClient` — one shared instance each
- Session via `setApiSession` (not duplicated per call site)

### 7. Provider (DI at React boundary)

- `QueryProvider` wraps the app with `QueryClientProvider`
- Add new cross-cutting providers under `src/providers/`

### 8. Middleware / Interceptor

| Kind | Where |
|------|--------|
| Next middleware | root `middleware.ts` (CSP, HTTPS, nonce) |
| Axios request/response | `createApiClient` interceptors |

### 9. Adapter / Error mapping

- Map HTTP failures → `ApiError` + `getApiErrorMessage`
- Normalize API envelopes in `standardResponse` when needed

### 10. Module / Colocation

```text
Name/
  Name.tsx
  Name.module.sass
  Name.test.tsx
```

Exception: `components/ui/` (shadcn lowercase).

### 11. Composition over inheritance

- Compose `common/*` + `ui/*` + views
- Prefer props/slots over deep class hierarchies

### 12. Observer (client store)

- Zustand selectors: `useUser((s) => s.user)`
- Ephemeral UI (`sidebar`) vs persisted profile (`user`) — no tokens in store

### 13. Facade (security embeds)

- `SecureIframe` hides allowlist/origin checks behind a small API
- `postMessage` helpers verify origin before handling

### 14. Lazy load / Code splitting

- Heavy client widgets: `next/dynamic` + `Skeleton`
- Example: `BannerSlider` on HomePage

---

## ❌ Anti-patterns

- Business UI inside `app/**/page.tsx`
- `fetch` / `axios` inside components
- String-literal query keys in hooks
- Tokens in Zustand / localStorage UI stores
- Relative imports `../../../` (use `@/`)
- New global state for server data that belongs in TanStack Query
