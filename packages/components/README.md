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
import { Button, Input, ToastProvider, useToast } from '@jiangui-eth/components'

export default function Page() {
  return (
    <ToastProvider>
      <Input placeholder="Email" />
      <Button variant="primary">Submit</Button>
    </ToastProvider>
  )
}
```

## Components

| Component | Import | Description |
|-----------|--------|-------------|
| `Button` | `{ Button }` | primary / secondary / ghost / danger variants, sm/md/lg sizes, `loading` state |
| `Input` | `{ Input }` | text input with `size` and `status` (default / error / success) |
| `Textarea` | `{ Textarea }` | multiline input with same `size` and `status` props |
| `Select` | `{ Select }` | options-array driven select, `placeholder`, `size`, `status` |
| `Checkbox` | `{ Checkbox }` | Radix Checkbox with `label`, indeterminate support |
| `Radio` / `RadioGroup` | `{ Radio, RadioGroup }` | Radix radio button and container |
| `Switch` | `{ Switch }` | Radix toggle switch with optional `label` |
| `Stack` | `{ Stack }` | flexbox container — `direction`, `gap`, `align`, `justify`, `wrap` |
| `Grid` | `{ Grid }` | CSS grid — `columns` (1–12), `gap` |
| `Divider` | `{ Divider }` | semantic or decorative `<hr>`, `orientation` |
| `Tooltip` | `{ Tooltip }` | hover/focus tooltip, `side`, `delayDuration` |
| `Popover` | `{ Popover }` | floating panel, `side`, `align`, controlled `open/onOpenChange` |
| `Dialog` | `{ Dialog }` | modal with overlay, `title`, `description`, trigger or controlled |
| `ToastProvider` | `{ ToastProvider }` | context provider — wrap your app once |
| `useToast` | `{ useToast }` | imperative toast: `toast({ title, description, variant })` |

### Toast variants: `default` · `success` · `error` · `warning`

## Dark Mode

Toggle dark mode by setting a `data-theme` attribute on the root element:

```ts
document.documentElement.setAttribute('data-theme', 'dark')  // enable
document.documentElement.setAttribute('data-theme', '')       // disable
```

## Design Principles

- **Zero runtime** — styles are static CSS, no style injection at runtime
- **RSC-compatible** — components work in React Server Components (interactive components are marked `'use client'` automatically via pnpm)
- **Token-driven** — all visual values come from `@jiangui-eth/tokens`
- **Accessible** — components meet WCAG 2.1 AA; a11y tested with jest-axe

## Development

```bash
pnpm --filter @jiangui-eth/components test          # run unit + a11y tests
pnpm --filter @jiangui-eth/components test:coverage # with coverage report
pnpm --filter @jiangui-eth/components build         # compile to dist/
```

Components are documented in Storybook — run `pnpm turbo dev` from the repo root to launch the dev server.
