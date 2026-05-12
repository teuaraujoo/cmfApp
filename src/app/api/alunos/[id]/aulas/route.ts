// find aulas by aluno id -> quais aulas esse aluno possui?

import { AppError } from "@/server/error/app-errors";
import { userHelpers } from "@/server/modules/users/users.helpers";
import { getAulasByAlunoId } from "@/server/modules/aulas/aulas.services";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await userHelpers.requireAdminUser();

        const { id } = await params;
        const turmas = await getAulasByAlunoId(Number(id));

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
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