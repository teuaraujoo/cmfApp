import { CreateTurmaBody, CreateTurmaAgendaBody } from "@/server/schemas/turmas/turmas.shema";
import { AppError } from "@/server/error/app-errors";
import { TurmaRepositories } from "@/server/repositories/turmas/turmas.repositories";
import { AlunosRepositories } from "@/server/repositories/users/alunos.repositories";
import { ProfessoresRepositories } from "@/server/repositories/users/professores.repositories";
import { TurmaHelpers } from "@/server/helpers/turma.helpers";
import { dateToMinutes } from "@/server/utils/dateToMinutes";
import { ModalidadeRepositories } from "@/server/repositories/modalidades/modalidades.repositories"

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

    static async validateTurma(data: CreateTurmaBody) {
        const turmaNome = await TurmaRepositories.getByName(data.nome);
        const vigenciaInicioDate = new Date(data.vigencia_inicio);
        const vigenciaFimDate = new Date(data.vigencia_fim);
        const modalidade = await ModalidadeRepositories.getById(data.modalidade_id);
        // const matchAgenda = turma!.turma_agenda.some(item => item.dia_semana === agenda.dia_semana);
        // const compareHours = turma?.turma_agenda[0].horario_inicio !== horarioInicio;

        if (vigenciaInicioDate > vigenciaFimDate) {
            throw new AppError("Vigência inicial não pode ser maior que a final!", 400);
        };
        
        if (!modalidade) {
            throw new AppError("Modalidade não encontrada!", 400);
        };
        if (turmaNome) {
            throw new AppError("Turma já existente com esse nome!", 400);
        };

        if (!data.vigencia_fim || !data.vigencia_inicio) {
            throw new AppError("Vigência é obrigatória", 400);
        };

        if (!data.modalidade_id) {
            throw new AppError("Modalidade da turma é obrigatória!", 400);
        };

        if (!data.turma_agenda) {
            throw new AppError("Agenda da turma é obrigatória", 400);
        };

        // if (matchAgenda && agenda.horario_inicio !== horarioInicio && agenda.horario_fim !== horarioFim) {
        //     throw new AppError("Dia da semana já está sendo utilizado!", 400);
        // };
    };

    static async validateAgenda(newAgenda: CreateTurmaAgendaBody[], vigenciaInicio: string, vigenciaFim: string, turmaId?: number) {
        const vigenciaInicioDate = new Date(vigenciaInicio);
        const vigenciaFimDate = new Date(vigenciaFim);

        const newSchedules = newAgenda.map((agenda) => ({
            dia_semana: agenda.dia_semana,
            inicio: dateToMinutes(TurmaHelpers.toTimeUtc(agenda.horario_inicio)),
            fim: dateToMinutes(TurmaHelpers.toTimeUtc(agenda.horario_fim))
        }));

        for (let i = 0; i < newSchedules.length; i++) {
            for (let j = i + 1; j < newSchedules.length; j++) {
                if (TurmaHelpers.hasConflit(newSchedules[i], newSchedules[j])) {
                    throw new AppError("A agenda da turma possuo horários conflitantes!", 400);
                };
            };
        };

        const diasSemana = [...new Set(newAgenda.map((item) => item.dia_semana))];

        const candidateTurmas = await TurmaRepositories.findTurmasByAgendaCandidates(
            diasSemana,
            vigenciaInicioDate,
            vigenciaFimDate,
            turmaId
        );

        const currentSchedules = candidateTurmas.flatMap((turma) =>
            turma.turma_agenda.map((agenda) => ({
                turma_id: turma.id,
                dia_semana: agenda.dia_semana,
                inicio: dateToMinutes(agenda.horario_inicio),
                fim: dateToMinutes(agenda.horario_fim),
            })));

        for (const fresh of newSchedules) {
            for (const current of currentSchedules) {
                if (TurmaHelpers.hasConflit(fresh, current)) {
                    throw new AppError("Já existe turma cadastrada nesse dia e horário", 400);
                };
            };
        };
    };

    static async validateAgendaItem(agenda: CreateTurmaAgendaBody) {
        const horarioInicio = TurmaHelpers.toTimeUtc(agenda.horario_inicio);
        const horarioFim = TurmaHelpers.toTimeUtc(agenda.horario_fim);

        if (horarioInicio >= horarioFim) {
            throw new AppError("Horário de início é maior ou igual ao horário final!", 400);
        };
    };

    static async validateTurmaAlunos(alunos: CreateTurmaAlunoPrisma[], newAgenda: CreateTurmaAgendaBody[], turmaId?: number) {

        if (!newAgenda?.length) {
            throw new AppError("Agenda da turma é obrigatória!", 404);
        };

        const alunosIds = alunos.map(aluno => aluno.alunos_id);
        const findAlunos = await AlunosRepositories.findManyByIds(alunosIds);
        const turmasDosAlunos = await TurmaRepositories.findTurmasByAlunosIds(alunosIds, turmaId);

        if (!findAlunos || findAlunos.length !== alunosIds.length) {
            throw new AppError("Error ao achar alunos", 400);
        };

        const newSchedules = newAgenda.map((item) => ({
            dia_semana: item.dia_semana,
            inicio: dateToMinutes(TurmaHelpers.toTimeUtc(item.horario_inicio)),
            fim: dateToMinutes(TurmaHelpers.toTimeUtc(item.horario_fim))
        }));

        const currentSchedules = turmasDosAlunos.flatMap((turma) => turma.turma_agenda.map((agenda) => ({
            turma_id: turma.id,
            dia_semana: agenda.dia_semana,
            inicio: dateToMinutes(agenda.horario_inicio),
            fim: dateToMinutes(agenda.horario_fim)
        })));

        for (const fresh of newSchedules) {
            for (const current of currentSchedules) {
                if (TurmaHelpers.hasConflit(fresh, current)) {
                    throw new AppError("Aluno já possui turma nesse dia e horário", 400);
                };
            };
        };

    };

    static async validateTurmaProfessores(professores: CreateTurmaProfessorPrisma[], newAgenda: CreateTurmaAgendaBody[], turmaId?: number) {

        if (!newAgenda?.length) {
            throw new AppError("Agenda da turma é obrigatória!", 404);
        };

        const professoresIds = professores.map(professor => professor.professores_id);
        const findProfessores = await ProfessoresRepositories.findManyByIds(professoresIds);
        const turmasDosProfessores = await TurmaRepositories.findTurmasByProfessoresIds(professoresIds, turmaId);

        if (!findProfessores || findProfessores.length !== professoresIds.length) {
            throw new AppError("Error ao achar professores!", 400);
        };

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

    };
};