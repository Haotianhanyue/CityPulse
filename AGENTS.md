# CityPulse Project Agents

## 项目概述
CityPulse 是一款城市漫步探索应用，使用 Next.js 14 + TypeScript + Tailwind CSS + Framer Motion 构建，采用 App Router 架构。

## 可用 Agents

### citypulse-reviewer
代码审查 Agent，专注于 CityPulse 设计系统合规性检查。
- **用途**: 审查代码变更是否符合设计规范
- **触发**: 完成 UI 代码修改后使用
- **检查项**: 色彩 Token、字体规范、响应式设计、可访问性、Next.js 最佳实践

### citypulse-designer
UI 设计 Agent，生成符合 CityPulse 品牌的新页面和组件。
- **用途**: 创建新页面、组件变体或功能设计
- **触发**: 需要新增页面或功能时
- **输出**: 符合设计系统的 React + Tailwind CSS 组件代码

### citypulse-api
后端 API 开发 Agent，负责设计 RESTful 接口与数据库操作。
- **用途**: 创建新 API 路由、优化数据库查询
- **触发**: 需要新增或修改后端接口时
- **输出**: Next.js Route Handler + Prisma Schema

## 可用 Skills

### /citypulse-ui
生成 CityPulse 品牌 UI 组件，确保设计系统一致性。

### /citypulse-route
生成路线相关的页面内容（详情页、时间线、地图、推荐卡片等）。

### /citypulse-page
生成新页面骨架，自动配置路由和布局。

### /citypulse-api
生成 Next.js API Route Handler，含请求验证和错误处理。

## 开发约定

### 技术栈
- Next.js 14 (App Router) + TypeScript 5 + Tailwind CSS 3 + Framer Motion
- 状态管理: Zustand | 数据获取: TanStack Query
- 路径别名: `@/` 映射到 `./src/`

### 文件结构
```
src/
├── app/                    # 路由 (App Router)
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页 (探索大厅)
│   ├── globals.css         # 全局样式
│   ├── routes/page.tsx     # 路线列表
│   ├── routes/[id]/page.tsx # 路线详情
│   ├── community/page.tsx  # 社区动态
│   ├── profile/page.tsx    # 个人中心
│   └── api/                # API Routes
├── components/             # 共享组件
│   ├── ui/                 # 基础 UI (Button, Card, Chip, Icon)
│   ├── layout/             # 布局 (BottomNav, Sidebar, TopNav)
│   ├── BottomSheet.tsx     # 可拖拽底部面板
│   ├── Timeline.tsx        # 时间线组件
│   ├── RouteCard.tsx       # 路线卡片
│   └── FeedCard.tsx        # 社区 Feed 卡片
├── store/                  # Zustand 状态
├── data/                   # Mock 数据
└── types/                  # TypeScript 类型
```

### 编码规范
- 所有页面使用 `lang="zh-CN"` 中文语言标记
- 颜色必须使用 `tailwind.config.ts` 中定义的设计 Token
- 标题字体: Plus Jakarta Sans (`font-headline-*`)，正文字体: Inter (`font-body-*`)
- 图标: Material Symbols Outlined (Variable Font)
- 移动端优先，使用 `md:` 前缀做桌面端适配
- 组件文件使用 PascalCase，工具文件使用 camelCase
- "use client" 仅在需要 hooks/事件/动画时使用
