import { NextResponse, NextRequest } from "next/server";
import { getFeed } from "@/lib/repository";
import { cached } from "@/lib/cache";

export const dynamic = "force-dynamic";

// GET /api/feed - 社区动态（含数据库为空时的 mock 回退 + 缓存）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = {
    type: searchParams.get("type") ?? undefined,
    filter: searchParams.get("filter") ?? undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: Number(searchParams.get("pageSize") || 12),
  };
  const result = await cached(`feed:${JSON.stringify(params)}`, 30_000, () =>
    getFeed(params),
  );
  return NextResponse.json(result);
}
