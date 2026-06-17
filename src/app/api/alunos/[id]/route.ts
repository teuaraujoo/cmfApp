import { handleApiError } from "@/server/error/handle-api-error";
import { getAlunoByUserId } from "@/server/modules/users/users.services";
import { requireAdminUser } from "@/server/modules/auth/auth.services";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const data = await getAlunoByUserId(Number(id));
        
        return Response.json(
            {
                message: "Aluno encontrado com sucesso!",
                data: data,
            },
            { status: 200 }
        );

    } catch (err) {
        return handleApiError(err, "Erro ao acessar o banco de dados.");
    };
};
