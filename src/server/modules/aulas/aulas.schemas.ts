import z from "zod";

export const createAulasSchema = z.object({
    aluno_id: z.number().int().positive(),
    professor_id: z.number().int().positive(),
    modalidade_id: z.number().int().positive(),
    started_at: z.coerce.date(),
    ended_at: z.coerce.date(),
    notas: z.string().optional()
});
export const updateAulaSchema = createAulasSchema.partial();

export type CreateAulasBody = z.infer<typeof createAulasSchema>;