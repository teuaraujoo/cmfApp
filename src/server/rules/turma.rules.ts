import { CreateTurmaBody, CreateTurmaAgendaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";
import { TurmaRepositories } from "../repositories/turmas.repositories";
import { findManyByIds as findManyAlunosByIds } from "../repositories/alunos.repositories";
import { findManyByIds as findManyProfessoresByIds } from "../repositories/professores.repositories";
import { TurmaHelpers } from "../helpers/turma.helpers";
import { dateToMinutes } from "../utils/dateToMinutes";

type CreateTurmaAlunoPrisma = {
    turma_id: number;
    alunos_id: number;
};

type CreateTurmaProfessorPrisma = {
    turma_id: number;
    professores_id: number;
};

//REMEMBER: Verificação de agenda/horários de turmas é opcional, depende do negócio.
export class TurmaRules {

    static async validateTurma(data: CreateTurmaBody, agenda: CreateTurmaAgendaBody) {
        const turma = await TurmaRepositories.getByName(data.nome);
        const horarioInicio = TurmaHelpers.toTimeUtc(agenda.horario_inicio);
        const horarioFim = TurmaHelpers.toTimeUtc(agenda.horario_fim);
        // const matchAgenda = turma!.turma_agenda.some(item => item.dia_semana === agenda.dia_semana);
        // const compareHours = turma?.turma_agenda[0].horario_inicio !== horarioInicio;

        if (turma) {
            throw new AppError("Turma já existente!", 400);
        };

        if (!data.turma_agenda) {
            throw new AppError("Agenda da turma é obrigatória", 400);
        };

        if (horarioInicio >= horarioFim) {
            throw new AppError("Horário de início é maior ou igual ao horário final!", 400);
        };

        // if (matchAgenda && agenda.horario_inicio !== horarioInicio && agenda.horario_fim !== horarioFim) {
        //     throw new AppError("Dia da semana já está sendo utilizado!", 400);
        // };
    };

    static async validateTurmaAlunos(alunos: CreateTurmaAlunoPrisma[]) {
        const alunosIds = alunos.map(aluno => aluno.alunos_id);
        const findAlunos = await findManyAlunosByIds(alunosIds);

        if (!findAlunos || findAlunos.length !== alunosIds.length) {
            throw new AppError("Error ao achar alunos", 400);
        };
    };

    static async validateTurmaProfessores(professores: CreateTurmaProfessorPrisma[], newAgenda: CreateTurmaAgendaBody[]) {
        const professoresIds = professores.map(professor => professor.professores_id);
        const findProfessores = await findManyProfessoresByIds(professoresIds);
        const turmasDosProfessores = await TurmaRepositories.findTurmasByProfessoresIds(professoresIds);

        const newSchedules = newAgenda.map((item) => ({
            dia_semana: item.dia_semana,
            inicio: dateToMinutes(TurmaHelpers.toTimeUtc(item.horario_inicio)),
            fim: dateToMinutes(TurmaHelpers.toTimeUtc(item.horario_fim)),
        }));

        const currentSchedules = turmasDosProfessores.flatMap((turma) => turma.turma_agenda.map((agenda) => ({
            turma_id: turma.id,
            dia_semana: agenda.dia_semana,
            inicio: dateToMinutes(agenda.horario_inicio),
            fim: dateToMinutes(agenda.horario_fim),
        })));


        for (const fresh of newSchedules) {
            for (const current of currentSchedules) {
                if (TurmaHelpers.hasConflit(fresh, current)) {
                    throw new AppError("Professor já possui turma nesse dia e horário", 400);
                };
            };
        };

        if (!findProfessores || findProfessores.length !== professoresIds.length) {
            throw new AppError("Error ao achar professores!", 400);
        };
    };
};