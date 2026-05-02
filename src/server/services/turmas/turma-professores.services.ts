import { AppError } from "@/server/error/app-errors";
import { TurmaProfessoresMapper } from "@/server/mappers/turmas/turma-professores.mapper";
import { TurmaProfessoresRepositories } from "@/server/repositories/turmas/turma-professores.repositories";

export async function getProfessoresByTurmaId(turmaId: number) {
    try {
        const professores = await TurmaProfessoresRepositories.findProfessoresByTurmaId(turmaId);

        if (!professores) {
            throw new AppError("Professores não encontrados", 404);
        };

        return TurmaProfessoresMapper.toResponseTurmaProfessoresGet(professores);

    } catch (err) {
        throw err;
    };
};