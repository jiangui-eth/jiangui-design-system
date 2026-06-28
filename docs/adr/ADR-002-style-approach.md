# ADR-002: 组件样式方案

- **状态**: 已接受（Accepted）
- **日期**: 2026-06-28
- **决策编号**: B1
- **关联文档**: [ADR-001 Token 体系](../token/token-spec.md)

---

## 背景

`@jiangui-eth/components` 包需要确定一套组件内部样式方案。该决策的影响范围包括：

- 组件代码的可维护性与可读性
- 构建产物的体积与运行时开销
- SSR（Server-Side Rendering）兼容性
- 与 Design Token 体系（CSS 自定义属性）的集成方式
- 消费者定制组件样式的能力

该决策一旦落地，涉及所有组件的样式文件格式和构建配置，**后期迁移成本极高**，须在首个组件开发前锁定。

---

## 备选方案

### 方案 A：CSS-in-JS（Emotion / styled-components）

**优点**
- 动态样式（基于 props）书写直观
- 作用域隔离，无类名冲突
- 与 Token 主题系统集成自然（ThemeProvider 模式）

**缺点**
- **运行时开销**：样式在 JS 运行时注入，增加首屏耗时
- **SSR 复杂度**：需要额外的服务端注水逻辑（Emotion 的 `extractCritical` / styled-components 的 `ServerStyleSheet`）
- **React Server Components 不兼容**：Emotion/styled-components 依赖 React Context，在 RSC 环境下无法使用
- **bundle size**：Emotion ~10 kB，styled-components ~12 kB（压缩后）

### 方案 B：CSS Modules + CSS 自定义属性 ← **本项目采用（B1）**

**优点**
- **零运行时**：样式在构建时生成静态 CSS 文件，无任何 JS 运行时开销
- **SSR 原生支持**：静态 CSS 文件直接 `<link>` 引入，无需额外处理
- **RSC 兼容**：没有 Context 依赖，完全兼容 React Server Components
- **与 Token 天然集成**：在 `.module.css` 中直接使用 `var(--ds-*)` 变量；主题切换只需覆盖 CSS 自定义属性，无需重新编译组件
- **作用域隔离**：CSS Modules 在编译时生成唯一类名（如 `_button_abc123`），无类名冲突
- **工具链成熟**：tsup（本项目构建工具）原生支持 CSS Modules，无需额外插件

**缺点**
- 动态样式（需基于 JS 状态切换多套样式）须借助 CSS 自定义属性或 `data-*` 属性，不如 CSS-in-JS 直观
- 本地开发需要 IDE 插件获得类名补全（VS Code 有 `CSS Modules` 插件）

### 方案 C：Tailwind CSS

**优点**
- 原子类方案，开发速度快
- 生态庞大，文档完善

**缺点**
- **组件库内部使用体验差**：原子类与组件封装的抽象层次冲突；消费者升级 Tailwind 版本时可能与组件库的类名产生冲突
- 不适合作为组件库内部样式方案（Tailwind 官方也不推荐在组件库内部直接使用原子类）
- 对 Token 体系的支持需要额外配置，且与 CSS 自定义属性集成不如 CSS Modules 直接

---

## 决策：B1 — CSS Modules + CSS 自定义属性

### 核心原则

```
组件内部  →  CSS Modules（作用域隔离 + 静态 CSS）
主题/Token →  CSS 自定义属性 var(--ds-*)（运行时可覆盖）
对外暴露  →  组件的 className prop（允许消费者追加类）
```

### 实现规范

**1. 文件命名**

每个组件目录包含一个 `.module.css` 文件：

```
packages/components/src/
└── Button/
    ├── Button.tsx
    ├── Button.module.css   ← 样式文件
    ├── Button.stories.tsx
    ├── Button.test.tsx
    └── index.ts
```

**2. 样式书写规范**

在 `.module.css` 中，始终引用 Token 变量，禁止硬编码颜色/间距值：

```css
/* Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ds-button-border-radius);
  font-weight: var(--ds-button-font-weight);
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}

.primary {
  background-color: var(--ds-button-bg-primary);
  color: var(--ds-button-text-primary);
  border: 1px solid transparent;
}

.primary:hover {
  background-color: var(--ds-button-bg-primary-hover);
}

.primary:active {
  background-color: var(--ds-button-bg-primary-active);
}

.disabled {
  background-color: var(--ds-button-bg-disabled);
  color: var(--ds-button-text-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.sm { padding: var(--ds-button-padding-sm) var(--ds-spacing-component-md); }
.md { padding: var(--ds-button-padding-md) var(--ds-spacing-component-lg); }
.lg { padding: var(--ds-button-padding-lg) var(--ds-spacing-component-lg); }
```

**3. 组件 TSX 使用模式**

```tsx
// Button.tsx
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  primary:   styles.primary,
  secondary: styles.secondary,
  ghost:     styles.ghost,
}

const sizeClass: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={[
        styles.root,
        variantClass[variant],
        sizeClass[size],
        disabled && styles.disabled,
        className,   // 允许消费者追加类名
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'
```

**4. 暗色模式**

暗色模式**不需要改任何组件代码**，只需在 HTML 根元素切换 `data-theme` 属性：

```html
<!-- 亮色模式（默认） -->
<html>

<!-- 暗色模式 -->
<html data-theme="dark">
```

`@jiangui-eth/tokens` 的 `dist/css/tokens.dark.css` 已生成 `[data-theme="dark"]` 选择器下的 Token 覆盖，所有组件样式自动跟随切换。

**5. 消费者集成**

消费者需在应用入口导入 Token CSS 文件：

```ts
// 应用入口（如 main.ts / _app.tsx）
import '@jiangui-eth/tokens/css'       // :root Token（亮色 + primitive）
import '@jiangui-eth/tokens/dark'      // [data-theme="dark"] 覆盖（可选）
```

组件样式通过 tsup 打包进 `dist/index.css`（T0-11 配置 tsup `injectStyle` 或单独导入）。

---

## 后果与约束

| 方面 | 结论 |
|------|------|
| 动态样式 | 使用 `data-variant` / CSS 自定义属性实现，不用内联 style |
| 类名合并 | 不引入 `clsx`/`cn` 工具，用原生数组 + `filter(Boolean).join(' ')` |
| 样式覆盖 | 消费者通过 `className` prop 追加类，Token 变量覆盖主题 |
| 打包 | tsup 构建时处理 CSS Modules，产物为 `dist/index.css` + `dist/index.mjs/js` |
| SSR | 静态 CSS 文件，完全兼容 Next.js App Router / Remix 等 SSR 框架 |
| RSC | 无 Context 依赖，组件可作为 React Server Components 使用 |

---

## 替代方案被否决的原因

- **CSS-in-JS 被否决**：RSC 不兼容 + 运行时开销是硬性限制；本项目定位为通用组件库，消费者技术栈多样，不能对运行时环境做假设
- **Tailwind 被否决**：原子类不适合组件库封装；消费者项目可能不使用 Tailwind，强依赖会造成额外配置负担
