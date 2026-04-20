import { getAll } from "@/server/services/users.services";

export async function GET() {
    try {
        const users = await getAll();
        return Response.json({ message: 'Usuários encontrados com sucesso!', data: users });
    } catch (err) {
        console.error('API /api/users error', err);
        return Response.json({
            message: 'Erro ao acessar o banco de dados',
            detail: err instanceof Error ? err.message : String(err),
        },
            { status: 500 }
        );
    }
};

export async function POST(params:type) {
    try {

    } catch (err) {

    }
}