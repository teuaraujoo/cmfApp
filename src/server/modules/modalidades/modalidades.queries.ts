import "server-only";

import { requireAdminUser } from "../auth/auth.services";
import { getAllModalidades } from "./modalidades.services";
import { generalQueriesRateLimit } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";

export async function getAllModalidadesForAdmin() {
    const session = await requireAdminUser();
    await rateLimitByIdentifier(`modalidades:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
    return getAllModalidades();
};
