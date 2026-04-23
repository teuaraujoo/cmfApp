import { getTotal, getAll, getById } from "../repositories/professores.repositories";

export async function getAllProfessores() {
  return getAll();
};

export async function getTotalProfessores() {
  return getTotal();
};

export async function getProfessorById(id: number) {
  return getById(id);
}; 