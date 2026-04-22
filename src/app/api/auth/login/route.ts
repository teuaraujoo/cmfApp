import { AppError } from "@/server/error/app-errors";
import { loginUser } from "@/server/services/auth.services";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await loginUser(body);

    return Response.json(
      {
        message: "Login realizado com sucesso!",
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
        message: "Erro interno do servidor!",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  };
};
