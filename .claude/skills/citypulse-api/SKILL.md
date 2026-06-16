---
name: citypulse-api
description: Generate a CityPulse Next.js Route Handler that delegates to the repository layer (with Prisma + mock fallback) and, for writes, Zod validation. Use when the user wants to add or change a single internal /api endpoint in the CityPulse app. For wiring a full database→UI read path use citypulse-data; for integrating an external/third-party data source use citypulse-data-bridge.
---

# CityPulse API 端点

生成 CityPulse 的 Route Handler。**业务逻辑写在 repository，Route 只做薄壳。**

## 步骤
1. 端点放 `src/app/api/<resource>/route.ts`（动态：`<resource>/[id]/route.ts`）。
2. 读：在 `src/lib/repository.ts` 加 `getX()`（含 mock 回退），Route 解析 query 后调用它。
3. 写：在 Route 内用 Zod 校验 + Prisma 写入 + 鉴权。
4. 响应结构统一：列表 `Paginated<T>`，集合 `Collection<T>`，单条 `{ data }`。

## GET 模板（薄壳 + repository）
```typescript
import { NextResponse, NextRequest } from "next/server";
import { getThings } from "@/lib/repository";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const result = await getThings({
    category: searchParams.get("category") ?? undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: Number(searchParams.get("pageSize") || 12),
  });
  return NextResponse.json(result);
}
```

## POST 模板（写入：Zod + 鉴权）
```typescript
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.enum(["城市漫步", "夜骑", "文化探访", "美食之旅"]),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const validated = createSchema.parse(await request.json());
    const thing = await prisma.thing.create({ data: { ...validated, authorId: session.user.id } });
    return NextResponse.json({ data: thing }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

## 动态路由 `[id]/route.ts`
```typescript
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const data = await getThingById(params.id);
  if (!data) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json({ data });
}
// PUT / DELETE 同理，写操作前校验 session
```

## 约定
- 资源名复数小写；query 与响应键 camelCase。
- 状态码：400 校验 / 401 未登录 / 403 禁止 / 404 不存在 / 500 内部。
- 常用 query：`page`/`pageSize`/`search`/`category`/`filter`/`lat`/`lng`。
- 新增读端点后 **务必** 同步 `src/lib/api-client.ts` 与 `src/hooks/`（见 citypulse-data 技能）。

## 现有端点
`GET /api/explore` · `GET|POST /api/routes` · `GET /api/feed`。
