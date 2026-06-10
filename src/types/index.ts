// ============================================================
// CityPulse Type Definitions
// ============================================================

/** 路线站点 */
export interface RouteStop {
  order: number;
  name: string;
  nameEn?: string;
  time: string;
  description: string;
  images: string[];
  tips?: string;
}

/** 用户资料 */
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  title: string;
  totalDistance: string;
  spotsExplored: number;
  routesCreated: number;
  experience: { current: number; nextLevel: number };
}

/** 路线 */
export interface Route {
  id: string;
  title: string;
  subtitle: string;
  category: "城市漫步" | "夜骑" | "文化探访" | "美食之旅";
  location: string;
  distance: string;
  duration: string;
  difficulty: "轻松" | "中等" | "挑战";
  author: UserProfile;
  stops: RouteStop[];
  likes: number;
  bookmarks: number;
  comments: number;
  coverImage: string;
  isTopRated?: boolean;
}

/** 社区动态 */
export interface Post {
  id: string;
  type: "精选路线" | "隐藏宝藏" | "拍照圣地" | "热门活动" | "建筑美学";
  author: UserProfile;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  bookmarks?: number;
  createdAt: string;
  isTrending?: boolean;
}

/** 兴趣点 */
export interface POI {
  id: string;
  name: string;
  category: "餐饮美食" | "休闲娱乐" | "地标" | "购物";
  rating: number;
  distance: string;
  status: "营业中" | "即将闭店" | "今日开放";
  tags: string[];
  image: string;
  description: string;
  location: { lat: number; lng: number };
  isPulse?: boolean;
}

/** 评论 */
export interface Comment {
  id: string;
  author: UserProfile;
  content: string;
  createdAt: string;
  likes: number;
}

/** 导航项 */
export type NavTab = "explore" | "feed" | "routes" | "profile";
