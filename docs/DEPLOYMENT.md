# CityPulse 部署与数据库指南

## 数据库：PostgreSQL + PostGIS

生产与本地完整开发均使用 PostgreSQL + PostGIS。仓储层（`src/lib/repository.ts`）
在数据库不可用时回退 mock，因此**未启动数据库也能浏览**，但登录/写操作需要数据库。

### 本地起步（Docker）

```bash
# 1. 启动 PostgreSQL + PostGIS
docker compose up -d

# 2. 生成 Prisma Client
npm run db:generate

# 3. 应用迁移（首次会创建 postgis 扩展）
npm run db:migrate         # prisma migrate dev

# 4. 填充示例数据（来自 src/data/mock）
npm run db:seed            # tsx prisma/seed.ts

# 5. 启动应用
npm run dev
```

`.env` 默认连接串：
```
DATABASE_URL="postgresql://citypulse:citypulse@localhost:5432/citypulse?schema=public"
```

### 生产部署

```bash
npm run db:deploy          # prisma migrate deploy（不创建新迁移）
npm run db:seed            # 可选：初始化基础数据
npm run build && npm start
```

托管数据库（Supabase / Neon / RDS 等）只需把 `DATABASE_URL` 指向其连接串；
确保实例已启用 PostGIS（`CREATE EXTENSION IF NOT EXISTS postgis;`，迁移会自动处理）。

## Vercel 部署（推公网 HTTPS）

仓库已含 `vercel.json`（`buildCommand: prisma generate && next build`）与 `postinstall: prisma generate`，
Prisma 已加 `rhel-openssl-3.0.x` binary target 适配 Vercel 运行时。

**步骤：**

1. **建一个托管 Postgres**（推荐 [Neon](https://neon.tech) 或 [Supabase](https://supabase.com)，免费档即可），
   开启 PostGIS 扩展，拿到连接串。
2. **导入仓库到 Vercel**（New Project → 选本仓库；Framework 自动识别为 Next.js）。
3. 在 Vercel 项目 **Settings → Environment Variables** 配置：

   | 变量 | 值 |
   |------|----|
   | `DATABASE_URL` | 托管 Postgres 连接串（建议带 `?sslmode=require`）|
   | `NEXTAUTH_SECRET` | 随机长字符串（`openssl rand -base64 32`）|
   | `NEXTAUTH_URL` | 你的 Vercel 域名，如 `https://citypulse.vercel.app` |
   | 其余可选 | `NEXT_PUBLIC_MAPBOX_TOKEN` / OAuth / Cloudinary / VAPID 等按需 |

4. **首次初始化数据库**（本地对着生产库跑一次即可）：
   ```bash
   DATABASE_URL="<生产连接串>" npx prisma db push
   DATABASE_URL="<生产连接串>" npm run db:seed
   ```
5. **Deploy**。完成后即得 `https://<你的项目>.vercel.app`。
   - `.vercelignore` 已排除 `miniprogram/` 等无关目录。
   - Vercel Hobby 默认部署在 iad1；如需就近中国可在 Pro 下于 `vercel.json` 加 `"regions": ["hkg1"]`。

**接入小程序**：把生产域名填到 `miniprogram/src/config.ts` 的 `API_BASE`，
并在 mp.weixin.qq.com → 服务器域名 → **request 合法域名** 加入该域名，小程序真机即可直连。

## PostGIS 空间查询

当前「附近 POI」在应用层用 Haversine 实现（`src/lib/geo.ts`），无需数据库 PostGIS 即可工作。
若要把空间查询下推数据库以支持海量数据，升级路径：

1. 为 `POI` 增加 `geometry(Point, 4326)` 列（原始 SQL 迁移）：
   ```sql
   ALTER TABLE "POI" ADD COLUMN geom geometry(Point, 4326);
   UPDATE "POI" SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);
   CREATE INDEX poi_geom_gix ON "POI" USING GIST (geom);
   ```
2. 用 `prisma.$queryRaw` 调用 `ST_DWithin` / `ST_Distance` 做半径查询与距离排序，
   在 `getPOIs({ near })` 的 try 分支替换 JS 计算。

## 可选外部服务（configure-or-degrade）

下列服务在 `.env` 配置后自动启用，未配置则优雅降级，**不影响应用运行**：

| 服务 | 变量 | 未配置时 |
|------|------|----------|
| Mapbox | `NEXT_PUBLIC_MAPBOX_TOKEN` | 地图占位、搜索/导航提示 |
| Redis 缓存 | `UPSTASH_REDIS_REST_URL/TOKEN` | 进程内内存缓存 |
| Meilisearch | `MEILI_HOST/MEILI_API_KEY` | 仓储层本地过滤 |
| Cloudinary | `CLOUDINARY_CLOUD_NAME/UPLOAD_PRESET` | `/api/upload` 返回 501 |
| Web Push | `NEXT_PUBLIC_VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` | 「开启推送」按钮提示未配置 |
| OAuth | `GITHUB_*` / `GOOGLE_*` | 仅保留开发用 Credentials 登录 |

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm run test` | Vitest 监听模式 |
| `npm run test:run` | 跑一次单元测试 |
| `npm run db:migrate` | 创建并应用迁移（开发） |
| `npm run db:deploy` | 应用迁移（生产） |
| `npm run db:seed` | 填充示例数据 |
| `npm run db:reset` | 重置数据库并重新迁移/种子 |
| `npm run db:studio` | Prisma Studio 可视化 |
