# CityPulse UI Skill

Generate CityPulse brand-compliant UI components.

## Instructions

When creating UI components for CityPulse:

1. **Always use design tokens** from `tailwind.config.ts`
2. **Use TypeScript** with explicit prop interfaces
3. **Mark client components** with `"use client"` only when needed
4. **Use Framer Motion** for all animations and interactions
5. **Follow mobile-first** responsive design

## Component Structure

```tsx
"use client"; // Only if using hooks/events/animations
import { clsx } from "clsx";
import { motion } from "framer-motion"; // For animations
import { Icon } from "@/components/ui/Icon";

interface ComponentNameProps {
  // Props with JSDoc comments
  title: string;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ComponentName({ title, variant = "default", onClick }: ComponentNameProps) {
  return (
    <div className={clsx("bg-surface rounded-xl shadow-sm", ...)}>
      {/* Content */}
    </div>
  );
}
```

## Available Base Components

Import from `@/components/ui/`:
- `Button` - `variant: "primary" | "secondary" | "ghost"`, `size: "sm" | "md" | "lg"`, `icon` prop
- `Card` / `CardImage` - Container with `hoverable` prop
- `Chip` - Filter tag with `active`, `icon`, `label` props
- `Icon` - `<Icon name="star" filled size={24} />` (Material Symbols)
- `Avatar` - `<Avatar src="..." alt="..." size="sm|md|lg|xl" bordered />`

## Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #ab3500 | Main brand color (deep orange-red) |
| `primary-container` | #ff6b35 | Container/highlight (vibrant orange) |
| `secondary` | #24619d | Links/info (deep blue) |
| `secondary-container` | #87bcfe | Info container (light blue) |
| `surface` | #f9f9f9 | Card/page background |
| `on-surface` | #1a1c1c | Primary text |
| `on-surface-variant` | #594139 | Secondary text |

## Spacing Reference

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight gaps |
| `sm` | 8px | Small padding/gaps |
| `md` | 16px | Default padding |
| `lg` | 24px | Section gaps |
| `xl` | 32px | Large gaps |
| `2xl` | 48px | Page bottom padding |
| `margin-mobile` | 16px | Mobile horizontal padding |
| `margin-desktop` | 32px | Desktop horizontal padding |
