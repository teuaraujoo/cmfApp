import { prisma } from "@/libs/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getAll() {
    return prisma.modalidades.findMany();
};

export async function getById(id: number) {
    return prisma.modalidades.findUnique({ where: { id } });
};

export async function newModalidade(modalidade: Prisma.modalidadesCreateInput) {
    return prisma.modalidades.create({ data: modalidade });
};

export async function updateModalidadeById(data: Prisma.modalidadesUpdateInput, id: number) {
    return prisma.modalidades.update({ where: { id }, data });
};

export async function deleteModalidadeById(id: number) {
    return prisma.modalidades.delete({ where: { id } });
};