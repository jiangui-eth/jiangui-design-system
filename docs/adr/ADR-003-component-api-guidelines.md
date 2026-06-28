# ADR-003 — Component API Guidelines

**Status:** Accepted  
**Date:** 2026-06-28

---

## Context

Phase 1 introduces 13+ exported components. Consistent API conventions reduce cognitive load, prevent naming drift, and make the library predictable for consumers.

---

## Decisions

### 1. Class merging — no `clsx`

```ts
className={[
  styles.root,
  styles[variant],
  disabled && styles.disabled,
  className,
].filter(Boolean).join(' ')}
```

- Always accept `className` prop (consumers may append utility classes).
- Never accept `style` prop — prevents bypassing design tokens.

### 2. Props naming

| Pattern | ✅ Use | ❌ Avoid |
|---------|--------|---------|
| Variant | `variant?: 'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `color?: 'blue'` |
| Size | `size?: 'sm' \| 'md' \| 'lg'` | `large?: boolean` |
| Boolean state | `disabled`, `loading`, `readOnly` | `isDisabled`, `isLoading` |
| Value change | `onChange?: (value: T) => void` | `onUpdate?:`, `onSelect?:` |
| Open/close | `open?`, `onOpenChange?` | `visible?`, `onToggle?` |

### 3. `forwardRef` — required for all leaf-node components

```tsx
export const ComponentName = React.forwardRef<
  HTMLElement,
  ComponentNameProps
>(({ className, ...props }, ref) => (
  <element
    ref={ref}
    className={[styles.root, className].filter(Boolean).join(' ')}
    {...props}
  />
))
ComponentName.displayName = 'ComponentName'
```

### 4. Type exports

Every component must export its Props type:

```ts
// src/ComponentName/index.ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'
```

### 5. File layout (per component)

```
src/ComponentName/
  ComponentName.tsx          implementation
  ComponentName.module.css   collocated CSS Modules
  ComponentName.stories.tsx  Storybook stories (Gate 5)
  ComponentName.test.tsx     unit + a11y tests (Gate 4)
  index.ts                   re-export
```

### 6. a11y test convention

```ts
import { axe } from 'jest-axe'

expect(
  await axe(container, { rules: { 'color-contrast': { enabled: false } } })
).toHaveNoViolations()
// color-contrast disabled: jsdom has no layout engine, contrast ratio is always wrong
```

### 7. Versioning rules

| Change type | Version |
|-------------|---------|
| New component / new optional prop | Minor |
| Bug fix, invisible optimization | Patch |
| Remove prop / breaking API change | Major (must deprecate first) |

---

## Consequences

- All Phase 1 PRs are reviewed against this document.
- Deviations require an ADR amendment before merging.
