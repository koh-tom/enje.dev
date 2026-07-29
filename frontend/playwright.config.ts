import { defineConfig, devices } from "@playwright/test";

/**
 * スモークテスト。モック API を立てて Next.js を起動し、主要ページが表示されることだけ確認する。
 * 実行: bun run test:e2e（初回は bunx playwright install chromium）
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "bun scripts/mock-api.ts",
      url: "http://localhost:3000/up",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "bun run build && bun run start -- -p 3001",
      url: "http://localhost:3001",
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        API_URL: "http://localhost:3000/api/v1",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3001",
        REVALIDATE_SECRET: "e2e-secret-value",
      },
    },
  ],
});
