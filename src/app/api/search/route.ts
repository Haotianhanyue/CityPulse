import { NextResponse, NextRequest } from "next/server";
import { searchAll } from "@/lib/search";

export const dynamic = "force-dynamic";

// GET /api/search?q= - 跨路线/动态/POI 的全文搜索（Meilisearch 或本地降级）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = await searchAll(q);
  const total =
    results.routes.length + results.posts.length + results.pois.length;
  return NextResponse.json({ ...results, total, query: q });
}
