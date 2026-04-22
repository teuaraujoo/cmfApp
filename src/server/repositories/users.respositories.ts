import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getAll() {
    const users = await prisma.users.findMany();
    return users;
};

export async function getByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
};

export async function newUser(tx: Prisma.TransactionClient, newUser: Prisma.usersCreateInput) {
    const user = await tx.users.create({ data: newUser });
    return user;
};

export async function createAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
    return await tx.alunos.create({ data: aluno });
};

export async function createProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
    return await tx.professores.create({ data: professor });
};
