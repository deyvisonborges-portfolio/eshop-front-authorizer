import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<{
    authenticated: boolean;
    user?: any;
  }>({
    authenticated: false,
  });

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });
      const data = await response.json();
      setSession(data);
    };

    fetchSession();
  }, []);

  return session;
}
