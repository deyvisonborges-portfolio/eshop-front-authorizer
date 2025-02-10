// import { Middleware } from "next/dist/lib/load-custom-routes";
// import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// const publicRoutes = [
//   { path: "/", whenAuthenticated: "next" },
//   { path: "/test", whenAuthenticated: "redirect" },
//   { path: "/valid", whenAuthenticated: "next" },
// ];

// const REDICT_URL = "/login";

// export function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const routeMatch = publicRoutes.find((route) => route.path === path);

//   console.log("[INFO] Middleware path: ", path);

//   const token = req.cookies.get("token");

//   if (!token && routeMatch) {
//     console.log(`passei?`)
//     return NextResponse.next();
//   }

//   if (!token && !routeMatch) {
//     const redirectURL = req.nextUrl.clone();
//     redirectURL.pathname = REDICT_URL;
//     console.log("[INFO] Redirecting to: ", redirectURL.toString());
//     return NextResponse.redirect(redirectURL);
//   }

//   // if (token && routeMatch && routeMatch.whenAuthenticated === "redirect") {
//   //   const redirectURL = req.nextUrl.clone();
//   //   redirectURL.pathname = "/";
//   //   return NextResponse.redirect(redirectURL);
//   // }

//   // if (token && !routeMatch) {
//   //   // checar se o token é valido
//   //   // se sim, remover cookie e redirecionar para login
//   //   // aplicar estrategia de refresh token
//   //   return NextResponse.next();
//   // }

//   return NextResponse.next();
// }

// export const config: MiddlewareConfig = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };
