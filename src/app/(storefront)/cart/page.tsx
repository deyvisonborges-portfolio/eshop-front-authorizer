import { CartPage } from "@/modules/store/features/cart/pages/cart.page"

export default async function CartAppPage() {
  // Simula 2 segundos de delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return <CartPage />
}
