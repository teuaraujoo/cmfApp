import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { AppError } from "@/server/error/app-errors";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { getAllModalidades, createModalidade } from "@/server/modules/modalidades/modalidades.services";

export async function GET() {
  try {
    await requireAdminUser();

    const modalidades = await getAllModalidades();

    return Response.json(
      {
        message: "Modalidades encontrados com sucesso!",
        data: modalidades,
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

    const session = await requireAdminUser();
    await rateLimitByIdentifier(`modalidades:create:admin:${session.appUser.id}`, adminMutationRateLimit);    

    const body = await request.json();

    const modalidade = await createModalidade(body);

    return Response.json(
      {
        message: "Modalidade criada com sucesso!",
        data: modalidade,
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
