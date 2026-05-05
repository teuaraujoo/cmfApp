// find turma by professor id --> Em quais turmas esse professor esta? --> único (todas as turma de UM professor)

import { AppError } from "@/server/error/app-errors";
import { userHelpers } from "@/server/users/users.helpers";
import { getTurmasByProfessorId } from "@/server/turmas/turmas.services";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await userHelpers.requireAdminUser();

        const { id } = await params;
        const turmas = await getTurmasByProfessorId([Number(id)]);

        return Response.json(
            {
                message: "Turmas encontrados com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        };

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    };
};