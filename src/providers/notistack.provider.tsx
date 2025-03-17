"use client"

import { SnackbarProvider } from "notistack"
import { PropsWithChildren } from "react"

export function NotistackProvider({ children }: PropsWithChildren) {
  return <SnackbarProvider>{children}</SnackbarProvider>
}
