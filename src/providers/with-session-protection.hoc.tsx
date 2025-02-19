import { useSession } from "@/hooks/use-session";
import { PropsWithChildren } from "react";

export function SessionProvider({ children }: PropsWithChildren) {
  const { authenticated } = useSession();
  return <>{authenticated && children}</>;
}
