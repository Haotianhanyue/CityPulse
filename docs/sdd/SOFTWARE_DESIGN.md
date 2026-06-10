# CityPulse 软件设计文档 (SDD)

## 1. 引言

### 1.1 目的
本文档描述 CityPulse 城市漫步探索应用的软件设计架构，包括系统架构、模块设计、数据模型、接口定义和组件规范。

### 1.2 范围
CityPulse 是一款移动优先的 Web 应用，包含地图探索、路线规划、社区互动三大核心功能模块。

### 1.3 术语表
| 术语 | 定义 |
|------|------|
| Route | 用户创建或收藏的漫步路线 |
| Stop | 路线中的一个站点/兴趣点 |
| POI | Point of Interest，兴趣点 |
| Feed | 社区动态信息流 |
| Bottom Sheet | 可拖拽的底部面板组件 |
| FAB | Floating Action Button，悬浮操作按钮 |
| Design Token | 设计系统中的原子化变量（颜色、间距等） |

---

## 2. 系统架构

### 2.1 架构概览

```
┌─────────────────────────────────────────────────────┐
│                    CityPulse App                      │
├─────────────────────────────────────────────────────┤
│  Presentation Layer (HTML + Tailwind CSS)            │
│  ┌──────────┬──────────┬──────────┬──────────┐      │
│  │ Explore  │ Routes   │ Community│ Profile  │      │
│  │ Module   │ Module   │ Module   │ Module   │      │
│  └──────────┴──────────┴──────────┴──────────┘      │
├─────────────────────────────────────────────────────┤
│  Interaction Layer (Vanilla JavaScript)              │
│  ┌──────────┬──────────┬──────────┬──────────┐      │
│  │ Bottom   │ Map      │ Scroll   │ Touch    │      │
│  │ Sheet    │ Markers  │ Observer │ Events   │      │
│  └──────────┴──────────┴──────────┴──────────┘      │
├─────────────────────────────────────────────────────┤
│  Data Layer (Mock/Static JSON)                       │
│  ┌──────────┬──────────┬──────────┬──────────┐      │
│  │ Routes   │ Users    │ Posts    │ POIs     │      │
│  └──────────┴──────────┴──────────┴──────────┘      │
└─────────────────────────────────────────────────────┘
```

### 2.2 技术选型

| 层次 | 技术 | 理由 |
|------|------|------|
| 展示层 | HTML5 + Tailwind CSS (CDN) | 快速原型开发，无需构建工具 |
| 交互层 | Vanilla JavaScript | 轻量级，适合微交互 |
| 图标 | Material Symbols Outlined | Google 官方图标库，可定制 |
| 字体 | Google Fonts CDN | Plus Jakarta Sans + Inter |
| 设计系统 | Tailwind Theme Config | 自定义 design tokens |

---

## 3. 模块设计

### 3.1 探索发现模块 (Explore)

**职责**: 全屏地图展示 + POI 推荐

**页面**: 探索大厅 (explore-hall)

**组件清单**:
- `MapContainer`: 全屏地图背景 (h-[calc(100vh-128px)])
- `SearchBar`: 顶部悬浮搜索栏 (backdrop-blur)
- `CategoryChips`: 分类筛选标签 (横向滚动)
- `MapMarker`: 地图标记点 (带脉冲动画)
- `BottomSheet`: 可拖拽底部面板
- `RecommendationCard`: 推荐地点卡片

**交互逻辑**:
```javascript
// Bottom Sheet 展开/收起
handle.addEventListener('click', () => {
  isExpanded = !isExpanded;
  sheet.style.transform = isExpanded 
    ? 'translateY(0)' 
    : 'translateY(calc(60vh - 140px))';
});

// Map Marker 点击 → 展开 Bottom Sheet
marker.addEventListener('click', () => {
  sheet.style.transform = 'translateY(0)';
  isExpanded = true;
});
```

### 3.2 路线规划模块 (Routes)

**职责**: 路线详情展示 + 时间线行程

**页面**: 
- 路线详情桌面端 (route-detail-desktop)
- 路线详情移动端 (route-detail-mobile)

**组件清单**:
- `RouteHero`: 路线头部信息 (标题/标签/统计)
- `AuthorCard`: 作者资料卡片
- `TimelineStop`: 时间线站点 (编号/虚线连接/图片)
- `CommentSection`: 评论区 (输入 + 列表)
- `MiniMap`: 侧边栏迷你地图
- `RelatedRoutes`: 相关推荐

**数据流**:
```
Route Data → RouteHero (title, stats)
           → AuthorCard (author info)
           → TimelineStop[] (stops array)
           → CommentSection (comments)
           → MiniMap (route path)
           → RelatedRoutes (recommendations)
```

### 3.3 社区动态模块 (Community)

**职责**: 社区内容信息流

**页面**:
- 社区动态桌面端 (community-feed-desktop) - Masonry 瀑布流
- 社区动态移动端 (community-feed-mobile) - 文章卡片列表

**组件清单**:
- `FilterTabs`: 内容筛选 (Trending/Following/Nearby)
- `MasonryGrid`: 瀑布流布局 (CSS columns)
- `FeedCard`: 内容卡片 (图片+标题+作者+互动数据)
- `ArticleCard`: 文章卡片 (移动端)
- `PostFAB`: 发布动态悬浮按钮

**卡片类型**:
| 类型 | 标签颜色 | 图标 | 示例 |
|------|---------|------|------|
| 精选路线 | primary-container | route | 老城区的秘密花园 |
| 隐藏宝藏 | secondary | local_cafe | 雨后的城市书店 |
| 拍照圣地 | tertiary-container | photo_camera | 赛博朋克天台 |
| 热门活动 | primary | event | 周末市集 |
| 建筑美学 | secondary-container | apartment | 现代主义建筑 |

### 3.4 个人中心模块 (Profile)

**职责**: 用户资料 + 路线管理 + 发布管理

**页面**:
- 个人中心桌面端 (profile-desktop)
- 个人中心移动端 (profile-mobile)

**组件清单**:
- `StatsGrid`: Bento Grid 统计展示 (等级/距离/兴趣点)
- `SavedRoutes`: 保存路线列表/横向滚动
- `MyPosts`: 我的发布 (网格/Bento)
- `LevelProgress`: 等级进度条
- `SideNav`: 桌面侧边导航

---

## 4. 共享组件规范

### 4.1 导航组件

#### 顶部导航栏 (TopNavBar)
```
高度: 64px (h-16)
固定: sticky top-0 z-50
背景: bg-surface shadow-sm
内容: [Logo] [导航链接(桌面)] [搜索(桌面)] [通知] [定位] [头像]
```

#### 底部导航栏 (BottomNavBar)
```
固定: fixed bottom-0 z-50
显示: md:hidden (仅移动端)
背景: bg-surface shadow-lg rounded-t-xl
项目: Map | Feed | Routes | Me
激活态: bg-primary-container text-on-primary-container rounded-full
```

#### 侧边导航 (SideNav)
```
显示: hidden md:flex (仅桌面端)
宽度: w-64
固定: sticky top-16
背景: bg-surface border-r border-outline-variant
项目: Discover | Routes | Community | Profile
底部: 发布动态按钮 + 设置
```

### 4.2 通用组件

#### 卡片 (Card)
```css
bg-surface rounded-xl shadow-sm border border-surface-variant overflow-hidden
/* 或 */
bg-surface-container-lowest rounded-xl custom-shadow overflow-hidden
```

#### 主按钮 (PrimaryButton)
```css
bg-primary text-on-primary px-md py-sm rounded-lg font-label-md
shadow-md hover:shadow-lg active:scale-95 transition-all
```

#### 标签/芯片 (Chip)
```css
/* 默认 */
bg-surface-container-high text-on-surface-variant px-md py-sm rounded-full
/* 激活 */
bg-primary-container text-on-primary-container px-md py-sm rounded-full
```

#### 悬浮按钮 (FAB)
```css
fixed bottom-24 right-margin-mobile z-40
bg-primary text-white w-14 h-14 rounded-full
shadow-lg shadow-primary-container/40 active:scale-90
```

---

## 5. 数据模型

### 5.1 Route (路线)
```typescript
interface Route {
  id: string;
  title: string;
  subtitle: string;
  category: '城市漫步' | '夜骑' | '文化探访' | '美食之旅';
  location: string;
  distance: string;     // e.g., "3.2km"
  duration: string;     // e.g., "2.5h"
  difficulty: '轻松' | '中等' | '挑战';
  author: UserProfile;
  stops: RouteStop[];
  likes: number;
  bookmarks: number;
  comments: number;
  coverImage: string;
  isTopRated?: boolean;
}
```

### 5.2 RouteStop (路线站点)
```typescript
interface RouteStop {
  order: number;
  name: string;
  nameEn?: string;
  time: string;
  description: string;
  images: string[];
  tips?: string;
}
```

### 5.3 UserProfile (用户)
```typescript
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  title: string;        // e.g., "City Explorer", "路线达人"
  totalDistance: string; // e.g., "248km"
  spotsExplored: number;
  routesCreated: number;
  experience: {
    current: number;
    nextLevel: number;
  };
}
```

### 5.4 Post (社区动态)
```typescript
interface Post {
  id: string;
  type: '精选路线' | '隐藏宝藏' | '拍照圣地' | '热门活动' | '建筑美学';
  author: UserProfile;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  bookmarks?: number;
  createdAt: string;
  isTrending?: boolean;
}
```

### 5.5 POI (兴趣点)
```typescript
interface POI {
  id: string;
  name: string;
  category: '餐饮美食' | '休闲娱乐' | '地标 Landmarks' | '购物 Shopping';
  rating: number;
  distance: string;
  status: '营业中' | '即将闭店' | '今日开放';
  tags: string[];
  image: string;
  description: string;
  location: { lat: number; lng: number };
  isPulse?: boolean;  // 正在流行标记
}
```

---

## 6. 响应式设计规范

### 6.1 断点策略
| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 768px | 单列，底部导航 |
| Tablet | 768px - 1024px | 双列，底部导航 |
| Desktop | > 1024px | 多列，侧边导航 |

### 6.2 容器宽度
- 最大内容宽度: `max-w-[1280px]`
- 移动端边距: `px-margin-mobile` (16px)
- 桌面端边距: `px-margin-desktop` (32px)

### 6.3 网格系统
- 桌面路线详情: `lg:grid-cols-12` (主内容 8 列 + 侧边栏 4 列)
- 统计 Bento Grid: `md:grid-cols-4`
- 社区瀑布流: 2列(mobile) → 3列(tablet) → 4列(desktop)

---

## 7. 动画与交互

### 7.1 微交互规范
| 交互 | 效果 | 时长 |
|------|------|------|
| 按钮点击 | `scale(0.95)` | instant |
| 卡片悬停 | `shadow` 增强 | 300ms |
| 图片悬停 | `scale(1.05)` | 500ms |
| 页面滚动 | timeline reveal | 700ms |
| Bottom Sheet | `translateY` 滑动 | 400ms cubic-bezier |
| 地图标记 | pulse 脉冲 | 2s infinite |

### 7.2 CSS 动画
```css
/* Timeline 虚线 */
.timeline-line {
  background: repeating-linear-gradient(
    to bottom, #ab3500 0, #ab3500 4px, 
    transparent 4px, transparent 8px
  );
}

/* 脉冲标记 */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
```

---

## 8. 未来扩展方向

1. **框架迁移**: 从纯 HTML 迁移到 React/Vue + Vite
2. **地图集成**: 接入高德/Google Maps API 实现真实地图
3. **后端服务**: Node.js + Express API + PostgreSQL
4. **用户认证**: JWT/OAuth2.0 社交登录
5. **实时功能**: WebSocket 实现实时评论和通知
6. **PWA**: Service Worker 离线缓存
7. **暗色模式**: 利用已有的 `darkMode: "class"` 配置
