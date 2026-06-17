---
name: citypulse-perf
description: Analyze CityPulse performance (Server/Client component ratio, bundle hotspots, API query efficiency) and recommend an AI model cost tier (Haiku/Sonnet/Opus). Use when a page is slow, the bundle is too large, or deciding which model an AI feature should use.
---

# CityPulse 性能与成本分析

只出分析报告，不改代码。

## 一、前端渲染
- Server/Client 占比：`grep -r '"use client"' src/components | wc -l`，目标 Server > 70%
- 找可降级的 Client 组件：仅展示静态数据、仅条件 className 的，不需要 `"use client"`
- Bundle 热点：检查谁引入 `mapbox-gl` / `framer-motion`，能否懒加载(`next/dynamic`)

## 二、API / 数据层
- Prisma 查询是否 `select` 了多余字段；是否有循环内查询(N+1)
- 分页是否在数据库层(非内存切片)
- `src/lib/cache.ts` 是否覆盖热点；TanStack Query `staleTime` 是否合理

## 三、AI 功能模型分级(接 AI 时)
| 复杂度 | 选型 | 场景 | 约成本/次 |
|--------|------|------|----------|
| 低 | claude-haiku-4-5 | 分类/摘要/标签提取/合规校验 | ~$0.00025 |
| 中 | claude-sonnet-4-6 | 语义搜索/个性化推荐/内容审核 | ~$0.003 |
| 高 | claude-opus-4-8 | 路线规划/多模态/区域分析 | ~$0.015 |

**省钱策略**：Haiku 做意图识别 → 路由到合适模型；相同输入 24h 缓存；批量合并。

## 星级刻度(对照客观指标，不靠手感打星)
- **前端 Server 占比**：`>70%`=⭐⭐⭐⭐⭐ · `50-70%`=⭐⭐⭐⭐ · `30-50%`=⭐⭐⭐ · `15-30%`=⭐⭐ · `<15%`=⭐
- **API**：无 N+1 且分页在 DB 层=⭐⭐⭐⭐⭐；每多一类问题(N+1 / 内存分页 / `select` 过宽 / 热点无缓存)降一星
- **Bundle**：重库(`mapbox-gl`/`framer-motion`)全部已按需懒加载=⭐⭐⭐⭐⭐；每个未懒加载的重库降一星

## 输出格式
```markdown
## 性能报告
综合评分：前端 ⭐⭐ / API ⭐⭐⭐ / Bundle ⭐⭐⭐（每项后附判定依据的数字）
### Top 3 优化机会(按收益)
1. [高/中/低] 现状数字 → 改法 → 预计收益(-Xms / -XKB / Server 占比变化)
### 不建议改的项(解释为何看似有问题实则无需改)
```

## 范例(对本仓实跑填好的报告)
> 实跑 `grep -rl '"use client"' src/components | wc -l` → 36 组件 / 31 Client，Server 仅 **14%**。

```markdown
## 性能报告
综合评分：前端 ⭐(Server 14%，远低于 70% 目标) / API ⭐⭐⭐(未深查，待定) / Bundle ⭐⭐(framer-motion 9 处未全懒加载)
### Top 3 优化机会(按收益)
1. [高] 31/36 组件标了 "use client"，多数仅展示静态数据或条件 className → 降级为 Server Component，Server 占比 14%→目标 >70%，砍首屏 JS。
2. [中] framer-motion 被 9 处引入 → 收敛到少数交互组件、动效按需懒加载，减非必要 client bundle。
3. [低] mapbox-gl 仅 page.tsx / MapView.tsx 引入，且 page.tsx 已 `next/dynamic` 懒加载 → 保持现状。
### 不建议改的项
- page.tsx 的 MapView 已 `next/dynamic` 懒加载，无需再动。
```
> 范例守规矩：每颗星都对照刻度给出数字依据，没有一项靠手感。
