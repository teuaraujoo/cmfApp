import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";

export class ProfessoresRepositories {

    static async getAll() {
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

    static async getTotal() {
        return prisma.professores.count();
    };

    static async getByUserId(id: number) {
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

    static async createProfessor(tx: Prisma.TransactionClient, professor: Prisma.professoresUncheckedCreateInput) {
        return tx.professores.create({ data: professor });
    };

    static async inactiveProfessor(tx: Prisma.TransactionClient, userId: number) {
        return tx.professores.update({ where: { user_id: userId }, data: { status: "INATIVO" } });
    };

    static async activeProfessor(tx: Prisma.TransactionClient, userId: number) {
        return tx.professores.update({ where: { user_id: userId }, data: { status: "ATIVO" } });
    };

    static async updateProfessor(tx: Prisma.TransactionClient, data: Prisma.professoresUpdateInput, id: number) {
        return tx.professores.update({ where: { user_id: id }, data })
    };
};