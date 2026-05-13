// achar todas as aulas pendentes pelo id do professor

import { AppError } from "@/server/error/app-errors";
import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getAulasNotFinishedByProfessorId } from "@/server/modules/aulas/aulas.services";

export async function GET(_request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminUser();

        const { id } = await params;
        const turmas = await getAulasNotFinishedByProfessorId(Number(id));

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