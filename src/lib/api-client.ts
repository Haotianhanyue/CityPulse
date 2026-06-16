// ============================================================
// 浏览器端 API 客户端
// ------------------------------------------------------------
// 仅供 TanStack Query 的 queryFn 在客户端调用，统一封装 fetch、
// 查询参数拼接与错误处理。返回结构与 src/types 完全一致。
// ============================================================
import type { Route, Post, POI, Comment, Paginated, Collection } from "@/types";

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
  difficulty?: string;
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

export function fetchRouteComments(id: string): Promise<Collection<Comment>> {
  return getJSON(`/api/routes/${id}/comments`);
}

export async function postRouteComment(
  id: string,
  content: string,
): Promise<Comment> {
  return postComment(`/api/routes/${id}/comments`, content);
}

export function fetchPostComments(id: string): Promise<Collection<Comment>> {
  return getJSON(`/api/feed/${id}/comments`);
}

export async function postPostComment(
  id: string,
  content: string,
): Promise<Comment> {
  return postComment(`/api/feed/${id}/comments`, content);
}

/** 评论发布的共用 POST 封装（路线 / 动态共享） */
async function postComment(path: string, content: string): Promise<Comment> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    throw new Error(`发布失败：${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { data: Comment };
  return json.data;
}

/** 创建路线（authorId 由服务端从 session 解析，前端不传） */
export async function createRoute(body: unknown): Promise<Route> {
  const res = await fetch(`/api/routes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(
      (msg as { error?: string }).error || `创建失败：${res.status}`,
    );
  }
  const json = (await res.json()) as { data: Route };
  return json.data;
}
