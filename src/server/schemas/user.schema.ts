import { z } from "zod";

export const createUserSchema = z.object({
    nome: z.string().min(4),
    email: z.string(),
    senha_hash: z.string(),
    role: z.enum(['ADMIN', 'ALUNO', 'PROFESSOR']),
    tel: z.string().min(11),

    aluno: z.object({
        data_nasc: z.coerce.date(),
        serie: z.string(),
        resp_tel: z.string().min(11),
        resp_nome: z.string().min(4),
        modalidade_id: z.number().int(),
        tempo_aula: z.number().positive(),
        horas_semana: z.number().positive(),
        tempo_contrato: z.number().int().positive()
    }).optional(),
    
    professor: z.object({
        materia: z.string().min(2),
        modalidade_id: z.number().int(),
    }).optional(),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;