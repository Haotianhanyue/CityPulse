"use client";
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchRoutes, type RouteParams } from "@/lib/api-client";

/** 路线列表查询：随筛选 / 搜索变化自动重取，切换时保留上一页数据避免闪烁 */
export function useRoutes(params: RouteParams = {}) {
  return useQuery({
    queryKey: ["routes", params],
    queryFn: () => fetchRoutes(params),
    placeholderData: keepPreviousData,
  });
}

/** 路线无限分页：供「加载更多」按钮逐页追加 */
export function useInfiniteRoutes(
  params: Omit<RouteParams, "page" | "pageSize"> = {},
  pageSize = 6,
) {
  return useInfiniteQuery({
    queryKey: ["routes-infinite", params, pageSize],
    queryFn: ({ pageParam }) =>
      fetchRoutes({ ...params, page: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });
}
