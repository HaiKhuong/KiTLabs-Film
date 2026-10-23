---
description: BEM class naming and Sass module conventions
trigger: glob
globs: '**/*.{tsx,sass,scss}'
---

# BEM + Sass Modules

## Class naming (BEM)

Format: `block__element--modifier`

```tsx
// ✅ GOOD — use bracket notation for __ and -- (required; styles.mc__info is invalid JS)
// Biome `useLiteralKeys` is disabled for this reason
<section className={styles.mc}>
  <p className={styles['mc__info']}>...</p>
  <p className={styles['mc--highlighted']}>...</p>
</section>

// ❌ BAD — styles.mc__info is invalid JS ((styles.mc).__info)
<p className={styles.mc__info}>

// ❌ BAD — no BEM / random names
<div className={styles.infoBox}>
```

Examples: `mc`, `mc__info`, `mc__title`, `mc--highlighted`

## Sass file rules

- Use indented Sass (`.sass`), not SCSS
- Component styles: `Component.module.sass`
- Shared tokens live in `src/styles/`:
  - `_variables.sass`
  - `_mixins.sass`
  - `_breakpoints.sass`
  - `globals.sass`
- Prefer mixins from `_mixins.sass` (`+respond-to('md')`, `+flex-center`, …)
- From component modules, import shared Sass with relative paths:
  `@use '../../styles/variables' as *` / `@use '../../styles/mixins' as *`
- From files inside `src/styles/`, use: `@use 'variables' as *`

## Sass owns

- Component look & feel
- Animation / transitions
- BEM selectors
- Complex UI

Do not put layout spacing / flex / grid in Sass when Tailwind utilities are enough.
