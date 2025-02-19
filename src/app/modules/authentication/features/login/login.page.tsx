"use client";

import styles from "./login.page.module.css";
import { InputCheckbox } from "@/@lib-ui/src/core-components/input-checkbox";
import { Button, Form, Heading, Input, Text } from "@/@lib-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import Github from "@/@lib-icons/src/icons/github";
// import GoogleDrive from "@/@lib-icons/src/icons/google";

// https://youtu.be/XSbMSSdGSdg
export const formLoginSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }).toLowerCase(),
  // .refine((email) => {
  //   return email.endsWith("@gmail.com");
  // }, "Informe um e-mail do Gmail"),
  password: z
    .string()
    .min(1, { message: "Não pode ser vazio" })
    .min(5, { message: "Deve possuir no mínimo 5 caracteres" })
    // .regex(/[a-zA-Z]'/, { message: "Deve conter pelo menos uma letra" })
    // .regex(/[0-9]'/, { message: "Deve conter pelo menos um número" })
    // .regex(/[ˆa-zA-Z0-9]/, {
    //   message: "Deve conter pelo menos 1 caractere especial",
    // })
    .trim(),
});

type LoginSchema = z.infer<typeof formLoginSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "admin@example.com",
      password: "123456",
    },
    resolver: zodResolver(formLoginSchema),
  });

  const fetchCSRF = async () => {
    const response = await fetch("/api/auth/csrf");
    const { data } = await response.json(); // Corrigido para `token`
    return data;
  };

  const handleAuthenticate = async (d: LoginSchema) => {
    const csrfToken = await fetchCSRF();

    const csrfResponseValidation = await fetch("/api/auth/csrf-validation", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    const csrfResultValidation = await csrfResponseValidation.json();
    // IISSUE: tratar isso aqui, pois nao faz sentido
    if (csrfResultValidation.error) {
      console.log("deu erro no csrf validation");
      // https://react-hook-form.com/docs/useform/seterror
      setError("email", {
        type: "manual",
        message: csrfResultValidation?.error?.email?.[0] || "Unknown error",
      });
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(d),
    });

    const result = await response.json();
    if (result.error) {
      // https://react-hook-form.com/docs/useform/seterror
      setError("root", {
        type: "manual",
        message: result?.error || "Unknown error",
      });
    }
  };

  return (
    <div className={styles.card}>
      <p style={{ color: "red" }}>{errors.root?.message}</p>
      <div className={styles["card-header"]}>
        <Heading as="h5" size="small" weight="bold" className={styles.heading}>
          Entre na sua conta
        </Heading>
        <Text className={styles.subtext}>
          Informe seu e-mail e senha para autenticar
        </Text>
      </div>

      <Form className={styles.form} onSubmit={handleSubmit(handleAuthenticate)}>
        <Input
          disabled={isSubmitting}
          label="E-mail"
          placeholder="example@example.com"
          isFull
          required
          {...(errors.email && { has: { error: true } })}
          {...register("email")}
          customMessage={errors.email?.message}
        />
        <Input
          disabled={isSubmitting}
          label="Senha"
          type="password"
          placeholder="Informe sua senha"
          isFull
          required
          {...(errors.email && { has: { error: true } })}
          {...register("password")}
          customMessage={errors.password?.message}
        />
        <Button type="submit" isFull variant="rounded" disabled={isSubmitting}>
          {isSubmitting ? "Enviando" : "Autenticar"}
        </Button>
      </Form>

      <div className={styles["container-actions"]}>
        <InputCheckbox checkboxSize="small" label="Matenha-me conectado" />
        <Text decoration="link" size="medium">
          Esqueci minha senha
        </Text>
      </div>

      {isSubmitSuccessful && <p>Autenticacao concluida</p>}
    </div>
  );
}
