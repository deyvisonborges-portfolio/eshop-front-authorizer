"use server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function refreshProductPage() {
  revalidatePath("/products/[id]") // ou o caminho dinâmico conforme sua estrutura
}

export async function refreshProductDataByTag(id: string) {
  revalidateTag(`product-${id}`)
}
