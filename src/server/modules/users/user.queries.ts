import "server-only";

import { requireAdminUser } from "../auth/auth.services";
import { getAllAlunos, getAllProfessores, getTotalAlunos, getTotalProfessores, getTotalAlunosWithAulaIndividual } from "./users.services";

// ALUNOS

export async function getTotalAlunosForAdimin() {
    await requireAdminUser();
    return getTotalAlunos();
};

export async function getAllAlunosForAdmin() {
    await requireAdminUser();
    return getAllAlunos();
};

export async function getAlunosWithAulaIndividual() {
    await requireAdminUser();
    return getTotalAlunosWithAulaIndividual();
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
