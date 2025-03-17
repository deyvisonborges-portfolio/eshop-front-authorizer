import { test, expect } from "@playwright/test"

test("Deve exibir os detalhes do produto corretamente", async ({ page }) => {
  // Defina um ID de produto válido para testar
  const productId = "12345"

  // Acesse a página de detalhes do produto
  await page.goto(`http://localhost:3000/produto/${productId}`)

  // Aguarde o carregamento do skeleton e depois a renderização do produto
  await expect(page.locator("[data-testid='product-skeleton']")).toBeVisible()
  await expect(page.locator("[data-testid='product-details']")).toBeVisible()

  // Verifique se o nome do produto é exibido corretamente
  const productTitle = await page
    .locator("[data-testid='product-title']")
    .textContent()
  expect(productTitle).not.toBeNull()
})
