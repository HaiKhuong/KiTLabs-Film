---
description: Performance — CWV, fonts, skeleton, code splitting
trigger: glob
globs: src/**/*.{ts,tsx}
---

# Performance Rules

## Core Web Vitals (must not fail)

| Metric  | Guidance                                                                        |
| ------- | ------------------------------------------------------------------------------- |
| **LCP** | Fast hero; `next/image` + `priority` for LCP image; minimize above-the-fold JS  |
| **CLS** | Explicit image sizes; skeleton placeholders; `next/font` (no FOUT layout shift) |
| **INP** | Light event handlers; debounce inputs; avoid long tasks on click                |

## Fonts

- Use **`next/font` only** (root layout)
- Never `@import` Google Fonts in CSS or add font `<link>` tags

## Code splitting & lazy loading

```tsx
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/common/Skeleton/Skeleton';

const HeavyPanel = dynamic(
  () => import('@/components/HeavyPanel/HeavyPanel').then((m) => m.HeavyPanel),
  { loading: () => <Skeleton className="h-40 w-full" />, ssr: false },
);
```

- Route-level: add `loading.tsx` with Skeleton
- Avoid eager barrel imports of large libs

## Images

- Always `next/image` with descriptive `alt`
- Reserve dimensions to protect CLS

## Lighthouse gates (public pages)

Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95

## ❌ Avoid

- Huge client components on first paint
- Layout shifts from unsized media
- Blocking third-party scripts without `next/script`
