import { describe, it, expect } from "vitest";
import { parseJsonArray, normalizePOI } from "@/lib/normalize";
import type { Prisma } from "@prisma/client";

describe("parseJsonArray", () => {
  it("解析合法 JSON 数组", () => {
    expect(parseJsonArray('["a","b"]')).toEqual(["a", "b"]);
  });
  it("空值返回空数组", () => {
    expect(parseJsonArray(null)).toEqual([]);
    expect(parseJsonArray("")).toEqual([]);
  });
  it("非 JSON 字符串包装为单元素数组", () => {
    expect(parseJsonArray("/a.jpg")).toEqual(["/a.jpg"]);
  });
});

describe("normalizePOI", () => {
  const row: Prisma.POIGetPayload<object> = {
    id: "poi-x",
    name: "测试咖啡",
    category: "餐饮美食",
    rating: 4.8,
    distance: "300m",
    status: "营业中",
    tags: '["精品","安静"]',
    image: "/c.jpg",
    description: "好喝",
    latitude: 31.2,
    longitude: 121.4,
    isPulse: true,
  };

  it("库行映射为展示模型（含坐标与 tags 解析）", () => {
    const poi = normalizePOI(row);
    expect(poi.location).toEqual({ lat: 31.2, lng: 121.4 });
    expect(poi.tags).toEqual(["精品", "安静"]);
    expect(poi.isPulse).toBe(true);
    expect(poi.name).toBe("测试咖啡");
  });
});
