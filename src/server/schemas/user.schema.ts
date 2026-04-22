import { z } from "zod";

// Esta senha temporária será entregue pelo admin ao usuário.
// As regras abaixo tentam evitar senhas muito fracas já no backend.
const temporaryPasswordSchema = z
  .string()
  .min(8, "A senha temporária deve ter pelo menos 8 caracteres.")
  .regex(/[A-Za-z]/, "A senha temporária deve conter ao menos uma letra.")
  .regex(/[0-9]/, "A senha temporária deve conter ao menos um número.");

export const createUserSchema = z.object({
  nome: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
  email: z.email("Informe um email válido."),
  temporary_password: temporaryPasswordSchema,
  role: z.enum(["ADMIN", "ALUNO", "PROFESSOR"]),
  tel: z.string().min(11, "O telefone deve ter pelo menos 11 dígitos."),

  aluno: z.object({
      data_nasc: z.coerce.date(),
      serie: z.string(),
      resp_tel: z.string().min(11, "O telefone do responsável é obrigatório."),
      resp_nome: z.string().min(4, "O nome do responsável é obrigatório."),
      modalidade_id: z.number().int(),
      tempo_aula: z.number().positive(),
      horas_semana: z.number().positive(),
      tempo_contrato: z.number().int().positive(),
    }).optional(),

  professor: z.object({
      materia: z.string().min(2, "A matéria é obrigatória."),
      modalidade_id: z.number().int(),
    }).optional(),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;