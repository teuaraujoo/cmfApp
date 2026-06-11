import z from "zod";

export const aulaStatusSchema = z.enum(["AGENDADA", "EM_ANDAMENTO", "PENDENTE_FINALIZAÇÃO", "FINALIZADA"]);

export const createAulasSchema = z.object({
    aluno_id: z.number().int().positive(),
    professor_id: z.number().int().positive(),
    modalidade_id: z.number().int().positive(),
    started_at: z.coerce.date(),
    ended_at: z.coerce.date()
});

export const finishAulaSchema = z.object({
    notas: z.string().optional()
});

export type CreateAulasBody = z.infer<typeof createAulasSchema>;
export type FinishAulaBody = z.infer<typeof finishAulaSchema>;