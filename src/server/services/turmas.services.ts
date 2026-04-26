import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";
import { createTurmaSchema, CreateTurmaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";
import { validateTurma } from "../rules/turma.rules";
import { getAll, newTurma, deleteById, newTurmaProfessor, newTurmaAluno, newTurmaAgenda } from "../repositories/turmas.repositories";
import { TurmaMapper } from "../mappers/turmas.mapper";

export async function getAllTurmas() {

    const turmas = await getAll();

    if (!turmas) {
        throw new AppError("Error ao buscar turmas!", 404);
    };

    return turmas;
};

// TODO: Verificar caso ocorra algum erro na criação de turma professores, alunos ou agenda
export async function createTurma(body: CreateTurmaBody) {
    const data = createTurmaSchema.parse(body);

    await Promise.all(data.turma_agenda.map(async agenda => await validateTurma(data, agenda)));

    const turma = await newTurma(TurmaMapper.toPrisma(data));

    if (!turma) {
        throw new AppError("Error ao criar turma!", 500);
    };

    try {
        return prisma.$transaction(async (tx) => {

            if (data.turma_agenda) {

                const agenda = data.turma_agenda.map(item => TurmaMapper.toTurmaAgenda(Number(turma.id), item))

                await newTurmaAgenda(tx, agenda);
            };

            if (data.turma_alunos) {

                const alunos = data.turma_alunos.map(aluno => TurmaMapper.toTurmaAlunosPrisma(Number(turma.id), aluno));

                await newTurmaAluno(tx, alunos);
            };

            if (data.turma_professores) {

                const professores = data.turma_professores.map(professor => TurmaMapper.toTurmaProfessores(Number(turma.id), professor));

                await newTurmaProfessor(tx, professores);
            };

            return turma;
        }), {
            maxWait: 5000,
            timeout: 10000,
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        };

    } catch (err) {

        await deleteById(Number(turma.id));

        throw err;
    };
};