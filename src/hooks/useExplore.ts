"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchExplore, type ExploreParams } from "@/lib/api-client";

/** 探索大厅 POI 查询，随分类 chip 变化自动重取 */
export function useExplore(params: ExploreParams = {}) {
  return useQuery({
    queryKey: ["explore", params],
    queryFn: () => fetchExplore(params),
    placeholderData: keepPreviousData,
  });
}
