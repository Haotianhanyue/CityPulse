// ============================================================
// Prisma 行 → 前端类型 的归一化映射
// ------------------------------------------------------------
// 数据库存储的是「原始字段」（如 totalDistance: Float、images: JSON 字符串、
// createdAt: DateTime），而 UI 组件消费的是 src/types 中的展示型模型。
// 这一层把两者解耦，使 API Route 始终返回与 mock 数据完全一致的结构。
// ============================================================
import type { Prisma } from "@prisma/client";
import type { Route, RouteStop, Post, POI, UserProfile, Comment } from "@/types";
import { relativeTime } from "@/lib/time";

const DEFAULT_AVATAR = "/avatars/user1.jpg";

/** 安全解析数据库中以 JSON 字符串存储的数组字段 */
export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [value];
  }
}

type UserRow = Prisma.UserGetPayload<object>;

export function normalizeUser(u: UserRow): UserProfile {
  return {
    id: u.id,
    name: u.name ?? "城市探索者",
    avatar: u.image ?? DEFAULT_AVATAR,
    level: u.level,
    title: u.title,
    totalDistance: `${Math.round(u.totalDistance)}km`,
    spotsExplored: u.spotsExplored,
    routesCreated: u.routesCreated,
    experience: {
      current: u.experience,
      nextLevel: Math.max(1000, Math.ceil((u.experience + 1) / 1000) * 1000),
    },
  };
}

function normalizeStop(s: Prisma.RouteStopGetPayload<object>): RouteStop {
  return {
    order: s.order,
    name: s.name,
    nameEn: s.nameEn ?? undefined,
    time: s.time,
    description: s.description,
    images: parseJsonArray(s.images),
    tips: s.tips ?? undefined,
  };
}

type RouteRow = Prisma.RouteGetPayload<{
  include: { author: true; stops: true };
}>;

export function normalizeRoute(r: RouteRow): Route {
  return {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    category: r.category as Route["category"],
    location: r.location,
    distance: r.distance,
    duration: r.duration,
    difficulty: r.difficulty as Route["difficulty"],
    author: normalizeUser(r.author),
    stops: [...r.stops].sort((a, b) => a.order - b.order).map(normalizeStop),
    likes: r.likes,
    bookmarks: r.bookmarks,
    comments: r.comments,
    coverImage: r.coverImage,
    isTopRated: r.isTopRated,
  };
}

type PostRow = Prisma.PostGetPayload<{ include: { author: true } }>;

export function normalizePost(p: PostRow): Post {
  return {
    id: p.id,
    type: p.type as Post["type"],
    author: normalizeUser(p.author),
    title: p.title,
    content: p.content,
    images: parseJsonArray(p.images),
    likes: p.likes,
    comments: p.comments,
    bookmarks: p.bookmarks,
    createdAt: relativeTime(p.createdAt),
    isTrending: p.isTrending,
  };
}

type CommentRow = Prisma.CommentGetPayload<{ include: { author: true } }>;

export function normalizeComment(c: CommentRow): Comment {
  return {
    id: c.id,
    author: normalizeUser(c.author),
    content: c.content,
    createdAt: relativeTime(c.createdAt),
    likes: c.likes,
  };
}

export function normalizePOI(p: Prisma.POIGetPayload<object>): POI {
  return {
    id: p.id,
    name: p.name,
    category: p.category as POI["category"],
    rating: p.rating,
    distance: p.distance,
    status: p.status as POI["status"],
    tags: parseJsonArray(p.tags),
    image: p.image,
    description: p.description,
    location: { lat: p.latitude, lng: p.longitude },
    isPulse: p.isPulse,
  };
}
