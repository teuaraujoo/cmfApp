import {
    getAll,
    newModalidade,
    getById,
    updateModalidadeById,
    deleteModalidadeById
} from "../repositories/modalidades.repositories";
import { createModalidadeSchema, CreateModalidadeBody } from "../schemas/modalida.schema";
import { AppError } from "../error/app-errors";

export async function getAllModalidades() {
    return getAll();
};

export async function getModalidadeById(id: number) {
    return getById(id);
};

export async function createModalidade(body: CreateModalidadeBody) {
    try {

        const data = createModalidadeSchema.parse(body);

        if (!data) {
            throw new AppError("Conteúdo obrigatório para criar modalidade", 400);
        };

        return newModalidade(data);

    } catch (err) {
        throw err;
    };
};

export async function updateModalidade(body: CreateModalidadeBody, id: number) {
    try {

        const data = createModalidadeSchema.parse(body);

        if (!data) {
            throw new AppError("Conteúdo obrigatório para atualizar modalidade", 400);
        };

        return updateModalidadeById(data, id);

    } catch (err) {
        throw err;
    };
};

export async function deleteModalidade(id: number) {
    try {

        const modalidade = await getById(id);

        if (!modalidade) {
            throw new AppError("Modalidade não encontrada!", 404);
        };

        return deleteModalidadeById(id);

    } catch (err) {

        throw err;
    };
};