# @jiangui-eth/primitives

Unstyled, accessible UI primitives for the jiangui design system — low-level building blocks that handle behavior and accessibility, leaving visual styling to `@jiangui-eth/components`.

> **Status:** Under development — primitives will be available in a future release.

## Installation

```bash
npm install @jiangui-eth/primitives
# or
pnpm add @jiangui-eth/primitives
```

**Peer dependencies:** React ≥ 18

## Design Goals

- **Headless** — no styles applied; bring your own CSS or CSS Modules
- **Accessible** — correct ARIA roles, keyboard navigation, and focus management out of the box
- **Composable** — primitives compose into higher-level components in `@jiangui-eth/components`

## Planned Primitives

| Primitive | Description |
|-----------|-------------|
| `Dialog` | Modal dialog with focus trap and `aria-modal` |
| `Popover` | Floating content anchored to a trigger |
| `Select` | Custom select with listbox pattern |
| `Tabs` | Tab panel with keyboard navigation |
| `Toggle` | Controlled boolean toggle |
| `Tooltip` | Accessible tooltip with hover/focus triggers |

## Development

```bash
pnpm --filter @jiangui-eth/primitives build
```
