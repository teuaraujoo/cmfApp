import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class TurmaRepositories {

    static async getAll() {
        return prisma.turmas.findMany({
            include: {
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
                turma_agenda: true,
                turma_alunos: true,
                turma_professores: true
            }
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

    static async findTurmasByProfessoresIds(professoresIds: number[]) {
        return prisma.turmas.findMany({
            where: {
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
    }

    static async newTurma(tx: Prisma.TransactionClient, turma: Prisma.turmasUncheckedCreateInput) {
        return tx.turmas.create({ data: turma })
    };

    static async newTurmaAluno(tx: Prisma.TransactionClient, aluno: Prisma.turma_alunosUncheckedCreateInput[]) {
        return tx.turma_alunos.createMany({ data: aluno })
    };

    static async newTurmaProfessor(tx: Prisma.TransactionClient, professor: Prisma.turma_professoresUncheckedCreateInput[]) {
        return tx.turma_professores.createMany({ data: professor })
    };

    static async deleteById(id: number) {
        return prisma.turmas.delete({ where: { id } })
    };

    static async newTurmaAgenda(tx: Prisma.TransactionClient, turmaAgenda: Prisma.turma_agendaUncheckedCreateInput[]) {
        return tx.turma_agenda.createMany({ data: turmaAgenda })
    };
};