import { CreateTurmaAgendaBody, CreateTurmaAlunoBody, CreateTurmaBody, CreateTurmaProfessorBody } from "../schemas/turmas.shema";

/*
[
    {
       turma_id: number
        alunos_id: number  
    },
    {
       turma_id: number
        alunos_id: number  
    }
]

[ turma_id, turma_id ]
[ alunos_id, alunos_id ]

*/

export class TurmaMapper {

    static toPrisma(turma: CreateTurmaBody) {
        return {
            nome: turma.nome,
            horas_semana: turma.horas_semana
        }
    };

    static toTurmaAgenda(turmaId: number, turmaAgenda: CreateTurmaAgendaBody) {
        return {
            turma_id: turmaId,
            dia_semana: turmaAgenda.dia_semana,
            horario_inicio: new Date(`2026-01-01T${turmaAgenda.horario_inicio}:00`),
            horario_fim: new Date(`2026-01-01T${turmaAgenda.horario_fim}:00`),

        };
    };

    static toTurmaAlunosPrisma(turmaId: number, turmaAluno: CreateTurmaAlunoBody) {
        return {
            turma_id: turmaId,
            alunos_id: turmaAluno.aluno_id,
        };
    };

    static toTurmaProfessoresPrisma(turmaId: number, turmaProfessores: CreateTurmaProfessorBody) {
        return {
            turma_id: turmaId,
            professores_id: turmaProfessores.professor_id
        };
    };
};