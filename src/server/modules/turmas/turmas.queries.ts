import { requireAdminUser } from "../auth/auth.services";
import { getAllTurmas, getTotalTurmas, getTurmaById } from "./turmas.services";

export async function getTotalTurmasForAdmin() {
    await requireAdminUser();
    return getTotalTurmas();
};

export async function getAllTurmasForAdmin() {
  await requireAdminUser();
  return getAllTurmas();  
};

export async function getTurmaByIdForAdmin(turmaId: number) {
    await requireAdminUser();
    return getTurmaById(turmaId);
};