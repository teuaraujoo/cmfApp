import { AppError } from "@/server/error/app-errors";
import { getAllAlunos } from "@/server/services/users/alunos/alunos.services";
import { userHelpers } from "@/server/helpers/users.helpers";

export async function GET() {
    try {
        await userHelpers.requireAdminUser();

        const data = await getAllAlunos();
        
        return Response.json(
            {
                message: "Alunos encontrados com sucesso!",
                data: data,
            },
            { status: 200 }
        );

    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode });
        }

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    };
};