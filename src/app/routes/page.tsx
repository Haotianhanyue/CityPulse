"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { RouteCard } from "@/components/RouteCard";
import { CardSkeletons, EmptyState } from "@/components/ui/States";
import { useInfiniteRoutes } from "@/hooks/useRoutes";

const filters = [
  { label: "精选", icon: "auto_awesome" },
  { label: "城市漫步", icon: "directions_walk" },
  { label: "文化探访", icon: "museum" },
  { label: "美食之旅", icon: "restaurant" },
  { label: "夜骑", icon: "nights_stay" },
];

const difficulties = ["全部", "轻松", "中等", "挑战"];

export default function RoutesPage() {
  const [category, setCategory] = useState("精选");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("全部");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteRoutes({
    category,
    search,
    difficulty: difficulty === "全部" ? undefined : difficulty,
  });
  const routes = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h1 className="font-headline-lg text-display-lg text-on-surface">
            发现路线
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
            探索城市中的独特漫步路线
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
        {filters.map((f) => (
          <Chip
            key={f.label}
            label={f.label}
            icon={f.icon}
            active={category === f.label}
            onClick={() => setCategory(f.label)}
          />
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-md bg-surface-container-low rounded-full px-md py-sm mb-md focus-within:ring-2 focus-within:ring-primary/40 transition-shadow">
        <span className="material-symbols-outlined text-on-surface-variant">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索路线名称或地点..."
          aria-label="搜索路线"
          className="flex-1 outline-none text-body-md font-body-md bg-transparent"
        />
        <button
          onClick={() => setShowFilters((v) => !v)}
          aria-label="筛选难度"
          aria-pressed={showFilters}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${
            showFilters || difficulty !== "全部"
              ? "bg-primary text-white"
              : "bg-surface-container-high text-on-surface-variant"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>

      {/* Difficulty filter (toggled by tune) */}
      {showFilters && (
        <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
          {difficulties.map((d) => (
            <Chip
              key={d}
              label={d}
              active={difficulty === d}
              onClick={() => setDifficulty(d)}
            />
          ))}
        </div>
      )}

      {/* Route cards */}
      {isLoading ? (
        <div className="space-y-lg">
          <CardSkeletons count={3} className="h-48" />
        </div>
      ) : isError ? (
        <EmptyState
          icon="error"
          title="加载失败"
          description="无法获取路线数据，请稍后重试。"
        />
      ) : routes.length === 0 ? (
        <EmptyState
          icon="explore_off"
          title="暂无匹配路线"
          description="换个分类、难度或搜索关键词试试。"
        />
      ) : (
        <div className="space-y-lg">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      )}

      {/* Load more */}
      {!isLoading && !isError && routes.length > 0 && (
        <div className="mt-xl flex justify-center">
          {hasNextPage ? (
            <Button
              variant="ghost"
              icon="expand_more"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "加载中…" : "加载更多"}
            </Button>
          ) : (
            <span className="text-caption font-caption text-on-surface-variant">
              已经到底啦 · 共 {routes.length} 条路线
            </span>
          )}
        </div>
      )}
    </div>
  );
}
