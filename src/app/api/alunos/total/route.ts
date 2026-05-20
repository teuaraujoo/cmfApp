import { AppError } from "@/server/error/app-errors";
import { getTotalAlunosForAdimin } from "@/server/modules/users/user.queries";

export async function GET() {
    try {
        const total = await getTotalAlunosForAdimin();

        return Response.json(
            {
                message: "Total de alunos encontrados com sucesso!",
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