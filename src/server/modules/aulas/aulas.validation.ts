import { AppError } from "@/server/error/app-errors";
import { AlunosRepositories, ProfessoresRepositories } from "../users/users.respositories";
import { CreateAulasBody } from "./aulas.schemas";
import { AulasRepositories } from "./aulas.repositories";
import { TurmaRepositories } from "../turmas/turmas.repositories";
import { DateUtils } from "@/server/utils/date-utils";
import { ModalidadeRepositories } from "../modalidades/modalidades.repositories";

type AulaValidationContext = {
    startedAt: Date;
    endedAt: Date;
    diaSemana: number;
    dataOnly: number;
    horarios: {
        inicio: number;
        fim: number;
    };
};
export class AulaValidation {
    static async validateAula(aula: CreateAulasBody) {
        const context = this.buildContext(aula);

        await this.validateEntitiesExist(aula);
        if (context.startedAt >= context.endedAt) throw new AppError("Inico da aula não pode ser maior que final da aula!", 400);
        await this.validateProfessorAulaConflicts(aula, context);
        await this.validateAlunoAulaConflicts(aula, context);
        await this.validateProfessorTurmaConflicts(aula, context);
        await this.validateAlunoTurmaConflicts(aula, context)
    };

    private static buildContext(aula: CreateAulasBody) {
        const startedAt = new Date(aula.started_at);
        const endedAt = new Date(aula.ended_at);

        return {
            startedAt,
            endedAt,
            diaSemana: startedAt.getDay(),
            dataOnly: DateUtils.toDateOnlyValue(startedAt),
            horarios: {
                inicio: DateUtils.timestampToMinutes(startedAt),
                fim: DateUtils.timestampToMinutes(endedAt),
            },
        };
    };

    private static async validateEntitiesExist(aula: CreateAulasBody) {
        const professor = await ProfessoresRepositories.getById(aula.professor_id);
        const aluno = await AlunosRepositories.getById(aula.aluno_id);
        const modalidade = await ModalidadeRepositories.getById(aula.modalidade_id);

        if (!professor) throw new AppError("Professor não encontrado!", 404);
        if (!aluno) throw new AppError("Alunos não encontrado!", 404);
        if (!modalidade) throw new AppError("Modalidade não encontrada", 404);
    };

    private static async validateProfessorAulaConflicts(
        aula: CreateAulasBody,
        context: AulaValidationContext
    ) {
        const conflicts = await AulasRepositories.findConflictingAulasByProfessorId(
            aula.professor_id,
            context.startedAt,
            context.endedAt
        );

        if (conflicts.length > 0) {
            throw new AppError("Professor já possui aula nesse horário!", 400);
        }
    };

    private static async validateAlunoAulaConflicts(
        aula: CreateAulasBody,
        context: AulaValidationContext
    ) {
        const conflicts = await AulasRepositories.findConflictingAulasByAlunoId(
            aula.aluno_id,
            context.startedAt,
            context.endedAt
        );

        if (conflicts.length > 0) throw new AppError("Aluno já possui aula nesse horário!", 400);
    };

    private static async validateProfessorTurmaConflicts(aula: CreateAulasBody, context: AulaValidationContext) {
        const candidateTurmas =
            await TurmaRepositories.findCandidateTurmasByProfessorAndDate(
                aula.professor_id,
                context.diaSemana,
                context.startedAt
            );

        for (const turma of candidateTurmas) {
            for (const agenda of turma.turma_agenda) {
                const isInsideVigencia =
                    context.dataOnly >= DateUtils.toDateOnlyValue(turma.vigencia_inicio!) &&
                    context.dataOnly <= DateUtils.toDateOnlyValue(turma.vigencia_fim!);

                const horariosTurma = {
                    inicio: DateUtils.dateToMinutes(agenda.horario_inicio),
                    fim: DateUtils.dateToMinutes(agenda.horario_fim),
                };

                if (isInsideVigencia && hasConflict(context.horarios, horariosTurma)) {
                    throw new AppError("Professor já possui turma nesse dia e horário!", 400);
                };
            };
        };
    };

    private static async validateAlunoTurmaConflicts(aula: CreateAulasBody, context: AulaValidationContext) {
        const candidateTurmas =
            await TurmaRepositories.findCandidateTurmasByAlunoAndDate(
                aula.aluno_id,
                context.diaSemana,
                context.startedAt
            );

        for (const turma of candidateTurmas) {
            for (const agenda of turma.turma_agenda) {
                const isInsideVigencia =
                    context.dataOnly >= DateUtils.toDateOnlyValue(turma.vigencia_inicio!) &&
                    context.dataOnly <= DateUtils.toDateOnlyValue(turma.vigencia_fim!);

                const horariosTurma = {
                    inicio: DateUtils.dateToMinutes(agenda.horario_inicio),
                    fim: DateUtils.dateToMinutes(agenda.horario_fim),
                };

                if (isInsideVigencia && hasConflict(context.horarios, horariosTurma)) {
                    throw new AppError("Aluno já possui turma nesse dia e horário!", 400);
                };
            };
        };
    };
};

function hasConflict(fresh: { inicio: number, fim: number }, current: { inicio: number, fim: number }) {
    return (
        fresh.inicio < current.fim &&
        current.inicio < fresh.fim
    );
};