import "server-only";

import { requireAdminUser } from "../auth/auth.services";
import { getAllAlunos, getAllProfessores, getTotalAlunos, getTotalProfessores, getTotalAlunosWithAulaIndividual } from "./users.services";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { generalQueriesRateLimit } from "@/server/libs/ratelimit";

// ALUNOS

export async function getTotalAlunosForAdimin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`alunos:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTotalAlunos();
};

export async function getAllAlunosForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`alunos:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAllAlunos();
};

export async function getAlunosWithAulaIndividual() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`alunos:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTotalAlunosWithAulaIndividual();
}; 

// PROFESSORES

export async function getTotalProfessoresForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`professores:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTotalProfessores();
};

export async function getAllProfessoresForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`professores:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAllProfessores();
};
