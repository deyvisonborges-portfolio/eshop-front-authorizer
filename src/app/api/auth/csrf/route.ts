import { AUTH_CONSTANTS } from "@/modules/authentication/constants"
import { CSRFService } from "@/modules/authentication/service/mongo/csrf.service"
import { createResponse } from "@/utils/response-helper"
const csrfService = new CSRFService()

export async function GET() {
  const result = await csrfService.getCSRFToken()

  if (result?.errors || !result?.data?.token) {
    return createResponse(500, null, result?.errors || "CSRF token not found")
  }

  const response = createResponse(200, result.data.token)

  response.cookies.set(AUTH_CONSTANTS.cookie.csrfToken, result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  })

  return response
}
