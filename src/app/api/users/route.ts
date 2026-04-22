import { AppError } from "@/server/error/app-errors";
import { getAllUsers, createUser } from "@/server/services/users.services";

export async function GET() {
    try {
        const users = await getAllUsers();

        return Response.json({
            message: 'Usuários encontrados com sucesso!',
            data: users
        },
            { status: 200 });

    } catch (err) {

        return Response.json({
            message: 'Erro ao acessar o banco de dados',
            detail: err instanceof Error ? err.message : String(err),
        },
            { status: 500 }
        );
    }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const user = await createUser(body);

        return Response.json({
            message: 'Usuário criado com sucesso!',
            data: user
        }, { status: 201 });

    } catch (err) {

        if (err instanceof AppError) {
            return Response.json({
                message: err.message
            }, { status: err.statusCode });
        }

        return Response.json({
            message: 'Erro interno do servidor!',
        },
            { status: 500 }
        );
    }
};