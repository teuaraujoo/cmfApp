import { AppError } from "@/server/error/app-errors";
import { requireAdminOrProfessor } from "@/server/modules/auth/auth.services";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { finishAula } from "@/server/modules/aulas/aulas.services";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);

        const session = await requireAdminOrProfessor();
        await rateLimitByIdentifier(`aulas:complete:${session.appUser.id}`, adminMutationRateLimit);

        const body = await request.json();
        const { id } = await params;

        const actor = {
            userId: session.appUser.id,
            professorId: session.appUser.professores?.id ?? null,
            role: session.appUser.role
        };

        const aula = await finishAula(Number(id), body, actor);

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