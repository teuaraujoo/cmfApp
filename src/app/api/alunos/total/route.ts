import { handleApiError } from "@/server/error/handle-api-error";
import { getTotalAlunosForAdimin } from "@/server/modules/users/user.queries";

export async function GET() {
    try {
        const total = await getTotalAlunosForAdimin();

        return Response.json(
            {
                message: "Total de alunos encontrados com sucesso!",
                data: total,
            },
            { status: 200 }
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
