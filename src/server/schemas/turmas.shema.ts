import { z } from "zod"

const turmaAgendaSchema = z.object({
    dia_semana: z.number().int().min(1).max(7),
    horario_inicio: z.string().regex(/^\d{2}:\d{2}$/, "Formato esperado: HH:mm"),
    horario_fim: z.string().regex(/^\d{2}:\d{2}$/, "Formato esperado: HH:mm"),
});

const turmaAlunoSchema = z.object({
    aluno_id: z.number().int().positive()
});

const turmaProfessorSchema = z.object({
    professor_id: z.number().int().positive()
});

export const createTurmaSchema = z.object({
    nome: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
    horas_semana: z.number().positive(),
    vigencia_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato esperado: YYYY-MM-DD"),
    vigencia_fim: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato esperado: YYYY-MM-DD"),
    modalidade_id: z.number().int().positive(),

    turma_agenda: z.array(turmaAgendaSchema).min(1, "A turma precisa ter pelo menos um horário!"),

    turma_alunos: z.array(turmaAlunoSchema).optional(),

    turma_professores: z.array(turmaProfessorSchema).optional()
});

export type CreateTurmaBody = z.infer<typeof createTurmaSchema>;
export type CreateTurmaAgendaBody = z.infer<typeof turmaAgendaSchema>;
export type CreateTurmaAlunoBody = z.infer<typeof turmaAlunoSchema>;
export type CreateTurmaProfessorBody = z.infer<typeof turmaProfessorSchema>;