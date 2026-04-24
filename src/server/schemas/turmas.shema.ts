import { z } from "zod"

export const createTurmaSchema = z.object({
    nome: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
    horas_semana: z.number().positive(),

    turma_agenda: z.array(z.object({
        turma_id: z.number().int().positive(),
        dia_semana: z.number().int().positive(),
        horario_inicio: z.string().min(5, "O horário de início deve ter pelo menos 5 caracteres."),
        horario_fim: z.string().min(5, "O horário de fim deve ter pelo menos 5 caracteres."),
    })),

    turma_alunos: z.array(z.object({
        turma_agenda_id: z.number().int().positive(),
        aluno_id: z.number().int().positive()
    })).optional(),
    
    turma_professores: z.array(z.object({
        turma_agenda_id: z.number().int().positive(),
        professor_id: z.number().int().positive(),
    })).optional()
});
