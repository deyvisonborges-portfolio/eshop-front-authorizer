import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createResponse } from "@/app/utils/response-helper";
import { NextResponse } from "next/server";

function validateEntries(data: { email: string; password: string }) {
  const errors: Record<string, string[]> = {};
  if (!data.email) {
    errors.email = ["Email é obrigatório"];
  }
  if (!data.password) {
    errors.password = ["Senha é obrigatória"];
  }
  if (Object.keys(errors).length > 0) {
    return createResponse(400, JSON.stringify(errors));
  }
}

export async function POST(request: Request) {
  const input = await request.json();
  validateEntries(input);
  const response = await fetch("http://localhost:3000/api/mongo/users", {
    method: "GET",
  });

  const data = (await response.json()) as [
    { id: string; email: string; passwordHash: string }
  ];

  const user = data.find((user) => user.email === input.email);

  if (!user)
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 401 }
    );

  const token = jwt.sign(
    { id: user.id, email: user.email },
    String(process.env.JWT_SECRET),
    { expiresIn: "1h" }
  );

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return createResponse(200, JSON.stringify({ success: true }));
}
