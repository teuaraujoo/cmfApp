import { prisma } from "@/server/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export class ModalidadeRepositories {

    static async getAll() {
        return prisma.modalidades.findMany();
    };

    static async getById(id: number) {
        return prisma.modalidades.findUnique({ where: { id } });
    };

    static async newModalidade(modalidade: Prisma.modalidadesCreateInput) {
        return prisma.modalidades.create({ data: modalidade });
    };

    static async updateModalidadeById(data: Prisma.modalidadesUpdateInput, id: number) {
        return prisma.modalidades.update({ where: { id }, data });
    };

    static async deleteModalidadeById(id: number) {
        return prisma.modalidades.delete({ where: { id } });
    };
};