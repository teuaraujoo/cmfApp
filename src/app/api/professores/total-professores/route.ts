import { AppError } from "@/server/error/app-errors";
import { getTotalProfessores } from "@/server/services/users/professores.services";
import { userHelpers } from "@/server/helpers/users.helpers";

export async function GET() {
    try {
        await userHelpers.requireAdminUser();

        const total = await getTotalProfessores();
        
        return Response.json(
            {
                message: "Total de professores encontrados com sucesso!",
                data: total,
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