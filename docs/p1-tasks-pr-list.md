# Phase 1 Tasks — PR List

All PRs merged to `dev` on 2026-06-28. 14 tasks completed (T1-00 through T1-13), 0 failures.

| Task | PR | Title | Merged At |
|------|----|-------|-----------|
| T1-00 | [#1](https://github.com/jiangui-eth/jiangui-design-system/pull/1) | chore(ui): remove packages/ui template and migrate apps/web to DS components | 2026-06-28 14:54 |
| T1-01 | [#2](https://github.com/jiangui-eth/jiangui-design-system/pull/2) | feat(primitives): activate @jiangui-eth/primitives with Radix UI | 2026-06-28 15:00 |
| T1-02 | [#3](https://github.com/jiangui-eth/jiangui-design-system/pull/3) | feat(icons): activate @jiangui-eth/icons with Lucide | 2026-06-28 15:12 |
| T1-03 | [#4](https://github.com/jiangui-eth/jiangui-design-system/pull/4) | feat(components): add tsup.config.ts and expose ./styles CSS export | 2026-06-28 15:15 |
| T1-04 | [#5](https://github.com/jiangui-eth/jiangui-design-system/pull/5) | docs(adr): add ADR-003 component API guidelines | 2026-06-28 15:16 |
| T1-05 | [#6](https://github.com/jiangui-eth/jiangui-design-system/pull/6) | feat(components): add danger variant and loading prop to Button | 2026-06-28 15:18 |
| T1-06 | [#7](https://github.com/jiangui-eth/jiangui-design-system/pull/7) | feat(components): add Input and Textarea components | 2026-06-28 15:20 |
| T1-07 | [#8](https://github.com/jiangui-eth/jiangui-design-system/pull/8) | feat(components): add Select component (Radix) | 2026-06-28 15:25 |
| T1-08 | [#9](https://github.com/jiangui-eth/jiangui-design-system/pull/9) | feat(components): add Checkbox, RadioGroup, Radio, Switch | 2026-06-28 15:28 |
| T1-09 | [#10](https://github.com/jiangui-eth/jiangui-design-system/pull/10) | feat(components): add Stack, Grid, Divider layout components | 2026-06-28 15:30 |
| T1-10 | [#11](https://github.com/jiangui-eth/jiangui-design-system/pull/11) | feat(components): add Tooltip and Popover components | 2026-06-28 15:36 |
| T1-11 | [#12](https://github.com/jiangui-eth/jiangui-design-system/pull/12) | feat(components): add Dialog (Modal) component | 2026-06-28 15:37 |
| T1-12 | [#13](https://github.com/jiangui-eth/jiangui-design-system/pull/13) | feat(components): add ToastProvider + useToast | 2026-06-28 15:40 |
| T1-13 | [#14](https://github.com/jiangui-eth/jiangui-design-system/pull/14) | feat(release): finalize Phase 1 exports, changeset, apps/web integration | 2026-06-28 15:42 |

## Summary

### Components shipped (`@jiangui-eth/components`)

| Component | File | Tests | Stories |
|-----------|------|-------|---------|
| Button | `src/Button/` | 20 | 6 |
| Input / Textarea | `src/Input/` | 13 | 4 |
| Select | `src/Select/` | 9 | 4 |
| Checkbox / Radio / RadioGroup / Switch | `src/Checkbox/` | 13 | 5 |
| Stack / Grid / Divider | `src/Layout/` | 14 | 5 |
| Tooltip | `src/Tooltip/` | 4 | 2 |
| Popover | `src/Popover/` | 6 | 2 |
| Dialog | `src/Dialog/` | 9 | 3 |
| ToastProvider / useToast | `src/Toast/` | 7 | 5 |
| **Total** | | **101** | **36** |

### Packages activated

| Package | Version bump | Notes |
|---------|-------------|-------|
| `@jiangui-eth/primitives` | `0.0.0 → minor` | Radix UI re-export layer (Dialog, Popover, Tooltip, Select, Checkbox, Radio, Switch, Toast) |
| `@jiangui-eth/icons` | `0.0.0 → minor` | 29 Lucide icons |
| `@jiangui-eth/components` | `0.0.0 → minor` | 12 components + useToast hook |

### Infrastructure changes (T1-03 / T1-04)

- `tsup.config.ts` added to components — ESM + CJS dual output, source maps, tree-shaking
- `./styles` CSS export added to `package.json#exports`
- ADR-003 documenting component API conventions (forwardRef, CSS Modules, a11y test pattern)

### jsdom polyfills added (T1-07 / T1-10)

`packages/components/src/test-setup.ts` now polyfills four jsdom gaps required by Radix UI:
- `hasPointerCapture`, `setPointerCapture`, `releasePointerCapture` (Pointer Events — Select/Checkbox/Switch)
- `scrollIntoView` (Select listbox scrolling)
- `ResizeObserver` (Tooltip/Popover positioning)

### CI gate results

All 14 PRs passed all 5 gates (build / check-types / lint / test / storybook:build) before merge.
No bug reports were generated.
