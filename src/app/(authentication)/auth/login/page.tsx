"use client"

import { useSession } from "@/hooks/use-session"
import { LoginPage } from "@/modules/authentication/features/login/login.page"

export default function LoginAppPage() {
  const { authenticated, user } = useSession()
  console.log(authenticated, user)
  return <LoginPage />
}
