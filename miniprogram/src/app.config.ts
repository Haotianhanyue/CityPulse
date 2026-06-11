export default defineAppConfig({
  pages: [
    "pages/explore/index",
    "pages/routes/index",
    "pages/community/index",
    "pages/profile/index",
    "pages/route-detail/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ab3500",
    navigationBarTitleText: "CityPulse",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    color: "#594139",
    selectedColor: "#ab3500",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/explore/index",
        text: "探索",
        iconPath: "assets/tabbar/explore.png",
        selectedIconPath: "assets/tabbar/explore-active.png",
      },
      {
        pagePath: "pages/routes/index",
        text: "路线",
        iconPath: "assets/tabbar/routes.png",
        selectedIconPath: "assets/tabbar/routes-active.png",
      },
      {
        pagePath: "pages/community/index",
        text: "社区",
        iconPath: "assets/tabbar/community.png",
        selectedIconPath: "assets/tabbar/community-active.png",
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "assets/tabbar/profile.png",
        selectedIconPath: "assets/tabbar/profile-active.png",
      },
    ],
  },
  // 真机地图/定位需声明权限
  permission: {
    "scope.userLocation": { desc: "用于在地图上展示你附近的探索点" },
  },
  requiredPrivateInfos: ["getLocation"],
});
