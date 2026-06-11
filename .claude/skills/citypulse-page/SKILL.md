---
name: citypulse-page
description: Scaffold a new CityPulse page (App Router route) with the right layout, server-vs-client choice, and data wiring. Use when the user wants to add a new screen/route/page to the CityPulse app (e.g. a new tab, a settings page, a detail view).
---

# CityPulse 新页面

为 CityPulse 生成符合布局与取数约定的新页面。

## 步骤
1. 放在 `src/app/<route>/page.tsx`，默认导出组件。
2. **先决定 Server 还是 Client：**
   - 纯展示 / 服务端取数 → Server Component，保留 `export const metadata`，用 `@/lib/repository`。
   - 需要交互筛选 / 客户端取数 → 顶部 `"use client"`，用 `@/hooks` 的 Query hook，**不要**导出 metadata。
3. 不要自带导航栏（根 `layout.tsx` 已含 Sidebar/TopNav/BottomNav）。
4. 移动端容器留 `pb-2xl`；地图类页面用 `h-screen overflow-hidden`。

## Server 页面模板（详情/静态）
```tsx
import type { Metadata } from "next";
import { getRouteById } from "@/lib/repository";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "标题 · CityPulse", description: "..." };

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getRouteById(params.id);
  if (!data) notFound();
  return <div className="px-margin-mobile md:px-margin-desktop py-lg pb-2xl">{/* ... */}</div>;
}
```

## Client 页面模板（列表/筛选）
```tsx
"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { CardSkeletons, EmptyState } from "@/components/ui/States";
import { useRoutes } from "@/hooks/useRoutes";

export default function Page() {
  const [category, setCategory] = useState("精选");
  const { data, isLoading, isError } = useRoutes({ category });
  const items = data?.data ?? [];
  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg">
      <h1 className="font-headline-lg text-display-lg text-on-surface mb-lg">页面标题</h1>
      {isLoading ? <div className="space-y-lg"><CardSkeletons /></div>
        : isError ? <EmptyState icon="error" title="加载失败" />
        : items.length === 0 ? <EmptyState icon="inbox" title="暂无内容" />
        : <div className="space-y-lg">{/* 渲染 items */}</div>}
    </div>
  );
}
```

## 现有页面
| 路由 | 文件 | 类型 |
|------|------|------|
| `/` | `src/app/page.tsx` | Client · 探索大厅（地图+BottomSheet） |
| `/routes` | `src/app/routes/page.tsx` | Client · 路线列表 |
| `/routes/[id]` | `src/app/routes/[id]/page.tsx` | Server · 路线详情 |
| `/community` | `src/app/community/page.tsx` | Client · 社区瀑布流（无限滚动） |
| `/profile` | `src/app/profile/page.tsx` | Server · 个人中心 |

## 页面骨架模式
- **列表页**：筛选 Chips → 搜索栏 → 内容卡片（三态）→ 加载更多。
- **详情页**：Hero → 作者卡 → 主体 → 操作按钮 → 评论 → 桌面侧栏。
- **地图页**：全屏地图 → 搜索浮层 → 分类 Chips → BottomSheet。
