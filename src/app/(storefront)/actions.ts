"use server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function refreshListProductsPage() {
  revalidatePath("/") // ou o caminho dinâmico conforme sua estrutura
}
