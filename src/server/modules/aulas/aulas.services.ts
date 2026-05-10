import { AppError } from "@/server/error/app-errors";
import { AulasRepositories } from "./aulas.repositories";
import { AulasMapper } from "./aulas.mapper";
import { CreateAulasBody, createAulasSchema } from "./aulas.schemas";

export async function getAulas() {

    const aulas = await AulasRepositories.getAulas()

    if (!aulas) return new AppError("Error ao encontrar aulas!");

    return aulas.map((aula) => AulasMapper.toResponseAulasGet(aula));
};