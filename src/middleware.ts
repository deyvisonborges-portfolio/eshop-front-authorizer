import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.method === "POST") {
    const csrfTokenFromCookie = req.cookies.get("csrfToken")?.value;
    const csrfTokenFromHeader = req.headers.get("X-CSRF-Token");

    if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromHeader) {
      return NextResponse.json(
        { error: "CSRF token inválido" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
