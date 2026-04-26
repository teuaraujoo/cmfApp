import { CreateTurmaBody, CreateTurmaAgendaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";

export async function validateTurma(data: CreateTurmaBody, agenda: CreateTurmaAgendaBody) {

    if (!data.turma_agenda) {
        throw new AppError("Agenda da turma é obrigatória", 400);
    };

    if (agenda.horario_inicio > agenda.horario_fim) {
        throw new AppError("Horário de início é maior que horário final!", 400);
    };
};
