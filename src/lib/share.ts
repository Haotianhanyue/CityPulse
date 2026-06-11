// ============================================================
// Web Share API 封装（系统分享面板，剪贴板降级）
// ============================================================
export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

/** 优先调用系统分享面板；不支持时复制链接到剪贴板 */
export async function shareContent(data: ShareData): Promise<ShareResult> {
  const url =
    data.url ?? (typeof window !== "undefined" ? window.location.href : "");

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: data.title, text: data.text, url });
      return "shared";
    } catch (err) {
      // 用户取消不算失败
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}
