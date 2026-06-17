// achar todas as aulas 

import { handleApiError } from "@/server/error/handle-api-error";
import { getAulasNotFinishedForAdmin } from "@/server/modules/aulas/aulas.queries";

export async function GET() {
    try {
        const turmas = await getAulasNotFinishedForAdmin();

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
