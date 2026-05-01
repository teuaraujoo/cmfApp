import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class TurmaAlunosRepositories {

    static async findAlunoByTurmaId(turmaId: number) {
        return prisma.turma_alunos.findMany({
            where: { 
                turma_id: turmaId 
            },
            include: {
                alunos: {
                    include: {
                        users: true
                    }
                }
            },
        });
    };

    static async newTurmaAluno(tx: Prisma.TransactionClient, alunos: Prisma.turma_alunosUncheckedCreateInput[]) {
        return tx.turma_alunos.createMany({ data: alunos })
    };

    static async deleteTurmaAlunosByTurmaId(tx: Prisma.TransactionClient, turmaId: number) {
        return tx.turma_alunos.deleteMany({
            where: { turma_id: turmaId }
        });
    };
};