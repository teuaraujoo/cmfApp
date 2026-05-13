import { prisma } from "@/server/libs/prisma";
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
                ...(turmaId ? { id: { not: turmaId } } : {}),
                turma_professores: {
                    some: {
                        professores_id: { in: professoresIds },
                    },
                },
            },
            include: {
                turma_agenda: true,
                modalidades: true
            },
        });
    };

    static async findTurmasByAlunosIds(alunosIds: number[], turmaId?: number) {
        return prisma.turmas.findMany({
            where: {
                ...(turmaId ? { id: { not: turmaId } } : {}),
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

    static async findCandidateTurmasByProfessorAndDate(professorId: number, diaSemana: number, dataAula: Date) {
        return prisma.turmas.findMany({
            where: {
                vigencia_inicio: {
                    lte: dataAula,
                },
                vigencia_fim: {
                    gte: dataAula,
                },
                turma_professores: {
                    some: {
                        professores_id: professorId,
                    },
                },
                turma_agenda: {
                    some: {
                        dia_semana: diaSemana,
                    },
                },
            },
            include: {
                turma_agenda: {
                    where: {
                        dia_semana: diaSemana,
                    },
                },
            },
        });
    };

    static async findCandidateTurmasByAlunoAndDate(alunoId: number, diaSemana: number, dataAula: Date) {
        return prisma.turmas.findMany({
            where: {
                vigencia_inicio: {
                    lte: dataAula,
                },
                vigencia_fim: {
                    gte: dataAula,
                },
                turma_alunos: {
                    some: {
                        alunos_id: alunoId,
                    },
                },
                turma_agenda: {
                    some: {
                        dia_semana: diaSemana,
                    },
                },
            },
            include: {
                turma_agenda: {
                    where: {
                        dia_semana: diaSemana,
                    },
                },
            },
        });
    };

    /* 
        lte --> Less Than or Equal
        gte --> Greater Than or Equal
    */
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

/* =================    TURMA ALUNOS     =================*/

export class TurmaAlunosRepositories {

    static async findAlunosByTurmaId(turmaId: number) {
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

/* =================    TURMA PROFESSORES   =================*/

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

/* =================    TURMA AGENDA   =================*/

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