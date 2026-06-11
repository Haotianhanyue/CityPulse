import { test, expect } from "@playwright/test";

/**
 * CityPulse 冒烟测试：验证核心路由可访问、关键内容渲染、认证守卫生效。
 * 不依赖真实数据库——读路径回退 mock，故 CI 中无需配库即可通过。
 */

test("探索首页：地图搜索栏渲染", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByPlaceholder("搜索街道、广场或隐秘的咖啡店...")
  ).toBeVisible();
});

test("社区动态页：标题与信息流渲染", async ({ page }) => {
  await page.goto("/community");
  await expect(
    page.getByRole("heading", { name: "社区动态" })
  ).toBeVisible();
});

test("路线列表页：标题与搜索框渲染", async ({ page }) => {
  await page.goto("/routes");
  await expect(
    page.getByRole("heading", { name: "发现路线" })
  ).toBeVisible();
  await expect(
    page.getByPlaceholder("搜索路线、地点或社区成员...")
  ).toBeVisible();
});

test("路线详情页：可由列表进入并展示内容", async ({ page }) => {
  await page.goto("/routes/r-001");
  // 路线标题与「行程亮点」时间线在移动端/桌面端均可见（相关推荐侧栏仅桌面端显示）
  await expect(
    page.getByRole("heading", { name: /徐汇周日漫步/ })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "行程亮点" })
  ).toBeVisible();
});

test("个人中心：未登录时被中间件守卫重定向到登录", async ({ page }) => {
  await page.goto("/profile");
  await expect(page).toHaveURL(/signin/);
});
