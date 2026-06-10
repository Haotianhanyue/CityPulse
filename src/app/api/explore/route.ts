import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/explore - POI 发现
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const where: Record<string, unknown> = {};
    if (category) where.category = category;

    const pois = await prisma.pOI.findMany({
      where,
      orderBy: { rating: "desc" },
      take: 20,
    });

    return NextResponse.json({
      data: pois,
      total: pois.length,
      center: lat && lng ? { lat: Number(lat), lng: Number(lng) } : null,
    });
  } catch (error) {
    console.error("GET /api/explore error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
