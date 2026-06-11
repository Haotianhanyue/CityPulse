// CityPulse 数据库种子脚本
// 用 src/data/mock 的内置数据填充 PostgreSQL，使真实 Prisma 读路径生效。
// 运行：npm run db:seed（通过 tsx 执行；故使用相对导入而非 @/ 别名）
import { PrismaClient } from "@prisma/client";
import {
  mockRoutes,
  mockPosts,
  mockPOIs,
  mockComments,
  mockUser,
} from "../src/data/mock";
import type { UserProfile } from "../src/types";

const prisma = new PrismaClient();

function parseKm(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

async function main() {
  // 清空（按外键依赖顺序）
  await prisma.comment.deleteMany();
  await prisma.routeStop.deleteMany();
  await prisma.like.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.route.deleteMany();
  await prisma.post.deleteMany();
  await prisma.pOI.deleteMany();
  await prisma.user.deleteMany();

  // 汇总唯一用户（路线 / 评论作者 + 当前用户）
  const users = new Map<string, UserProfile>();
  mockRoutes.forEach((r) => users.set(r.author.id, r.author));
  mockComments.forEach((c) => users.set(c.author.id, c.author));
  users.set(mockUser.id, mockUser);

  for (const u of Array.from(users.values())) {
    await prisma.user.create({
      data: {
        id: u.id,
        name: u.name,
        email: `${u.id}@citypulse.dev`,
        image: u.avatar,
        level: u.level,
        title: u.title,
        totalDistance: parseKm(u.totalDistance),
        spotsExplored: u.spotsExplored,
        routesCreated: u.routesCreated,
        experience: u.experience.current,
      },
    });
  }

  for (const r of mockRoutes) {
    await prisma.route.create({
      data: {
        id: r.id,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        location: r.location,
        distance: r.distance,
        duration: r.duration,
        difficulty: r.difficulty,
        coverImage: r.coverImage,
        isTopRated: r.isTopRated ?? false,
        likes: r.likes,
        bookmarks: r.bookmarks,
        comments: r.comments,
        authorId: r.author.id,
        stops: {
          create: r.stops.map((s) => ({
            order: s.order,
            name: s.name,
            nameEn: s.nameEn,
            time: s.time,
            description: s.description,
            images: JSON.stringify(s.images),
            tips: s.tips,
          })),
        },
      },
    });
  }

  // 社区动态作者在 mock 中均为当前用户（同 id）
  for (const p of mockPosts) {
    await prisma.post.create({
      data: {
        id: p.id,
        type: p.type,
        title: p.title,
        content: p.content,
        images: JSON.stringify(p.images),
        likes: p.likes,
        comments: p.comments,
        bookmarks: p.bookmarks ?? 0,
        isTrending: p.isTrending ?? false,
        authorId: mockUser.id,
      },
    });
  }

  for (const poi of mockPOIs) {
    await prisma.pOI.create({
      data: {
        id: poi.id,
        name: poi.name,
        category: poi.category,
        rating: poi.rating,
        distance: poi.distance,
        status: poi.status,
        tags: JSON.stringify(poi.tags),
        image: poi.image,
        description: poi.description,
        latitude: poi.location.lat,
        longitude: poi.location.lng,
        isPulse: poi.isPulse ?? false,
      },
    });
  }

  // 评论挂到首条路线
  for (const c of mockComments) {
    await prisma.comment.create({
      data: {
        id: c.id,
        content: c.content,
        likes: c.likes,
        authorId: c.author.id,
        routeId: mockRoutes[0].id,
      },
    });
  }

  console.log(
    `✅ Seed 完成：${users.size} 用户 / ${mockRoutes.length} 路线 / ${mockPosts.length} 动态 / ${mockPOIs.length} POI`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed 失败：", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
