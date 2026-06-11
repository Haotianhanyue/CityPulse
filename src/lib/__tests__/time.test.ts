import { describe, it, expect } from "vitest";
import { relativeTime } from "@/lib/time";

describe("relativeTime", () => {
  const now = Date.now();

  it("一分钟内显示「刚刚」", () => {
    expect(relativeTime(new Date(now - 10_000))).toBe("刚刚");
  });

  it("分钟级", () => {
    expect(relativeTime(new Date(now - 5 * 60_000))).toBe("5分钟前");
  });

  it("小时级", () => {
    expect(relativeTime(new Date(now - 3 * 3600_000))).toBe("3小时前");
  });

  it("天级", () => {
    expect(relativeTime(new Date(now - 2 * 86_400_000))).toBe("2天前");
  });

  it("非法输入回退原字符串", () => {
    expect(relativeTime("不是时间")).toBe("不是时间");
  });
});
