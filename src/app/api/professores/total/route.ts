import { handleApiError } from "@/server/error/handle-api-error";
import { getTotalProfessoresForAdmin } from "@/server/modules/users/user.queries";

export async function GET() {
    try {
        const total = await getTotalProfessoresForAdmin();

        return Response.json(
            {
                message: "Total de professores encontrados com sucesso!",
                data: total,
            },
            { status: 200 }
        );
    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
