import { AUTH_CONSTANTS } from "@/modules/authentication/constants"
import { createResponse } from "@/utils/response-helper"
import crypto from "crypto"

export async function POST(req: Request) {
  if (!AUTH_CONSTANTS.secret.csrfKey) {
    return createResponse(500, undefined, "Server error")
  }

  const token = req.headers.get("X-CSRF-Token")?.trim()

  if (!token) {
    return createResponse(400, undefined, "CSRF token missing")
  }

  const parts = token.split(".")
  if (parts.length !== 3) {
    return createResponse(400, undefined, "Invalid token format")
  }

  const [iat, exp, hash] = parts
  const now = Math.floor(Date.now() / 1000)

  if (Number(exp) < now) {
    return createResponse(403, undefined, "Token expired")
  }

  const expectedHash = crypto
    .createHmac("sha256", AUTH_CONSTANTS.secret.csrfKey)
    .update(`${iat}.${exp}`)
    .digest("hex")

  if (hash !== expectedHash) {
    return createResponse(403, undefined, "Invalid token signature")
  }

  return createResponse(200, { success: true })
}
