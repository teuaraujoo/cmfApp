import "server-only";

import { AppError } from "@/server/error/app-errors";
import { AulasRepositories } from "./aulas.repositories";
import { AulasMapper, Actor } from "./aulas.mapper";
import { CreateAulasBody, createAulasSchema, finishAulaSchema } from "./aulas.schemas";
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

export async function getAulasHistoricoPaginated(page: number, pageSize: number, search?: string) {
    const result = await AulasRepositories.getAulasHistoricoPaginated(page, pageSize, search);
    const totalPages = Math.ceil(result.totalItems / pageSize);

    return {
        data: result.aulas.map((aula) => AulasMapper.toResponseAulasGet(aula)),
        pagination: {
            page,
            pageSize,
            totalItems: result.totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
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

export async function createAula(body: CreateAulasBody) {
    const data = createAulasSchema.parse(body);
    await AulaValidation.validateAula(data);

    try {
        const aula = await AulasRepositories.createAula(AulasMapper.toPrismaCreate(data));

        return aula;

    } catch (err) {
        throw err;
    };
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

export async function startAula(aulaId: number, actor: Actor) {
    try {
        const now = new Date();

        const aula = await AulasRepositories.getAulaById(aulaId);

        if (!aula) throw new AppError("Aula não encontrada!", 404);

        if (actor.role === "PROFESSOR" && actor.professorId !== aula.professor_id) {
            throw new AppError("O professor não pode iniciar uma aula atribuída a outro professor!", 403)
        };

        if (now < aula?.started_at) throw new AppError("A aula ainda não pode ser iniciada!", 409);

        if (now >= aula.ended_at) throw new AppError("A aula já  terminou!", 409);

        if (aula.status !== "AGENDADA") throw new AppError("A aula não está disponível para início!", 409);


        const startAula = await AulasRepositories.startAula(aulaId);

        return startAula;

    } catch (err) {
        throw err;
    };
};

export async function finishAula(aulaId: number, body: unknown, actor: Actor) {
    try {
        if (!aulaId || aulaId <= 0) {
            throw new AppError("ID da aula inválido!", 400);
        };

        const { notas } = finishAulaSchema.parse(body);
        const now = new Date();

        const aula = await AulasRepositories.getAulaById(aulaId);

        if (!aula) throw new AppError("Aula não encontrada!", 404);

        if (actor.role === "PROFESSOR" && actor.professorId !== aula.professor_id) {
            throw new AppError("O professor não pode finalizar uma aula atribuída a outro professor!", 403)
        };

        if (aula.status === "FINALIZADA") throw new AppError("Aula já finalizada!", 409);

        if (now < aula.ended_at && aula.status !== "EM_ANDAMENTO") throw new AppError("Aula ainda não pode ser finalizada!", 409);

        const data = AulasMapper.toPrismaFinish(notas, now, actor);

        const finishAula = await AulasRepositories.finishAula(aulaId, data);

        return finishAula;

    } catch (err) {
        throw err;
    };
};

export async function markOverdueAulasAsPending() {
    const checkedAt = new Date();
    const result = await AulasRepositories.markOverdueAulasAsPending(checkedAt);

    return {
        updatedCount: result.count,
        checkedAt,
    };
};
