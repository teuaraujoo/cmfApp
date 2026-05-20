// achar todas as aulas 

import { AppError } from "@/server/error/app-errors";
import { getAllAulasForAdmin } from "@/server/modules/aulas/aulas.queries";

export async function GET() {
    try {
        const turmas = await getAllAulasForAdmin()

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