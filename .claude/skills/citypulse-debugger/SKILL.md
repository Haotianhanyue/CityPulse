---
name: citypulse-debugger
description: Diagnose CityPulse failures by root cause — type mismatch, auth, database, SSR/CSR boundary, TanStack Query cache. Use when the app errors, an API returns 500, the page is blank, or behavior differs from expectation. Pinpoints the cause and gives a minimal verifiable fix.
---

# CityPulse 故障诊断

按根因分类定位，给最小可验证修复。最多 3 轮假设，每轮用工具取证，不盲猜。

## 根因速查表
| 错误特征 | 类别 | 先看 |
|---------|------|------|
| `Cannot read properties of undefined` | 类型不匹配 | `src/lib/normalize.ts` |
| `401`/`403`/`NO_SECRET` | 认证 | `src/lib/auth.ts` → `src/middleware.ts` |
| `prisma is not defined`/`P1001`/`DATABASE_URL` | 数据库 | `.env` → `src/lib/db.ts` |
| hydration error / `useX` 报错 | SSR/CSR 边界 | 出错组件顶部 `"use client"` |
| 数据不刷新 / 幽灵数据 | 缓存 | `src/hooks/use*.ts` 的 queryKey |
| 类型错误 | 类型不兼容 | `src/types/index.ts` |
| `500` | API 异常 | `src/app/api/.../route.ts` |

## 常见陷阱
1. **mock 与真实结构不同步** — `src/data/mock.ts` 字段落后于 `types/index.ts`，回退即崩
2. **误加 `"use client"`** — 导致无法用 `getServerSession`/Prisma/`cookies()`
3. **Server→Client 传函数** — App Router 禁止；用薄客户端包装
4. **queryKey 与参数不同步** — API 更新了前端仍显缓存旧值
5. **客户端读 `process.env.X`** — 非 `NEXT_PUBLIC_` 前缀的为 `undefined`
6. **无 `DATABASE_URL`/`NEXTAUTH_SECRET`** — 本地写操作返回 503、`/profile` 被鉴权重定向(预期行为)

## 流程(P-A-O)
感知 → 分类 → 假设 → 行动 → **观察取证**(tsc / 读 route / 跑 test) → 确认。
观察与预期不符则带新证据回到分类。3 轮未定位 → 输出"需人工查运行时日志"。

## 输出
```markdown
## 诊断报告
### 分类 / 根因(一句话)
### 证据(文件:行 + 当前/正确代码)
### 修复步骤 + 验证方法
```

## 范例(一次完整 P-A-O — 演示流程，非断言现有 bug)
> 示例症状：切换社区分类后，列表仍显示上一个分类的数据。（当前代码已正确，此处演示"若 queryKey 退化"时如何按流程定位。）

- **感知**：切 `category` 后数据不变。
- **分类**：「数据不刷新 / 幽灵数据」→ 缓存（查表 → 看 `src/hooks/use*.ts` 的 queryKey）。
- **假设**：`useFeed` 的 queryKey 漏了 `params`，命中旧缓存（常见陷阱 #4）。
- **行动取证**：读 `src/hooks/useFeed.ts` 的 queryKey；对照 `src/lib/api-client.ts` 的 `fetchFeed` 是否把 `category` 拼进 query string。
- **观察**：正确写法是 `queryKey: ["feed", params]`（含 params）；若退化成 `["feed"]`，React Query 不会因 `category` 变化重取。
- **确认**：根因 = queryKey 与参数不同步（非组件 bug、非接口 bug）——1 轮定位，未盲改。

```markdown
## 诊断报告
### 分类 / 根因：缓存 — useFeed 的 queryKey 未纳入 params
### 证据：src/hooks/useFeed.ts 应为 `queryKey: ["feed", params]`；src/lib/api-client.ts 的 fetchFeed 已把 category 拼入 query，故问题在缓存键而非请求层
### 修复 + 验证：queryKey 改回 ["feed", params] → 切分类时网络面板出现新请求且列表刷新
```
> 范例守规矩：每步带工具取证、根因落到真实文件、1 轮即收敛——示范了「不盲猜」。
