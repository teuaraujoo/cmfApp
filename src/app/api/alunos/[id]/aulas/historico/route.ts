// achar todas as aulas pelo id do aluno

import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAllAulasByAlunoId } from "@/server/modules/aulas/aulas.services";

export async function GET(_request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getAllAulasByAlunoId(Number(id));

        return Response.json(
            {
                message: "Aulas encontradas com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
