---
description: Vitest + React Testing Library conventions
trigger: glob
globs: '**/*.{test,spec}.{ts,tsx}'
---

# Testing (Vitest + RTL)

Stack: **Vite** (Vitest runner) + **Vitest** + **React Testing Library**.

## File placement

Colocate tests next to the unit under test:

```
common/McInfo/
  McInfo.tsx
  McInfo.module.sass
  McInfo.test.tsx
```

Naming: `Component.test.tsx` or `Component.spec.tsx`.

## Patterns

```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { McInfo } from '@/components/common/McInfo/McInfo';

it('renders title', () => {
  render(<McInfo title="Hi" description="Desc" />);
  expect(screen.getByRole('heading', { name: 'Hi' })).toBeInTheDocument();
});
```

- Query by role / label / text — avoid `container.querySelector` unless testing CSS module classes
- Prefer `userEvent` over `fireEvent`
- Use `@/` imports in tests
- Keep tests focused on behavior, not implementation details

## Commands

```bash
npm test                # Unit tests (jsdom) — runs in pre-commit
npm run test:watch
npm run test:coverage
npm run test:visual        # Visual snapshot tests (Chromium) — compare only
npm run test:visual:update # Explicit command to generate/update baseline PNGs
```

## Visual Regression Testing (*.visual.test.tsx)

Stack: **Vitest Browser Mode** + **Playwright (Chromium)**.

- **Separated from unit tests:** `npm test` excludes `*.visual.test.tsx` and never launches Chromium.
- **Commands:**
  - `npm run test:visual` compares against existing baseline PNGs. Fails on mismatch without overwriting.
  - `npm run test:visual:update` is the only manual command to write or update baseline PNGs.
- **Naming & Placement:** Colocate `Component.visual.test.tsx` next to component.
- **State ID convention:** Every snapshot state ID must specify a state (e.g. `SiteHeader-guest`, `SiteSidebar-open`).
- **Viewports:**
  - Composite components: locked at single viewport `1440x900` (`expectVisualSnapshots`).
  - Views (`src/views/**`): test across all 7 responsive viewports (`expectResponsiveSnapshots`).
- **Locked environment:** Be Vietnam Pro woff2 font, animations/transitions disabled, local fixtures only (no external CDN URLs).
