import { getTotal, getAll, getById } from "../repositories/alunos.repositories";

export async function getAllAlunos() {
  return getAll();
};

export async function getTotalAlunos() {
  return getTotal();
};

export async function getAlunoById(id: number) {
  return getById(id);
};