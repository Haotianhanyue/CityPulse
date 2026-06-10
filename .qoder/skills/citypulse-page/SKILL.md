# CityPulse Page Skill

Generate new page skeletons for CityPulse with proper routing and layout.

## Instructions

When creating a new page:

1. Place in `src/app/[route]/page.tsx`
2. Export default function component
3. Export `metadata` for SEO
4. Use established layout (already configured in `src/app/layout.tsx`)
5. Follow mobile-first responsive design

## Page Template

```tsx
import type { Metadata } from "next";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Title · CityPulse",
  description: "Description of this page's content.",
};

export default function PageName() {
  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      {/* Header */}
      <div className="mb-lg">
        <h1 className="font-headline-lg text-display-lg text-on-surface">
          页面标题
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
          页面描述
        </p>
      </div>

      {/* Filter chips (optional) */}
      <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
        <Chip label="筛选" active />
      </div>

      {/* Main content */}
      <div className="space-y-lg">
        {/* Cards / Content */}
      </div>
    </div>
  );
}
```

## Existing Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | 探索大厅 (地图+BottomSheet) |
| `/routes` | `src/app/routes/page.tsx` | 路线列表 |
| `/routes/[id]` | `src/app/routes/[id]/page.tsx` | 路线详情 |
| `/community` | `src/app/community/page.tsx` | 社区动态 (瀑布流) |
| `/profile` | `src/app/profile/page.tsx` | 个人中心 |

## Layout Rules

- Root layout includes: Sidebar (desktop), TopNav, BottomNav (mobile)
- Pages should NOT add their own navigation
- Use `pb-2xl` on page containers for mobile bottom nav clearance
- Map pages (explore) use `h-screen overflow-hidden` layout

## Page Patterns

### List Page
Filter chips → Search bar → Content cards → Load more button

### Detail Page
Hero → Author card → Main content → Actions → Comments → Sidebar (desktop)

### Map Page
Full-screen map → Search overlay → Category chips → BottomSheet

### Profile Page
Profile hero → Stats bento → Content sections (horizontal scroll + grid)
