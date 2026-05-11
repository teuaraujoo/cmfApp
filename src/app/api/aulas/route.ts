//  GET BY DATE / A cada semana tem um get 

import { userHelpers } from "@/server/modules/users/users.helpers";
import { AppError } from "@/server/error/app-errors";
import { getAulas, createAula } from "@/server/modules/aulas/aulas.services";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { adminMutationRateLimit } from "@/libs/ratelimit";

export async function GET() {
    try {
        await userHelpers.requireAdminUser();

        const aula = await getAulas();

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: aula,
            },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode });
        }

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    };
};

export async function POST(request: Request) {
    try {

        await validateRequestOrigin(request);

        const session = await userHelpers.requireAdminUser();
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
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode });
        }

        return Response.json(
            {
                message: "Erro interno do servidor!",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    };
};