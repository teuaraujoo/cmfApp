import "server-only";

import { z } from "zod";

export const createUserSchema = z.object({
  nome: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
  email: z.email("Informe um email válido."),
  role: z.enum(["ADMIN", "ALUNO", "PROFESSOR"]),
  tel: z.string().min(11, "O telefone deve ter pelo menos 11 dígitos."),

  aluno: z.object({
      data_nasc: z.coerce.date(),
      serie: z.string(),
      escola: z.string().min(2, "A escola é obrigatória."),
      resp_tel: z.string().min(11, "O telefone do responsável deve ter pelo menos 11 dígitos."),
      resp_nome: z.string().min(4, "O nome do responsável é obrigatório."),
      horas_mensais: z.number().positive(),
    }).optional(),

  professor: z.object({
      materia: z.string().min(2, "A matéria é obrigatória."),
    }).optional(),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.extend({
  tel: z.string().min(11, "O telefone deve ter pelo menos 11 dígitos.").nullable(),
});

export type UpdateUserBody = z.infer<typeof updateUserSchema>;
