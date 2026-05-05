import { AppError } from "@/server/error/app-errors";
import { adminMutationRateLimit } from "@/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { userHelpers } from "@/server/modules/users/users.helpers";
import { getUserById, inactiveUser, activeUser, updateUser } from "@/server/modules/users/users.services";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await userHelpers.requireAdminUser();
        
        const { id } = await params;
        const user = await getUserById(Number(id));

        return Response.json({
            message: "Usuário encontrado com sucesso!",
            data: user,
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);

        const session = await userHelpers.requireAdminUser();
        await rateLimitByIdentifier(`users:delete:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;
        const user = await inactiveUser(Number(id));

        return Response.json({ message: "Usuário inativado com sucesso!", data: user }, { status: 200 });

    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode })
        };

        return Response.json({
            message: "Error interno do servidor!",
            detail: err instanceof Error ? err.message : String(err)
        },
            { status: 500 });
    };
};

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        await validateRequestOrigin(request);
        
        const session = await userHelpers.requireAdminUser();
        await rateLimitByIdentifier(`users:update:admin:${session.appUser.id}`, adminMutationRateLimit);

        const body = await request.json();
        const { id } = await params;

        const user = await updateUser(body, Number(id));

        return Response.json({
            message: "Usuário atualizado com sucesso!",
            data: user
        },
        { status: 200 });
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode })
        };
        
        return Response.json({
            message: "Error interno do servidor!",
            detail: err instanceof Error ? err.message : String(err)
        },
        { status: 500 });
    };
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await validateRequestOrigin(request);

        const session = await userHelpers.requireAdminUser();
        await rateLimitByIdentifier(`users:patch:admin:${session.appUser.id}`, adminMutationRateLimit);

        const { id } = await params;
        const user = await activeUser(Number(id));
        
        return Response.json({ message: "Usuário ativado com sucesso!", data: user }, { status: 200 });

    } catch (err) {
        if (err instanceof AppError) {
            return Response.json({ message: err.message }, { status: err.statusCode })
        };

        return Response.json({
            message: "Error interno do servidor!",
            detail: err instanceof Error ? err.message : String(err)
        },
            { status: 500 });
    };
};
