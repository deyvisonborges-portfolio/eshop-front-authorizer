import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/@lib-tokens/dist/index.min.css"
import { ThemeProvider } from "@/styles/theme.provider"
import { LoadingProvider } from "@/providers/loading.provider"
import StoreProvider from "@/config/store/store-provider"
import { NotistackProvider } from "@/providers/notistack.provider"
import { ReactQueryProvider } from "@/providers/react-query.provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "eShop",
  description: "A product marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        if (typeof window === "undefined") return; // Evita erro no SSR

        const theme = localStorage.getItem("theme") ||
          (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      })();
    `,
          }}
        />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <NotistackProvider>
              <ReactQueryProvider>
                <LoadingProvider>{children}</LoadingProvider>
              </ReactQueryProvider>
            </NotistackProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

// "use client";
// import { useEffect } from "react";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
//     document.documentElement.setAttribute(
//       "data-theme",
//       prefersDark ? "dark" : "light"
//     );
//   }, []);

//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
