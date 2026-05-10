//  GET BY DATE / A cada semana tem um get 

import { userHelpers } from "@/server/modules/users/users.helpers";
import { AppError } from "@/server/error/app-errors";
import { getAulas } from "@/server/modules/aulas/aulas.services";

export async function GET() {
    try {
        await userHelpers.requireAdminUser();

        const users = await getAulas();

        return Response.json(
            {
                message: "Aulas encontrados com sucesso!",
                data: users,
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

export async function POST() {

};