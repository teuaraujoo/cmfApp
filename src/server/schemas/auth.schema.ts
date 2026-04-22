import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um email válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type LoginBody = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "A nova senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Za-z]/, "A nova senha deve conter ao menos uma letra.")
    .regex(/[0-9]/, "A nova senha deve conter ao menos um número."),
  confirmPassword: z.string().min(1, "A confirmação da nova senha é obrigatória."),
});

export type ChangePasswordBody = z.infer<typeof changePasswordSchema>;
