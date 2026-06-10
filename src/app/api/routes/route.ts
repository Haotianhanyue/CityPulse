import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

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

// GET /api/routes - 获取路线列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const [routes, total] = await Promise.all([
      prisma.route.findMany({
        where,
        include: { author: true, stops: { orderBy: { order: "asc" } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.route.count({ where }),
    ]);

    return NextResponse.json({ data: routes, total, page, pageSize });
  } catch (error) {
    console.error("GET /api/routes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
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
