import Taro from "@tarojs/taro";
import { API_BASE } from "@/config";
import { mockRoutes, mockPosts, mockPOIs } from "@/data/mock";
import type { Route, Post, POI, Paginated, Collection } from "@/types";

// ============================================================
// 数据请求层
// ------------------------------------------------------------
// API_BASE（见 src/config.ts）非空时走真实 /api/* 接口，请求失败自动回退 mock；
// 留空则直接使用内置 mock 数据。
// ============================================================
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

async function get<T>(path: string): Promise<T | null> {
  if (!API_BASE) return null;
  try {
    const res = await Taro.request({ url: `${API_BASE}${path}`, method: "GET" });
    if (res.statusCode >= 200 && res.statusCode < 300) return res.data as T;
  } catch {
    /* 网络失败 → 回退 mock */
  }
  return null;
}

export async function fetchRoutes(params: {
  category?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paginated<Route>> {
  const { category, page = 1, pageSize = 10 } = params;
  const remote = await get<Paginated<Route>>(
    `/api/routes?category=${category ?? ""}&page=${page}&pageSize=${pageSize}`,
  );
  if (remote) return remote;

  let items = mockRoutes;
  if (category && category !== ALL) items = items.filter((r) => r.category === category);
  return paginate(items, page, pageSize);
}

export async function fetchRouteById(id: string): Promise<Route | null> {
  const remote = await get<{ data: Route }>(`/api/routes/${id}`);
  if (remote?.data) return remote.data;
  return mockRoutes.find((r) => r.id === id) ?? mockRoutes[0] ?? null;
}

export async function fetchFeed(params: {
  filter?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paginated<Post>> {
  const { filter, page = 1, pageSize = 12 } = params;
  const remote = await get<Paginated<Post>>(
    `/api/feed?filter=${filter ?? ""}&page=${page}&pageSize=${pageSize}`,
  );
  if (remote) return remote;

  let items = mockPosts;
  if (filter === "trending") items = items.filter((p) => p.isTrending);
  return paginate(items, page, pageSize);
}

export async function fetchPOIs(params: {
  category?: string;
}): Promise<Collection<POI>> {
  const { category } = params;
  const remote = await get<Collection<POI>>(`/api/explore?category=${category ?? ""}`);
  if (remote) return remote;

  let items = mockPOIs;
  if (category && category !== ALL) items = items.filter((p) => p.category === category);
  return { data: items, total: items.length };
}
