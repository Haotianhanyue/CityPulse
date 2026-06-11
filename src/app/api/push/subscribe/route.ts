import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// 进程内存储订阅（演示用）。生产环境应持久化到数据库，
// 并用 web-push + VAPID_PRIVATE_KEY 在服务端发送推送。
const subscriptions = new Set<string>();

// POST /api/push/subscribe - 保存浏览器推送订阅
export async function POST(request: NextRequest) {
  try {
    const sub = await request.json();
    if (!sub?.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }
    subscriptions.add(JSON.stringify(sub));

    const configured = Boolean(
      process.env.VAPID_PRIVATE_KEY && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    );
    return NextResponse.json({ ok: true, configured, total: subscriptions.size });
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
