"use server";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secreta-super-segura";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await request.json();

  const errors: { email?: string[]; password?: string[] } = {};

  if (!data.email) {
    errors.email = ["Email é obrigatório"];
  }

  if (!data.password) {
    errors.password = ["Senha é obrigatória"];
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  // Simula uma autenticação real
  if (data.email === "admin@example.com" && data.password === "123456") {
    // Criar token JWT válido por 1 hora
    const token = jwt.sign({ email: data.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Criar resposta com cookie HttpOnly
    const response = NextResponse.json({ success: true });

    // (await cookies()).set("session", token, {
    //   httpOnly: true, // Impede acesso via JavaScript no cliente (segurança)
    //   secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
    //   sameSite: "strict", // Previne ataques CSRF
    //   path: "/", // Disponível para toda a aplicação
    //   maxAge: 60 * 60 * 24, // Expira em 1 dia
    // });

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true, // Protege contra ataques XSS
      secure: process.env.NODE_ENV === "production", // Só HTTPS em produção
      sameSite: "strict", // ou lax
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { error: { email: ["Email ou senha incorretos"] } },
    { status: 401 }
  );
}
