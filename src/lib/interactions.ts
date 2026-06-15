// ============================================================
// 互动写入层：点赞 / 收藏（toggle）
// ------------------------------------------------------------
// 身份解析：优先 NextAuth 会话（Web）；否则用请求头 x-guest-id 的访客身份
// （小程序场景），按需 upsert 一个访客 User。
// 需要数据库；无库时由 Route Handler 捕获并返回 503。
// ============================================================
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { normalizeComment } from "@/lib/normalize";
import type { Comment } from "@/types";

async function ensureGuestUser(guestId: string): Promise<string> {
  const id = `guest_${guestId}`.slice(0, 64);
  await prisma.user.upsert({
    where: { id },
    update: {},
    create: {
      id,
      name: "访客",
      email: `${id}@guest.citypulse.app`,
      image: "/avatars/user1.jpg",
    },
  });
  return id;
}

/** 解析当前用户 id：会话用户 > 访客(x-guest-id) > null */
export async function resolveUserId(request: NextRequest): Promise<string | null> {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) return session.user.id;

  const guestId = request.headers.get("x-guest-id");
  if (guestId) return ensureGuestUser(guestId);

  return null;
}

export interface ToggleResult {
  active: boolean;
  count: number;
}

export async function toggleRouteLike(
  userId: string,
  routeId: string,
): Promise<ToggleResult> {
  const existing = await prisma.like.findUnique({
    where: { userId_routeId: { userId, routeId } },
  });
  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    const r = await prisma.route.update({
      where: { id: routeId },
      data: { likes: { decrement: 1 } },
    });
    return { active: false, count: r.likes };
  }
  await prisma.like.create({ data: { userId, routeId } });
  const r = await prisma.route.update({
    where: { id: routeId },
    data: { likes: { increment: 1 } },
  });
  return { active: true, count: r.likes };
}

export async function toggleRouteBookmark(
  userId: string,
  routeId: string,
): Promise<ToggleResult> {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_routeId: { userId, routeId } },
  });
  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    const r = await prisma.route.update({
      where: { id: routeId },
      data: { bookmarks: { decrement: 1 } },
    });
    return { active: false, count: r.bookmarks };
  }
  await prisma.bookmark.create({ data: { userId, routeId } });
  const r = await prisma.route.update({
    where: { id: routeId },
    data: { bookmarks: { increment: 1 } },
  });
  return { active: true, count: r.bookmarks };
}

/** 为路线创建评论，并同步递增 Route.comments 计数。返回归一化后的评论。 */
export async function createRouteComment(
  userId: string,
  routeId: string,
  content: string,
): Promise<Comment> {
  const row = await prisma.comment.create({
    data: { content, routeId, authorId: userId },
    include: { author: true },
  });
  await prisma.route.update({
    where: { id: routeId },
    data: { comments: { increment: 1 } },
  });
  return normalizeComment(row);
}

/** 为动态创建评论，并同步递增 Post.comments 计数。返回归一化后的评论。 */
export async function createPostComment(
  userId: string,
  postId: string,
  content: string,
): Promise<Comment> {
  const row = await prisma.comment.create({
    data: { content, postId, authorId: userId },
    include: { author: true },
  });
  await prisma.post.update({
    where: { id: postId },
    data: { comments: { increment: 1 } },
  });
  return normalizeComment(row);
}
