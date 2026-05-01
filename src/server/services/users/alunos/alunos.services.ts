import { AlunosRepositories } from "@/server/repositories/users/alunos/alunos.repositories";
import { AlunoMapper } from "@/server/mappers/users/alunos/alunos.mapper";
import { AppError } from "@/server/error/app-errors";

export async function getAllAlunos() {
  const alunos = await AlunosRepositories.getAll();

  if (!alunos) {
    throw new AppError("Error ao encontrar alunos!", 404);
  };

  return alunos.map((aluno) => AlunoMapper.toResponseAlunoGet(aluno, aluno.users));
};

export async function getTotalAlunos() {
  return AlunosRepositories.getTotal();
};

export async function getAlunoByUserId(userId: number) {
  const aluno = await AlunosRepositories.getByUserId(userId);

  if (!aluno) {
    throw new AppError("Error ao encontrar aluno!", 404);
  };

  return AlunoMapper.toResponseAlunoGet(aluno, aluno.users);
};