// find alunos by turma id -> nessa turma tem quais alunos? -> geral (todos os alunos da turma)

import { AppError } from "@/server/error/app-errors";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAlunosByTurmaId } from "@/server/modules/turmas/turmas.services";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getAlunosByTurmaId(Number(id));

        return Response.json(
            {
                message: "Alunos encontrados com sucesso!",
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