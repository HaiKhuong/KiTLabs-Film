---
description: TanStack Query + Axios data-fetching conventions
trigger: glob
globs: src/**/*.{ts,tsx}
---

# TanStack Query + Axios

## Stack roles

| Layer         | Responsibility                      | Location                       |
| ------------- | ----------------------------------- | ------------------------------ |
| Axios         | HTTP client, interceptors, baseURL  | `src/lib/api/clients.ts` + `createApiClient.ts` |
| API functions | Pure async calls (`fetchX`)         | `src/services/*Api.ts`         |
| Query keys    | Stable cache keys                   | colocated in `src/hooks/**` (`*QueryKeys`); identity in `queryKeys.ts` |
| Hooks         | `useQuery` / `useMutation` wrappers | `src/hooks/use*.ts`            |
| Provider      | `QueryClientProvider`               | `src/providers/QueryProvider/` |

## Rules

- Always call APIs through `gameClient`, `identityClient`, or `strapiClient` — never raw `fetch` / `axios` for app APIs
- Never put `axios` calls directly inside components — use a hook
- Query keys must come from a `*QueryKeys` factory (no string literals in hooks)
- Name hooks `useX` / `useXMutation` (e.g. `useGames`, `useCreateGame`)
- Name API functions `fetchX` / `createX` / `updateX` / `deleteX`
- Handle errors with `getApiErrorMessage(error)` / `ApiError` (`401/403/404/429/500`)
- Set `enabled` when a query depends on an id/param
- No hardcoded API keys or secrets — base URL from env only

## ✅ GOOD

```ts
export async function fetchGames() {
  const { data } = await gameClient.get<Game[]>('/games');
  return data;
}

export function useGames() {
  return useQuery({
    queryKey: gamesQueryKeys.lists(),
    queryFn: fetchGames,
  });
}
```

## ❌ BAD

```ts
const { data } = useQuery({
  queryKey: ['games'],
  queryFn: () =>
    axios.get('/games', {
      headers: { Authorization: 'Bearer secret' },
    }),
});
```

## Request headers (interceptor)

Every request via `createApiClient` attaches `Authorization` when a session token exists, plus `Profile-ID` / `profile-id` and `Device-ID` when the session has them. `Language` and `Revision` are sent only when set.

`Platform`, `App-Version`, `User-Agent`, and `X-Real-IP` are not required by the identity or OAuth specs and are not sent.

## Env

- `NEXT_PUBLIC_GAME_API_BASE_URL`
- `NEXT_PUBLIC_IDENTITY_API_BASE_URL`
- `NEXT_PUBLIC_STRAPI_API_BASE_URL`
