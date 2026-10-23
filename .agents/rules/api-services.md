---
description: OpenAPI-backed API services grouping (Game + Identity)
trigger: glob
globs: src/{services,hooks,lib/api}/**/*.{ts,tsx}
---

# API Services (OpenAPI)

## Clients

| Client           | Env                                 | Base                      |
| ---------------- | ----------------------------------- | ------------------------- |
| `gameClient`     | `NEXT_PUBLIC_GAME_API_BASE_URL`     | `/game-management/v1`     |
| `identityClient` | `NEXT_PUBLIC_IDENTITY_API_BASE_URL` | `/identity-management/v1` |

Set session via `setApiSession({ profileId, deviceId, accessToken })`.

## Groups → files

### Game Management

| Tag      | Service          | Hook                   |
| -------- | ---------------- | ---------------------- |
| Games    | `gamesApi.ts`    | `useGames.ts`          |
| Orders   | `ordersApi.ts`   | `useOrders.ts`         |
| Payments | `paymentsApi.ts` | `usePaymentMethods.ts` |
| SKUs     | `skusApi.ts`     | `useSkus.ts`           |

### Identity Management

| Tag        | Service            | Hook               |
| ---------- | ------------------ | ------------------ |
| Ping       | `pingApi.ts`       | `usePing.ts`       |
| Profiles   | `profilesApi.ts`   | `useProfile.ts`    |
| Onboarding | `onboardingApi.ts` | `useOnboarding.ts` |

## Rules

- One tag group → one `*Api.ts` + matching hooks
- Types in `services/<domain>/types.ts`
- Never call Axios in components — use hooks
