import { requireAdminUser } from "../auth/auth.services";
import { getTotalAlunos, getTotalProfessores } from "./users.services";

// ALUNOS

export async function getTotalAlunosForAdimin() {
    await requireAdminUser();
    return getTotalAlunos();
};

// PROFESSORES

export async function getTotalProfessoresForAdmin() {
    await requireAdminUser();
    return getTotalProfessores();
};