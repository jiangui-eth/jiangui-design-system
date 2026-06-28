# @jiangui-eth/tokens

Design tokens for the jiangui design system — generated via Style Dictionary v5 from a three-layer JSON architecture (primitive → semantic → component).

## Installation

```bash
npm install @jiangui-eth/tokens
# or
pnpm add @jiangui-eth/tokens
```

## Usage

### CSS Custom Properties (recommended)

Import the token stylesheet once at your app entry point:

```ts
// Light mode tokens (all variables on :root)
import '@jiangui-eth/tokens/css'

// Dark mode overrides (variables on [data-theme="dark"])
import '@jiangui-eth/tokens/dark'
```

Then use tokens anywhere in your CSS or CSS Modules:

```css
.button {
  background-color: var(--ds-color-primary);
  color: var(--ds-color-text-on-primary);
  padding: var(--ds-spacing-component-md);
  border-radius: var(--ds-border-radius-md);
}
```

Toggle dark mode by setting the attribute on the root element:

```ts
document.documentElement.setAttribute('data-theme', 'dark')
```

### JavaScript / TypeScript

```ts
import tokens from '@jiangui-eth/tokens/js'

console.log(tokens.DsColorPrimary) // '#3b82f6'
```

## Token Architecture

Tokens follow a three-layer hierarchy:

```
Primitive  →  Semantic  →  Component
blue.500      color.primary   button.bg.primary
```

| Layer | Source | Output |
|-------|--------|--------|
| Primitive | `src/primitive/**/*.json` | raw scale values |
| Semantic | `src/semantic/**/*.json` | role-based aliases |
| Component | `src/component/**/*.json` | component-specific overrides |

## Available Exports

| Import path | Content |
|-------------|---------|
| `@jiangui-eth/tokens/css` | CSS custom properties (light mode) |
| `@jiangui-eth/tokens/dark` | CSS custom properties (dark mode overrides) |
| `@jiangui-eth/tokens/js` | ES module with token values as JS constants |

## Token Naming

All CSS variables follow the pattern `--ds-{category}-{role}-{variant}`:

```css
--ds-color-primary          /* semantic color */
--ds-color-text-default     /* text role */
--ds-spacing-component-md   /* spacing scale */
--ds-border-radius-md       /* radius scale */
--ds-font-weight-medium     /* typography */
```
