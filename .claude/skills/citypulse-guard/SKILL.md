---
name: citypulse-guard
description: Pre-flight permission gate for destructive CityPulse operations — deleting API routes, changing prisma/schema.prisma, editing auth, resetting the database. Use before any risky change; outputs an allow / warn / block verdict with impact analysis and a rollback plan.
---

# CityPulse 安全守卫

破坏性操作执行前的权限门。只读分析，输出裁决。

## 三色分级
**🟢 绿灯(自动放行)**：新增文件、新增 API 端点、新增组件、只读查询、加测试

**🟡 黄灯(输出警告，建议人工确认)**
- 改现有 API 响应结构(可能破坏前端)
- 新增 Prisma 字段(需迁移)
- 改 `src/types/index.ts` 已有类型
- 改 NextAuth 配置

**🔴 红灯(强制停止，必须人工审批)**
- 删除 `src/app/api/` 下任何路由文件
- 修改/删除 `prisma/schema.prisma` 已有 Model
- `prisma migrate reset` / `db push --force-reset`
- 删除 `src/types/index.ts` 现有类型
- 改 `src/lib/auth.ts`

## 高风险文件
`src/lib/auth.ts` · `src/lib/repository.ts` · `src/types/index.ts` · `prisma/schema.prisma` · `src/middleware.ts`

## 分析流程
1. 归类操作(新增/修改/删除)
2. 评估影响：`grep` 统计有多少文件 import 了目标；是否有测试依赖；是否对外 API 契约
3. 给回滚方案(确切的 git/prisma 命令)

## 输出格式
```markdown
## 守卫裁决
### 操作摘要
### 风险评级：🟢/🟡/🔴
### 影响范围
| 文件 | 影响 | 引用数 |
### 回滚方案
[确切命令]
### 裁决：放行 / 需确认 / 强制停止 + 确认命令
```
