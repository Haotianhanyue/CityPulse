---
name: citypulse-data
description: Wire a complete CityPulse read path from database to UI — repository function, normalize mapper, API route, api-client fetcher, and TanStack Query hook. Use when the user wants a page/component to fetch a new kind of data, add server-state caching, infinite scroll, or replace mock/direct fetch with the proper query layer.
---

# CityPulse 数据读路径

为一种新数据接好「DB → UI」全链路。CityPulse 的服务端状态统一走 **TanStack Query**，读路径恒为五层。新增一种数据时，按顺序补齐全部五层。

```
Prisma → repository → normalize → API route → api-client → hook → 页面
```

## 层级清单与落点
| 层 | 文件 | 职责 |
|----|------|------|
| 1 仓储 | `src/lib/repository.ts` | 查询 + 过滤 + 分页 + **mock 回退** |
| 2 归一化 | `src/lib/normalize.ts` | Prisma 行 → `src/types` 展示模型 |
| 3 路由 | `src/app/api/<x>/route.ts` | 薄壳：query → repository → JSON |
| 4 客户端 | `src/lib/api-client.ts` | `fetchX()` 封装 fetch + query string |
| 5 Hook | `src/hooks/useX.ts` | `useQuery` / `useInfiniteQuery` |

## 1. repository（Prisma 优先，空/异常回退 mock）
```typescript
export async function getThings({ category, page = 1, pageSize = 10 }: ThingQuery)
  : Promise<Paginated<Thing>> {
  try {
    const where: Record<string, unknown> = {};
    if (category && category !== "精选") where.category = category;
    const [rows, total] = await Promise.all([
      prisma.thing.findMany({ where, include: { author: true }, skip: (page-1)*pageSize, take: pageSize }),
      prisma.thing.count({ where }),
    ]);
    if (rows.length === 0) throw new Error("empty");
    return { data: rows.map(normalizeThing), total, page, pageSize, hasMore: total > page*pageSize };
  } catch {
    return paginate(filterMock(mockThings, category), page, pageSize);
  }
}
```

## 2. normalize（处理 JSON 字符串 / DateTime / 关联）
```typescript
export function normalizeThing(t: Prisma.ThingGetPayload<{ include: { author: true } }>): Thing {
  return {
    id: t.id,
    images: parseJsonArray(t.images),       // JSON 字符串字段
    createdAt: relativeTime(t.createdAt),    // DateTime → 「2小时前」
    author: normalizeUser(t.author),
    // ...
  };
}
```

## 3. api-client（浏览器 fetcher）
```typescript
export function fetchThings(params: ThingParams): Promise<Paginated<Thing>> {
  return getJSON(`/api/things${toQuery(params)}`);
}
```

## 4. hook —— 两种形态
**普通列表（useQuery）** — `src/hooks/useThings.ts`
```typescript
"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchThings, type ThingParams } from "@/lib/api-client";

export function useThings(params: ThingParams = {}) {
  return useQuery({
    queryKey: ["things", params],
    queryFn: () => fetchThings(params),
    placeholderData: keepPreviousData,   // 切筛选不闪烁
  });
}
```

**无限滚动（useInfiniteQuery）** — 参考 `src/hooks/useFeed.ts`
```typescript
return useInfiniteQuery({
  queryKey: ["things", params],
  queryFn: ({ pageParam }) => fetchThings({ ...params, page: pageParam }),
  initialPageParam: 1,
  getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
});
// 页面侧用 IntersectionObserver 命中 sentinel 时调 fetchNextPage()（见 community/page.tsx）
```

## 5. 页面消费（三态）
```tsx
const { data, isLoading, isError } = useThings({ category });
const items = data?.data ?? [];                       // useInfiniteQuery 用 data?.pages.flatMap(p => p.data)
// loading → <CardSkeletons/> ; error → <EmptyState icon="error"/> ; empty → <EmptyState/>
```

## 注意
- 客户端取数页面/Hook 必须 `"use client"`；服务端组件可直接 `await getThings()`，不经 Hook。
- `QueryProvider`（`src/components/QueryProvider.tsx`）已在根 `layout.tsx` 注入，无需重复包裹。
- 全部返回 `src/types` 展示模型；新分页接口用 `Paginated<T>`，集合用 `Collection<T>`。
- 改完跑 `node_modules/.bin/tsc --noEmit`。
