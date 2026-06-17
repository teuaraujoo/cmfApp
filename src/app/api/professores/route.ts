import { handleApiError } from "@/server/error/handle-api-error";
import { getAllProfessoresForAdmin } from "@/server/modules/users/user.queries";

export async function GET() {
    try {

        const data = await getAllProfessoresForAdmin();
        
        return Response.json(
            {
                message: "Professores encontrados com sucesso!",
                data: data,
            },
            { status: 200 }
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
