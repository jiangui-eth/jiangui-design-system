# @jiangui-eth/icons

SVG icon library for the jiangui design system, distributed as optimized React components.

> **Status:** Under development — icons will be available in a future release.

## Installation

```bash
npm install @jiangui-eth/icons
# or
pnpm add @jiangui-eth/icons
```

**Peer dependencies:** React ≥ 18

## Planned Usage

```tsx
import { ChevronRight, Close, Search } from '@jiangui-eth/icons'

export default function SearchBar() {
  return (
    <label>
      <Search size={16} aria-hidden />
      <input type="search" placeholder="Search..." />
    </label>
  )
}
```

## Icon API (planned)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in px |
| `color` | `string` | `currentColor` | Fill color |
| `aria-hidden` | `boolean` | — | Hide from screen readers when decorative |
| `aria-label` | `string` | — | Accessible label when used standalone |

## Development

```bash
pnpm --filter @jiangui-eth/icons build
```
