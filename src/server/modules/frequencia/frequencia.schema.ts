import z from "zod";

const frequenciaStatusSchema = z.enum(["PRESENTE", "AUSENTE"]);

export const frequenciaAlunoSchema = z.object({
    turma_agenda_id: z.number().int().positive(),
    aluno_id: z.number().int().positive(),
    status: frequenciaStatusSchema,
    confirmed_at: z.coerce.date(),
    aula_id: z.number().int().positive().optional(),
    turma_id: z.number().int().positive().optional()
});

export const frequenciaProfessorSchema = z.object({
    turma_agenda_id: z.number().int().positive(),
    professor_id: z.number().int().positive(),
    aula_id: z.number().int().positive().optional(),
    turma_id: z.number().int().positive().optional()
});

export type FrequenciaAlunoBody = z.infer<typeof frequenciaAlunoSchema>;
export type FrequenciaProfessorBody = z.infer<typeof frequenciaProfessorSchema>;