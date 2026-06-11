"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchRoutes, type RouteParams } from "@/lib/api-client";

/** 路线列表查询：随筛选 / 搜索变化自动重取，切换时保留上一页数据避免闪烁 */
export function useRoutes(params: RouteParams = {}) {
  return useQuery({
    queryKey: ["routes", params],
    queryFn: () => fetchRoutes(params),
    placeholderData: keepPreviousData,
  });
}
