"use client";
import { LoginPage } from "@/app/modules/authentication/login/login.page";
import { useSession } from "@/hooks/use-session";

export default function _LoginPage() {
  const { authenticated, user } = useSession();
  console.log(authenticated, user);
  return <LoginPage />;
}
