import { handleApiError } from "@/server/error/handle-api-error";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";

export async function GET() {
    try {

        const data = await getAllAlunosForAdmin();
        
        return Response.json(
            {
                message: "Alunos encontrados com sucesso!",
                data: data,
            },
            { status: 200 }
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
