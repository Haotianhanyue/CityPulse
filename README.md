# CityPulse - 城市漫步探索应用

## 项目概述

CityPulse 是一款面向城市探索爱好者的移动优先 Web 应用，帮助用户发现、规划和分享城市漫步路线。应用融合了地图探索、社区互动和路线规划功能，让用户在繁忙的都市中找到独特的生活体验。

## 品牌定位

- **名称**: CityPulse（城市脉动）
- **风格**: Corporate Modern + Soft-Tech Twist
- **个性**: 乐观、可靠、连接者
- **目标用户**: 25-35 岁城市探索爱好者、社交连接者
- **核心价值**: 发现城市中的隐藏宝藏，规划个性化漫步路线，与社区分享体验

### 品牌到技术的映射

| 品牌特质 | 技术需求 | 选型方向 |
|---------|---------|----------|
| Corporate Modern | 专业级 UI 框架、精致动画 | React + Framer Motion |
| Soft-Tech Twist | 柔和过渡、手势交互、触感反馈 | 触摸手势库 + 微交互 |
| 乐观 / 可靠 | 快速加载、零白屏、SSR 首屏 | Next.js App Router (SSR/SSG) |
| 连接者 (社交) | 实时消息、动态推送、分享 | WebSocket + Web Share API |
| 城市探索 (地图) | 高精度地图、POI 标记、导航 | Mapbox GL JS + 地理定位 |
| 移动优先 (25-35岁) | 离线可用、安装到桌面、原生体感 | PWA + Service Worker |

### 交互模式到技术的映射

| 核心交互 | 技术挑战 | 解决方案 |
|---------|---------|----------|
| 底部导航 4 Tab | 客户端路由 + 状态保持 | Next.js Link + Layout Groups |
| FAB 上下文操作 | 全局状态 + 条件渲染 | Zustand 轻量状态管理 |
| 可拖拽 Bottom Sheet | 触摸手势 + 弹性物理动画 | Framer Motion useDrag + AnimatePresence |
| 时间线滚动揭示 | 视口检测 + 入场动画 | IntersectionObserver + Framer Motion variants |
| 地图脉冲标记 | 自定义图层 + 动画叠加 | Mapbox GL custom markers + CSS animations |
| 瀑布流社区 Feed | 不等高卡片布局 + 无限滚动 | CSS Columns + React Query useInfiniteQuery |
| 按钮/卡片微交互 | scale/hover/shadow 状态 | Tailwind transition + Framer Motion whileTap |

---

## 技术选型

### 前端框架

| 层次 | 技术 | 版本 | 选型理由 |
|------|------|------|----------|
| 元框架 | **Next.js** (App Router) | 14.x | SSR/SSG 混合渲染提升 SEO（路线页需要被搜索引擎发现）；Layout Groups 天然适配底部导航/侧边导航的双端布局；Route Handlers 简化 BFF 层 |
| UI 库 | **React** | 18.x | Concurrent Features 保证复杂 Feed 页面的响应性；Server Components 减少客户端 JS 体积；生态系统丰富 |
| 语言 | **TypeScript** | 5.x | Route/POI/User 等复杂数据模型需要类型安全；原型中已定义的接口可直接迁移 |
| 构建工具 | **Turbopack** (Next.js 内置) | - | 替代 Webpack，开发环境 HMR 更快 |

### 样式与 UI

| 层次 | 技术 | 选型理由 |
|------|------|----------|
| CSS 框架 | **Tailwind CSS** | 与现有原型完全一致，设计 Token 可直接迁移至 `tailwind.config.ts`；JIT 编译保证产物体积 |
| 组件库 | **自定义组件** (基于 Radix UI Primitives) | CityPulse 需要高度品牌化的 UI，不适合通用组件库；Radix 提供无障碍基础（Dialog/Popover/Dropdown），Tailwind 负责视觉样式 |
| 动画引擎 | **Framer Motion** | Bottom Sheet 拖拽手势（useDrag）、页面转场（AnimatePresence）、滚动揭示（whileInView）、布局动画（layoutId）一站式解决 |
| 手势交互 | **Framer Motion** (内置) | 替代 react-swipeable，统一动画和手势技术栈 |
| 图标 | **Material Symbols** (Variable Font) | 延续原型设计，支持 FILL/wght/GRAD/opsz 四轴变化 |
| 暗色模式 | **next-themes** | Tailwind 已配置 `darkMode: "class"`，配合 `next-themes` 实现系统/手动切换 |

### 地图与地理

| 层次 | 技术 | 选型理由 |
|------|------|----------|
| 地图引擎 | **Mapbox GL JS** | WebGL 渲染支持自定义脉冲标记动画；Mapbox Studio 可定制与 CityPulse 品牌一致的地图样式（橙色调路线叠加） |
| React 封装 | **react-map-gl** | 声明式 API，支持自定义 Marker/Layer/Popup |
| 路线绘制 | **Mapbox Directions API** | 步行导航路线计算，支持 waypoints |
| POI 搜索 | **Mapbox Geocoding + Search** | 地点搜索、逆地理编码 |
| 地理定位 | **Browser Geolocation API** | "开始导航" 功能获取用户实时位置 |
| 空间数据 | **PostGIS** (后端) | 路线/POI 的空间查询（附近推荐、距离计算） |

### 状态管理与数据获取

| 层次 | 技术 | 选型理由 |
|------|------|----------|
| 全局状态 | **Zustand** | 轻量（<1KB）、无需 Provider 嵌套、适合管理 Bottom Sheet 展开状态/当前 Tab/FAB 菜单等全局 UI 状态 |
| 服务端状态 | **TanStack Query (React Query)** | Feed 无限滚动（useInfiniteQuery）、路线数据缓存、乐观更新（点赞/收藏）；替代手动 fetch + useEffect |
| 表单 | **React Hook Form + Zod** | 评论提交、路线创建、用户注册等表单的验证和管理 |
| 实时通信 | **Socket.IO** | 评论实时推送、通知提醒、在线状态 |

### 后端服务

| 层次 | 技术 | 选型理由 |
|------|------|----------|
| API 层 | **Next.js Route Handlers** | 与前端同仓库，BFF 模式；支持 GET/POST/PUT/DELETE |
| 数据库 | **PostgreSQL** + **PostGIS** | 关系型数据（用户/路线/评论）+ 空间扩展（路线几何/POI 坐标/附近搜索） |
| ORM | **Prisma** | 类型安全的数据库操作，Schema 即文档，自动生成 TypeScript 类型 |
| 缓存 | **Redis** (Upstash) | Feed 缓存、热门路线缓存、会话存储、实时在线计数 |
| 认证 | **NextAuth.js** (Auth.js) | 支持微信/Google/GitHub 社交登录 + JWT；与 Next.js 深度集成 |
| 文件存储 | **Cloudinary** | 路线图片/用户头像上传；自动裁剪、压缩、CDN 分发 |
| 搜索 | **Meilisearch** | 轻量级全文搜索引擎，适合路线/POI/用户的模糊搜索 |

### 部署与基础设施

| 层次 | 技术 | 选型理由 |
|------|------|----------|
| 前端托管 | **Vercel** | Next.js 原生平台，全球 Edge Network，自动 Preview Deployments |
| 容器化 | **Docker** + **Docker Compose** | 后端服务（API/DB/Redis）统一编排 |
| CI/CD | **GitHub Actions** | 自动测试（Harness）→ 构建 → 部署流水线 |
| 监控 | **Sentry** + **Vercel Analytics** | 错误追踪 + Web Vitals 性能监控 |
| CDN | **Cloudflare** | 静态资源加速、DDoS 防护 |

### PWA 与原生能力

| 能力 | 技术 | 用途 |
|------|------|------|
| 离线访问 | **next-pwa** (Serwist) | 已保存路线离线可用，地铁/隧道场景 |
| 安装到桌面 | **Web App Manifest** | "添加到主屏幕"，类原生 App 体验 |
| 原生分享 | **Web Share API** | 调用系统分享面板分享路线 |
| 推送通知 | **Web Push API** | 新评论/点赞/活动通知 |
| 相机调用 | **MediaDevices API** | FAB "拍照" 功能直接调起相机 |

---

## 设计系统

### 色彩体系

| 色彩角色 | 色值 | 用途 |
|---------|------|------|
| Primary | `#ab3500` | 主品牌色（深橙红） |
| Primary Container | `#ff6b35` | 主色容器（活力橙） |
| Secondary | `#24619d` | 辅助色（深蓝） |
| Secondary Container | `#87bcfe` | 辅助色容器（浅蓝） |
| Surface | `#f9f9f9` | 表面背景 |
| On Surface | `#1a1c1c` | 表面上的文字 |
| Background | `#f9f9f9` | 页面背景 |

### 字体规范

| 用途 | 字体族 | 大小 | 行高 | 字重 |
|------|--------|------|------|------|
| Display Large | Plus Jakarta Sans | 40px | 48px | 700 |
| Headline Large | Plus Jakarta Sans | 32px | 40px | 700 |
| Headline Medium | Plus Jakarta Sans | 24px | 32px | 600 |
| Body Large | Inter | 18px | 28px | 400 |
| Body Medium | Inter | 16px | 24px | 400 |
| Label Medium | Inter | 14px | 20px | 600 |
| Caption | Inter | 12px | 16px | 400 |

### 间距系统

| Token | 值 |
|-------|-----|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| margin-mobile | 16px |
| margin-desktop | 32px |

## 页面结构

项目包含以下 7 个页面设计：

### 1. 路线详情 - 桌面端 (`route-detail-desktop`)
- **位置**: HTML 第 1-386 行
- **功能**: 展示单条漫步路线的完整信息
- **关键组件**:
  - 顶部导航栏（品牌 Logo、导航链接、通知、定位、用户头像）
  - Hero 区域（路线标题、标签、统计数据：路程/时长/难度）
  - 作者资料卡片
  - 时间线行程展示（带图片的多个站点）
  - 互动区域（评论输入、点赞/收藏）
  - 侧边栏：路线地图、相关推荐

### 2. 个人中心 - 桌面端 (`profile-desktop`)
- **位置**: HTML 第 388-707 行
- **功能**: 用户个人资料和路线管理
- **关键组件**:
  - 侧边导航（发现/路线/社区/个人中心）
  - Bento Grid 统计展示（等级/步行距离/兴趣点）
  - 保存路线列表
  - 用户发布内容网格

### 3. 个人中心 - 移动端 (`profile-mobile`)
- **位置**: HTML 第 709-1005 行
- **功能**: 移动端个人资料页面
- **关键组件**:
  - 个人资料 Hero 卡片（头像、等级、统计）
  - 新建路线按钮
  - 保存路线横向滚动卡片
  - 我的发布 Bento 风格网格
  - 底部导航栏

### 4. 社区动态 - 桌面端 (`community-feed-desktop`)
- **位置**: HTML 第 1007-1417 行
- **功能**: 社区内容信息流（瀑布流布局）
- **关键组件**:
  - 侧边导航
  - 筛选标签（Trending/Following/Nearby）
  - Masonry 瀑布流卡片（精选路线/隐藏宝藏/拍照圣地/热门活动/建筑美学）
  - 悬浮发布按钮 (FAB)

### 5. 社区动态 - 移动端 (`community-feed-mobile`)
- **位置**: HTML 第 1419-2053 行
- **功能**: 移动端社区信息流
- **关键组件**:
  - 顶部标签切换
  - 文章卡片（作者信息、图片、标题、互动数据）
  - 底部导航栏

### 6. 路线详情 - 移动端 (`route-detail-mobile`)
- **位置**: HTML 第 2055-2440 行
- **功能**: 移动端路线详情 + 地图探索
- **关键组件**:
  - 地图视图（带标记点和分类筛选）
  - 侧边推荐面板（桌面端）
  - 地图/列表模式切换
  - 底部导航栏

### 7. 探索大厅 (`explore-hall`)
- **位置**: HTML 第 2442-2761 行
- **功能**: 全屏地图探索 + 底部推荐面板
- **关键组件**:
  - 全屏地图背景
  - 搜索栏 + 分类 Chips（美食/休闲/地标/购物）
  - 地图标记点（脉冲动画）
  - 可拖拽底部面板（Bottom Sheet）
  - 推荐卡片列表

## 核心交互模式

1. **底部导航栏**: 地图 / 动态(Feed) / 路线 / 我的
2. **悬浮操作按钮 (FAB)**: 快速拍照/新建内容
3. **底部面板 (Bottom Sheet)**: 可拖拽展开的推荐面板
4. **时间线展示**: 虚线连接的路线站点
5. **地图标记**: 带脉冲动画的兴趣点标记
6. **微交互**: 按钮缩放效果、卡片悬停、滚动动画

## 微交互规范

| 交互 | 效果 | 实现方案 | 时长 |
|------|------|----------|------|
| 按钮点击 | `scale(0.95)` | Framer Motion `whileTap` | instant |
| 卡片悬停 | shadow 增强 | Tailwind `group-hover` + `transition-shadow` | 300ms |
| 图片悬停 | `scale(1.05)` | Tailwind `group-hover:scale-105` | 500ms |
| 时间线揭示 | fade + slide up | Framer Motion `whileInView` + variants | 700ms |
| Bottom Sheet | translateY 滑动 | Framer Motion `useDrag` + `animate` | 400ms cubic-bezier |
| 地图标记 | 脉冲扩散 | CSS `@keyframes pulse` | 2s infinite |
| 页面转场 | fade + scale | Framer Motion `AnimatePresence` | 300ms |

# 未来扩展方向

基于 SDD 规划的 7 大扩展方向，以下为当前实现状态与待办计划：

### 1. 框架迁移 — 从原型迁移到 React + Next.js

| 项目 | 状态 | 说明 |
|------|------|------|
| Next.js 14 App Router 脚手架 | ✅ 已完成 | 已使用 App Router + TypeScript 构建 |
| Tailwind CSS 设计 Token 迁移 | ✅ 已完成 | 所有色彩/字体/间距 Token 已配置于 `tailwind.config.ts` |
| 基础组件封装 (Button/Card/Chip/Icon) | ✅ 已完成 | `src/components/ui/` 下 5 个基础组件 |
| 布局组件 (BottomNav/Sidebar/TopNav) | ✅ 已完成 | 桌面侧边栏 + 移动端底部导航双端适配 |
| 4 个核心页面实现 | ✅ 已完成 | 探索大厅 / 路线列表 / 路线详情 / 社区动态 / 个人中心 |
| Framer Motion 动画集成 | ✅ 已完成 | BottomSheet 拖拽、Timeline 揭示、微交互 |
| Zustand 状态管理 | ✅ 已完成 | activeTab / bottomSheet / fabMenu 全局状态 |
| Mock API Routes | ✅ 已完成 | `/api/explore` `/api/routes` `/api/feed` 三个端点 |
| Prisma ORM + 数据库 Schema | ✅ 已完成 | Prisma Schema 已定义（10 模型），SQLite 开发 + PostgreSQL 生产 |
| TanStack Query 数据获取 | ⏳ 待实现 | 当前使用 mock 数据，需接入 React Query |

### 2. 地图集成 — 接入真实地图引擎

| 项目 | 状态 | 说明 |
|------|------|------|
| Mapbox GL JS + react-map-gl 依赖 | ✅ 已安装 | `package.json` 已包含依赖 |
| 探索大厅页地图占位布局 | ✅ 已完成 | 全屏地图区域 + 搜索栏 + 分类 Chips |
| 脉冲标记动画 (CSS) | ✅ 已完成 | `animate-marker-pulse` keyframes 已定义 |
| 地图实际渲染集成 | ✅ 已完成 | MapView 组件已实现，支持有/无 Token 双模式降级 |
| Directions API 步行路线 | ⏳ 待实现 | 路线详情页的步行导航路径绘制 |
| Geocoding / POI 搜索 | ⏳ 待实现 | 搜索栏接入 Mapbox Geocoding API |
| 自定义地图样式 | ⏳ 待实现 | Mapbox Studio 定制 CityPulse 品牌橙色调地图 |
| PostGIS 空间查询 | ⏳ 待实现 | 附近推荐、距离计算等空间查询 |

### 3. 后端服务 — API + 数据库

| 项目 | 状态 | 说明 |
|------|------|------|
| Route Handlers 框架 | ✅ 已完成 | 3 个 GET 端点已实现 (explore/routes/feed) |
| TypeScript 数据模型 | ✅ 已完成 | `src/types/index.ts` 定义 Route/Post/POI/UserProfile/Comment |
| Mock 数据层 | ✅ 已完成 | `src/data/mock.ts` 提供完整测试数据 |
| PostgreSQL + PostGIS 搭建 | ⏳ 待实现 | 数据库初始化 + PostGIS 扩展 |
| Prisma Schema 定义 | ✅ 已完成 | 10 个模型：User/Account/Session/Route/Post/Comment/POI 等 |
| Redis 缓存层 | ⏳ 待实现 | Upstash Redis 集成，Feed/热门路线缓存 |
| Cloudinary 图片上传 | ⏳ 待实现 | 路线图片/用户头像上传与 CDN 分发 |
| Meilisearch 全文搜索 | ⏳ 待实现 | 路线/POI/用户模糊搜索 |
| CRUD 完整实现 | ✅ 已完成 | 路线/帖子/POI 的增删改查，含 Zod 验证 |

### 4. 用户认证 — 社交登录 + 会话管理

| 项目 | 状态 | 说明 |
|------|------|------|
| NextAuth.js 依赖 | ✅ 已安装 | next-auth v4 + @auth/prisma-adapter |
| 社交登录集成 | ✅ 已完成 | GitHub + Google OAuth + Credentials 开发登录 |
| JWT 会话管理 | ✅ 已完成 | JWT 策略 + Token Callback 注入 user.id |
| 用户注册/登录页面 | ✅ 已完成 | 登录页 UI + Credential 表单 + 社交登录按钮 |
| 个人中心与认证联动 | ✅ 已完成 | SessionProvider 全局注入，Auth Context 可用 |
| 权限控制中间件 | ✅ 已完成 | next-auth middleware 守卫 /profile 和 /routes/new |

### 5. 实时功能 — WebSocket 通信

| 项目 | 状态 | 说明 |
|------|------|------|
| Socket.IO 依赖 | ✅ 已安装 | socket.io-client v4.8 |
| 实时评论推送 | ✅ 已完成 | SocketProvider 上下文 + 模拟实时数据 |
| 通知提醒系统 | ✅ 已完成 | NotificationBell 组件 + 未读计数 + 已读/清空 |
| 在线状态显示 | ⏳ 待实现 | 用户在线/离线状态 |
| 实时在线计数 | ⏳ 待实现 | 社区动态在线人数 |

### 6. PWA — 离线与安装能力

| 项目 | 状态 | 说明 |
|------|------|------|
| Web App Manifest | ✅ 已完成 | `public/manifest.json` 已配置 |
| next-pwa (Serwist) 集成 | ⏳ 待实现 | Service Worker 注册 + 离线缓存策略（待后续实现）|
| 离线路线数据 | ⏳ 待实现 | 已保存路线离线可用（地铁/隧道场景） |
| 安装到主屏幕 | ✅ 已完成 | InstallPrompt 组件监听 beforeinstallprompt |
| Web Push 通知 | ⏳ 待实现 | 新评论/点赞/活动推送通知 |
| MediaDevices 相机调用 | ⏳ 待实现 | FAB 拍照功能调起相机 |
| Web Share API | ⏳ 待实现 | 调用系统分享面板分享路线 |

### 7. 暗色模式 — 主题切换

| 项目 | 状态 | 说明 |
|------|------|------|
| Tailwind `darkMode: "class"` 配置 | ✅ 已完成 | `tailwind.config.ts` 已设置 |
| next-themes 集成 | ✅ 已安装 | next-themes v0.4 + ThemeProvider 封装 |
| 暗色 Token 定义 | ✅ 已完成 | 23 个暗色 CSS 变量覆盖（globals.css .dark）|
| 主题切换按钮 | ✅ 已完成 | ThemeToggle 组件，TopNav 集成明暗切换 |
| 组件暗色适配 | ⏳ 待实现 | 所有组件添加 `dark:` 变体样式 |
| 系统主题跟随 | ✅ 已完成 | next-themes attribute="class" 支持 system/light/dark |

### 实施优先级

```
高优先级 (基础能力) — ✅ 全部完成
├── ✅ 3. 后端服务 → Prisma Schema + CRUD API (数据持久化基础)
├── ✅ 4. 用户认证 → NextAuth.js + 登录页 + Middleware (登录前置)
└── ✅ 2. 地图集成 → MapView 渲染 + 无 Token 降级 (核心价值)

中优先级 (体验提升) — ✅ 核心完成
├── ✅ 7. 暗色模式 → next-themes + 23 暗色 Token + 切换按钮
├── ✅ 5. 实时功能 → SocketProvider + NotificationBell 通知
└── ⏳ 6. PWA → InstallPrompt 已完成，Service Worker + 离线待实现

待优化项
├── TanStack Query 数据获取（当前使用直接 fetch）
├── Redis 缓存层 / Cloudinary 图片 / Meilisearch 搜索
├── Directions API 步行路线 / Geocoding POI 搜索
├── 组件暗色 dark: 变体全面适配
├── 性能: Lighthouse 90+ / 代码分割 / 图片优化
├── 测试: Vitest 单元测试 + Playwright E2E
└── 部署: Vercel + Docker + GitHub Actions CI/CD
```
