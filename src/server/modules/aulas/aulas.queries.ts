import "server-only";

import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAllAulas, getAulas, getAulasCountByModalidade, getAulasHistoricoPaginated, getAulasNotFinished, getTotalAulas } from "./aulas.services";
import { generalQueriesRateLimit } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";

export async function getAulasForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAulas();
};

export async function getAllAulasForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAllAulas();
};

export async function getAulasNotFinishedForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAulasNotFinished();
};

export async function getTotalAulasForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getTotalAulas();
};

export async function getAulasHistoricoPaginatedForAdmin(page: number, pageSize: number, search?: string) {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAulasHistoricoPaginated(page, pageSize, search);
};

export async function getAulasCountByModalidadeForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`aulas:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAulasCountByModalidade();
};
