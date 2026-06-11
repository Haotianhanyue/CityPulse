// ============================================================
// 缓存层：进程内 TTL 缓存，可选 Upstash Redis(REST) 后端
// ------------------------------------------------------------
// 配置 UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN 时走 Redis，
// 否则使用进程内 Map。对调用方完全透明。
// ============================================================
interface Entry {
  value: unknown;
  expires: number;
}
const store = new Map<string, Entry>();

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function isRedisConfigured(): boolean {
  return Boolean(REST_URL && REST_TOKEN);
}

async function redisCommand(path: string): Promise<unknown> {
  const res = await fetch(`${REST_URL}/${path}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const json = await res.json();
  return json.result;
}

/** 读多写少数据的缓存包装：命中返回缓存，否则执行 producer 并回填 */
export async function cached<T>(
  key: string,
  ttlMs: number,
  producer: () => Promise<T>,
): Promise<T> {
  if (isRedisConfigured()) {
    try {
      const hit = await redisCommand(`get/${encodeURIComponent(key)}`);
      if (typeof hit === "string") return JSON.parse(hit) as T;
    } catch {
      /* Redis 不可用 → 直接生产 */
    }
    const fresh = await producer();
    try {
      const ttlSec = Math.max(1, Math.ceil(ttlMs / 1000));
      await redisCommand(
        `set/${encodeURIComponent(key)}/${encodeURIComponent(
          JSON.stringify(fresh),
        )}?EX=${ttlSec}`,
      );
    } catch {
      /* 写缓存失败不影响结果 */
    }
    return fresh;
  }

  const now = Date.now();
  const entry = store.get(key);
  if (entry && entry.expires > now) return entry.value as T;
  const fresh = await producer();
  store.set(key, { value: fresh, expires: now + ttlMs });
  return fresh;
}
