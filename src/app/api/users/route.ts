import { getAll } from "@/server/services/users.services";

export async function GET() {
    try {
        const users = await getAll();
        return Response.json({ message: 'Usuários encontrados com sucesso!', data: users });
    } catch (error) {
        console.error('API /api/users error', error);
        return Response.json({
            message: 'Erro ao acessar o banco de dados',
            detail: error instanceof Error ? error.message : String(error),
        },
            { status: 500 }
        );
    }
};