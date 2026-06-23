import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { activeTurma, inactiveTurma, getTurmaById, updateTurma } from "@/server/modules/turmas/turmas.services";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { validateCsrfToken } from "@/server/security/csrf.helper";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turma = await getTurmaById(Number(id));

        return Response.json(
            {
                message: "Turma encontrada com sucesso!",
                data: turma,
            },
            { status: 200 },
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);
        await validateCsrfToken(request);

        const session = await requireAdminUser();

        await rateLimitByIdentifier(`turmas:update:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;
        const body = await request.json();

        const turma = await updateTurma(body, Number(id));

        return Response.json(
            {
                message: "Turma atualizada com sucesso!",
                data: turma,
            },
            { status: 200 },
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);
        await validateCsrfToken(request);

        const session = await requireAdminUser();

        await rateLimitByIdentifier(`turmas:inactive:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;

        const turma = await inactiveTurma(Number(id));

        return Response.json(
            {
                message: "Turma deletada com sucesso!",
                data: turma,
            },
            { status: 200 },
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);
        await validateCsrfToken(request);

        const session = await requireAdminUser();

        await rateLimitByIdentifier(`turmas:active:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;

        const turma = await activeTurma(Number(id));

        return Response.json(
            {
                message: "Turma reativada com sucesso!",
                data: turma,
            },
            { status: 200 },
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
