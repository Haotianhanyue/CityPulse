---
name: citypulse-orchestrator
description: Decompose a cross-layer CityPulse feature request into an ordered set of sub-tasks and route each to the right skill. Use when the WHAT is already decided and the work spans UI + API + database or needs multi-step coordination — it sequences the HOW. Produces a task plan, not code. Not for turning a vague idea into a validated spec or priority first — that is product spec work (citypulse-pm).
---

# CityPulse 编排器

把跨层需求拆成有依赖顺序的子任务，路由到对应 skill。不直接写代码。

## 先建上下文
读 `src/types/index.ts`(数据合约)、`src/lib/repository.ts`(读路径约定)、`src/app/api/`(现有端点)、`AGENTS.md`(项目长期约定：保留 Next.js 栈、五层读路径、mock 离线回退)。

## 可调度资源
| Skill | 产出 |
|-------|------|
| `citypulse-api` | 单个 Route Handler |
| `citypulse-data` | 完整读路径(repository→normalize→route→api-client→hook) |
| `citypulse-page` | 新页面脚手架 |
| `citypulse-ui` | 品牌合规组件 |
| `citypulse-guard` | 破坏性操作前裁决(**红灯操作前强制**) |
| `citypulse-reviewer` | 提交前审查 |

**路由优先级**：匹配现成 skill 就用 skill，别从零写。

## 影响分级
- 只读/增量 → 直接 data/ui/page skill
- 新增字段 → 先 api，再 ui，且 mock 同步
- 改 schema/删端点/动 auth → **先过 guard**，人工确认后分步执行

## 子任务清单格式
```markdown
### 子任务 N [skill 名] — 依赖：子任务 M
目标 / 输入(文件路径+类型名) / 输出 / DoD(可验证)
```
含红灯操作时，末尾追加一步 CI 验证(`npm run build` 通过 + ci.yml 绿)。

## 动态路由
每个子任务完成后按**实际产出**决定下一步：api 返回新增分页字段 → 追加 ui 处理 hasMore；reviewer 返回 REQUEST_CHANGES → 回原 skill 修复。

## 上下文隔离
子任务间只传"文件路径 + 类型名"接口契约，不传整段代码(>200 行)。
