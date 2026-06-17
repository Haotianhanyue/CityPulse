import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { getCommentsByRouteId } from "@/lib/repository";
import { resolveUserId, createRouteComment } from "@/lib/interactions";

export const dynamic = "force-dynamic";

// GET /api/routes/[id]/comments - 评论列表（按时间倒序，mock 回退）
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await getCommentsByRouteId(params.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/routes/[id]/comments error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

const createSchema = z.object({
  content: z.string().trim().min(1).max(500),
});

// POST /api/routes/[id]/comments - 发布评论（需身份；无库时 503）
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
    const body = await request.json();
    const { content } = createSchema.parse(body);
    const comment = await createRouteComment(userId, params.id, content);
    return NextResponse.json({ data: comment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "校验失败", details: error.errors },
        { status: 400 },
      );
    }
    console.error("POST /api/routes/[id]/comments error:", error);
    return NextResponse.json(
      { error: "写入失败（需要数据库；mock 演示数据不支持写入）" },
      { status: 503 },
    );
  }
}
