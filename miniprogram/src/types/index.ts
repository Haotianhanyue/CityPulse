// CityPulse 类型定义（与 Web 端 src/types 对齐）
export interface RouteStop {
  order: number;
  name: string;
  nameEn?: string;
  time: string;
  description: string;
  images: string[];
  tips?: string;
}

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

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface Collection<T> {
  data: T[];
  total: number;
}
