import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function GET() {
    const users = await prisma.users.findMany();
    return users;
};

export async function GetByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
};

export async function POST(tx: Prisma.TransactionClient, newUser: Prisma.usersCreateInput) {
    const user = await tx.users.create({ data: newUser });
    return user;
};

export async function CreateAluno(tx: Prisma.TransactionClient, aluno: Prisma.alunosUncheckedCreateInput) {
    return await tx.alunos.create({ data: aluno });
};

export async function CreateProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
    return await tx.professores.create({ data: professor });
};
