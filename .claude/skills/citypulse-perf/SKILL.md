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

## 输出格式
```markdown
## 性能报告
综合评分：前端 ⭐⭐⭐⭐☆ / API ⭐⭐⭐☆☆ / Bundle ⭐⭐⭐⭐⭐
### Top 3 优化机会(按收益)
1. [高] xxx → 预计 -Xms / -XKB
### 不建议改的项(解释为何看似有问题实则无需改)
```
