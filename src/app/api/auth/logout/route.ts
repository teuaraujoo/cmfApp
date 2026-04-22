import { AppError } from "@/server/error/app-errors";
import { logoutUser } from "@/server/services/auth.services";

export async function POST() {
  try {
    // O logout depende apenas da sessão atual presente nos cookies da requisição.
    await logoutUser();

    return Response.json(
      {
        message: "Logout realizado com sucesso!",
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json({ message: err.message }, { status: err.statusCode });
    };

    return Response.json(
      {
        message: "Erro interno do servidor!",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  };
};
