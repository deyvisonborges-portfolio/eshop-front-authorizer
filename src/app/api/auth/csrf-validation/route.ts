import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookiesData = await cookies();
  const csrfTokenFromCookie = cookiesData.get("csrfToken")?.value;
  const { csrfToken, email, password } = await req.json();

  if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfToken) {
    return NextResponse.json({ error: "CSRF token inválido" }, { status: 403 });
  }
}
