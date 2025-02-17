"use server";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secreta-super-segura";

export async function POST(request: Request) {
  // Simula um delay para teste (remova em produção)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Recupera os dados enviados no corpo da requisição
  const data = await request.json();

  // 1. **Validação do Token CSRF**
  // Pega o token CSRF que veio no header da requisição
  const csrfHeader = request.headers.get("X-CSRF-Token");
  // Recupera o cookie onde o token CSRF foi armazenado anteriormente
  const cookieStore = cookies();
  const csrfCookie = (await cookieStore).get("csrfToken")?.value;

  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    return NextResponse.json({ error: "CSRF token inválido" }, { status: 403 });
  }

  // 2. **Validação dos dados de login**
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

  // 3. **Simula autenticação**
  if (data.email === "admin@example.com" && data.password === "123456") {
    // Cria um token JWT válido por 1 hora
    const token = jwt.sign({ email: data.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Cria a resposta e define o cookie da sessão com o token JWT
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true, // Protege contra acesso via JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { error: { email: ["Email ou senha incorretos"] } },
    { status: 401 }
  );
}

// SignedCookie -> test.irweriuwe08un23
// HttpOnly -> nao sao acessiveis via document.cookie (client-side)
