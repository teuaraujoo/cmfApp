import { AppError } from "@/server/error/app-errors";
import { userHelpers } from "@/server/modules/users/users.helpers";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { adminMutationRateLimit } from "@/libs/ratelimit";
import { deleteAula, concludeAula } from "@/server/modules/aulas/aulas.services";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);

        const session = await userHelpers.requireAdminUser();
        await rateLimitByIdentifier(`aulas:delete:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;

        const aula = await deleteAula(Number(id));

        return Response.json({
            message: "Aula deletada com sucesso!",
            data: aula
        },
            { status: 200 });
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode })
        };

        return Response.json({
            message: "Error interno do servidor!",
            detail: err instanceof Error ? err.message : String(err)
        },
            { status: 500 });
    };
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);

        const session = await userHelpers.requireAdminUser();
        await rateLimitByIdentifier(`aulas:complete:admin:${session.appUser.id}`, adminMutationRateLimit);

        const body = await request.json();
        const { id } = await params;

        const aula = await concludeAula(Number(id), body);

        return Response.json({
            message: "Aula finalizada com sucesso!",
            data: aula
        },
            { status: 200 });
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode })
        };

        return Response.json({
            message: "Error interno do servidor!",
            detail: err instanceof Error ? err.message : String(err)
        },
            { status: 500 });
    };
};