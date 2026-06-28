# Token 规范文档

> **状态：** 已确认  
> **决策 D：** D1 — JSON 文件（代码库）为 Token 源头，设计师参照代码值手动同步 Figma  
> **制定时间：** 2026-06-28

---

## 一、命名规范

### 基础原则

| 规则 | 说明 | 示例 |
|------|------|------|
| **全小写 kebab-case** | 与 CSS 自定义属性风格一致 | `color-bg-surface` |
| **禁止缩写** | 保持语义清晰（`background` 不写 `bg`，除非约定见下） | `color-text-default` |
| **约定缩写白名单** | `bg` = background，`sm/md/lg/xl` = 尺寸，`ds` = 前缀 | `--ds-color-bg-surface` |
| **CSS 变量前缀** | Style Dictionary 编译后统一加 `--ds-` | `--ds-color-primary` |

### 三层结构命名

```
层级          命名格式                     示例
──────────────────────────────────────────────────────
Primitive     {category}-{scale}           color-blue-500
                                           spacing-4
                                           font-size-16

Semantic      {category}-{role}[-{variant}]  color-primary
                                              color-text-default
                                              color-bg-surface
                                              spacing-component-md

Component     {component}-{property}[-{state}]  button-bg-default
                                                 button-bg-hover
                                                 input-border-focus
```

---

## 二、色彩系统

### 2.1 Primitive 色板

**色阶数量：** 每个颜色 11 个色阶（50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 / 950）

| 颜色名 | Primitive 前缀 | 用途定位 |
|--------|----------------|----------|
| gray   | `color-gray-*` | 中性色、文本、背景、边框 |
| blue   | `color-blue-*` | Primary（主色调） |
| green  | `color-green-*` | Success（成功状态） |
| yellow | `color-yellow-*` | Warning（警告状态） |
| red    | `color-red-*` | Error（错误状态） |
| purple | `color-purple-*` | Secondary（辅助强调） |
| teal   | `color-teal-*` | Info（信息提示） |

**示例值（蓝色系参考）：**

| 色阶 | 命名 | 参考值 |
|------|------|--------|
| 50  | `color-blue-50`  | `#eff6ff` |
| 100 | `color-blue-100` | `#dbeafe` |
| 200 | `color-blue-200` | `#bfdbfe` |
| 300 | `color-blue-300` | `#93c5fd` |
| 400 | `color-blue-400` | `#60a5fa` |
| 500 | `color-blue-500` | `#3b82f6` |
| 600 | `color-blue-600` | `#2563eb` |
| 700 | `color-blue-700` | `#1d4ed8` |
| 800 | `color-blue-800` | `#1e40af` |
| 900 | `color-blue-900` | `#1e3a8a` |
| 950 | `color-blue-950` | `#172554` |

> 其他颜色色阶值在 `packages/tokens/src/primitive/color.json` 中定义。

### 2.2 Semantic 色彩命名表

#### 交互色（Interactive）

| Token 名 | 亮色值（引用） | 暗色值（引用） | 含义 |
|----------|--------------|--------------|------|
| `color-primary` | `{color.blue.500}` | `{color.blue.400}` | 主色，CTA 按钮填充色 |
| `color-primary-hover` | `{color.blue.600}` | `{color.blue.300}` | 主色悬浮态 |
| `color-primary-active` | `{color.blue.700}` | `{color.blue.200}` | 主色按下态 |
| `color-primary-subtle` | `{color.blue.50}` | `{color.blue.950}` | 主色浅色背景 |
| `color-secondary` | `{color.purple.500}` | `{color.purple.400}` | 辅助色 |
| `color-secondary-hover` | `{color.purple.600}` | `{color.purple.300}` | 辅助色悬浮态 |

#### 状态色（Status）

| Token 名 | 亮色值（引用） | 暗色值（引用） | 含义 |
|----------|--------------|--------------|------|
| `color-success` | `{color.green.600}` | `{color.green.400}` | 成功 |
| `color-success-subtle` | `{color.green.50}` | `{color.green.950}` | 成功浅色背景 |
| `color-warning` | `{color.yellow.500}` | `{color.yellow.400}` | 警告 |
| `color-warning-subtle` | `{color.yellow.50}` | `{color.yellow.950}` | 警告浅色背景 |
| `color-error` | `{color.red.600}` | `{color.red.400}` | 错误 |
| `color-error-subtle` | `{color.red.50}` | `{color.red.950}` | 错误浅色背景 |
| `color-info` | `{color.teal.600}` | `{color.teal.400}` | 信息提示 |
| `color-info-subtle` | `{color.teal.50}` | `{color.teal.950}` | 信息浅色背景 |

#### 文本色（Text）

| Token 名 | 亮色值（引用） | 暗色值（引用） | 含义 |
|----------|--------------|--------------|------|
| `color-text-default` | `{color.gray.900}` | `{color.gray.50}` | 主要文本 |
| `color-text-subtle` | `{color.gray.600}` | `{color.gray.400}` | 次要文本、占位符 |
| `color-text-disabled` | `{color.gray.400}` | `{color.gray.600}` | 禁用态文本 |
| `color-text-on-primary` | `#ffffff` | `#ffffff` | 主色填充上的文本 |
| `color-text-on-error` | `#ffffff` | `#ffffff` | 错误色填充上的文本 |
| `color-text-link` | `{color.blue.600}` | `{color.blue.400}` | 链接文本 |
| `color-text-link-hover` | `{color.blue.700}` | `{color.blue.300}` | 链接悬浮态 |

#### 背景色（Background）

| Token 名 | 亮色值（引用） | 暗色值（引用） | 含义 |
|----------|--------------|--------------|------|
| `color-bg-surface` | `#ffffff` | `{color.gray.950}` | 页面主背景 |
| `color-bg-subtle` | `{color.gray.50}` | `{color.gray.900}` | 卡片、面板等内嵌背景 |
| `color-bg-elevated` | `#ffffff` | `{color.gray.800}` | 浮层、弹窗背景 |
| `color-bg-overlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` | 遮罩层 |
| `color-bg-disabled` | `{color.gray.100}` | `{color.gray.800}` | 禁用控件背景 |

#### 边框色（Border）

| Token 名 | 亮色值（引用） | 暗色值（引用） | 含义 |
|----------|--------------|--------------|------|
| `color-border-default` | `{color.gray.200}` | `{color.gray.700}` | 默认边框 |
| `color-border-subtle` | `{color.gray.100}` | `{color.gray.800}` | 分割线等浅边框 |
| `color-border-strong` | `{color.gray.400}` | `{color.gray.500}` | 强调边框 |
| `color-border-focus` | `{color.blue.500}` | `{color.blue.400}` | 焦点环 |
| `color-border-error` | `{color.red.500}` | `{color.red.400}` | 错误态边框 |

---

## 三、间距系统

**基准：** 4px

| Token 名 | 值 | px 值 | 常见用途 |
|----------|-----|-------|---------|
| `spacing-0` | `0` | 0px | 重置 |
| `spacing-1` | `0.25rem` | 4px | 细间距，图标与文字间距 |
| `spacing-2` | `0.5rem` | 8px | 小间距，标签内边距 |
| `spacing-3` | `0.75rem` | 12px | 中小间距 |
| `spacing-4` | `1rem` | 16px | 基础单元，常用内边距 |
| `spacing-5` | `1.25rem` | 20px | |
| `spacing-6` | `1.5rem` | 24px | 卡片内边距 |
| `spacing-8` | `2rem` | 32px | 区块间距 |
| `spacing-10` | `2.5rem` | 40px | |
| `spacing-12` | `3rem` | 48px | 大区块 |
| `spacing-16` | `4rem` | 64px | 页面级间距 |
| `spacing-20` | `5rem` | 80px | |
| `spacing-24` | `6rem` | 96px | 超大间距 |

**组件语义间距（引用 Primitive）：**

| Token 名 | 值（引用） | 含义 |
|----------|-----------|------|
| `spacing-component-xs` | `{spacing.1}` | 极小组件内边距 |
| `spacing-component-sm` | `{spacing.2}` | 小尺寸组件内边距（如 Badge） |
| `spacing-component-md` | `{spacing.4}` | 中尺寸组件内边距（默认 Button） |
| `spacing-component-lg` | `{spacing.6}` | 大尺寸组件内边距 |
| `spacing-layout-sm` | `{spacing.4}` | 小屏布局间距 |
| `spacing-layout-md` | `{spacing.8}` | 中屏布局间距 |
| `spacing-layout-lg` | `{spacing.16}` | 大屏布局间距 |

---

## 四、排版系统

### 字号（Font Size）

| Token 名 | 值 | px 值 |
|----------|----|-------|
| `font-size-xs` | `0.75rem` | 12px |
| `font-size-sm` | `0.875rem` | 14px |
| `font-size-md` | `1rem` | 16px（正文基准） |
| `font-size-lg` | `1.125rem` | 18px |
| `font-size-xl` | `1.25rem` | 20px |
| `font-size-2xl` | `1.5rem` | 24px |
| `font-size-3xl` | `1.875rem` | 30px |
| `font-size-4xl` | `2.25rem` | 36px |

### 字重（Font Weight）

| Token 名 | 值 |
|----------|----|
| `font-weight-regular` | `400` |
| `font-weight-medium` | `500` |
| `font-weight-semibold` | `600` |
| `font-weight-bold` | `700` |

### 行高（Line Height）

| Token 名 | 值 | 适用 |
|----------|----|------|
| `line-height-tight` | `1.25` | 标题 |
| `line-height-snug` | `1.375` | 副标题 |
| `line-height-normal` | `1.5` | 正文 |
| `line-height-relaxed` | `1.625` | 长文本阅读 |

---

## 五、圆角系统

| Token 名 | 值 | 用途 |
|----------|----|------|
| `border-radius-none` | `0` | 无圆角 |
| `border-radius-sm` | `0.125rem` | 2px，微小圆角 |
| `border-radius-md` | `0.375rem` | 6px，按钮、输入框 |
| `border-radius-lg` | `0.5rem` | 8px，卡片 |
| `border-radius-xl` | `0.75rem` | 12px，弹窗 |
| `border-radius-2xl` | `1rem` | 16px，大卡片 |
| `border-radius-full` | `9999px` | 圆形/胶囊形 |

---

## 六、阴影系统

| Token 名 | 值 | 用途 |
|----------|----|------|
| `shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` | 按钮、轻浮层 |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | 卡片 |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | 下拉菜单 |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | 弹窗 |
| `shadow-none` | `none` | 无阴影 |

---

## 七、D1 协作约定

Token 源头是代码库中的 JSON 文件，设计师与开发者协作流程如下：

```
开发者修改 packages/tokens/src/ 中的 JSON
       ↓
pnpm turbo build（@jiangui-ds/tokens）
       ↓
生成 dist/css/tokens.css（CSS 变量）
       ↓
设计师参照 CSS 变量值，手动在 Figma 中同步 Variables
```

**变更约定：**
- Token 增减或改名，必须在此文档中同步更新后，再修改 JSON 文件
- 命名变更属于 breaking change，需要 changeset major 版本号
- 仅值变更（如调整色值）属于 patch 版本号

---

## 验收清单（T0-06）

- [x] 命名规范：全小写 kebab-case，CSS 变量前缀 `--ds-`
- [x] 色板范围：7 种颜色 × 11 色阶（50~950）
- [x] Semantic Token 命名表：交互色 / 状态色 / 文本 / 背景 / 边框 全覆盖
- [x] 间距系统：4px 基准，含组件语义间距和布局间距
- [x] 排版：字号 / 字重 / 行高
- [x] 圆角 & 阴影系统
- [x] D1 协作流程已约定
