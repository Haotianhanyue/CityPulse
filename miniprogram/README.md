# CityPulse 微信小程序（Taro + React + TypeScript）

CityPulse 城市脉动的微信小程序版本，用 [Taro](https://taro.zone) 以 React + TypeScript 编写，
复用 Web 端的类型、设计 Token 与业务数据，原生小程序体验（含原生 `<map>`）。

## 页面

| Tab | 页面 | 说明 |
|-----|------|------|
| 探索 | `pages/explore` | 原生地图 + POI 标记 + 定位 + 可拖拽推荐面板 |
| 路线 | `pages/routes` | 分类筛选 + 路线卡片列表 |
| 社区 | `pages/community` | 动态信息流 + 实时在线人数 |
| 我的 | `pages/profile` | 等级进度 + 统计 + 保存的路线 |
| — | `pages/route-detail` | 路线详情：时间线行程 + 点赞/收藏/分享 |

## 运行

需要 Node ≥ 18 与 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。

```bash
cd miniprogram
npm install
npm run dev:weapp      # 持续编译，产物输出到 dist/
```

然后在「微信开发者工具」中：
1. 导入项目，目录选择 `miniprogram/`（已含 `project.config.json`）。
2. AppID 可先用「测试号」（project.config.json 里是 `touristappid`，可直接预览）。
3. 即可在模拟器预览；改代码会自动热更新。

一次性构建：`npm run build:weapp`。也支持 H5：`npm run dev:h5`。

## 数据来源（API_BASE）

后端地址在 **`src/config.ts`** 的 `API_BASE` 配置，请求失败时自动回退内置 mock：

| 场景 | 设置 | 还需做什么 |
|------|------|-----------|
| 本地联调（默认） | `"http://localhost:3000"` | 先在本仓库根目录 `npm run dev` 起后端；微信开发者工具「详情 → 本地设置」勾选 **“不校验合法域名…”** |
| 线上 | `"https://你的域名"` | 在 [mp.weixin.qq.com](https://mp.weixin.qq.com) → 开发管理 → 开发设置 → 服务器域名，把域名加入 **request 合法域名** |
| 纯离线预览 | `""` | 无需后端，直接用 mock |

> 已对接的接口：`GET /api/routes`、`GET /api/routes/:id`、`GET /api/feed`、`GET /api/explore`，
> 返回结构与小程序类型一致（与 Web 共用契约）。

## tabBar 图标

图标在 `src/assets/tabbar/`（灰色普通态 + 橙色选中态，81×81 PNG，已生成提交）。
如需重新生成：`node scripts/gen-tabbar-icons.js`（需 `sharp`）。

## 与 Web 端的关系

- 复用同一套数据模型（`src/types`）与设计 Token（`src/styles/tokens.scss`，对齐 `tailwind.config.ts`）。
- 业务读路径与 Web 的 `api-client` 保持一致（同样的 `/api/*` 契约 + mock 回退）。
- 地图：Web 用 Mapbox GL，小程序用原生 `<map>`（腾讯地图，无需额外 Token）。

## 目录结构

```
miniprogram/
├── config/                 # Taro 编译配置
├── project.config.json     # 微信开发者工具项目配置
├── src/
│   ├── app.ts / app.config.ts / app.scss
│   ├── types/              # 复用 Web 类型
│   ├── data/mock.ts        # mock 数据（含 API 回退）
│   ├── services/request.ts # Taro.request 封装 + mock 回退
│   ├── styles/tokens.scss  # 设计 Token
│   ├── components/RouteCard
│   └── pages/{explore,routes,community,profile,route-detail}
└── package.json
```
