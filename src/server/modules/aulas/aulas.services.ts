import { AppError } from "@/server/error/app-errors";
import { AulasRepositories } from "./aulas.repositories";
import { AulasMapper } from "./aulas.mapper";
import { CreateAulasBody, createAulasSchema, updateAulaSchema } from "./aulas.schemas";
import { AulaValidation } from "./aulas.validation";

export async function getAulas() {

    const aulas = await AulasRepositories.getAulasWeek();

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasGet(aula));
};

export async function getAulasByProfessorId(professorId: number) {
    const aulas = await AulasRepositories.getAulasByProfessorId(professorId);

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasProfessorGet(aula));
};

export async function getAulasByAlunoId(alunoId: number) {
    const aulas = await AulasRepositories.getAulasByAlunoId(alunoId);

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasAlunoGet(aula));
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