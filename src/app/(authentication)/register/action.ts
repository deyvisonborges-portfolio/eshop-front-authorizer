"use server";

import { registerFormZodSchema } from "@/app/modules/authentication/features/register/components/register-form";

interface FormData {
  get(name: string): string | null;
}

interface RegisterActionState {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export async function registerAction(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validatedFields = registerFormZodSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      name,
      email,
      password,
      confirmPassword,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { name, email, password, confirmPassword };
}
