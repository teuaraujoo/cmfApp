// find alunos by turma id -> nessa turma tem quais alunos? -> geral (todos os alunos da turma)

import { handleApiError } from "@/server/error/handle-api-error";
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
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
