import { describe, it, expect, vi } from "vitest";

// 模拟数据库不可用，验证仓储层回退 mock + 过滤/分页/排序逻辑
vi.mock("@/lib/db", () => {
  const reject = () => Promise.reject(new Error("no db"));
  return {
    prisma: {
      route: { findMany: reject, count: reject },
      post: { findMany: reject, count: reject },
      pOI: { findMany: reject },
    },
  };
});

import { getRoutes, getFeed, getPOIs } from "@/lib/repository";
import { mockRoutes, mockPosts, mockPOIs } from "@/data/mock";
import { haversineKm } from "@/lib/geo";

describe("getRoutes（回退）", () => {
  it("无筛选返回全部（mock）", async () => {
    const res = await getRoutes({});
    expect(res.total).toBe(mockRoutes.length);
    expect(res.data.length).toBeLessThanOrEqual(10);
  });

  it("「精选」等同全部", async () => {
    const res = await getRoutes({ category: "精选" });
    expect(res.total).toBe(mockRoutes.length);
  });

  it("按分类过滤", async () => {
    const res = await getRoutes({ category: "文化探访" });
    expect(res.data.every((r) => r.category === "文化探访")).toBe(true);
    expect(res.total).toBeGreaterThan(0);
  });

  it("分页 hasMore 正确", async () => {
    const res = await getRoutes({ pageSize: 1, page: 1 });
    expect(res.data).toHaveLength(1);
    expect(res.hasMore).toBe(mockRoutes.length > 1);
  });
});

describe("getFeed（回退）", () => {
  it("trending 过滤", async () => {
    const res = await getFeed({ filter: "trending" });
    expect(res.data.every((p) => p.isTrending)).toBe(true);
  });

  it("无筛选返回全部", async () => {
    const res = await getFeed({ pageSize: 50 });
    expect(res.total).toBe(mockPosts.length);
  });
});

describe("getPOIs（回退 + 空间排序）", () => {
  it("返回全部 POI", async () => {
    const res = await getPOIs({});
    expect(res.total).toBe(mockPOIs.length);
  });

  it("near 时按距离单调升序", async () => {
    const origin = { lat: 31.2304, lng: 121.4737 };
    const res = await getPOIs({ near: origin });
    const dists = res.data.map((p) => haversineKm(origin, p.location));
    const sorted = [...dists].sort((a, b) => a - b);
    expect(dists).toEqual(sorted);
    res.data.forEach((p) => expect(p.distance).toMatch(/(m|km)$/));
  });
});
