import { handleApiError } from "@/server/error/handle-api-error";
import { getTotalAulasForAdmin } from "@/server/modules/aulas/aulas.queries";

export async function GET() {
    try {
        const aula = await getTotalAulasForAdmin();

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: aula,
            },
            { status: 200 }
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
