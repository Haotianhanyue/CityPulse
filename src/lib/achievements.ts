// ============================================================
// 成就/勋章规则（纯函数派生层）
// ------------------------------------------------------------
// 输入 UserProfile 的现有成长字段，输出可展示的勋章列表。
// 不依赖数据库、不需要新实体：解锁状态完全由现有字段计算。
// ============================================================
import type { UserProfile } from "@/types";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "探索" | "创作" | "体力" | "等级";
  unlocked: boolean;
  /** 0..1，达成进度 */
  progress: number;
  /** 未解锁时的缺口文案 */
  remainingText?: string;
}

/** totalDistance 在 UserProfile 中是字符串（如 "248km"），解析出数值 */
function parseKm(distance: string): number {
  const n = parseFloat(distance);
  return Number.isFinite(n) ? n : 0;
}

interface Rule {
  id: string;
  name: string;
  icon: string;
  category: Achievement["category"];
  threshold: number;
  unit: string;
  value: (u: UserProfile) => number;
}

const RULES: Rule[] = [
  { id: "first-spot", name: "首步探索者", icon: "footprint", category: "探索", threshold: 1, unit: "个地点", value: (u) => u.spotsExplored },
  { id: "ten-spots", name: "十点踏印", icon: "distance", category: "探索", threshold: 10, unit: "个地点", value: (u) => u.spotsExplored },
  { id: "hundred-spots", name: "百点探索家", icon: "travel_explore", category: "探索", threshold: 100, unit: "个地点", value: (u) => u.spotsExplored },
  { id: "first-route", name: "路线创造者", icon: "route", category: "创作", threshold: 1, unit: "条路线", value: (u) => u.routesCreated },
  { id: "five-routes", name: "五线织城", icon: "alt_route", category: "创作", threshold: 5, unit: "条路线", value: (u) => u.routesCreated },
  { id: "ten-km", name: "公里行者", icon: "directions_walk", category: "体力", threshold: 10, unit: "公里", value: (u) => parseKm(u.totalDistance) },
  { id: "hundred-km", name: "百公里行者", icon: "sprint", category: "体力", threshold: 100, unit: "公里", value: (u) => parseKm(u.totalDistance) },
  { id: "level-ten", name: "城市脉搏", icon: "bolt", category: "等级", threshold: 10, unit: "级", value: (u) => u.level },
];

/** 根据用户成长字段派生全部成就（已解锁 + 进行中） */
export function getAchievements(user: UserProfile): Achievement[] {
  return RULES.map((r) => {
    const value = r.value(user);
    const unlocked = value >= r.threshold;
    const progress = Math.max(0, Math.min(value / r.threshold, 1));
    return {
      id: r.id,
      name: r.name,
      description: `${r.threshold}${r.unit}`,
      icon: r.icon,
      category: r.category,
      unlocked,
      progress,
      remainingText: unlocked
        ? undefined
        : `再 ${Math.ceil(r.threshold - value)} ${r.unit} 解锁`,
    };
  });
}
