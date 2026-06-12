import "server-only";

import { prisma } from "@/server/libs/prisma";
import { Prisma } from "@/generated/prisma/client";
import { DateUtils } from "@/server/utils/date-utils";

export class AulasRepositories {
    static async getAulasCountByModalidade() {
        return prisma.aulas_individuais.groupBy({
            by: ["modalidade_id"],
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: "desc",
                },
            },
        });
    };

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
                modalidades: true,
                users: true
            }
        })
    };

    static async getAulasHistoricoPaginated(page: number, pageSize: number, search?: string) {
        const searchId = search && /^\d+$/.test(search) ? Number(search) : undefined;
        const searchFilters: Prisma.aulas_individuaisWhereInput[] = search
            ? [
                ...(searchId ? [{ id: searchId }] : []),
                {
                    alunos: {
                        users: {
                            nome: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    alunos: {
                        serie: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    professores: {
                        users: {
                            nome: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    professores: {
                        materia: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    modalidades: {
                        tipo: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ]
            : [];
        const where: Prisma.aulas_individuaisWhereInput = {
            AND: [
                {
                    OR: [
                        { status: "FINALIZADA" },
                        { encerrada: true },
                    ],
                },
                ...(searchFilters.length ? [{ OR: searchFilters }] : []),
            ],
        };

        const [aulas, totalItems] = await prisma.$transaction([
            prisma.aulas_individuais.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: [
                    { started_at: "desc" },
                    { id: "desc" },
                ],
                include: {
                    professores: {
                        include: {
                            users: true,
                        },
                    },
                    alunos: {
                        include: {
                            users: true,
                        },
                    },
                    modalidades: true,
                    users: true,
                },
            }),
            prisma.aulas_individuais.count({ where }),
        ]);

        return { aulas, totalItems };
    };

    static async getAulasByPeriod(start: Date, end: Date) {
        return prisma.aulas_individuais.findMany({
            where: {
                started_at: { lt: end },
                ended_at: { gt: start },
            },
            include: {
                professores: {
                    include: {
                        users: true,
                    },
                },
                alunos: {
                    include: {
                        users: true,
                    },
                },
                modalidades: true,
                users: true,
            },
            orderBy: {
                started_at: "asc",
            },
        });
    };

    static async getAulasWeek() {
        const { start, end } = DateUtils.getCurrentWeekRangeUTC();

        return prisma.aulas_individuais.findMany({
            where: {
                started_at: {
                    gte: start,
                    lt: end
                },
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
                modalidades: true,
                users: true
            },
            orderBy: {
                created_at: "desc"
            }
        });
    };

    static async getAulasNotFinished() {
        return prisma.aulas_individuais.findMany({
            where: {
                status: "PENDENTE_FINALIZAÇÃO"
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
                modalidades: true,
                users: true
            },
        });
    };

    static async getAulaById(aulaId: number) {
        return prisma.aulas_individuais.findUnique({ where: { id: aulaId } });
    };

    static async getTotalAulas() {
        const { start, end } = DateUtils.getCurrentWeekRangeUTC();

        return prisma.aulas_individuais.count({
            where: {
                started_at: {
                    gte: start,
                    lt: end
                },
            }
        })
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
                modalidades: true,
                users: true
            }
        })
    };

    static async getAulasNotFinishedByProfessorId(professorId: number) {
        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: professorId,
                status: "PENDENTE_FINALIZAÇÃO"
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
                status: "PENDENTE_FINALIZAÇÃO"
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
                status: { not: "FINALIZADA" },
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
                status: { not: "FINALIZADA" },
                started_at: {
                    lt: endedAt
                },
                ended_at: {
                    gt: startedAt,
                },
            },
        });
    };

    static async findCandidateAulasByAlunosIds(alunosIds: number[], vigenciaInicio: Date, vigenciaFim: Date) {
        return prisma.aulas_individuais.findMany({
            where: {
                aluno_id: {
                    in: alunosIds
                },
                status: { not: "FINALIZADA" },
                started_at: {
                    lte: vigenciaFim
                },
                ended_at: {
                    gte: vigenciaInicio
                }
            }
        });
    };

    static async findCandidateAulasByProfessoresIds(professoresIds: number[], vigenciaInicio: Date, vigenciaFim: Date) {
        return prisma.aulas_individuais.findMany({
            where: {
                professor_id: {
                    in: professoresIds
                },
                status: { not: "FINALIZADA" },
                started_at: {
                    lte: vigenciaFim
                },
                ended_at: {
                    gte: vigenciaInicio
                }
            }
        });
    };

    static async createAula(aula: Prisma.aulas_individuaisUncheckedCreateInput) {
        return prisma.aulas_individuais.create({ data: aula });
    };

    static async deleteAula(aulaId: number) {
        return prisma.aulas_individuais.delete({ where: { id: aulaId } })
    };

    static async startAula(aulaId: number) {
        return prisma.aulas_individuais.update({
            where: { id: aulaId },
            data: { status: "EM_ANDAMENTO" }
        });
    };

    static async finishAula(aulaId: number, data: Prisma.aulas_individuaisUncheckedUpdateInput) {
        return prisma.aulas_individuais.updateMany({
            where: { id: aulaId, status: { not: "FINALIZADA" } },
            data,
        });
    };

    static async markOverdueAulasAsPending(now: Date) {
        return prisma.aulas_individuais.updateMany({
            where: {
                ended_at: {
                    lte: now
                },
                status: {
                    in: ["AGENDADA", "EM_ANDAMENTO"]
                },
            },
            data: {
                status: "PENDENTE_FINALIZAÇÃO",
                updated_at: now,
            }
        });
    };
};
