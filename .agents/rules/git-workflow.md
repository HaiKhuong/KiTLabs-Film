---
description: Git — Conventional Commits, Husky, CI/CD
trigger: always_on
---

# Git Rules

## Conventional Commits

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

```bash
feat(top-up): add payment method selector
fix(oauth): close popup after token exchange
chore(deps): bump axios
```

- Subject: imperative, lowercase, no period
- Scope optional but preferred (`home`, `top-up`, `oauth`, `api`, `seo`)
- Breaking change: `feat!:` or `BREAKING CHANGE:` in body

Enforced by Commitlint + Husky `commit-msg` hook.

## Husky hooks

| Hook         | Action                                               |
| ------------ | ---------------------------------------------------- |
| `pre-commit` | `lint-staged` (Biome) → **`npm test`** (all tests must pass) |
| `commit-msg` | `commitlint`                                         |
| `pre-push`   | **`npm test`** again — push bị chặn nếu test fail    |

Do not use `--no-verify` unless explicitly requested.

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on PR / push to `main`:

1. Install deps
2. `npm run check` (Biome)
3. `npm test`
4. `npm run build`

Fix CI failures before merge. Keep workflows deterministic (lockfile, Node version from `.nvmrc`).

## Branch & PR

- Branch: `feat/…`, `fix/…`, `chore/…`
- PR title follows Conventional Commits
- Do not commit secrets, `.env.local`, or build artifacts
