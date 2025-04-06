import { CSRFService } from "@/modules/authentication/service/mongo/csrf.service"
import { createResponse } from "@/utils/response-helper"

const csrfService = new CSRFService()

export async function POST(req: Request) {
  const token = req.headers.get("X-CSRF-Token")?.trim()
  if (!token) {
    return createResponse(400, undefined, "CSRF token missing")
  }

  const result = await csrfService.validateCSRFToken(token)

  if (result?.errors) {
    return createResponse(400, undefined, result.errors)
  }

  return createResponse(200, { success: true })
}
