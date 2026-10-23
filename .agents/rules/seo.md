---
description: SEO, links, headings, Lighthouse targets for FTel-Games
trigger: always_on
globs: src/**/*.{ts,tsx}
---

# SEO & Quality Rules

Agent **must always** when creating/editing pages:

1. Export `metadata` (static) or `generateMetadata` (dynamic)
2. Use `next/image`, `next/link`, `next/script` (never raw `<img>` / internal `<a>` / unmanaged third-party scripts)
3. Never leave `alt` empty on meaningful images
4. Keep **title** and **description** unique per page
5. Prefer skeleton UI for loading states

## Metadata (required on every page)

Use `@/lib/seo/createMetadata` or catalog `@/lib/seo/pageSeo`.

| Field            | Rule                                                                              |
| ---------------- | --------------------------------------------------------------------------------- |
| **Title**        | Unique per page · **50–60** characters · contains primary keyword · no duplicates |
| **Description**  | Unique per page · **120–160** characters                                          |
| **Canonical**    | Every page via `alternates.canonical` / `path`                                    |
| **Open Graph**   | All **public** pages (title, description, url, images + **alt**)                  |
| **Twitter Card** | All **public** pages (`summary_large_image`)                                      |

```ts
export const metadata = createMetadata({
  title: 'FTel-Games – Chơi & nạp game online uy tín tại Việt Nam',
  description:
    'FTel-Games giúp bạn chơi game và nạp thẻ nhanh, bảo mật. Khám phá ưu đãi, hỗ trợ tận tâm và trải nghiệm tối ưu dành cho game thủ Việt Nam.',
  path: '/',
  imageAlt: 'FTel-Games – nền tảng chơi và nạp game tại Việt Nam',
});

// Dynamic routes:
export async function generateMetadata({ params }): Promise<Metadata> { … }
```

- Private/popup (`/oauth-popup`): still declare metadata with `noIndex: true`
- Do **not** auto-duplicate brand suffixes that break the 50–60 title budget

## Headings

- Exactly **one `<h1>`** per page
- Order: `H1 → H2 → H3` (never skip, e.g. H1 → H4)
- Visible H1 should align with the page’s primary keyword/topic

## Images & media

- Always `next/image`
- `alt` describes the image accurately (not empty, not “image1”)
- OG image `alt` required in `createMetadata({ imageAlt })`
- Set width/height or `fill` + sized parent to protect **CLS**

## Fonts

- Only `next/font` (as in root layout)
- **Never** import Google Fonts via CSS `@import` or `<link>`

## Links

| Type            | Rule                                                     |
| --------------- | -------------------------------------------------------- |
| Internal routes | `import Link from 'next/link'` — **not** `<a href="/…">` |
| External        | `<a href="…" target="_blank" rel="noopener noreferrer">` |

## Lazy loading & loading UI

- Below-the-fold / heavy client UI: `next/dynamic` + **Skeleton** fallback
- Route `loading.tsx` should render Skeleton, not a blank screen
- Images: rely on `next/image` lazy loading (priority only for LCP hero)

## Performance — Core Web Vitals

Do not ship changes that make **LCP / CLS / INP** fail:

- **LCP**: optimize hero (`priority` image / avoid huge client JS on first paint)
- **CLS**: reserve space for images/fonts/skeletons; no layout jumps
- **INP**: keep click handlers light; defer non-critical work

## Lighthouse (public pages — minimum)

| Category       | Score |
| -------------- | ----: |
| Performance    |  ≥ 90 |
| Accessibility  |  ≥ 95 |
| Best Practices |  ≥ 95 |
| SEO            |  ≥ 95 |

## Sitemap / robots / JSON-LD

- Indexable routes in `sitemap.ts`
- Disallow popup/private in `robots.ts`
- Structured data via `<JsonLd />` must match visible content

## ❌ Forbidden

- Missing metadata on a route
- Duplicate titles or descriptions
- Empty `alt`
- Internal navigation with raw `<a>`
- Google Fonts via CSS
- Heading skips (H1 → H4)
- Indexing `/oauth-popup`
