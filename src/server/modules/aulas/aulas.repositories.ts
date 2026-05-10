import { prisma } from "@/libs/prisma";

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
};