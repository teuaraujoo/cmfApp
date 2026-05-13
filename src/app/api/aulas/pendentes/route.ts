// achar todas as aulas 

import { AppError } from "@/server/error/app-errors";
import { userHelpers } from "@/server/modules/users/users.helpers";
import { getAulasNotFinished } from "@/server/modules/aulas/aulas.services";

export async function GET() {
    try {
        await userHelpers.requireAdminUser();

        const turmas = await getAulasNotFinished();

        return Response.json(
            {
                message: "Aulas encontradas com sucesso!",
                data: turmas,
            },
            { status: 200 },
        );
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        };

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    };
};