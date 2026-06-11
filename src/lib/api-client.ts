// ============================================================
// 浏览器端 API 客户端
// ------------------------------------------------------------
// 仅供 TanStack Query 的 queryFn 在客户端调用，统一封装 fetch、
// 查询参数拼接与错误处理。返回结构与 src/types 完全一致。
// ============================================================
import type { Route, Post, POI, Paginated, Collection } from "@/types";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`请求失败：${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

function toQuery(params: object): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "" && value !== null) {
      qs.set(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}

export interface RouteParams {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export function fetchRoutes(params: RouteParams): Promise<Paginated<Route>> {
  return getJSON(`/api/routes${toQuery(params)}`);
}

export interface FeedParams {
  type?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}

export function fetchFeed(params: FeedParams): Promise<Paginated<Post>> {
  return getJSON(`/api/feed${toQuery(params)}`);
}

export interface ExploreParams {
  category?: string;
  lat?: number;
  lng?: number;
}

export function fetchExplore(params: ExploreParams): Promise<Collection<POI>> {
  return getJSON(`/api/explore${toQuery(params)}`);
}
