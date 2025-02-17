"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createResponse } from "@/app/utils/response-helper";
import { AUTH_CONSTANTS } from "@/app/modules/authentication/constants";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await request.json();

  // 2. **Validação dos dados de login**
  const errors: Record<string, string[]> = {};

  if (!data.email) {
    errors.email = ["Email é obrigatório"];
  }
  if (!data.password) {
    errors.password = ["Senha é obrigatória"];
  }

  if (Object.keys(errors).length > 0) {
    return createResponse(400, JSON.stringify(errors)); // 🔥 Convertendo errors para string
  }

  // 3. **Simula autenticação**
  if (data.email === "admin@example.com" && data.password === "123456") {
    const token = jwt.sign(
      { email: data.email },
      AUTH_CONSTANTS.secret.csrfKey,
      {
        expiresIn: "1h",
      }
    );

    // Define o cookie da sessão com o token JWT
    (
      await // Define o cookie da sessão com o token JWT
      cookies()
    ).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return createResponse(200, JSON.stringify({ success: true })); // 🔥 Convertendo para string
  }

  return createResponse(
    401,
    JSON.stringify({ email: ["Email ou senha incorretos"] })
  );
}
