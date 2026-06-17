// find aula by professor id -> quais aulas esse professor possui?

import { handleApiError } from "@/server/error/handle-api-error";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAulasByProfessorId } from "@/server/modules/aulas/aulas.services";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getAulasByProfessorId(Number(id));

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
