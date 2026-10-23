---
description: Sass breakpoints and respond-to mixin usage
trigger: glob
globs: '**/*.{sass,scss}'
---

# Breakpoints

Defined in `src/styles/_breakpoints.sass`. `+respond-below` uses the token as `max-width`. `+respond-to` uses token + 1px as `min-width`.

| Name | Token |
| ---- | ----- |
| sm   | 640px |
| md   | 768px |
| lg   | 1024px |
| xl   | 1280px |
| 2xl  | 1536px |

## Mixins

```sass
@use 'mixins' as *

.block
  padding: 1rem

  +respond-to('md')
    padding: 1.5rem

  +respond-below('sm')
    display: none
```

Prefer Tailwind responsive prefixes (`md:p-6`) for layout.
Use `+respond-to` when component Sass needs media queries.
