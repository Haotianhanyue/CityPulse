import { describe, it, expect } from "vitest";
import { pushResultMessage, isPushSupported } from "@/lib/push";

describe("pushResultMessage", () => {
  it("每种结果都有非空中文提示", () => {
    const results = [
      "subscribed",
      "unsupported",
      "denied",
      "unconfigured",
      "failed",
    ] as const;
    results.forEach((r) => {
      const msg = pushResultMessage(r);
      expect(typeof msg).toBe("string");
      expect(msg.length).toBeGreaterThan(0);
    });
  });

  it("订阅成功提示包含关键词", () => {
    expect(pushResultMessage("subscribed")).toContain("已开启");
  });
});

describe("isPushSupported", () => {
  it("node 环境（无 window）返回 false", () => {
    expect(isPushSupported()).toBe(false);
  });
});
