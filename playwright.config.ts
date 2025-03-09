import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    headless: true, // Muda para false se quiser ver o navegador abrindo
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    trace: "on-first-retry", // Ajuda na depuração
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chorme"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
