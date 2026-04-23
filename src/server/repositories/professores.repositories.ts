import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function createProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
    return tx.professores.create({ data: professor });
};

export async function inactiveProfessor(tx: Prisma.TransactionClient, userId: number) {
    return tx.professores.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
};

export async function activeProfessor(tx: Prisma.TransactionClient, userId: number) {
    return tx.professores.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
};
