---
name: cicd-engineer
description: Design, generate, or fix CI/CD pipelines for any stack (GitHub Actions, GitLab CI, etc.). Use for the pipeline/workflow itself — "add CI", "set up CD", "auto-deploy", "the CI build/pipeline is failing or won't trigger", "add a test gate", "configure releases". Detects the stack first, then produces runnable pipelines and guards deploy safety. NOT for application runtime errors, failing app/test code, or product feature work — that is a code-debugging or feature concern, not a pipeline one.
---

# 通用 CI/CD 工程师

先探测，再产出可运行流水线，守住部署安全。不绑定具体技术栈。

**边界**：只管流水线本身——配置、触发、缓存、部署门禁。应用代码报错、运行时 500、页面白屏、功能开发**不归这里**（那是代码调试 / 功能开发的事）。判据：要修的是 `.github/workflows`、`.gitlab-ci.yml` 这类 CI 配置 → 进；要修的是 `src/` 业务代码 → 出。

## 0. 先探测(头号陷阱在这一步)
```bash
# 默认分支 —— 工作流监听的分支若 ≠ 真实默认分支，CI 永远不触发！
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || git branch --show-current
```
再读 `package.json` scripts / `Makefile` / `pyproject` 拿**真实存在**的命令(别臆造)；`ls .github/workflows` 看现状。

## 1. CI 骨架
```yaml
on:
  push: { branches: [<default-branch>] }
  pull_request: { branches: [<default-branch>] }
  workflow_dispatch:
concurrency: { group: ${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true }
jobs:
  lint / test / build(上传产物) / ci-gate(needs 全部，作为分支保护唯一必需项)
```

## 2. CD 骨架(部署)
```yaml
concurrency: { group: deploy-production, cancel-in-progress: false }  # 串行不取消
jobs:
  guard:   # 在 step 读 secrets，把"是否配置密钥"输出为 job output
  migrate: # if 配了 DB 密钥；生产迁移；environment: production(可挂审批)
  deploy:  # needs:[guard,migrate]; if always() && 配了部署密钥 && migrate 未失败
```

## 权限分级
🟢 lint/test/build 自动 · 🟡 集成/E2E/预发 · 🔴 生产部署/迁移/删资源 → 挂 `environment` 审批或手动触发。

## 高频踩坑(必查)
1. **分支名不匹配**(main vs master)→ CI 从不触发【头号】
2. `secrets` 不能用于 **job 级 if** → 在 step 读取转 output/env 再判断
3. 生产部署设 `cancel-in-progress: true` → 发布被中途取消(应为 false)
4. `continue-on-error` 掩盖关键测试失败 → "绿色幻觉"
5. needs 成环 → 整个 workflow 报错
6. 缓存 key 不含锁文件 hash → 装到陈旧依赖
7. fork PR 拿不到密钥 → 需密钥的 job 用 if 跳过
8. 流水线自身 push 触发自己 → 死循环(加 paths/[skip ci])
9. 迁移与部署竞态 → 先迁移再发新代码

## 交付
说明每个 workflow 的功能、需配置的 secrets 清单、如何设分支保护必需项。校验：用 YAML 解析器验证语法 + 确认分支名匹配。
