import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    env: {
      API_URL: "http://localhost:3000/api/v1",
      NEXT_PUBLIC_SITE_URL: "https://enje.dev",
      REVALIDATE_SECRET: "test-secret-value",
    },
  },
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});
