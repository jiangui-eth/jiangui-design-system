# jiangui-design-system

Monorepo for the `@jiangui-eth/` design system. Turborepo + pnpm workspaces. Phase 0 (toolchain) complete; Phase 1 (MVP components) in progress.

## Common Commands

```bash
pnpm turbo build                        # build all packages in dependency order
pnpm turbo build check-types lint test storybook:build  # full CI gate (local)
pnpm turbo dev                          # start all dev watchers
pnpm --filter @jiangui-eth/tokens build # build a single package
pnpm --filter @jiangui-eth/components test          # run tests
pnpm --filter @jiangui-eth/components test:coverage # with coverage threshold check
pnpm format                             # prettier --write on all ts/tsx/md
```

## Workspace Layout

```
apps/
  docs/     Storybook 8 + Vite — component documentation site
  web/      Next.js 16 demo app

packages/
  tokens/          @jiangui-eth/tokens   — Style Dictionary v5, CSS custom properties
  components/      @jiangui-eth/components — React components (CSS Modules)
  icons/           @jiangui-eth/icons    — SVG icon React components (planned)
  primitives/      @jiangui-eth/primitives — Headless behavior primitives (planned)
  ui/              @jiangui-eth/ui       — Internal app-level UI (not published)
  eslint-config/   @jiangui-eth/eslint-config    — shared ESLint flat config
  typescript-config/ @jiangui-eth/typescript-config — shared tsconfig presets

docs/
  adr/      Architecture Decision Records
  token/    Token specification and naming conventions
```

## Architecture Decisions

| ADR | Decision |
|-----|----------|
| D1 | Token source = JSON files in codebase (not Figma-driven) |
| B1 | CSS Modules + CSS custom properties — zero runtime, RSC-compatible |
| C1 | Storybook 8 + Vite builder in `apps/docs` |

Full ADRs in `docs/adr/`.

## Token System

Three-layer hierarchy built by Style Dictionary v5:

```
Primitive (raw scale)  →  Semantic (role-based)  →  Component (overrides)
src/primitive/**/*.json   src/semantic/**/*.json    src/component/**/*.json
     ↓
dist/css/tokens.css        (--ds-* CSS vars, :root)
dist/css/tokens.dark.css   ([data-theme="dark"] overrides)
dist/js/tokens.mjs         (JS constants)
```

CSS variable naming: `--ds-{category}-{role}-{variant}`
Example: `--ds-color-primary`, `--ds-color-text-default`, `--ds-spacing-component-md`

**Critical:** Style Dictionary v5 does NOT special-case `DEFAULT` keys. Use flat names:
`"primary": {...}` → `--ds-color-primary` ✅
`"primary": { "DEFAULT": {...} }` → `--ds-color-primary-default` ❌

## Component Conventions

Every component must have:
1. `ComponentName.tsx` — implementation with `React.forwardRef`
2. `ComponentName.module.css` — collocated styles using `var(--ds-*)` tokens
3. `ComponentName.stories.tsx` — Storybook story (required to pass Gate 5)
4. `ComponentName.test.tsx` — unit + a11y tests with Vitest + jest-axe

```tsx
// ComponentName.tsx pattern
import React from 'react'
import styles from './ComponentName.module.css'

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary'
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, styles[variant], className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)
ComponentName.displayName = 'ComponentName'
```

```css
/* ComponentName.module.css pattern */
.root { /* base styles using var(--ds-*) */ }
.primary { background-color: var(--ds-color-primary); }
```

**a11y tests:** Always disable `color-contrast` rule in jsdom (no layout engine):
```ts
expect(await axe(container, { rules: { 'color-contrast': { enabled: false } } })).toHaveNoViolations()
```

## CI Quality Gates

Five gates must pass on every PR (`.github/workflows/ci.yml`):

| Gate | Command | Blocks on |
|------|---------|-----------|
| 1 · Build | `turbo build` | compile error |
| 2 · Types | `turbo check-types` | type error |
| 3 · Lint | `turbo lint` | ESLint warning (0 allowed) |
| 4 · Test | `turbo test` | failing test or coverage < threshold |
| 5 · Storybook | `turbo storybook:build` | missing/broken story |

Coverage thresholds (lines/functions/statements 80%, branches 75%) are enforced in `packages/components/vitest.config.ts`.

## Turborepo Notes

- `test` task uses `inputs: ["$TURBO_DEFAULT$"]` — cached when source unchanged
- `build` outputs: `dist/**`; `web#build` outputs: `.next/**`
- `storybook:build` depends on `@jiangui-eth/components#build` and `@jiangui-eth/tokens#build`
- To run a task for one package: `pnpm turbo build --filter=@jiangui-eth/tokens`

## pnpm Quirks

- Storybook resolution: `@storybook/react` must be a **direct** devDep in `apps/docs` (pnpm strict isolation blocks transitive resolution by Vite)
- `.npmrc` hoists `@storybook/*` packages
- Node.js ≥ 22 required (pnpm v11.5.1 uses `node:sqlite` built-in)

## Publishing

Packages are published via Changesets:
- `pnpm changeset` — create a changeset for your PR
- Release workflow (`.github/workflows/release.yml`) runs on push to `main`:
  1. `pnpm changeset version` — bumps versions + updates changelogs
  2. `pnpm -r publish --access public` — publishes to npm

`updateInternalDependencies` is set to `"minor"` — token changes bump dependents as minor, not patch.

## What NOT to do

- Do not add `DEFAULT` keys to token JSON — use flat names instead
- Do not put styles in `<style>` tags or inline styles — use CSS Modules only
- Do not import tokens as JS values in component files — use `var(--ds-*)` in CSS
- Do not skip Storybook stories — Gate 5 enforces "no component without a story"
- Do not use `cache: false` on Turbo tasks without a reason — hurts CI performance
- Do not add `@repo/` namespace — everything uses `@jiangui-eth/`
