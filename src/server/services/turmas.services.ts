import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";
import { createTurmaSchema, CreateTurmaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";
import { TurmaRepositories } from "../repositories/turmas.repositories";
import { TurmaMapper } from "../mappers/turmas.mapper";
import { TurmaHelpers } from "../helpers/turma.helpers";
import { TurmaRules } from "../rules/turma.rules";

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

        return turma;

    } catch (err) {
        throw err;
    };
};

export async function createTurma(body: CreateTurmaBody) {
    const data = createTurmaSchema.parse(body);

    await Promise.all(data.turma_agenda.map(
        async (agenda) => {
            await TurmaRules.validateTurma(data, agenda);
        }));

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
                await TurmaHelpers.createTurmaAlunoIfProvided(tx, turma.id, data.turma_alunos);
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
