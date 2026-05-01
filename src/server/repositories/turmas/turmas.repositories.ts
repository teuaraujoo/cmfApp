import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class TurmaRepositories {

    static async getAll() {
        return prisma.turmas.findMany({
            include: {
                modalidades: true,
                turma_agenda: true,
                turma_alunos: {
                    include: {
                        alunos: {
                            include: {
                                users: true
                            }
                        }
                    }
                },
                turma_professores: {
                    include: {
                        professores: {
                            include: {
                                users: true
                            }
                        }
                    }
                }
            }
        });
    };

    static async getById(id: number) {
        return prisma.turmas.findUnique({
            where: {
                id
            },
            include: {
                modalidades: true,
                turma_agenda: true,
                turma_alunos: {
                    include: {
                        alunos: {
                            include: {
                                users: true
                            }
                        }
                    }
                },
                turma_professores: {
                    include: {
                        professores: {
                            include: {
                                users: true
                            }
                        }
                    }
                },
            },
        });
    };

    static async getByName(nome: string) {
        return prisma.turmas.findUnique({
            where: { nome },
            include: {
                turma_agenda: true
            }
        })
    };

    // Achar todas as turmas que o professor ja esta (create) / achar todas as turmas que o professor esta menos a turma que esta sendo atualizada (update)
    static async findTurmasByProfessoresIds(professoresIds: number[], turmaId?: number) {
        return prisma.turmas.findMany({
            where: {
                ...(turmaId ? { id: { not:turmaId } } : {}),
                turma_professores: {
                    some: {
                        professores_id: { in: professoresIds },
                    },
                },
            },
            include: {
                turma_agenda: true,
                turma_professores: true,
            },
        });
    };

    static async findTurmasByAlunosIds(alunosIds: number[], turmaId?: number) {
        return prisma.turmas.findMany({
            where: {
                ...(turmaId ? { id: { not:turmaId } } : {}),
                turma_alunos: {
                    some: {
                        alunos_id: { in: alunosIds }
                    }
                }
            },
            include: {
                turma_agenda: true,
                modalidades: true
            }
        });
    };

    static async findTurmasByAgendaCandidates(
        diasSemana: number[],
        vigenciaInicio: Date,
        vigenciaFim: Date,
        turmaId?: number
    ) {
        return prisma.turmas.findMany({
            where: {
                ...(turmaId ? { id: { not: turmaId } } : {}),
                vigencia_inicio: {
                    lte: vigenciaFim,
                },
                vigencia_fim: {
                    gte: vigenciaInicio,
                },
                turma_agenda: {
                    some: {
                        dia_semana: {
                            in: diasSemana,
                        },
                    },
                },
            },
            include: {
                turma_agenda: true,
            },
        });
    };

    static async newTurma(tx: Prisma.TransactionClient, turma: Prisma.turmasUncheckedCreateInput) {
        return tx.turmas.create({ data: turma })
    };

    static async updateTurmaById(tx: Prisma.TransactionClient, id: number, turma: Prisma.turmasUpdateInput) {
        return tx.turmas.update({ where: { id }, data: turma });
    };

    static async deleteById(id: number) {
        return prisma.turmas.delete({ where: { id } })
    };
};