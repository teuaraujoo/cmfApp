import { getTotal, getAll, getByUserId } from "../repositories/alunos.repositories";
import { AlunoMapper } from "../mappers/alunos.mapper";
import { AppError } from "../error/app-errors";

export async function getAllAlunos() {
  const alunos = await getAll();

  if (!alunos) {
    throw new AppError("Error ao encontrar alunos!", 404);
  };

  return alunos.map((aluno) => AlunoMapper.toResponseAlunoGet(aluno, aluno.users));
};

export async function getTotalAlunos() {
  return getTotal();
};

export async function getAlunoByUserId(userId: number) {
  const aluno = await getByUserId(userId);

  if (!aluno) {
    throw new AppError("Error ao encontrar aluno!", 404);
  };

  return AlunoMapper.toResponseAlunoGet(aluno, aluno.users);
};