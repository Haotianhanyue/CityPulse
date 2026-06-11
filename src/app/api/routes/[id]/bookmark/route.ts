import { NextResponse, NextRequest } from "next/server";
import { resolveUserId, toggleRouteBookmark } from "@/lib/interactions";

export const dynamic = "force-dynamic";

// POST /api/routes/[id]/bookmark - 收藏/取消（toggle）
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await resolveUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "需要登录或提供 x-guest-id" },
        { status: 401 },
      );
    }
    const result = await toggleRouteBookmark(userId, params.id);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("POST /api/routes/[id]/bookmark error:", error);
    return NextResponse.json(
      { error: "写入失败（需要数据库；mock 演示数据不支持写入）" },
      { status: 503 },
    );
  }
}
