import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class TurmaAgendaRepositories {
    
    static async newTurmaAgenda(tx: Prisma.TransactionClient, turmaAgenda: Prisma.turma_agendaUncheckedCreateInput[]) {
        return tx.turma_agenda.createMany({ data: turmaAgenda })
    };

    static async deleteTurmaAgendaByTurmaId(tx: Prisma.TransactionClient, turmaId: number) {
        return tx.turma_agenda.deleteMany({
            where: { turma_id: turmaId }
        });
    };
};