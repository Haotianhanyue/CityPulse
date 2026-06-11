// ============================================================
// Web Push 订阅（客户端）
// ------------------------------------------------------------
// 需要环境变量 NEXT_PUBLIC_VAPID_PUBLIC_KEY（公钥）与服务端 VAPID_PRIVATE_KEY。
// 未配置或浏览器不支持时返回明确状态，由 UI 友好提示，不抛错。
// ============================================================
export type PushResult =
  | "subscribed"
  | "unsupported"
  | "denied"
  | "unconfigured"
  | "failed";

export function isPushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const normalized = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(normalized);
  const output = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

export async function subscribeToPush(): Promise<PushResult> {
  if (!isPushSupported()) return "unsupported";

  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) return "unconfigured";

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "denied";

  try {
    const reg =
      (await navigator.serviceWorker.getRegistration()) ??
      (await navigator.serviceWorker.register("/sw.js"));
    await navigator.serviceWorker.ready;

    const existing = await reg.pushManager.getSubscription();
    const sub =
      existing ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      }));

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    return "subscribed";
  } catch {
    return "failed";
  }
}

/** 把订阅结果翻译成可直接展示的中文提示 */
export function pushResultMessage(result: PushResult): string {
  switch (result) {
    case "subscribed":
      return "已开启推送通知 🔔";
    case "unsupported":
      return "当前浏览器不支持推送通知";
    case "denied":
      return "已拒绝通知权限，可在浏览器设置中开启";
    case "unconfigured":
      return "推送服务未配置（需 VAPID 公钥）";
    case "failed":
      return "开启推送失败，请稍后再试";
  }
}
