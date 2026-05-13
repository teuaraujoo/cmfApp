import { AppError } from "@/server/error/app-errors";
import { getAllProfessores } from "@/server/modules/users/users.services";
import { requireAdminUser } from "@/server/modules/auth/auth.services";

export async function GET() {
    try {
        await requireAdminUser();

        const data = await getAllProfessores();
        
        return Response.json(
            {
                message: "Professores encontrados com sucesso!",
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