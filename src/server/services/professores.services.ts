import { AppError } from "../error/app-errors";
import { ProfessorMapper } from "../mappers/professores.mapper";
import { getTotal, getAll, getByUserId } from "../repositories/professores.repositories";

export async function getAllProfessores() {
  const professores = await getAll();

  if (!professores) {
    throw new AppError("Error ao encontrar professores", 404);
  };

  return professores.map((professor) => ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades));
};

export async function getTotalProfessores() {
  return getTotal();
};

export async function getProfessorByUserId(id: number) {
  const professor = await getByUserId(id);

  if (!professor) {
    throw new AppError("Não foi possível encontrar professor!", 404);
  };

  return ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades); 
}; 