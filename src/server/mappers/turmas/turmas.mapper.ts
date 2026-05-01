import { TurmaHelpers } from "@/server/helpers/turma.helpers";
import { CreateTurmaAgendaBody, CreateTurmaBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaAlunosMapper } from "./turma-alunos/turma-alunos.mapper";
import { Prisma } from "@/generated/prisma/client";
import { dateToTime } from "@/server/utils/dateToTime";
import { TurmaProfessoresMapper } from "./turma-professores/turma-professores.mapper";

export type TurmaWithRelations = Prisma.turmasGetPayload<{
    include: {
        modalidades: true,
        turma_agenda: true;
        turma_alunos: {
            include: {
                alunos: {
                    include: {
                        users: true;
                    };
                };
            };
        };
        turma_professores: {
            include: {
                professores: {
                    include: {
                        users: true;
                    };
                };
            };
        };
    };
}>;

type TurmaAgendaWithRelations = TurmaWithRelations["turma_agenda"][number];

const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];
export class TurmaMapper {

    static toPrisma(turma: CreateTurmaBody) {
        return {
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            vigencia_inicio: new Date(turma.vigencia_inicio),
            vigencia_fim: new Date(turma.vigencia_fim),
            modalidade_id: turma.modalidade_id
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

    static toResponseTurmasGet(turma: TurmaWithRelations) {
        return {
            id: turma.id,
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            status: turma.status,
            vigencia_inicio: turma.vigencia_inicio,
            vigencia_fim: turma.vigencia_fim,
            modalidade: turma.modalidades,
            turma_agenda: this.toResponseTurmaAgendaGet(turma.turma_agenda),
            turma_alunos: TurmaAlunosMapper.toResponseTurmaAlunosGet(turma.turma_alunos),
            turma_professores: TurmaProfessoresMapper.toResponseTurmaProfessoresGet(turma.turma_professores),
        };
    };

    static toResponseTurmaAgendaGet(turmaAgenda: TurmaAgendaWithRelations[]) {
        return turmaAgenda.map((agenda) => ({
            horario_inicio: dateToTime(agenda.horario_inicio),
            horario_fim: dateToTime(agenda.horario_fim),
            dia_semana: diasSemana[agenda.dia_semana],
        }))
    };
};
