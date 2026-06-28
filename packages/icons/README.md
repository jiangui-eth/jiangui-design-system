# @jiangui-eth/icons

SVG icon library for the jiangui design system, distributed as optimized React components via [Lucide](https://lucide.dev).

## Installation

```bash
npm install @jiangui-eth/icons
# or
pnpm add @jiangui-eth/icons
```

**Peer dependencies:** React ≥ 18

## Usage

```tsx
import { Search, ChevronDown, AlertCircle } from '@jiangui-eth/icons'

export default function SearchBar() {
  return (
    <label>
      <Search size={16} aria-hidden />
      <input type="search" placeholder="Search..." />
    </label>
  )
}
```

## Available Icons

| Category | Icons |
|----------|-------|
| Actions | `Search`, `X`, `Check`, `Plus`, `Minus`, `Edit2`, `Trash2`, `Copy`, `Download`, `Upload` |
| Navigation | `ChevronDown`, `ChevronUp`, `ChevronLeft`, `ChevronRight`, `Menu`, `ArrowLeft`, `ArrowRight` |
| Status | `AlertCircle`, `CheckCircle`, `XCircle`, `Info`, `Loader2` |
| UI | `Eye`, `EyeOff`, `Calendar`, `Clock` |
| User | `User`, `Settings`, `LogOut` |

## Icon API

All icons accept standard Lucide props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in px |
| `color` | `string` | `currentColor` | Stroke color |
| `strokeWidth` | `number` | `2` | Stroke width |
| `aria-hidden` | `boolean` | — | Hide from screen readers when decorative |
| `aria-label` | `string` | — | Accessible label when used standalone |

## Development

```bash
pnpm --filter @jiangui-eth/icons build
```
