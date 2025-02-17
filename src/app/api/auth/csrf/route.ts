import crypto from "crypto";
import { AUTH_CONSTANTS } from "@/app/modules/authentication/constants";
import { createResponse } from "@/app/utils/response-helper";

export async function GET() {
  if (!AUTH_CONSTANTS.secret.csrfKey) {
    return createResponse(401, undefined, "Failed to generate CSRF token");
  }

  const iat = Math.floor(Date.now() / 1000); // Timestamp atual
  const exp = iat + 60; // Expira em 1 min
  const expires = `${iat}.${exp}`;

  const hash = crypto
    .createHmac("sha256", AUTH_CONSTANTS.secret.csrfKey)
    .update(expires)
    .digest("hex");

  const token = `${expires}.${hash}`;
  const response = createResponse(200, { token });

  response.cookies.set(AUTH_CONSTANTS.cookie.csrfToken, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
