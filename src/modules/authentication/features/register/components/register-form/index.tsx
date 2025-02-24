"use client";

import { Button, Form, Input } from "@/@lib-ui";
import styles from "./register-form.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserType } from "@/app/api/mongo/users/types";
import { MongoUserService } from "@/modules/authentication/service/mongo/mongo-user.service";

export const registerFormZodSchema = z
  .object({
    name: z
      .string()
      .nonempty({
        message: "Não pode ser vazio",
      })
      .trim(),
    email: z
      .string()
      .email({ message: "Digite um e-mail válido" })
      .toLowerCase(),
    password: z
      .string()
      .min(1, { message: "Não pode ser vazio" })
      .min(5, { message: "Deve possuir no mínimo 5 caracteres" })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Não pode ser vazio" })
      .min(5, { message: "Deve possuir no mínimo 5 caracteres" })
      .trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senhas não combinam",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormSchema = z.infer<typeof registerFormZodSchema>;

export function RegisterForm() {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    ...form
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormZodSchema),
  });

  const handleSubmitData = async (data: RegisterFormSchema) => {
    const mongoService = new MongoUserService();
    const user: CreateUserType = { ...data };
    await mongoService.createUser(user);
    await fetch("/api/nodemailer", {
      method: "POST",
    });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(handleSubmitData)}>
      <Input
        disabled={isSubmitting}
        label="Nome"
        placeholder="Informe seu nome"
        isFull
        required
        customMessage={errors.name?.message}
        {...(errors.name && { has: { error: true } })}
        {...form.register("name")}
      />
      <Input
        disabled={isSubmitting}
        label="email"
        placeholder="example@example.com"
        isFull
        required
        customMessage={errors.email?.message}
        {...(errors.email && { has: { error: true } })}
        {...form.register("email")}
      />
      <Input
        type="password"
        disabled={isSubmitting}
        label="Senha"
        placeholder="*********"
        isFull
        required
        customMessage={errors.password?.message}
        {...(errors.password && { has: { error: true } })}
        {...form.register("password")}
      />

      <Input
        type="password"
        disabled={isSubmitting}
        label="Confirmação de senha"
        placeholder="*********"
        isFull
        required
        customMessage={errors.confirmPassword?.message}
        {...(errors.confirmPassword && { has: { error: true } })}
        {...form.register("confirmPassword")}
      />
      <Button type="submit" isFull variant="rounded" disabled={isSubmitting}>
        {isSubmitting ? "Enviando" : "Cadastrar"}
      </Button>
    </Form>
  );
}
