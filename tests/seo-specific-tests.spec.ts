import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("1 - Page should have favicon", async ({ page }) => {
  const faviconElement = page
    .locator("link[rel='icon'], link[rel='shortcut icon']")
    .first()

  await expect(faviconElement).toHaveCount(1)
})
