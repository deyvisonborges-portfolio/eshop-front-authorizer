"use client";

import { Button, Heading, Text } from "@/@lib-ui";
import InputOTP from "@/@lib-ui/src/core-components/input-otp";
import { useSession } from "@/hooks/use-session";
import { SessionProvider } from "@/providers/with-session-protection.hoc";
import { redirect } from "next/navigation";
import { useState } from "react";

export function OTPPage() {
  const { user } = useSession();
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsValidated(true);
    setLoading(false);
    redirect("/");
  };

  const validateOTP = async () => {
    if (isValidated) {
      handleConfirm();
    }
  };

  return (
    <SessionProvider>
      <div>
        <Heading as="h3" size="large">
          Verificação de PIN
        </Heading>

        <Text>
          Obrigado por se cadastrar em nossa plataforma. Por favor, insira o
          código que vai chegar em seu e-mail {user?.email}
        </Text>

        <InputOTP />
        <Button type="button" disabled={loading} onClick={handleConfirm}>
          {loading ? "Confirmando" : "Confirmar"}
        </Button>
      </div>
    </SessionProvider>
  );
}
