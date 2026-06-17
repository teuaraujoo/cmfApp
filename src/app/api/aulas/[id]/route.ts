import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { deleteAula } from "@/server/modules/aulas/aulas.services";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);

        const session = await requireAdminUser();
        await rateLimitByIdentifier(`aulas:delete:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;

        const aula = await deleteAula(Number(id));

        return Response.json({
            message: "Aula deletada com sucesso!",
            data: aula
        },
            { status: 200 });
    } catch (err) {
        return handleApiError(err);
    };
};
