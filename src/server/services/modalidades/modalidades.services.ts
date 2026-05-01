import { ModalidadeRepositories } from "@/server/repositories/modalidades/modalidades.repositories";
import { createModalidadeSchema, CreateModalidadeBody } from "@/server/schemas/modalidades/modalida.schema";
import { AppError } from "@/server/error/app-errors";

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
        throw err;
    };
};

export async function deleteModalidade(id: number) {
    try {

        const modalidade = await ModalidadeRepositories.getById(id);

        if (!modalidade) {
            throw new AppError("Modalidade não encontrada!", 404);
        };

        return ModalidadeRepositories.deleteModalidadeById(id);

    } catch (err) {

        throw err;
    };
};