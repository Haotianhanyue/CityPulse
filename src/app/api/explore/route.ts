import { NextResponse, NextRequest } from "next/server";
import { getPOIs } from "@/lib/repository";
import { cached } from "@/lib/cache";

export const dynamic = "force-dynamic";

// GET /api/explore - POI 发现（含数据库为空时的 mock 回退 + 缓存）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const near = lat && lng ? { lat: Number(lat), lng: Number(lng) } : undefined;

  // 基于位置的查询不缓存；按分类浏览缓存 60s
  const result = near
    ? await getPOIs({ category, near })
    : await cached(`explore:${category ?? "all"}`, 60_000, () =>
        getPOIs({ category }),
      );

  return NextResponse.json({ ...result, center: near ?? null });
}
