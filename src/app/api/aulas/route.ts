//  GET BY DATE / A cada semana tem um get 

import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { handleApiError } from "@/server/error/handle-api-error";
import { createAula } from "@/server/modules/aulas/aulas.services";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import { validateCsrfToken } from "@/server/security/csrf.helper";

export async function GET() {
    try {
        const aula = await getAulasForAdmin();

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: aula,
            },
            { status: 200 }
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};

export async function POST(request: Request) {
    try {

        await validateRequestOrigin(request);
        await validateCsrfToken(request);

        const session = await requireAdminUser();
        await rateLimitByIdentifier(`aulas:create:admin:${session.appUser.id}`, adminMutationRateLimit);

        const body = await request.json();
        const aula = await createAula(body);

        return Response.json(
            {
                message: "Aula criada com sucesso!",
                data: aula,
            },
            { status: 201 }
        );
    } catch (err) {
        return handleApiError(err);
    };
};
