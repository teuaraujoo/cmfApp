import { AppError } from "@/server/error/app-errors";
import { TurmaAlunosMapper } from "@/server/mappers/turmas/turma-alunos/turma-alunos.mapper";
import { TurmaAlunosRepositories } from "@/server/repositories/turmas/turma-alunos/turma-alunos.repositoriest";

export async function getAlunosByTurmaId(turmaId: number) {
    try {
        const alunos = await TurmaAlunosRepositories.findAlunoByTurmaId(turmaId);

        if (!alunos) {
            throw new AppError("Alunos não encontrados", 404);
        };

        return TurmaAlunosMapper.toResponseTurmaAlunosGet(alunos);

    } catch (err) {
        throw err;
    };
};
