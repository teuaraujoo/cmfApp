import "server-only";

import { requireAdminUser } from "../auth/auth.services";
import { getAllTurmas, getTotalTurmas, getTurmaById, getTurmasByAlunoId, getTurmasByProfessorId } from "./turmas.services";
import { generalQueriesRateLimit } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";

export async function getTotalTurmasForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`turmas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTotalTurmas();
};

export async function getAllTurmasForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`turmas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAllTurmas();
};

export async function getTurmaByIdForAdmin(turmaId: number) {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`turmas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTurmaById(turmaId);
};


export async function getTurmasByProfessorIdForUser(id: number[]) {
    return getTurmasByProfessorId(id);
};

export async function getTurmasByAlunoIdForUser(id: number[]) {
    return getTurmasByAlunoId(id);
};