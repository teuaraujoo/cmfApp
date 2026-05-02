import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class TurmaProfessoresRepositories {

    static async findProfessoresByTurmaId(turmaId: number) {
        return prisma.turma_professores.findMany({
            where: {
                turma_id: turmaId
            },
            include: {
                professores: {
                    include: {
                        users: true
                    }
                }
            },
        });
    };

    static async newTurmaProfessor(tx: Prisma.TransactionClient, professores: Prisma.turma_professoresUncheckedCreateInput[]) {
        return tx.turma_professores.createMany({ data: professores })
    };

    static async deleteTurmaProfessoresByTurmaId(tx: Prisma.TransactionClient, turmaId: number) {
        return tx.turma_professores.deleteMany({
            where: { turma_id: turmaId }
        });
    };
};