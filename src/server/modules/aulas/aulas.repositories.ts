import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class AulasRepositories {

    static async getAulas() {
        return prisma.aulas_individuais.findMany({
            include: {
                professores: {
                    include: {
                        users: true
                    }
                },
                alunos: {
                    include: {
                        users: true
                    }
                },
                modalidades: true
            }
        })
    };

    static async getAulasNotFinished() {
        return prisma.aulas_individuais.findMany({
            where: {
                encerrada: false
            },
        });
    };

    static async getAulaById(aulaId: number) {
        return prisma.aulas_individuais.findUnique({ where: { id: aulaId } });
    };

    static async createAula(aula: Prisma.aulas_individuaisUncheckedCreateInput) {
        return prisma.aulas_individuais.create({ data: aula });
    };

    static async deleteAula(aulaId: number) {
        return prisma.aulas_individuais.delete({ where: { id: aulaId } })
    };

    static async concludeAula(aulaId: number, notas: string) {
        return prisma.aulas_individuais.update({
            where: { id: aulaId },
            data: { notas, encerrada: true }
        });
    };
};