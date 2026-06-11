import { defineConfig, devices } from "@playwright/test";

/**
 * CityPulse E2E 配置。
 * 默认对生产构建（next start）跑冒烟用例；本地也可指向 `next dev`。
 * 零数据库配置即可运行——读路径会回退到 src/data/mock.ts。
 */
const PORT = Number(process.env.PORT ?? 3000);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    // 始终对生产构建跑冒烟用例：dev 模式下 App Router + next/image 的 RSC
    // 存在已知的 HMR useContext 抖动，生产构建才是稳定可信的验证目标。
    // 本地已有运行中的服务时直接复用，避免每次重复构建。
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
