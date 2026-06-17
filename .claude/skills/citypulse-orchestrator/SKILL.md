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

## 范例(把 pm 出的 spec 拆成执行顺序)
> 输入：pm 的 PRD-Lite「我的收藏」——复用 `Route`+`Bookmark`，需新建读路径 + 页面。全部增量，无红灯。

```markdown
### 子任务 1 [citypulse-data] — 依赖：无
目标：getBookmarkedRoutes 读路径
输入：src/lib/repository.ts、Route 类型 ｜ 输出：repository→normalize→route→api-client→useBookmarkedRoutes hook
DoD：tsc --noEmit 过 + 断网回退 mock 可跑

### 子任务 2 [citypulse-page] — 依赖：子任务 1
目标：/profile/bookmarks 列表页
输入：子任务1 的 useBookmarkedRoutes hook ｜ 输出：Client 列表页(三态)
DoD：未登录重定向、空态 EmptyState、有数据按收藏时间倒序

### 子任务 3 [citypulse-reviewer] — 依赖：子任务 1,2
目标：提交前审查 ｜ DoD：APPROVE
```
影响分级：全增量 → **无需 guard**。动态路由：若子任务1 的 hook 形态变化，同步调整子任务2 的消费方式。
> 范例守规矩：依赖成序、每步路由到现成 skill、DoD 可验证、增量操作正确判为免 guard、接口只传"文件+类型名"。
