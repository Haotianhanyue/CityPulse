# CityPulse Project Agents

## 项目概述
CityPulse 是一款城市漫步探索应用，使用 **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion** 构建。服务端状态统一走 **TanStack Query**，全局 UI 状态用 **Zustand**，数据持久化用 **Prisma**（开发 SQLite / 生产 PostgreSQL），并带 **mock 回退** 使其零配置即可运行。

## AI 资产位置（Claude Code 原生）
Agents 与 Skills 定义在 `.claude/` 下，可被 Claude Code 直接调用：

### Agents（`.claude/agents/`）
| Agent | 用途 | 何时调用 |
|-------|------|----------|
| `citypulse-frontend` | 生成品牌合规的页面/组件，接好取数 hook | 写实际 .tsx 时 |
| `citypulse-api` | Route Handler + repository + normalize + Zod | 新增/修改后端读写链路时 |
| `citypulse-reviewer` | 设计系统/AppRouter/数据层/可访问性审查（只读） | 提交 UI 或 API 改动前 |

### Skills（`.claude/skills/`，`/<name>` 触发）
| Skill | 用途 |
|-------|------|
| `/citypulse-ui` | 生成品牌 UI 组件（Token + Framer Motion） |
| `/citypulse-page` | 脚手架新页面（含 Server/Client 判定与取数接线） |
| `/citypulse-api` | 生成 Route Handler（薄壳 + repository / 写入 Zod） |
| `/citypulse-data` | 接好「DB→UI」五层读路径（repository→normalize→route→api-client→hook） |

> `.qoder/` 下的旧 agents/skills 为 Qoder IDE 历史产物，已被 `.claude/` 取代，新工作请以 `.claude/` 为准。

## 技术栈
- Next.js 14 (App Router) + TypeScript 5 + Tailwind CSS 3 + Framer Motion 11
- 服务端状态：TanStack Query | 全局 UI 状态：Zustand
- 数据库：Prisma + SQLite(dev)/PostgreSQL(prod) | 认证：NextAuth v4 | 地图：Mapbox GL
- 路径别名：`@/` → `./src/`

## 文件结构
```
src/
├── app/                      # 路由 (App Router)
│   ├── layout.tsx            # 根布局（Auth→Query→Theme→Socket Provider 链）
│   ├── page.tsx              # 探索大厅 (Client, useExplore)
│   ├── routes/page.tsx       # 路线列表 (Client, useRoutes)
│   ├── routes/[id]/page.tsx  # 路线详情 (Server, getRouteById)
│   ├── community/page.tsx    # 社区瀑布流 (Client, useFeed 无限滚动)
│   ├── profile/page.tsx      # 个人中心 (Server)
│   └── api/                  # Route Handlers（薄壳，调 repository）
├── lib/
│   ├── db.ts                 # Prisma 单例
│   ├── repository.ts         # 读路径：查询+过滤+分页+mock 回退
│   ├── normalize.ts          # Prisma 行 → src/types 展示模型
│   ├── api-client.ts         # 浏览器端 fetch 封装
│   ├── time.ts               # relativeTime 等工具
│   └── auth.ts               # NextAuth 配置
├── hooks/                    # TanStack Query hooks (useRoutes/useFeed/useExplore)
├── components/
│   ├── ui/                   # 基础 UI (Button/Card/Chip/Icon/States)
│   ├── layout/               # 布局 (BottomNav/Sidebar/TopNav)
│   ├── QueryProvider.tsx     # TanStack Query Provider
│   └── ...                   # BottomSheet/Timeline/RouteCard/FeedCard/MapView 等
├── store/                    # Zustand 状态
├── data/mock.ts              # mock 数据（同时作为 repository 回退源）
└── types/                    # TypeScript 类型 + Paginated/Collection
```

## 数据流（务必遵循）
读路径恒为五层；新增一种数据时全部补齐：
```
Prisma → repository(src/lib/repository.ts) → normalize(src/lib/normalize.ts)
       → API route(src/app/api/*) → api-client(src/lib/api-client.ts) → hook(src/hooks/*) → 页面
```
- 服务端组件可直接 `await getX()`，不经 hook；客户端页面用 Query hook。
- repository 对 Prisma 空结果/异常回退 mock，返回 `Paginated<T>`/`Collection<T>` 展示模型。

## 编码规范
- 页面 `lang="zh-CN"`；颜色/字体/间距只用 `tailwind.config.ts` 的设计 Token。
- 标题字体 Plus Jakarta Sans（`font-headline-*`），正文 Inter（`font-body-*`）；图标 Material Symbols Outlined（`<Icon>`）。
- 移动优先，`md:` 适配桌面；暗色随 CSS 变量自动切换，一般无需 `dark:`。
- `"use client"` 仅在 hooks/事件/动画/客户端取数时使用；客户端组件不导出 `metadata`。
- 组件文件 PascalCase，工具文件 camelCase。
- 改完用 `node_modules/.bin/tsc --noEmit` 验证类型；改 Prisma schema 后 `prisma generate`。
