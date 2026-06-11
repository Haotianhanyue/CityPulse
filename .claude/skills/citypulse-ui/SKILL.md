---
name: citypulse-ui
description: Generate or restyle a CityPulse brand-compliant UI component (React + Tailwind design tokens + Framer Motion). Use when the user asks to build a button/card/chip/badge/list-item or any reusable component for the CityPulse app, or to make an existing component match the design system.
---

# CityPulse UI 组件

生成符合 CityPulse 设计系统的 UI 组件。

## 步骤
1. 判断是否需要 `"use client"`（仅 hooks/事件/Framer Motion 时加）。
2. 用 TypeScript 接口声明 props（带 JSDoc）。
3. 颜色/字体/间距 **只用** `tailwind.config.ts` 的 Token，禁止裸 hex。
4. 动画用 Framer Motion；可复用基组件优先从 `@/components/ui/` 引入。

## 模板
```tsx
"use client"; // 仅在需要时
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

interface ComponentNameProps {
  /** 标题 */
  title: string;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ComponentName({ title, variant = "default", onClick }: ComponentNameProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "bg-surface rounded-xl shadow-sm transition-shadow",
        variant === "compact" ? "p-sm" : "p-md",
      )}
    >
      <h3 className="font-headline-md text-headline-lg-mobile text-on-surface">{title}</h3>
    </motion.button>
  );
}
```

## 现有基组件（`@/components/ui/`）
- `Button` — `variant: primary|secondary|ghost`、`size: sm|md|lg`、`icon`、`fullWidth`
- `Card` — `hoverable`
- `Chip` — `label`、`icon`、`active`
- `Icon` — `<Icon name="star" filled size={24} />`（Material Symbols）
- `Avatar` — `<Avatar src alt size="sm|md|lg|xl" bordered />`
- `Skeleton` / `CardSkeletons` / `EmptyState`（`States`）— 取数三态占位

## Token 速查
颜色：`primary`#ab3500 · `primary-container`#ff6b35 · `secondary`#24619d · `secondary-container`#87bcfe · `surface` · `on-surface` · `on-surface-variant`。
间距：`xs`4 `sm`8 `md`16 `lg`24 `xl`32 `2xl`48 · 横向 `px-margin-mobile md:px-margin-desktop`。
> 暗色模式自动随 CSS 变量切换，无需写 `dark:`（除非用了非 Token 原生色）。
