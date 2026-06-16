# CityPulse Skills 测试资产

这是 `.claude/skills/` 下 12 个 skill 的回归测试集，用于在每次改动 SKILL.md 后验证两件事不退化：

1. **触发判别（routing）** —— 对的 prompt 命中对的 skill，且不被同前缀的兄弟技能误抢。
2. **行为契约（behavior）** —— skill 真跑后的产出包含约定的关键要素。

数据源：[`test-prompts.json`](./test-prompts.json)。

## 为什么需要它

12 个 skill 全部以 `citypulse-` 开头、描述高度相似，最大的退化风险是**误触发**：改了 A 的 description，结果把本该进 B 的请求抢了过去。本测试集用 `anti_triggers`（每条标注 `should_route_to`）专门钉住这些易撞的边界对：

- 实现层：`ui` ↔ `page` ↔ `api` ↔ `data` ↔ `data-bridge`
- 计划层：`orchestrator` ↔ `pm`
- 守门层：`debugger` ↔ `guard` ↔ `reviewer`
- 通用：`cicd-engineer` 不得被任何 CityPulse 业务请求触发

## 怎么跑

### 第一层：触发判别（可人工 / LLM 评判，无需启动应用）

对 `test-prompts.json` 里每条 `triggers` 和 `anti_triggers` 的 `prompt`：

1. 把它对照全部 12 个 `SKILL.md` 的 `description` 字段；
2. 判定"最该命中的 skill"；
3. 对 `triggers`，命中 = 该 skill 本身即 PASS；对 `anti_triggers`，命中 = `should_route_to` 指定的 skill 即 PASS（说明没被本 skill 误抢）。

记录 routing 准确率 = PASS 数 / 总 prompt 数。任何 FAIL 都指向一处需要收紧的 description。

### 第二层：行为契约（需在 CityPulse 仓库内实跑）

在仓库根目录用对应 prompt 触发该 skill，核对产出是否覆盖该 skill 的 `expect_contains` 全部要点。缺项即 FAIL，记录缺哪条。

> 第一层现在就能跑出真实数字；第二层需要在应用上下文里实跑，属于带应用的回归，建议接进 CI 后手动或半自动核对。

## 维护约定

- 改任何 `SKILL.md` 的 `description` 或触发词后，**必须**重跑第一层触发判别。
- 新增 skill 时，在 `test-prompts.json` 补一组 `triggers` + 至少 1 条指向最易撞兄弟的 `anti_triggers`。
- 本目录名 `__tests__` 对齐项目既有约定（见 `src/lib/__tests__/`），且无 `SKILL.md`，不会被 skill 加载器识别为技能。

## 行为层运行记录（第二层 — 应用内实跑）

| skill | 状态 | 日期 | 结果 |
|---|---|---|---|
| cicd-engineer | ✅ 已实测 | 2026-06-16 | 对真实 `.github/workflows`（ci/deploy 等）跑审计，`expect_contains` 5/5 覆盖；钉出 2 处黄灯并**均已修复**：① deploy 收窄到单一生产分支 `[master]`；② 补 `prisma/migrations/` 初始迁移，CI `database` job 改用 `migrate deploy` 与生产同路径（原项目无迁移、生产 `migrate deploy` 实为空操作） |
| 其余 11 skill | ⏳ 待实测 | — | 触发判别已实测；行为层待应用内回归 |

> 触发判别（第一层）对全部 12 skill 已实测；行为层（第二层）按 skill 逐个坐实，结果记此表。
