import { AppError } from "@/server/error/app-errors";
import { createUser, getAllUsers } from "@/server/services/users.services";
import { userHelpers } from "@/server/helpers/users.helpers";

export async function GET() {
  try {
    await userHelpers.requireAdminUser();

    const users = await getAllUsers();

    return Response.json(
      {
        message: "Usuários encontrados com sucesso!",
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

export async function POST(request: Request) {
  try {
    await userHelpers.requireAdminUser();

    const body = await request.json();
    const user = await createUser(body);

    return Response.json(
      {
        message: "Usuário criado com sucesso!",
        data: user,
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json({ message: err.message }, { status: err.statusCode });
    }

    return Response.json(
      {
        message: "Erro interno do servidor!",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  };
};
