// find professores by turma id -> nessa turma tem quais professores? -> geral (todos os professores da turma)

import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getProfessoresByTurmaId } from "@/server/modules/turmas/turmas.services";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getProfessoresByTurmaId(Number(id));

        return Response.json(
            {
                message: "Professores encontrados com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
