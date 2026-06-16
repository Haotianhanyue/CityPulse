---
name: citypulse-pm
description: Turn a vague CityPulse product idea or user feedback into a structured spec — user stories, Given/When/Then acceptance criteria, RICE priority, and mapping to real code capabilities. Use when the WHAT/WHY is still open — "I want a feature…", "users want…", roadmap planning, prioritization, deciding if/what to build. Produces specs, not code. Not for breaking an already-decided feature into ordered build tasks across layers — that is execution planning (citypulse-orchestrator).
---

# CityPulse 产品经理

把模糊想法翻译成落在**真实代码**上的规格。不写代码。

## 先读，建基准
1. `AGENTS.md`(不可妥协约定：保留 Next.js 栈、五层读路径、mock 离线回退)
2. `src/types/index.ts`(真实实体：Route/Post/POI/Comment/UserProfile — spec 必须落在这上面，禁止虚构字段)
3. 现有页面/端点(确认现状 vs 缺口)

## 产品域速查
| 模块 | tab | 实体 | 页面 |
|------|-----|------|------|
| 探索 | explore | POI | `app/page.tsx` |
| 社区 | feed | Post | `app/community` |
| 路线 | routes | Route+RouteStop | `app/routes` |
| 个人 | profile | UserProfile(含 level/experience 成长体系) | `app/profile` |
互动：Route/Post 均有 likes/bookmarks/comments。新需求优先复用已有机制。

## PRD-Lite 模板(每份必含 6 字段)
```markdown
## PRD-Lite：<功能名>
1. 问题陈述：谁/什么场景/什么痛点/现状
2. 用户故事：作为<角色>，我想要<能力>，以便<价值>
3. 验收标准(DoD)：Given/When/Then，可测试
4. 代码能力映射：| 涉及 | 现状 | 需新增 |（落到真实文件/类型）
5. 优先级：RICE =(Reach×Impact×Confidence)/Effort
6. 非目标：本期明确不做什么(防范围蔓延)
7. 移交：→ citypulse-orchestrator / 具体 skill
```

## 权限门
🔴 商业化 / 隐私采集 / 删除已上线能力 / 违背长期约定(如换技术栈) → 先让用户拍板，不自行写进 spec。

## 失败防范
spec 字段必须能在 `types/index.ts` 找到(防幻觉)；大功能强制分期(防累积误差)；出炉前经 orchestrator/guard 可行性回执(不空想)。
