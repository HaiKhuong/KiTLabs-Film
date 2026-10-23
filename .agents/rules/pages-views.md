---
description: App Router pages and views structure
trigger: glob
globs: src/{app,views}/**/*.{ts,tsx,sass}
---

# Pages & Views

## Split responsibility

| Layer                        | Role                            | Example                 |
| ---------------------------- | ------------------------------- | ----------------------- |
| `src/app/(site)/**/page.tsx` | Thin Next.js route + `metadata` | `<HomePage />`          |
| `src/views/PageName/`        | Page UI (tsx + module.sass)     | `HomePage`, `TopUpGame` |

Do **not** put business UI in `app/page.tsx` — keep routes thin.

## Routes

| URL               | View                                         |
| ----------------- | -------------------------------------------- |
| `/`               | `views/HomePage`                             |
| `/top-up-game`    | `views/TopUpGame`                            |
| `/introduce`      | `views/Introduce`                            |
| `/terms-of-use`   | `views/TermsOfUse`                           |
| `/privacy-policy` | `views/PrivacyPolicy`                        |
| `/auth/callback` | `views/AuthCallback` (no site chrome, noindex) |
| `/onboarding` | `views/Onboarding` (noindex) |
| `/oauth-popup` | redirect → `/auth/callback` |

## Structure

```
src/app/
  layout.tsx
  (site)/
    layout.tsx
    loading.tsx
    page.tsx
    top-up-game/page.tsx
    introduce/page.tsx
    terms-of-use/page.tsx
    privacy-policy/page.tsx
  oauth-popup/               # redirect → /auth/callback
  auth/callback/

src/views/…
src/lib/seo/pageSeo.ts
```

## Rules

- Every route exports metadata from `pageSeo` or `createMetadata` / `generateMetadata`
- Exactly one H1; headings H1 → H2 → H3 (no skips)
- Internal links: `next/link` · External: `target="_blank" rel="noopener noreferrer"`
- Public pages listed in `sitemap.ts`
