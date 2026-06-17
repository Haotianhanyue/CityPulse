---
name: citypulse-reviewer
description: Review CityPulse code (a diff or set of files) for design-system compliance, Next.js App Router correctness, data-layer conventions, and accessibility. Use before committing UI or API changes, or when the user asks to review/check CityPulse code.
---

# CityPulse 代码审查

对改动逐项核对，输出分级报告。只读分析，不改代码。

## 审查清单
**设计系统**
- 颜色/字体/间距只用 Tailwind token(`primary`/`surface-*`/`font-headline-*`/`xs..2xl`)，无裸 hex
- 图标走 `<Icon>`(Material Symbols)

**Next.js App Router**
- 默认 Server Component；`"use client"` 仅在用到 hooks/事件/动画/Query 时出现
- 客户端组件未导出 `metadata`；Server 组件不调用浏览器 API
- ⚠️ Server Component **不能**把函数 prop 传给 Client Component(用薄客户端包装)

**数据层(五层读路径)**
- 读：`repository`(含 mock 回退)→ `normalize` → route → `api-client` → `hooks`
- 写：Zod 校验 + `resolveUserId` 鉴权 + 无库时 503 降级
- 新增实体字段必须可选(`?:`)，且 `src/data/mock.ts` 同步

**可访问性**
- 图标按钮有 `aria-label`；图片有 `alt`
- 可聚焦元素有可见焦点环(`focus-visible:ring`/`focus-within:ring`)
- 语义标签(`<nav>`/`<main>`/`<section>`)

**取数三态**
- 列表/Feed 页覆盖 loading / error / empty

## 输出格式
```markdown
## 审查报告
### 摘要
[一句话概述]
### 问题
| 级别 | 文件:行 | 问题 | 建议 |
|------|--------|------|------|
| 🔴 严重 / 🟡 警告 / 🔵 提示 | | | |
### 做得好的地方
### 结论：APPROVE / REQUEST_CHANGES
```

## 提交前必跑
`node_modules/.bin/tsc --noEmit` · `npm run lint`

## 范例(对一段小 diff 的审查)
> 待审：新增 `src/components/RouteBadge.tsx`（路线难度徽章，纯展示）。

```markdown
## 审查报告
### 摘要：徽章组件基本可用，2 处需改（1 设计系统违规 + 1 多余 "use client"）
### 问题
| 级别 | 文件:行 | 问题 | 建议 |
| 🔴 严重 | RouteBadge.tsx | 用了裸 hex `bg-[#ff6b35]` | 改用 token `bg-primary-container`（即该 hex 的设计变量） |
| 🟡 警告 | RouteBadge.tsx:1 | 顶部标 "use client" 但只渲染静态文本、无 hooks/事件 | 去掉，回归 Server Component |
| 🔵 提示 | RouteBadge.tsx | 难度文案散落组件内 | 可抽到常量，便于复用 |
### 做得好的地方：props 有 TS 接口；间距用 `px-sm`/`py-xs` token；图标走 `<Icon>`
### 结论：REQUEST_CHANGES
```
> 范例守规矩：每条问题落到清单某一项（设计系统/AppRouter）、给可执行建议、用真实 token 名（`primary-container` = `#ff6b35`）。
