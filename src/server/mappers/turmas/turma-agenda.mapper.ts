
import { dateToTime } from "@/server/utils/dateToTime";
import { CreateTurmaAgendaBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaHelpers } from "@/server/helpers/turma.helpers";
import { TurmaWithRelations } from "./turmas.mapper";

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

export class TurmaAgendaMapper {
    static toTurmaAgenda(turmaId: number, turmaAgenda: CreateTurmaAgendaBody) {
        return {
            turma_id: turmaId,
            dia_semana: turmaAgenda.dia_semana,
            horario_inicio: TurmaHelpers.toTimeUtc(turmaAgenda.horario_inicio),
            horario_fim: TurmaHelpers.toTimeUtc(turmaAgenda.horario_fim),
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