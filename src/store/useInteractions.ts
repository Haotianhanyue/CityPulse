"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================
// 点赞 / 收藏 的客户端乐观状态
// ------------------------------------------------------------
// 在缺少逐条互动后端的情况下，用本地持久化状态提供「即时反馈」体验，
// 刷新后保留。后续接入真实 API 时，可在 toggle 内补 fetch + 回滚。
// ============================================================
interface InteractionState {
  liked: Record<string, boolean>;
  bookmarked: Record<string, boolean>;
  toggleLike: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

export const useInteractions = create<InteractionState>()(
  persist(
    (set) => ({
      liked: {},
      bookmarked: {},
      toggleLike: (id) =>
        set((s) => ({ liked: { ...s.liked, [id]: !s.liked[id] } })),
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarked: { ...s.bookmarked, [id]: !s.bookmarked[id] },
        })),
    }),
    { name: "citypulse-interactions" },
  ),
);

/** 计算叠加后的展示计数（基础值 + 本地点赞 ±1） */
export function displayCount(base: number, active: boolean): number {
  return active ? base + 1 : base;
}
