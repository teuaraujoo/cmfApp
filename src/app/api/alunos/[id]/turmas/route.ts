// find turma by aluno id --> Em quais turmas esse aluno esta? --> único (todas as turma de UM aluno)

import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAllTurmasByAlunoId } from "@/server/modules/turmas/turmas.services"

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getAllTurmasByAlunoId(Number(id));

        return Response.json(
            {
                message: "Turmas encontrados com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
