"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { RouteCard } from "@/components/RouteCard";
import { CardSkeletons, EmptyState } from "@/components/ui/States";
import { useRoutes } from "@/hooks/useRoutes";

const filters = [
  { label: "精选", icon: "auto_awesome" },
  { label: "城市漫步", icon: "directions_walk" },
  { label: "文化探访", icon: "museum" },
  { label: "美食之旅", icon: "restaurant" },
  { label: "夜骑", icon: "nights_stay" },
];

export default function RoutesPage() {
  const [category, setCategory] = useState("精选");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useRoutes({ category, search });
  const routes = data?.data ?? [];

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
      <div className="flex items-center gap-md bg-surface-container-low rounded-full px-md py-sm mb-lg">
        <span className="material-symbols-outlined text-on-surface-variant">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索路线、地点或社区成员..."
          className="flex-1 outline-none text-body-md font-body-md bg-transparent"
        />
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[20px]">
            tune
          </span>
        </button>
      </div>

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
          description="换个分类或搜索关键词试试。"
        />
      ) : (
        <div className="space-y-lg">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      )}

      {/* Load more */}
      {!isLoading && routes.length > 0 && (
        <div className="mt-xl flex justify-center">
          <Button variant="ghost" icon="expand_more">
            加载更多
          </Button>
        </div>
      )}
    </div>
  );
}
