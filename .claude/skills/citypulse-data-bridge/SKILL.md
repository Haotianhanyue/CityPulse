---
name: citypulse-data-bridge
description: Integrate an external data source (map, weather, third-party POI, analytics) into CityPulse's five-layer read path via an adapter, with graceful degradation and mock sync. Use only when the data originates OUTSIDE our own database — a third-party API/service that needs an adapter, env keys, and fallback, or converting a third-party response into CityPulse internal types. Not for wiring our own DB data to the UI (citypulse-data) or a single internal route handler (citypulse-api).
---

# CityPulse 数据桥接

把"外部世界 → CityPulse 内部类型"接入五层读路径。每个数据源是可独立开关的适配器。

## 数据流
```
外部源 → src/lib/adapters/<source>.ts(原始→内部类型)
       → normalize → repository(mock 回退) → route → api-client → hook → UI
```

## 接入步骤
1. **扩类型**：`src/types/index.ts` 加**可选**字段(`?:`，避免破坏现有代码)
2. **建适配器**：`src/lib/adapters/<source>.ts`，导出 `adaptXToY(raw)` 转换函数；做单位/字段名归一
3. **repository 集成 + 降级**：
   ```ts
   try {
     const extra = await fetchExternal(...);
     return base.map(x => adaptXToY(x, extra));
   } catch { return base; } // 静默降级，功能不挂
   ```
4. **同步 mock**：`src/data/mock.ts` 加对应结构(离线模式可跑通)
5. **记环境变量**：写入 `.env.example`；客户端可见的用 `NEXT_PUBLIC_` 前缀

## 现有集成参考
`src/lib/mapbox.ts`(地理编码，`NEXT_PUBLIC_MAPBOX_TOKEN`) · `src/lib/cloudinary.ts`(图片上传，服务端)

## 上线检查
- [ ] 有健康检查/降级(网络断开仍可运行)
- [ ] mock 已同步(离线可跑)
- [ ] 新字段可选，不破坏现有组件
- [ ] env 记入 `.env.example`
- [ ] normalize 有单测(`src/lib/__tests__/normalize.test.ts`)
