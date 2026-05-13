import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";
import { DateUtils } from "@/server/utils/date-utils";

export class AulasRepositories {

    static async getAllAulas() {
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

    static async getAulasWeek() {
        const { start, end } = DateUtils.getCurrentWeekRangeUTC();

        return prisma.aulas_individuais.findMany({
            where: {
                started_at: {
                    gte: start,
                    lt: end
                },
                encerrada: false
            },
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
        });
    };

    static async getAulasNotFinished() {
        return prisma.aulas_individuais.findMany({
            where: {
                encerrada: false
            },
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
            },
        });
    };

    static async getAulaById(aulaId: number) {
        return prisma.aulas_individuais.findUnique({ where: { id: aulaId } });
    };

    static async getAulasWeekByProfessorId(professorId: number) {
        const { start, end } = DateUtils.getCurrentWeekRangeUTC();

        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: professorId,
                started_at: {
                    gte: start,
                    lt: end,
                },
                encerrada: false
            },
            include: {
                modalidades: true,
                alunos: {
                    include: {
                        users: true
                    }
                },
            },
        });
    };

    static async getAllAulasByProfessorId(professorId: number) {
        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: professorId
            },
            include: {
                alunos: {
                    include: {
                        users: true
                    }
                },
                modalidades: true
            }
        })
    };

    static async getAulasNotFinishedByProfessorId(professorId: number) {
        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: professorId,
                encerrada: false,
            },
            include: {
                alunos: {
                    include: {
                        users: true
                    }
                },
                modalidades: true
            },
        });
    };

    static async getAulasWeekByAlunoId(alunoId: number) {
        const { start, end } = DateUtils.getCurrentWeekRangeUTC();

        return prisma.aulas_individuais.findMany({
            where: {
                aluno_id: alunoId,
                started_at: {
                    gte: start,
                    lt: end,
                },
                encerrada: false
            },
            include: {
                modalidades: true,
                professores: {
                    include: {
                        users: true
                    }
                },
            },
        });
    };

    static async getAllAulasByAlunoId(alunoId: number) {
        return prisma.aulas_individuais.findMany({
            where: {
                aluno_id: alunoId,
            },
            include: {
                modalidades: true,
                professores: {
                    include: {
                        users: true
                    }
                },
            },
        });
    };

    static async getAulasNotFinishedByAlunoId(alunoId: number) {
        return prisma.aulas_individuais.findMany({
            where: {
                aluno_id: alunoId,
                encerrada: false,
            },
            include: {
                professores: {
                    include: {
                        users: true
                    }
                },
                modalidades: true
            },
        });
    };

    /* 
        lt --> Less Than
        gt --> Greater Than
    */

    static async findConflictingAulasByProfessorId(professorId: number, startedAt: Date, endedAt: Date) {
        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: professorId,
                encerrada: false,
                started_at: {
                    lt: endedAt
                },
                ended_at: {
                    gt: startedAt,
                },
            },
        });
    };

    static async findConflictingAulasByAlunoId(alunoId: number, startedAt: Date, endedAt: Date) {
        return prisma.aulas_individuais.findMany({
            where: {
                aluno_id: alunoId,
                encerrada: false,
                started_at: {
                    lt: endedAt
                },
                ended_at: {
                    gt: startedAt,
                },
            },
        });
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