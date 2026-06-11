import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { getRoutes } from "@/lib/repository";
import { cached } from "@/lib/cache";

export const dynamic = "force-dynamic";

const createRouteSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().max(500).optional(),
  category: z
    .enum(["城市漫步", "夜骑", "文化探访", "美食之旅"])
    .optional(),
  location: z.string().min(1),
  distance: z.string(),
  duration: z.string(),
  difficulty: z.enum(["轻松", "中等", "挑战"]).optional(),
  coverImage: z.string().optional(),
  stops: z
    .array(
      z.object({
        order: z.number(),
        name: z.string(),
        nameEn: z.string().optional(),
        time: z.string(),
        description: z.string(),
        images: z.array(z.string()),
        tips: z.string().optional(),
      })
    )
    .optional(),
});

// GET /api/routes - 获取路线列表（含数据库为空时的 mock 回退）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = {
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: Number(searchParams.get("pageSize") || 10),
  };
  // 搜索结果不缓存（变化快），列表浏览缓存 30s
  const result = params.search
    ? await getRoutes(params)
    : await cached(`routes:${JSON.stringify(params)}`, 30_000, () =>
        getRoutes(params),
      );
  return NextResponse.json(result);
}

// POST /api/routes - 创建新路线
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createRouteSchema.parse(body);

    // 从 session 获取 userId (简化处理)
    const authorId = body.authorId;
    if (!authorId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const route = await prisma.route.create({
      data: {
        title: validated.title,
        subtitle: validated.subtitle || "",
        category: validated.category || "城市漫步",
        location: validated.location,
        distance: validated.distance,
        duration: validated.duration,
        difficulty: validated.difficulty || "轻松",
        coverImage: validated.coverImage || "",
        authorId,
        stops: validated.stops
          ? {
              create: validated.stops.map((s) => ({
                ...s,
                images: JSON.stringify(s.images),
              })),
            }
          : undefined,
      },
      include: { author: true, stops: true },
    });

    return NextResponse.json({ data: route }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("POST /api/routes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
