import { CreateTurmaBody } from "@/server/schemas/turmas/turmas.shema";
import { TurmaAlunosMapper } from "./turma-alunos.mapper";
import { Prisma } from "@/generated/prisma/client";
import { TurmaProfessoresMapper } from "./turma-professores.mapper";
import { TurmaAgendaMapper } from "./turma-agenda.mapper";

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

export type TurmaOfUsers = Prisma.turmasGetPayload<{
    include: {
        turma_agenda: true,
        modalidades: true
    }
}>;
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

    static toResponseTurmasGet(turma: TurmaWithRelations) {
        return {
            id: turma.id,
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            status: turma.status,
            vigencia_inicio: turma.vigencia_inicio,
            vigencia_fim: turma.vigencia_fim,
            modalidade: turma.modalidades,
            turma_agenda: TurmaAgendaMapper.toResponseTurmaAgendaGet(turma.turma_agenda),
            turma_alunos: TurmaAlunosMapper.toResponseTurmaAlunosGet(turma.turma_alunos),
            turma_professores: TurmaProfessoresMapper.toResponseTurmaProfessoresGet(turma.turma_professores),
        };
    };

    static toResponseTurmasOfUsersGet(turma: TurmaOfUsers) {
        return {
            id: turma.id,
            nome: turma.nome,
            horas_semana: turma.horas_semana,
            vigencia_inicio: turma.vigencia_inicio,
            vigencia_fim: turma.vigencia_fim,
            modalidade: turma.modalidades?.tipo,
            turma_agenda: TurmaAgendaMapper.toResponseTurmaAgendaGet(turma.turma_agenda)
        };
    };
};
