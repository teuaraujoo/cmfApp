import { CreateTurmaBody, CreateTurmaAgendaBody } from "../schemas/turmas.shema";
import { AppError } from "../error/app-errors";
import { getByName } from "../repositories/turmas.repositories";
import { findManyByIds as findManyAlunosByIds } from "../repositories/alunos.repositories";
import { findManyByIds as findManyProfessoresByIds } from "../repositories/professores.repositories";

type CreateTurmaAlunoPrisma = {
    turma_id: number;
    alunos_id: number;
};

type CreateTurmaProfessorPrisma = {
    turma_id: number;
    professores_id: number;
};

export async function validateTurma(data: CreateTurmaBody, agenda: CreateTurmaAgendaBody) {
    const turma = await getByName(data.nome);

    if (turma) {
        throw new AppError("Turma já existente!", 400);
    };

    if (!data.turma_agenda) {
        throw new AppError("Agenda da turma é obrigatória", 400);
    };

    if (agenda.horario_inicio >= agenda.horario_fim) {
        throw new AppError("Horário de início é maior ou igual ao horário final!", 400);
    };
};

export async function validateTurmaAlunos(alunos: CreateTurmaAlunoPrisma[]) {
    const alunosIds = alunos.map(aluno => aluno.alunos_id);
    const findAlunos = await findManyAlunosByIds(alunosIds);
    
    if (!findAlunos || findAlunos.length !== alunosIds.length) {
        throw new AppError("Error ao achar alunos", 400);
    };
};

export async function validateTurmaProfessores(professores: CreateTurmaProfessorPrisma[]) {
    const professoresIds = professores.map(professor => professor.professores_id);
    const findProfessores = await findManyProfessoresByIds(professoresIds);

    if (!findProfessores || findProfessores.length !== professoresIds.length) {
        throw new AppError("Error ao achar professores!", 400);
    };
};
