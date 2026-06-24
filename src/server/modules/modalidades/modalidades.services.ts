import "server-only";

import { ModalidadeRepositories } from "@/server/modules/modalidades/modalidades.repositories";
import { createModalidadeSchema, CreateModalidadeBody } from "@/server/modules/modalidades/modalida.schema";
import { AppError } from "@/server/error/app-errors";
import { Prisma } from "@/generated/prisma/client";
import { ZodError } from "zod";

export async function getAllModalidades() {
    return ModalidadeRepositories.getAll();
};

export async function getModalidadeById(id: number) {
    return ModalidadeRepositories.getById(id);
};

export async function createModalidade(body: CreateModalidadeBody) {
    try {

        const data = createModalidadeSchema.parse(body);

        if (!data) {
            throw new AppError("Conteúdo obrigatório para criar modalidade", 400);
        };

        return ModalidadeRepositories.newModalidade(data);

    } catch (err) {
        if (err instanceof ZodError) {
            throw new AppError(err.issues[0]?.message ?? "Dados inválidos.", 400);
        };

        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            throw new AppError("Modalidade já cadastrada!", 409);
        };

        throw err;
    };
};

export async function updateModalidade(body: CreateModalidadeBody, id: number) {
    try {

        const data = createModalidadeSchema.parse(body);

        if (!data) {
            throw new AppError("Conteúdo obrigatório para atualizar modalidade", 400);
        };

        return ModalidadeRepositories.updateModalidadeById(data, id);

    } catch (err) {
        if (err instanceof ZodError) {
            throw new AppError(err.issues[0]?.message ?? "Dados inválidos.", 400);
        };

        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            throw new AppError("Modalidade já cadastrada!", 409);
        };

        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            throw new AppError("Modalidade não encontrada!", 404);
        };

        throw err;
    };
};

export async function deleteModalidade(id: number) {
    try {

        const modalidade = await ModalidadeRepositories.getById(id);

        if (!modalidade) {
            throw new AppError("Modalidade não encontrada!", 404);
        };

        return await ModalidadeRepositories.deleteModalidadeById(id);

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
            throw new AppError(
                "Esta modalidade está em uso e não pode ser deletada.",
                409,
            );
        };

        throw err;
    };
};
