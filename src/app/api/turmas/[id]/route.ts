import { AppError } from "@/server/error/app-errors";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { deleteTurma, getTurmaById, updateTurma } from "@/server/modules/turmas/turmas.services";

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
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        }

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

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
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        }

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const session = await requireAdminUser();

        await rateLimitByIdentifier(`turmas:delete:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;

        const turma = await deleteTurma(Number(id));

        return Response.json(
            {
                message: "Turma deletada com sucesso!",
                data: turma,
            },
            { status: 200 },
        );

    } catch (err) {
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        }

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    }
}
