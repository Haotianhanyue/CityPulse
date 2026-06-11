// ============================================================
// 数据仓储层 (Repository)
// ------------------------------------------------------------
// 统一封装「读」路径：优先查询 Prisma，若数据库为空 / 未初始化 / 出错，
// 则平滑回退到 src/data/mock 的内置数据。这样：
//   1. 无需任何数据库配置即可完整运行（开发 / 演示友好）；
//   2. 一旦执行 `prisma db push` + seed，自动切换到真实数据；
//   3. API Route 与服务端组件共享同一套查询与过滤逻辑。
// 返回结构始终为前端类型（src/types），由 normalize 层保证。
// ============================================================
import { prisma } from "@/lib/db";
import { mockRoutes, mockPosts, mockPOIs } from "@/data/mock";
import { normalizeRoute, normalizePost, normalizePOI } from "@/lib/normalize";
import { sortByDistance, type LatLng } from "@/lib/geo";
import type { Route, Post, POI, Paginated, Collection } from "@/types";

/** 代表「全部」的筛选 chip，不参与 where 过滤 */
const ALL = "精选";

function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const total = items.length;
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    hasMore: total > page * pageSize,
  };
}

// ---------------------------------------------------------------
// 路线
// ---------------------------------------------------------------
export interface RouteQuery {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getRoutes({
  category,
  search,
  page = 1,
  pageSize = 10,
}: RouteQuery): Promise<Paginated<Route>> {
  try {
    const where: Prismalike = {};
    if (category && category !== ALL) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const [rows, total] = await Promise.all([
      prisma.route.findMany({
        where,
        include: { author: true, stops: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.route.count({ where }),
    ]);

    if (rows.length === 0) throw new EmptyResult();
    return {
      data: rows.map(normalizeRoute),
      total,
      page,
      pageSize,
      hasMore: total > page * pageSize,
    };
  } catch {
    let items = mockRoutes;
    if (category && category !== ALL) {
      items = items.filter((r) => r.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q),
      );
    }
    return paginate(items, page, pageSize);
  }
}

export async function getRouteById(id: string): Promise<Route | null> {
  try {
    const row = await prisma.route.findUnique({
      where: { id },
      include: { author: true, stops: true },
    });
    if (row) return normalizeRoute(row);
  } catch {
    /* fall through to mock */
  }
  return mockRoutes.find((r) => r.id === id) ?? mockRoutes[0] ?? null;
}

// ---------------------------------------------------------------
// 社区动态
// ---------------------------------------------------------------
export interface FeedQuery {
  type?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}

export async function getFeed({
  type,
  filter,
  page = 1,
  pageSize = 12,
}: FeedQuery): Promise<Paginated<Post>> {
  try {
    const where: Prismalike = {};
    if (type) where.type = type;
    if (filter === "trending") where.isTrending = true;

    const [rows, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { author: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.post.count({ where }),
    ]);

    if (rows.length === 0) throw new EmptyResult();
    return {
      data: rows.map(normalizePost),
      total,
      page,
      pageSize,
      hasMore: total > page * pageSize,
    };
  } catch {
    let items = mockPosts;
    if (type) items = items.filter((p) => p.type === type);
    if (filter === "trending") items = items.filter((p) => p.isTrending);
    return paginate(items, page, pageSize);
  }
}

// ---------------------------------------------------------------
// 兴趣点 (POI)
// ---------------------------------------------------------------
export interface ExploreQuery {
  category?: string;
  /** 用户当前位置，提供时按距离排序（PostGIS 空间查询的应用层等价物） */
  near?: LatLng;
}

export async function getPOIs({
  category,
  near,
}: ExploreQuery): Promise<Collection<POI>> {
  let items: POI[];
  try {
    const where: Prismalike = {};
    if (category && category !== ALL) where.category = category;

    const rows = await prisma.pOI.findMany({
      where,
      orderBy: { rating: "desc" },
      take: 20,
    });
    if (rows.length === 0) throw new EmptyResult();
    items = rows.map(normalizePOI);
  } catch {
    items = mockPOIs;
    if (category && category !== ALL) {
      items = items.filter((p) => p.category === category);
    }
  }

  if (near) items = sortByDistance(items, near);
  return { data: items, total: items.length };
}

// 内部辅助：用 throw 触发 mock 回退分支，语义比返回空更清晰
class EmptyResult extends Error {}
// Prisma where 子句的轻量结构类型，避免到处写 Record<string, unknown>
type Prismalike = Record<string, unknown>;
