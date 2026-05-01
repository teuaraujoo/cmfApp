import { userHelpers } from "@/server/helpers/users.helpers";
import { AppError } from "@/server/error/app-errors";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { adminMutationRateLimit } from "@/libs/ratelimit";
import { getAllTurmas, createTurma } from "@/server/services/turmas/turmas.services";

export async function GET() {
  try {
    await userHelpers.requireAdminUser();

    const turmas = await getAllTurmas();

    return Response.json(
      {
        message: "Turmas encontrados com sucesso!",
        data: turmas,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json(
        { message: err.message },
        { status: err.statusCode },
      );
    }

    return Response.json(
      {
        message: "Erro ao acessar o banco de dados.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  };
};

export async function POST(request: Request) {
  try {

    await validateRequestOrigin(request);

    const session = await userHelpers.requireAdminUser();
    await rateLimitByIdentifier(`users:create:admin:${session.appUser.id}`, adminMutationRateLimit);    

    const body = await request.json();

    const turma = await createTurma(body);

    return Response.json(
      {
        message: "Turma criada com sucesso!",
        data: turma,
      },
      { status: 200 },
    );

  } catch (err) {
    if (err instanceof AppError) {
      return Response.json(
        { message: err.message },
        { status: err.statusCode },
      );
    }

    return Response.json(
      {
        message: "Erro ao acessar o banco de dados.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  };
};
