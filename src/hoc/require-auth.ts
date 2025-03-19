import { useSession } from "@/hooks/use-session"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

export async function withLogin({ children }: PropsWithChildren) {
  const headersList = await headers()
  const callbackUrl = headersList.get("next-url")
  const { authenticated } = useSession()

  if (!authenticated) redirect(`/auth/login?callbackUrl=${callbackUrl}`)

  return children
}
