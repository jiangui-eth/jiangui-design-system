# @jiangui-eth/primitives

Radix UI re-export layer for the jiangui design system — provides headless, accessible primitives consumed internally by `@jiangui-eth/components`.

> **Note:** This is an **internal package**. External consumers should install `@jiangui-eth/components` instead, which wraps these primitives with styles and a simplified API. Direct use of `@jiangui-eth/primitives` is only needed when building custom styled components in the same monorepo.

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

## Exported Namespaces

Each primitive is exported as a namespace matching its Radix package:

```ts
import { Dialog, Popover, Tooltip } from '@jiangui-eth/primitives'

// Access Radix sub-components via the namespace
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

| Namespace | Radix Package | Used by |
|-----------|---------------|---------|
| `Dialog` | `@radix-ui/react-dialog` | `Dialog` component |
| `Popover` | `@radix-ui/react-popover` | `Popover` component |
| `Tooltip` | `@radix-ui/react-tooltip` | `Tooltip` component |
| `Select` | `@radix-ui/react-select` | `Select` component |
| `Checkbox` | `@radix-ui/react-checkbox` | `Checkbox` component |
| `Radio` | `@radix-ui/react-radio-group` | `Radio` / `RadioGroup` components |
| `Switch` | `@radix-ui/react-switch` | `Switch` component |
| `Toast` | `@radix-ui/react-toast` | `ToastProvider` / `useToast` |

## Development

```bash
pnpm --filter @jiangui-eth/primitives build
```
