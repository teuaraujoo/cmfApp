import { AppError } from "@/server/error/app-errors";
import { getTotalAulasForAdmin } from "@/server/modules/aulas/aulas.queries";

export async function GET() {
    try {
        const aula = await getTotalAulasForAdmin();

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: aula,
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
