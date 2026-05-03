
import { DateUtils } from "@/server/utils/dateUtils";
import { CreateTurmaAgendaBody } from "@/server/schemas/turmas/turmas.shema";
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
            horario_inicio: DateUtils.toTimeUtc(turmaAgenda.horario_inicio),
            horario_fim: DateUtils.toTimeUtc(turmaAgenda.horario_fim),
        };
    };

    static toResponseTurmaAgendaGet(turmaAgenda: TurmaAgendaWithRelations[]) {
        return turmaAgenda.map((agenda) => ({
            horario_inicio: DateUtils.dateToTime(agenda.horario_inicio),
            horario_fim: DateUtils.dateToTime(agenda.horario_fim),
            dia_semana: diasSemana[agenda.dia_semana],
        }))
    };
};