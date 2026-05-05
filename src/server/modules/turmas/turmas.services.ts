import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";
import { AppError } from "@/server/error/app-errors";
import { createTurmaSchema, CreateTurmaBody, CreateTurmaAgendaBody, CreateTurmaAlunoBody, CreateTurmaProfessorBody } from "./turmas.shema";
import { TurmaRepositories, TurmaProfessoresRepositories, TurmaAgendaRepositories, TurmaAlunosRepositories } from "./turmas.repositories";
import { TurmaMapper, TurmaAlunosMapper, TurmaProfessoresMapper, TurmaAgendaMapper } from "@/server/modules/turmas/turmas.mapper";
import { TurmaValidation } from "./turmas.validation";
import { checkCreateManyCount } from "../../utils/check-createmany";

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

    await TurmaValidation.validateTurma(data);

    try {
        return await prisma.$transaction(async (tx) => {
            const turma = await TurmaRepositories.newTurma(tx, TurmaMapper.toPrisma(data));

            if (!turma) {
                throw new AppError("Error ao criar turma!", 500);
            };

            if (data.turma_agenda) {
                await createAgendaIfProvided(tx, turma.id, data);
            };

            if (data.turma_alunos) {
                await createTurmaAlunoIfProvided(tx, turma.id, data.turma_alunos, data.turma_agenda);
            };

            if (data.turma_professores) {
                await createTurmaProfessorIfProvided(tx, turma.id, data.turma_professores, data.turma_agenda);
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

    await TurmaValidation.validateTurma(data);

    try {
        return await prisma.$transaction(async (tx) => {
            const turma = await TurmaRepositories.updateTurmaById(tx, id, TurmaMapper.toPrisma(data));

            if (!turma) {
                throw new AppError("Error ao atualizar turma!", 500);
            };

            if (data.turma_agenda) {
                await TurmaAgendaRepositories.deleteTurmaAgendaByTurmaId(tx, turma.id);
                await createAgendaIfProvided(tx, turma.id, data);
            };

            if (data.turma_alunos) {
                await TurmaAlunosRepositories.deleteTurmaAlunosByTurmaId(tx, turma.id);
                await createTurmaAlunoIfProvided(tx, turma.id, data.turma_alunos, data.turma_agenda);
            };

            if (data.turma_professores) {
                await TurmaProfessoresRepositories.deleteTurmaProfessoresByTurmaId(tx, turma.id);
                await createTurmaProfessorIfProvided(tx, turma.id, data.turma_professores, data.turma_agenda);
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

/* =================    TURMA ALUNOS     =================*/

export async function getAlunosByTurmaId(turmaId: number) {
    try {
        const alunos = await TurmaAlunosRepositories.findAlunosByTurmaId(turmaId);

        if (!alunos) {
            throw new AppError("Alunos não encontrados", 404);
        };

        return TurmaAlunosMapper.toResponseTurmaAlunosGet(alunos);

    } catch (err) {
        throw err;
    };
};

/* =================    TURMA PROFESSOR     =================*/

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

// VALIDATION

async function createAgendaIfProvided(tx: Prisma.TransactionClient, turmaId: number, data: CreateTurmaBody) {

    if (!data.turma_agenda?.length) return;

    const agenda = data.turma_agenda.map((item) => {
        return TurmaAgendaMapper.toTurmaAgenda(turmaId, item);
    });

    for (const agenda of data.turma_agenda) {
        await TurmaValidation.validateAgendaItem(agenda);
    };

    await TurmaValidation.validateAgenda(data.turma_agenda, data.vigencia_inicio, data.vigencia_fim, turmaId);

    const agendaResult = await TurmaAgendaRepositories.newTurmaAgenda(tx, agenda);
    checkCreateManyCount(agendaResult, agenda.length, "Agenda da turma");
};

async function createTurmaAlunoIfProvided(
    tx: Prisma.TransactionClient,
    turmaId: number,
    data: CreateTurmaAlunoBody[],
    agenda: CreateTurmaAgendaBody[]
) {
    const alunos = data.map((aluno) => {
        return TurmaAlunosMapper.toTurmaAlunosPrisma(turmaId, aluno);
    });

    await TurmaValidation.validateTurmaAlunos(alunos, agenda, turmaId);

    const alunosResult = await TurmaAlunosRepositories.newTurmaAluno(tx, alunos);

    checkCreateManyCount(alunosResult, alunos.length, "Alunos da turma");
};

async function createTurmaProfessorIfProvided(
    tx: Prisma.TransactionClient,
    turmaId: number,
    data: CreateTurmaProfessorBody[],
    agenda: CreateTurmaAgendaBody[]
) {

    const professores = data.map((professor) => {
        return TurmaProfessoresMapper.toTurmaProfessoresPrisma(turmaId, professor);
    });

    await TurmaValidation.validateTurmaProfessores(professores, agenda, turmaId);

    const professorResult = await TurmaProfessoresRepositories.newTurmaProfessor(tx, professores);

    checkCreateManyCount(professorResult, professores.length, "Professores da turma");
};