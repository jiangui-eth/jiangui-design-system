# jiangui-design-system

[![npm](https://img.shields.io/npm/v/@jiangui-eth/components?label=%40jiangui-eth%2Fcomponents)](https://www.npmjs.com/package/@jiangui-eth/components)
[![license](https://img.shields.io/github/license/jiangui-eth/jiangui-design-system)](LICENSE)

A design system monorepo for `@jiangui-eth/` — React component library built with CSS Modules + CSS custom properties. Zero runtime overhead, RSC-compatible, WCAG 2.1 AA accessible.

---

## Published Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@jiangui-eth/components`](./packages/components) | `0.1.0` | React UI components (Button, Input, Select, Dialog, Toast, …) |
| [`@jiangui-eth/tokens`](./packages/tokens) | `0.0.1` | Design tokens — CSS custom properties via Style Dictionary v5 |
| [`@jiangui-eth/icons`](./packages/icons) | `0.1.0` | 29 Lucide icons as React components |
| [`@jiangui-eth/primitives`](./packages/primitives) | `0.1.0` | Radix UI re-export layer (internal, used by components) |

---

## Quick Start

```bash
npm install @jiangui-eth/components @jiangui-eth/tokens
# or
pnpm add @jiangui-eth/components @jiangui-eth/tokens
```

Import the token stylesheet once at your app entry point:

```ts
import '@jiangui-eth/tokens/css'          // light mode
import '@jiangui-eth/tokens/dark'         // optional dark mode
```

Use components:

```tsx
import { Button, Input, Dialog } from '@jiangui-eth/components'

export default function Page() {
  return (
    <>
      <Input placeholder="Search…" />
      <Button variant="primary">Submit</Button>
    </>
  )
}
```

Dark mode — set `data-theme` on the root element:

```ts
document.documentElement.setAttribute('data-theme', 'dark')
```

---

## Workspace Layout

```
apps/
  docs/     Storybook 8 — component documentation
  web/      Next.js demo app

packages/
  components/      @jiangui-eth/components   React UI components
  tokens/          @jiangui-eth/tokens        CSS custom property tokens
  icons/           @jiangui-eth/icons         SVG icon components
  primitives/      @jiangui-eth/primitives    Radix UI re-export layer
  eslint-config/   Shared ESLint flat config
  typescript-config/ Shared tsconfig presets
```

---

## Development

**Requirements:** Node ≥ 22, pnpm ≥ 11.5.1

```bash
pnpm install               # install all dependencies
pnpm turbo dev             # start all dev watchers (Storybook + Next.js)
pnpm turbo build           # build all packages
pnpm turbo test            # run unit + a11y tests
pnpm format                # prettier --write
```

Full local CI gate (same as GitHub Actions):

```bash
pnpm turbo build check-types lint test storybook:build
```

---

## Links

- [Storybook (docs site)](./apps/docs) — run `pnpm turbo dev` to launch locally
- [npm — @jiangui-eth/components](https://www.npmjs.com/package/@jiangui-eth/components)
- [Architecture Decision Records](./docs/adr/)
- [Phase 1 PR list](./docs/p1-tasks-pr-list.md)
