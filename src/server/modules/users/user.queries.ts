import { requireAdminUser } from "../auth/auth.services";
import { getAllAlunos, getAllProfessores, getTotalAlunos, getTotalProfessores } from "./users.services";

// ALUNOS

export async function getTotalAlunosForAdimin() {
    await requireAdminUser();
    return getTotalAlunos();
};

export async function getAllAlunosForAdmin() {
    await requireAdminUser();
    return getAllAlunos();
};

// PROFESSORES

export async function getTotalProfessoresForAdmin() {
    await requireAdminUser();
    return getTotalProfessores();
};

export async function getAllProfessoresForAdmin() {
    await requireAdminUser();
    return getAllProfessores();
};
