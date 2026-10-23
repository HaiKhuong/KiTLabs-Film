---
description: Biome lint & format expectations for FTel-Games
trigger: always_on
---

# Lint & Format (Biome)

Replaces ESLint + Prettier + `eslint-plugin-import`.

- Config: `biome.json`
- Lint + format + organize imports: Biome
- Indented Sass (`.sass`) is **not** formatted by Biome — keep style manually / editor

## Commands

```bash
npm run check
npm run check:fix
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm test
```

## Rules of thumb

- Prefer fixing Biome diagnostics over `biome-ignore`
- If ignore is required: `// biome-ignore lint/rule: reason`
- Do not re-add ESLint or Prettier unless explicitly requested
- Tailwind class auto-sort (former Prettier plugin) is not enabled by default in Biome
