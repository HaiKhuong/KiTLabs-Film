---
description: When to use Tailwind vs Sass
trigger: glob
globs: '**/*.{tsx,sass,scss,css}'
---

# Tailwind vs Sass

## Tailwind — only for

- Spacing (`p-4`, `gap-3`, `m-auto`)
- Flex / Grid (`flex`, `grid`, `items-center`)
- Responsive utilities (`md:`, `lg:`)
- Quick one-off utilities
- **shadcn/ui** component styling (via `cn()` + CVA)

```tsx
// ✅ GOOD
<div className="flex flex-col gap-4 p-6 md:flex-row">
```

## Sass (CSS Modules + BEM) — for

- Component styles
- Animation
- BEM blocks / elements / modifiers
- Complex UI (gradients, pseudo-elements, states)

```tsx
// ✅ GOOD — mix layout Tailwind + look Sass
<section className={`${styles.mc} flex w-full max-w-md flex-col gap-3 p-6`}>
```

## Avoid

- Recreating BEM / colors / animations with long Tailwind class strings
- Using Sass for simple margin/padding/flex that Tailwind already covers
