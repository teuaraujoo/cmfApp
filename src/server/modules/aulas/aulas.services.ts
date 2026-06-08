import "server-only";

import { AppError } from "@/server/error/app-errors";
import { AulasRepositories } from "./aulas.repositories";
import { AulasMapper } from "./aulas.mapper";
import { CreateAulasBody, createAulasSchema, updateAulaSchema } from "./aulas.schemas";
import { AulaValidation } from "./aulas.validation";
import { ModalidadeRepositories } from "../modalidades/modalidades.repositories";

export async function getAulas() {

    const aulas = await AulasRepositories.getAulasWeek();

    if (aulas.length <= 0) return [];

    return aulas.map((aula) => AulasMapper.toResponseAulasGet(aula));
};

export async function getAllAulas() {
    const aulas = await AulasRepositories.getAllAulas();

    if (!aulas) throw new AppError("Aulas não encontradas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasGet(aula));
};

export async function getAulasNotFinished() {
    const aulas = await AulasRepositories.getAulasNotFinished();

    if (!aulas) throw new AppError("Aulas não encontradas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasGet(aula));
};

export async function getTotalAulas() {
    return AulasRepositories.getTotalAulas();
};

export async function getAulasCountByModalidade() {

    const groupedAulas = await AulasRepositories.getAulasCountByModalidade();

    if (!groupedAulas.length) {
        return [];
    };

    const modalidadeIds = groupedAulas.map((item) => item.modalidade_id);

    const modalidades = await ModalidadeRepositories.getModalidadeByAulaModalidadeId(modalidadeIds);

    const modalidadeById = new Map(
        modalidades.map((modalidade) => [modalidade.id, modalidade.tipo])
    );

    return groupedAulas.map((item) => ({
        modalidade_id: item.modalidade_id,
        modalidade: modalidadeById.get(item.modalidade_id) ?? "Sem modalidade",
        total: item._count.id,
    }));
};

/* =================   PROFESSOR     =================*/

export async function getAulasByProfessorId(professorId: number) {
    const aulas = await AulasRepositories.getAulasWeekByProfessorId(professorId);

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasProfessorGet(aula));
};

export async function getAulasNotFinishedByProfessorId(professorId: number) {
    const aulas = await AulasRepositories.getAulasNotFinishedByProfessorId(professorId);

    if (!aulas) throw new AppError("Aulas não encontradas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasProfessorGet(aula));
};

export async function getAllAulasByProfessorId(professorId: number) {
    const aulas = await AulasRepositories.getAllAulasByProfessorId(professorId);

    if (!aulas) throw new AppError("Aulas não encontrads!");

    return aulas.map((aula) => AulasMapper.toResponseAulasProfessorGet(aula));

};

export async function createAula(body: CreateAulasBody) {
    const data = createAulasSchema.parse(body);
    await AulaValidation.validateAula(data);

    try {
        const aula = await AulasRepositories.createAula(data);

        return aula;

    } catch (err) {
        throw err;
    };
};

/* =================   ALUNOS     =================*/

export async function getAulasByAlunoId(alunoId: number) {
    const aulas = await AulasRepositories.getAulasWeekByAlunoId(alunoId);

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasAlunoGet(aula));
};

export async function getAllAulasByAlunoId(alunoId: number) {
    const aulas = await AulasRepositories.getAllAulasByAlunoId(alunoId);

    if (!aulas) throw new AppError("Aulas não encontradas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasAlunoGet(aula));
};

export async function getAulasNotFinishedByAlunoId(alunoId: number) {
    const aulas = await AulasRepositories.getAulasNotFinishedByAlunoId(alunoId);

    if (!aulas) throw new AppError("Aulas não encontradas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasAlunoGet(aula));
};

export async function deleteAula(aulaId: number) {
    try {

        const aula = await AulasRepositories.getAulaById(aulaId);

        if (!aula) throw new AppError("Aula não encontrada!");

        return await AulasRepositories.deleteAula(aulaId);
    } catch (err) {
        throw err;
    };
};

export async function concludeAula(aulaId: number, body: string) {
    try {
        const data = updateAulaSchema.parse(body);

        const aula = AulasRepositories.concludeAula(aulaId, data.notas!);

        return aula;

    } catch (err) {
        throw err;
    };
};
