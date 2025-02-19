import crypto from "crypto";
import { AUTH_CONSTANTS } from "@/app/modules/authentication/constants";
import { createResponse } from "@/app/utils/response-helper";
import { NextResponse } from "next/server";

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

  // ISSUE - resolve esse problema de setar o retorno manualmente sem usar o createResponse
  const response = NextResponse.json({
    data: token,
    status: 200,
  });

  response.cookies.set(AUTH_CONSTANTS.cookie.csrfToken, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
