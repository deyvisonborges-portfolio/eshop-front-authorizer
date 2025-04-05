import { headers } from "next/headers"

export async function useSecutiry() {
  const { get } = await headers()

  const csrfTokenFromCookie = get("csrfToken")
  const csrfTokenFromHeader = get("X-CSRF-Token")
  if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromHeader) {
    throw new Error("CSRF token inválido")
  }
  // console.log("CSRF token válido")
  // console.log("CSRF token válido", csrfTokenFromCookie, csrfTokenFromHeader)
}
