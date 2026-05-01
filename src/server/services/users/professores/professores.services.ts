import { AppError } from "@/server/error/app-errors";
import { ProfessorMapper } from "@/server/mappers/users/professores/professores.mapper";
import { ProfessoresRepositories } from "@/server/repositories/users/professores/professores.repositories";

export async function getAllProfessores() {
  const professores = await ProfessoresRepositories.getAll();

  if (!professores) {
    throw new AppError("Error ao encontrar professores", 404);
  };

  return professores.map((professor) => ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades));
};

export async function getTotalProfessores() {
  return ProfessoresRepositories.getTotal();
};

export async function getProfessorByUserId(id: number) {
  const professor = await ProfessoresRepositories.getByUserId(id);

  if (!professor) {
    throw new AppError("Não foi possível encontrar professor!", 404);
  };

  return ProfessorMapper.toResponseProfessorGet(professor, professor.users, professor.modalidades); 
}; 