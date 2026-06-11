// ============================================================
// 全文搜索：Meilisearch（配置时）或仓储层 + 内存过滤（降级）
// ------------------------------------------------------------
// 配置 MEILI_HOST + MEILI_API_KEY 时查询 Meilisearch 索引，
// 否则读取 repository 数据并在应用层做模糊匹配。统一返回三类结果。
// ============================================================
import { getRoutes, getFeed, getPOIs } from "@/lib/repository";
import type { Route, Post, POI } from "@/types";

const MEILI_HOST = process.env.MEILI_HOST;
const MEILI_KEY = process.env.MEILI_API_KEY;

export function isMeiliConfigured(): boolean {
  return Boolean(MEILI_HOST && MEILI_KEY);
}

export interface SearchResults {
  routes: Route[];
  posts: Post[];
  pois: POI[];
}

async function meiliIndex<T>(index: string, query: string): Promise<T[]> {
  const res = await fetch(`${MEILI_HOST}/indexes/${index}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MEILI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, limit: 8 }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`meili ${res.status}`);
  const json = await res.json();
  return (json.hits ?? []) as T[];
}

export async function searchAll(q: string): Promise<SearchResults> {
  const query = q.trim().toLowerCase();
  if (!query) return { routes: [], posts: [], pois: [] };

  if (isMeiliConfigured()) {
    try {
      const [routes, posts, pois] = await Promise.all([
        meiliIndex<Route>("routes", query),
        meiliIndex<Post>("posts", query),
        meiliIndex<POI>("pois", query),
      ]);
      return { routes, posts, pois };
    } catch {
      /* Meili 不可用 → 回退本地过滤 */
    }
  }

  const [r, f, p] = await Promise.all([
    getRoutes({ pageSize: 50 }),
    getFeed({ pageSize: 50 }),
    getPOIs({}),
  ]);
  const has = (s: string) => s.toLowerCase().includes(query);
  return {
    routes: r.data
      .filter((x) => has(x.title) || has(x.location) || has(x.subtitle))
      .slice(0, 8),
    posts: f.data.filter((x) => has(x.title) || has(x.content)).slice(0, 8),
    pois: p.data.filter((x) => has(x.name) || has(x.description)).slice(0, 8),
  };
}
