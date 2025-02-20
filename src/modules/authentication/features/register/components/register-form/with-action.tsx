// "use client";

// import { Button, Form, Input } from "@/@lib-ui";
// import styles from "./register-form.module.css";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useActionState } from "react";
// import { registerAction } from "@/app/(authentication)/register/action";

// export const registerFormZodSchema = z
//   .object({
//     name: z
//       .string()
//       .nonempty({
//         message: "Não pode ser vazio",
//       })
//       .trim(),
//     email: z
//       .string()
//       .email({ message: "Digite um e-mail válido" })
//       .toLowerCase(),
//     password: z
//       .string()
//       .min(1, { message: "Não pode ser vazio" })
//       .min(5, { message: "Deve possuir no mínimo 5 caracteres" })
//       .trim(),
//     confirmPassword: z
//       .string()
//       .min(1, { message: "Não pode ser vazio" })
//       .min(5, { message: "Deve possuir no mínimo 5 caracteres" })
//       .trim(),
//   })
//   .superRefine((val, ctx) => {
//     if (val.password !== val.confirmPassword) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Senhas não combinam",
//         path: ["confirmPassword"],
//       });
//     }
//   });

// export type RegisterFormSchema = z.infer<typeof registerFormZodSchema>;

// export function RegisterFormWithAction() {
//   const [state, action, isPending] = useActionState(registerAction, {});

//   const handleSubmitData = (data: RegisterFormSchema) => {
//     console.log(data);
//   };

//   return (
//     <Form className={styles.form} action={action}>
//       <Input
//         disabled={isSubmitting}
//         label="Nome"
//         placeholder="Informe seu nome"
//         isFull
//         required
//         customMessage={errors.name?.message}
//         {...(state?.errors.name && { has: { error: true } })}
//         {...form.register("name")}
//       />
//       <Input
//         disabled={isSubmitting}
//         label="email"
//         placeholder="example@example.com"
//         isFull
//         required
//         customMessage={state?.errors.email?.message}
//         {...(state?.errors.email && { has: { error: true } })}
//         {...form.register("email")}
//       />
//       <Input
//         type="password"
//         disabled={isSubmitting}
//         label="Senha"
//         placeholder="*********"
//         isFull
//         required
//         customMessage={state?.errors.password?.message}
//         {...(state?.errors.password && { has: { error: true } })}
//         {...form.register("password")}
//       />

//       <Input
//         type="password"
//         disabled={isSubmitting}
//         label="Confirmação de senha"
//         placeholder="*********"
//         isFull
//         required
//         customMessage={state?.errors.confirmPassword?.message}
//         {...(state?.errors.confirmPassword && { has: { error: true } })}
//         {...form.register("confirmPassword")}
//       />
//       <Button type="submit" isFull variant="rounded" disabled={isSubmitting}>
//         {isSubmitting ? "Enviando" : "Cadastrar"}
//       </Button>
//     </Form>
//   );
// }
