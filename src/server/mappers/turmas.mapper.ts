import { TurmaHelpers } from "../helpers/turma.helpers";
import { CreateTurmaAgendaBody, CreateTurmaAlunoBody, CreateTurmaBody, CreateTurmaProfessorBody } from "../schemas/turmas.shema";

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
            horario_inicio: TurmaHelpers.toTimeUtc(turmaAgenda.horario_inicio),
            horario_fim: TurmaHelpers.toTimeUtc(turmaAgenda.horario_fim),

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