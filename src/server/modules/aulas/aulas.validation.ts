import { AppError } from "@/server/error/app-errors";
import { AlunosRepositories, ProfessoresRepositories } from "../users/users.respositories";
import { CreateAulasBody } from "./aulas.schemas";
import { AulasRepositories } from "./aulas.repositories";
import { TurmaRepositories } from "../turmas/turmas.repositories";
import { DateUtils } from "@/server/utils/dateUtils";

export class AulaValidation {
    static async validateAula(aula: CreateAulasBody) {
        const dataInicio = new Date(aula.started_at);
        const dataFim = new Date(aula.ended_at);
        const diaSemanaAula = dataInicio.getDay();

        const professor = await ProfessoresRepositories.findManyByIds([aula.professor_id]);
        const aluno = await AlunosRepositories.findManyByIds([aula.aluno_id]);
        const aulas = await AulasRepositories.getAulasNotFinished();

        const turmas = await TurmaRepositories.getAll();
        const turmaAgenda = turmas.flatMap((turma) => turma.turma_agenda.map((agenda) => ({
            dia_semana: agenda.dia_semana,
            horario_inicio: DateUtils.dateToMinutes(agenda.horario_inicio),
            horario_fim: DateUtils.dateToMinutes(agenda.horario_fim),
            vigencia_inicio: DateUtils.toDateOnlyValue(turma.vigencia_inicio!),
            vigencia_fim: DateUtils.toDateOnlyValue(turma.vigencia_fim!),
        })));

        if (professor.length !== 1) throw new AppError("Professor não encontrado!");

        if (aluno.length !== 1) throw new AppError("Alunos não encontrado!");

        if (dataInicio >= dataFim) throw new AppError("Inico da aula não pode ser maior que final da aula!");

        // comparação aula com aulas

        const currentAgendaAulas = aulas.map((aula) => ({
            dataInicio: aula.started_at,
            dataFim: aula.ended_at
        }));

        for (const currentAgenda of currentAgendaAulas) {

            if (dataInicio < currentAgenda.dataFim &&
                currentAgenda.dataInicio < dataFim
            ) throw new AppError("Já existe aula(s) nesse horário!");
        };

        // comparação aula com turma agenda

        for (const agenda of turmaAgenda) {

            const aulaDataOnly = DateUtils.toDateOnlyValue(dataInicio);

            const isInsideVigencia =
                aulaDataOnly >= agenda.vigencia_inicio &&
                aulaDataOnly <= agenda.vigencia_fim;

            const horariosAula = {
                inicio: DateUtils.timestampToMinutes(dataInicio),
                fim: DateUtils.timestampToMinutes(dataFim),
            };

            const horariosTurma = {
                inicio: agenda.horario_inicio ,
                fim: agenda.horario_fim,
            };

            if (
                isInsideVigencia &&
                diaSemanaAula === agenda.dia_semana &&
                hasConflict(horariosAula, horariosTurma)
            ) {
                throw new AppError("Ja existe turma(s) nesse dia e horário!");
            }

        };
    };
}

function hasConflict(fresh: { inicio: number, fim: number }, current: { inicio: number, fim: number }) {
    return (
        fresh.inicio < current.fim &&
        current.inicio < fresh.fim
    );
};