import Taro from "@tarojs/taro";
import { API_BASE } from "@/config";

// ============================================================
// 互动写入（点赞 / 收藏）
// ------------------------------------------------------------
// 用持久化的访客 id（x-guest-id 头）标识用户，调用后端 toggle 接口。
// API_BASE 为空或请求失败时返回 null，由页面回退本地乐观状态。
// ============================================================
const GUEST_KEY = "citypulse_guest_id";

export function getGuestId(): string {
  let id = Taro.getStorageSync(GUEST_KEY);
  if (!id) {
    id = "g" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    Taro.setStorageSync(GUEST_KEY, id);
  }
  return id;
}

export interface ToggleResult {
  active: boolean;
  count: number;
}

async function toggle(path: string): Promise<ToggleResult | null> {
  if (!API_BASE) return null;
  try {
    const res = await Taro.request({
      url: `${API_BASE}${path}`,
      method: "POST",
      header: { "x-guest-id": getGuestId() },
    });
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return (res.data as { data: ToggleResult }).data;
    }
  } catch {
    /* 网络/写入失败 → 回退本地乐观 */
  }
  return null;
}

export const likeRoute = (id: string) => toggle(`/api/routes/${id}/like`);
export const bookmarkRoute = (id: string) => toggle(`/api/routes/${id}/bookmark`);
