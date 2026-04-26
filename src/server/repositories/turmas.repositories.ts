import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getAll() {
    return prisma.turmas.findMany({
        include: {
            turma_agenda: true,
            turma_alunos: true,
            turma_professores: true
        }
    });
};

export async function getById(id: number) {
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

export async function newTurma(turma: Prisma.turmasUncheckedCreateInput) {
    return prisma.turmas.create({ data: turma })
};

export async function newTurmaAluno(tx: Prisma.TransactionClient, aluno: Prisma.turma_alunosUncheckedCreateInput[]) {
    return tx.turma_alunos.createMany({ data: aluno })
};

export async function newTurmaProfessor(tx: Prisma.TransactionClient, professor: Prisma.turma_professoresUncheckedCreateInput[]) {
    return tx.turma_professores.createMany({ data: professor })
};

export async function deleteById(id: number) {
    return prisma.turmas.delete({ where: { id } })
};

export async function newTurmaAgenda(tx: Prisma.TransactionClient, turmaAgenda: Prisma.turma_agendaUncheckedCreateInput[]) {
    return tx.turma_agenda.createMany({ data: turmaAgenda })
};
