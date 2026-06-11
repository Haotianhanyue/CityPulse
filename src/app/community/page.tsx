"use client";
import { useEffect, useRef, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { FeedCard } from "@/components/FeedCard";
import { Skeleton, EmptyState } from "@/components/ui/States";
import { OnlinePresence } from "@/components/OnlinePresence";
import { useFeed } from "@/hooks/useFeed";

const tabs = [
  { label: "Trending", icon: "trending_up", filter: "trending" },
  { label: "Following", icon: "group", filter: "following" },
  { label: "Nearby", icon: "near_me", filter: "nearby" },
];

export default function CommunityPage() {
  const [filter, setFilter] = useState("trending");
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed({ filter });

  const posts = data?.pages.flatMap((p) => p.data) ?? [];

  // IntersectionObserver 触发无限滚动
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg">
      {/* Header */}
      <div className="mb-lg">
        <div className="flex items-center justify-between gap-md">
          <h1 className="font-headline-lg text-display-lg text-on-surface">
            社区动态
          </h1>
          <OnlinePresence />
        </div>
        <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
          发现城市探索者的精彩分享
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
        {tabs.map((t) => (
          <Chip
            key={t.filter}
            label={t.label}
            icon={t.icon}
            active={filter === t.filter}
            onClick={() => setFilter(t.filter)}
          />
        ))}
      </div>

      {/* Masonry feed */}
      {isLoading ? (
        <div className="masonry-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="masonry-item">
              <Skeleton className={i % 2 ? "h-72" : "h-56"} />
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon="error"
          title="加载失败"
          description="无法获取社区动态，请稍后重试。"
        />
      ) : posts.length === 0 ? (
        <EmptyState icon="forum" title="还没有动态" description="成为第一个分享的人吧。" />
      ) : (
        <div className="masonry-grid">
          {posts.map((post, i) => (
            <FeedCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinel} className="h-10 flex items-center justify-center mt-lg">
        {isFetchingNextPage && (
          <span className="text-caption font-caption text-on-surface-variant">
            加载中...
          </span>
        )}
        {!hasNextPage && posts.length > 0 && (
          <span className="text-caption font-caption text-on-surface-variant">
            已经到底啦 ·
          </span>
        )}
      </div>
    </div>
  );
}
