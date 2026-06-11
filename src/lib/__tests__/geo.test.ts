import { describe, it, expect } from "vitest";
import { haversineKm, formatDistance, sortByDistance } from "@/lib/geo";

describe("haversineKm", () => {
  it("同一点距离为 0", () => {
    expect(haversineKm({ lat: 31.23, lng: 121.47 }, { lat: 31.23, lng: 121.47 })).toBe(0);
  });

  it("上海到北京约 1067km（±30km）", () => {
    const d = haversineKm({ lat: 31.23, lng: 121.47 }, { lat: 39.9, lng: 116.4 });
    expect(d).toBeGreaterThan(1037);
    expect(d).toBeLessThan(1097);
  });
});

describe("formatDistance", () => {
  it("小于 1km 显示米", () => {
    expect(formatDistance(0.45)).toBe("450m");
  });
  it("不小于 1km 显示一位小数 km", () => {
    expect(formatDistance(3.21)).toBe("3.2km");
  });
});

describe("sortByDistance", () => {
  const origin = { lat: 0, lng: 0 };
  const items = [
    { id: "far", location: { lat: 10, lng: 10 }, distance: "" },
    { id: "near", location: { lat: 1, lng: 1 }, distance: "" },
    { id: "mid", location: { lat: 5, lng: 5 }, distance: "" },
  ];

  it("按距离升序排列", () => {
    const sorted = sortByDistance(items, origin);
    expect(sorted.map((i) => i.id)).toEqual(["near", "mid", "far"]);
  });

  it("重写 distance 文案", () => {
    const sorted = sortByDistance(items, origin);
    sorted.forEach((i) => expect(i.distance).toMatch(/(m|km)$/));
  });
});
