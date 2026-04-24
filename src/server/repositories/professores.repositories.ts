import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";

export async function getAll() {
    return prisma.professores.findMany({
        orderBy: {
            created_at: "desc"
        },
        include: {
            users: true,
            modalidades: true
        }
    });
};

export async function getTotal() {
    return prisma.professores.count();
};

export async function getByUserId(id: number) {
    return prisma.professores.findUnique({
        where: {
            user_id: id
        },
        include: {
            users: true,
            modalidades: true
        }
    });
};

export async function createProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
    return tx.professores.create({ data: professor });
};

export async function inactiveProfessor(tx: Prisma.TransactionClient, userId: number) {
    return tx.professores.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
};

export async function activeProfessor(tx: Prisma.TransactionClient, userId: number) {
    return tx.professores.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
};

export async function updateProfessor(tx: Prisma.TransactionClient, data: Prisma.professoresUpdateInput, id: number) {
    return tx.professores.update({ where: { user_id: id }, data })
};
