# @jiangui-eth/components

React component library for the jiangui design system. Built with CSS Modules + CSS custom properties — zero runtime overhead, fully RSC-compatible.

## Installation

```bash
npm install @jiangui-eth/components @jiangui-eth/tokens
# or
pnpm add @jiangui-eth/components @jiangui-eth/tokens
```

**Peer dependencies:** React ≥ 18

## Setup

Import the token stylesheets once at your app entry point (required for design tokens):

```ts
import '@jiangui-eth/tokens/css'
import '@jiangui-eth/tokens/dark' // optional — dark mode support
```

## Usage

```tsx
import { Button } from '@jiangui-eth/components'

export default function Page() {
  return <Button variant="primary">Get started</Button>
}
```

## Dark Mode

Toggle dark mode by setting a `data-theme` attribute on the root element:

```ts
document.documentElement.setAttribute('data-theme', 'dark')  // enable
document.documentElement.setAttribute('data-theme', '')       // disable
```

## Design Principles

- **Zero runtime** — styles are static CSS, no style injection at runtime
- **RSC-compatible** — components work in React Server Components
- **Token-driven** — all visual values come from `@jiangui-eth/tokens`
- **Accessible** — components meet WCAG 2.1 AA; a11y tested with jest-axe

## Development

```bash
pnpm --filter @jiangui-eth/components test        # run unit + a11y tests
pnpm --filter @jiangui-eth/components test:coverage  # with coverage report
pnpm --filter @jiangui-eth/components build       # compile to dist/
```

Components are documented in Storybook — run `pnpm dev` from the repo root to launch the dev server.
