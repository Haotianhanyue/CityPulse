/**
 * CityPulse Test Harness - 测试夹具数据
 * 包含预期的设计 token、组件模式和页面结构定义
 */

module.exports = {
  // 预期的设计 Token
  designTokens: {
    primary: '#ab3500',
    primaryContainer: '#ff6b35',
    secondary: '#24619d',
    secondaryContainer: '#87bcfe',
    surface: '#f9f9f9',
    onSurface: '#1a1c1c',
    background: '#f9f9f9',
    error: '#ba1a1a',
    outline: '#8d7168',
    outlineVariant: '#e1bfb5',
  },

  // 预期的字体配置
  fonts: {
    headline: 'Plus Jakarta Sans',
    body: 'Inter',
  },

  // 预期的间距 Token
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    gutter: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    'margin-mobile': '16px',
    'margin-desktop': '32px',
  },

  // 预期的页面清单
  expectedPages: [
    {
      id: 'route-detail-desktop',
      name: '路线详情 - 桌面端',
      marker: '路线详情 - CityPulse',
      expectedComponents: ['top-nav', 'hero-section', 'timeline', 'sidebar', 'comments'],
    },
    {
      id: 'profile-desktop',
      name: '个人中心 - 桌面端',
      marker: '个人中心 - CityPulse',
      expectedComponents: ['sidebar-nav', 'stats-grid', 'saved-routes', 'my-posts'],
    },
    {
      id: 'profile-mobile',
      name: '个人中心 - 移动端',
      marker: '个人中心 - 移动端',
      expectedComponents: ['top-bar', 'profile-hero', 'saved-routes', 'bottom-nav'],
    },
    {
      id: 'community-desktop',
      name: '社区动态 - 桌面端',
      marker: '社区动态 - CityPulse',
      expectedComponents: ['sidebar-nav', 'filter-tabs', 'masonry-grid', 'fab'],
    },
    {
      id: 'community-mobile',
      name: '社区动态 - 移动端',
      marker: '社区动态 - 移动端',
      expectedComponents: ['filter-tabs', 'article-cards', 'bottom-nav'],
    },
    {
      id: 'route-detail-mobile',
      name: '路线详情 - 移动端',
      marker: '路线详情 - 移动端',
      expectedComponents: ['map-view', 'sidebar-panel', 'markers', 'bottom-nav'],
    },
    {
      id: 'explore-hall',
      name: '探索大厅',
      marker: '探索大厅 - CityPulse',
      expectedComponents: ['fullscreen-map', 'search-bar', 'category-chips', 'bottom-sheet'],
    },
  ],

  // 预期的底部导航项
  bottomNavItems: ['map', 'forum', 'route', 'account_circle'],

  // 预期的侧边导航项
  sidebarNavItems: ['explore', 'map', 'group', 'person'],

  // 内容卡片类型
  cardTypes: [
    { type: '精选路线', icon: 'route', colorClass: 'primary-container' },
    { type: '隐藏宝藏', icon: 'local_cafe', colorClass: 'secondary' },
    { type: '拍照圣地', icon: 'photo_camera', colorClass: 'tertiary-container' },
    { type: '热门活动', icon: 'event', colorClass: 'primary' },
    { type: '建筑美学', icon: 'apartment', colorClass: 'secondary-container' },
  ],

  // 示例路线数据
  sampleRoutes: [
    {
      title: '徐汇周日漫步：梧桐树下的老洋房与咖啡香',
      location: '上海 · 徐汇区',
      distance: '3.2km',
      duration: '2.5h',
      difficulty: '中等',
      stops: [
        { name: '黑石公寓 (Blackstone Apartments)', time: '10:00 AM' },
        { name: '复兴中路梧桐长廊', time: '11:15 AM' },
        { name: '武康大楼 (Wukang Mansion)', time: '12:30 PM' },
      ],
    },
    {
      title: '外滩江边漫步',
      distance: '3.2 km',
      duration: '45 分钟',
      difficulty: '中等难度',
    },
    {
      title: '静安寺隐秘小巷',
      distance: '1.8 km',
      duration: '25 分钟',
      difficulty: '轻松',
    },
  ],

  // 示例 POI 数据
  samplePOIs: [
    { name: '琥珀手冲咖啡', category: '精品咖啡', rating: 4.9, distance: '450m', status: '正在营业' },
    { name: '滨江森林公园', category: '自然景观', rating: 4.7, distance: '1.2km', status: '今日开放' },
    { name: '方格概念空间', category: '潮流艺术', rating: 4.9, distance: '0.5km', status: '即将闭店' },
  ],
};
