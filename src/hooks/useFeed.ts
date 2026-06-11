"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeed, type FeedParams } from "@/lib/api-client";

/**
 * 社区动态无限滚动查询。
 * 对应品牌映射「瀑布流社区 Feed → useInfiniteQuery」，
 * 配合页面中的 IntersectionObserver 触发 fetchNextPage。
 */
export function useFeed(params: Omit<FeedParams, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: ["feed", params],
    queryFn: ({ pageParam }) => fetchFeed({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  });
}
