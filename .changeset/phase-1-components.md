---
"@jiangui-eth/components": minor
"@jiangui-eth/icons": minor
"@jiangui-eth/primitives": minor
---

Phase 1 MVP components — initial component library release.

**@jiangui-eth/components**
- `Button` — primary/secondary/ghost/danger variants, sm/md/lg sizes, loading state with Loader2 spinner, fullWidth
- `Input` / `Textarea` — size and status (default/error/success) props, aria-invalid
- `Select` — wraps Radix Select, options array API, placeholder, size, status
- `Checkbox` — Radix Checkbox with label association via useId, indeterminate support
- `Radio` / `RadioGroup` — Radix RadioGroup with optional label
- `Switch` — Radix Switch with optional label
- `Stack` / `Grid` / `Divider` — layout primitives, flexbox and CSS grid, decorative/semantic divider
- `Tooltip` — Radix Tooltip with Provider, side and delayDuration props
- `Popover` — Radix Popover with controlled open/onOpenChange, side and align
- `Dialog` — Radix Dialog with overlay, title, description, and close button
- `ToastProvider` / `useToast` — command-pattern toast API, 4 variants, auto-dismiss

**@jiangui-eth/icons** — 29 Lucide icons re-exported (Search, X, Check, ChevronDown, AlertCircle, etc.)

**@jiangui-eth/primitives** — Radix UI re-export layer (Dialog, Popover, Tooltip, Select, Checkbox, Radio, Switch, Toast)
