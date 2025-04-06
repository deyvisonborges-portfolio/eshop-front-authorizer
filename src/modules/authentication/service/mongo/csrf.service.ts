import crypto from "crypto"
import { AUTH_CONSTANTS } from "../../constants"

export class CSRFService {
  async getCSRFToken(): Promise<{
    data?: { token?: string }
    errors?: string[]
  } | null> {
    if (!AUTH_CONSTANTS.secret.csrfKey) {
      return { data: {}, errors: ["CSRF key not found"] }
    }

    const iat = Math.floor(Date.now() / 1000) // Timestamp atual
    const exp = iat + 60 // Expira em 1 min
    const expires = `${iat}.${exp}`

    const hash = crypto
      .createHmac("sha256", AUTH_CONSTANTS.secret.csrfKey)
      .update(expires)
      .digest("hex")

    const token = `${expires}.${hash}`

    return { data: { token }, errors: [] }
  }

  async validateCSRFToken(token: string): Promise<{
    data?: { success: boolean }
    errors?: string[]
  } | null> {
    const error = (message: string) => ({
      data: { success: false },
      errors: [message],
    })

    if (!token) return error("CSRF token missing")
    if (!AUTH_CONSTANTS.secret.csrfKey) return error("CSRF key not found")

    const parts = token.split(".")
    if (parts.length !== 3) return error("Invalid token format")

    const [iat, exp, hash] = parts
    const now = Math.floor(Date.now() / 1000)

    if (Number(exp) < now) return error("Token expired")

    const expectedHash = crypto
      .createHmac("sha256", AUTH_CONSTANTS.secret.csrfKey)
      .update(`${iat}.${exp}`)
      .digest("hex")

    if (hash !== expectedHash) return error("Invalid token signature")

    return { data: { success: true }, errors: [] }
  }
}
