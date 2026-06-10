import type { Route, Post, POI, UserProfile, Comment } from "@/types";

// ============================================================
// Mock Users
// ============================================================
export const mockUser: UserProfile = {
  id: "u-001",
  name: "林间拾光",
  avatar: "/avatars/user1.jpg",
  level: 12,
  title: "City Explorer · 连接者",
  totalDistance: "248km",
  spotsExplored: 42,
  routesCreated: 8,
  experience: { current: 880, nextLevel: 1000 },
};

const user2: UserProfile = {
  id: "u-002",
  name: "城中小怪",
  avatar: "/avatars/user2.jpg",
  level: 8,
  title: "路线达人",
  totalDistance: "156km",
  spotsExplored: 28,
  routesCreated: 5,
  experience: { current: 600, nextLevel: 1000 },
};

// ============================================================
// Mock Routes
// ============================================================
export const mockRoutes: Route[] = [
  {
    id: "r-001",
    title: "徐汇周日漫步：梧桐树下的老洋房与咖啡香",
    subtitle: "穿梭于复兴中路与武康路之间，探寻历史韵味",
    category: "城市漫步",
    location: "上海 · 徐汇区",
    distance: "3.2km",
    duration: "2.5h",
    difficulty: "中等",
    author: mockUser,
    stops: [
      {
        order: 1,
        name: "黑石公寓",
        nameEn: "Blackstone Apartments",
        time: "10:00 AM",
        description:
          "这座折衷主义风格的标志性建筑是我们的起点。内部的幸福集荟书店非常值得驻足，可以从一张徐汇老洋房明信片开始今天的旅程。",
        images: ["/images/blackstone.jpg"],
      },
      {
        order: 2,
        name: "复兴中路梧桐长廊",
        time: "11:15 AM",
        description:
          "沿着复兴中路向西走，遮天蔽日的法国梧桐在地面洒下斑驳光影。这里是感受上海「梧桐区」宁静与优雅的最佳路段。",
        images: ["/images/fuxing-road.jpg"],
      },
      {
        order: 3,
        name: "武康大楼",
        nameEn: "Wukang Mansion",
        time: "12:30 PM",
        description:
          "邬达克的杰作，像一艘巨轮停泊在五路口。推荐在这里拍摄全景照片，然后去对面的咖啡店享受悠闲午后。",
        images: ["/images/wukang.jpg"],
        tips: "最佳拍摄机位：天平路交叉口",
      },
    ],
    likes: 2400,
    bookmarks: 856,
    comments: 128,
    coverImage: "/images/xuhui-cover.jpg",
    isTopRated: true,
  },
  {
    id: "r-002",
    title: "外滩江边漫步",
    subtitle: "涵盖上海历史建筑与江景的最佳路线",
    category: "城市漫步",
    location: "上海 · 黄浦区",
    distance: "3.2km",
    duration: "45分钟",
    difficulty: "中等",
    author: user2,
    stops: [],
    likes: 1800,
    bookmarks: 620,
    comments: 89,
    coverImage: "/images/bund.jpg",
  },
  {
    id: "r-003",
    title: "静安寺隐秘小巷",
    subtitle: "探索上海闹市区中安静的里弄文化",
    category: "文化探访",
    location: "上海 · 静安区",
    distance: "1.8km",
    duration: "25分钟",
    difficulty: "轻松",
    author: user2,
    stops: [],
    likes: 1200,
    bookmarks: 430,
    comments: 56,
    coverImage: "/images/jingan.jpg",
  },
];

// ============================================================
// Mock Posts
// ============================================================
export const mockPosts: Post[] = [
  {
    id: "p-001",
    type: "精选路线",
    author: { ...mockUser, name: "林木子" },
    title: "老城区的秘密花园：避开游客的午后漫步",
    content: "一条隐藏在繁华背后的宁静路线...",
    images: ["/images/post1.jpg"],
    likes: 1200,
    comments: 45,
    bookmarks: 450,
    createdAt: "2小时前",
    isTrending: true,
  },
  {
    id: "p-002",
    type: "隐藏宝藏",
    author: { ...mockUser, name: "陈小航" },
    title: "雨后的城市书店：在这里可以发呆一整天",
    content: "这家书店有绝佳的窗边座位...",
    images: ["/images/post2.jpg"],
    likes: 856,
    comments: 23,
    createdAt: "5小时前",
  },
  {
    id: "p-003",
    type: "拍照圣地",
    author: { ...mockUser, name: "摄影师王大" },
    title: "赛博朋克现实版：这个天台能俯瞰整座城市",
    content: "夜间最佳拍摄点位分享...",
    images: ["/images/post3.jpg"],
    likes: 3400,
    comments: 120,
    createdAt: "8小时前",
    isTrending: true,
  },
  {
    id: "p-004",
    type: "热门活动",
    author: { ...mockUser, name: "市集爱好者" },
    title: "周末市集：发现本土艺术家的无限创意",
    content: "本月最值得去的三个市集...",
    images: ["/images/post4.jpg"],
    likes: 2100,
    comments: 67,
    createdAt: "1天前",
  },
  {
    id: "p-005",
    type: "建筑美学",
    author: { ...mockUser, name: "极简达人" },
    title: "被低估的现代主义建筑：光影的交错之美",
    content: "城市中那些被忽略的建筑细节...",
    images: ["/images/post5.jpg"],
    likes: 962,
    comments: 34,
    createdAt: "2天前",
  },
];

// ============================================================
// Mock POIs
// ============================================================
export const mockPOIs: POI[] = [
  {
    id: "poi-001",
    name: "琥珀手冲咖啡 (Amber Drip)",
    category: "餐饮美食",
    rating: 4.9,
    distance: "450m",
    status: "营业中",
    tags: ["精品手冲", "安静舒适"],
    image: "/images/coffee.jpg",
    description: "上海必喝的手冲榜首，招牌琥珀冷萃口感醇厚，环境非常适合办公与社交。",
    location: { lat: 31.2105, lng: 121.4576 },
    isPulse: true,
  },
  {
    id: "poi-002",
    name: "滨江森林公园 (Riverside Park)",
    category: "休闲娱乐",
    rating: 4.7,
    distance: "1.2km",
    status: "今日开放",
    tags: ["自然景观", "适合漫步"],
    image: "/images/park.jpg",
    description: "城市里的天然氧吧，适合周末露营与骑行，可以近距离观看三江交汇的壮观景象。",
    location: { lat: 31.228, lng: 121.495 },
  },
  {
    id: "poi-003",
    name: "方格概念空间",
    category: "购物",
    rating: 4.9,
    distance: "0.5km",
    status: "即将闭店",
    tags: ["潮流艺术", "必去榜"],
    image: "/images/shop.jpg",
    description: "高端买手店，集合了国内外独立设计师品牌。",
    location: { lat: 31.205, lng: 121.448 },
  },
];

// ============================================================
// Mock Comments
// ============================================================
export const mockComments: Comment[] = [
  {
    id: "c-001",
    author: user2,
    content: "上周末刚跟着这条路线走完，黑石公寓对面的那家咖啡店真的很赞！梧桐区的光影拍出来太美了。",
    createdAt: "2小时前",
    likes: 12,
  },
  {
    id: "c-002",
    author: { ...mockUser, name: "Leo Wang" },
    content: "Great route! The coffee shop at Blackstone is currently offering a seasonal special. Don't miss it! ☕️",
    createdAt: "5小时前",
    likes: 8,
  },
];
