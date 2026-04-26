import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";
import { createTurmaSchema, CreateTurmaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";
import { validateTurma, validateTurmaAlunos, validateTurmaProfessores } from "../rules/turma.rules";
import { getAll, newTurma, newTurmaProfessor, newTurmaAluno, newTurmaAgenda } from "../repositories/turmas.repositories";
import { TurmaMapper } from "../mappers/turmas.mapper";
import { checkCreateManyCount } from "../helpers/check-createmany";

export async function getAllTurmas() {

    const turmas = await getAll();

    if (!turmas) {
        throw new AppError("Error ao buscar turmas!", 404);
    };

    return turmas;
};

export async function createTurma(body: CreateTurmaBody) {
    const data = createTurmaSchema.parse(body);

    await Promise.all(data.turma_agenda.map(
        async (agenda) => {
            await validateTurma(data, agenda)
        }));

    try {
        return await prisma.$transaction(async (tx) => {
            const turma = await newTurma(tx, TurmaMapper.toPrisma(data));

            if (!turma) {
                throw new AppError("Error ao criar turma!", 500);
            };

            if (data.turma_agenda) {
                const agenda = data.turma_agenda.map(item => TurmaMapper.toTurmaAgenda(Number(turma.id), item));
                const agendaResult = await newTurmaAgenda(tx, agenda);
                checkCreateManyCount(agendaResult, agenda.length, "Agenda da turma")
            };
            
            if (data.turma_alunos) {
                const alunos = data.turma_alunos.map(aluno => TurmaMapper.toTurmaAlunosPrisma(Number(turma.id), aluno));
                await validateTurmaAlunos(alunos);
                const alunosResult = await newTurmaAluno(tx, alunos);
                checkCreateManyCount(alunosResult, alunos.length, "Alunos da turma");
            };

            if (data.turma_professores) {
                const professores = data.turma_professores.map(professor => TurmaMapper.toTurmaProfessoresPrisma(Number(turma.id), professor));
                await validateTurmaProfessores(professores);
                const professoresResult = await newTurmaProfessor(tx, professores);
                checkCreateManyCount(professoresResult, professores.length, "Professores da turma");
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
