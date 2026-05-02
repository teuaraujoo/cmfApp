import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";
import { createTurmaSchema, CreateTurmaBody } from "@/server/schemas/turmas/turmas.shema";
import { AppError } from "@/server/error/app-errors";
import { TurmaRepositories } from "@/server/repositories/turmas/turmas.repositories";
import { TurmaMapper } from "@/server/mappers/turmas/turmas.mapper";
import { TurmaHelpers } from "@/server/helpers/turma.helpers";
import { TurmaRules } from "@/server/rules/turmas/turma.rules";
import { TurmaProfessoresRepositories } from "@/server/repositories/turmas/turma-professores/turma-professores.repositories";
import { TurmaAlunosRepositories } from "@/server/repositories/turmas/turma-alunos/turma-alunos.repositoriest";
import { TurmaAgendaRepositories } from "@/server/repositories/turmas/turma-agenda/turma-agenda.repositories";

export async function getAllTurmas() {

    const turmas = await TurmaRepositories.getAll();

    if (!turmas) {
        throw new AppError("Error ao buscar turmas!", 404);
    };

    return turmas.map((turma) => TurmaMapper.toResponseTurmasGet(turma));
};

export async function getTurmaById(id: number) {
    try {

        const turma = await TurmaRepositories.getById(id);

        if (!turma) {
            throw new AppError("Turma não encontrada", 404);
        };

        return TurmaMapper.toResponseTurmasGet(turma);

    } catch (err) {
        throw err;
    };
};

export async function getTurmasByAlunoId(alunoId: number[]) {
    try {
        const turmas = await TurmaRepositories.findTurmasByAlunosIds(alunoId);

        if (!turmas) {
            throw new AppError("Turmas não encontradas", 404);
        };

        return turmas.map((turma) => TurmaMapper.toResponseTurmasOfUsersGet(turma));

    } catch (err) {
        throw err;
    };
};

export async function getTurmasByProfessorId(alunoId: number[]) {
    try {
        const turmas = await TurmaRepositories.findTurmasByProfessoresIds(alunoId);

        if (!turmas) {
            throw new AppError("Turmas não encontradas", 404);
        };

        return turmas.map((turma) => TurmaMapper.toResponseTurmasOfUsersGet(turma));

    } catch (err) {
        throw err;
    };
};

export async function createTurma(body: CreateTurmaBody) {
    const data = createTurmaSchema.parse(body);

    await TurmaRules.validateTurma(data);

    try {
        return await prisma.$transaction(async (tx) => {
            const turma = await TurmaRepositories.newTurma(tx, TurmaMapper.toPrisma(data));

            if (!turma) {
                throw new AppError("Error ao criar turma!", 500);
            };

            if (data.turma_agenda) {
                await TurmaHelpers.createAgendaIfProvided(tx, turma.id, data);
            };

            if (data.turma_alunos) {
                await TurmaHelpers.createTurmaAlunoIfProvided(tx, turma.id, data.turma_alunos, data.turma_agenda);
            };

            if (data.turma_professores) {
                await TurmaHelpers.createTurmaProfessorIfProvided(tx, turma.id, data.turma_professores, data.turma_agenda);
            };

            return turma;
        }, {
            maxWait: 5000,
            timeout: 10000,
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        });

    } catch (err) {
        throw err;
    };
};

export async function updateTurma(body: CreateTurmaBody, id: number) {

    const data = createTurmaSchema.parse(body);

    await TurmaRules.validateTurma(data);

    try {
        return await prisma.$transaction(async (tx) => {
            const turma = await TurmaRepositories.updateTurmaById(tx, id, TurmaMapper.toPrisma(data));

            if (!turma) {
                throw new AppError("Error ao atualizar turma!", 500);
            };

            if (data.turma_agenda) {
                await TurmaAgendaRepositories.deleteTurmaAgendaByTurmaId(tx, turma.id);
                await TurmaHelpers.createAgendaIfProvided(tx, turma.id, data);
            };

            if (data.turma_alunos) {
                await TurmaAlunosRepositories.deleteTurmaAlunosByTurmaId(tx, turma.id);
                await TurmaHelpers.createTurmaAlunoIfProvided(tx, turma.id, data.turma_alunos, data.turma_agenda);
            };

            if (data.turma_professores) {
                await TurmaProfessoresRepositories.deleteTurmaProfessoresByTurmaId(tx, turma.id);
                await TurmaHelpers.createTurmaProfessorIfProvided(tx, turma.id, data.turma_professores, data.turma_agenda);
            };

            return turma;
        });

    } catch (err) {
        throw err;
    };
};

export async function deleteTurma(id: number) {
    try {

        const turma = await TurmaRepositories.getById(id);

        if (!turma) {
            throw new AppError("Turma não encontrada", 404);
        };

        return await TurmaRepositories.deleteById(id);

    } catch (err) {
        throw err
    };
};
