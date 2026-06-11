import { NextResponse, NextRequest } from "next/server";
import { getRouteById } from "@/lib/repository";

export const dynamic = "force-dynamic";

// GET /api/routes/[id] - 单条路线（含数据库为空时的 mock 回退）
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const route = await getRouteById(params.id);
  if (!route) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ data: route });
}
