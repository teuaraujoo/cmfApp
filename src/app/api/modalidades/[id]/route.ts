import { AppError } from "@/server/error/app-errors";
import { userHelpers } from "@/server/helpers/users.helpers";
import { getModalidadeById, updateModalidade, deleteModalidade } from "@/server/services/modalidades.services";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { adminMutationRateLimit } from "@/libs/ratelimit";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await userHelpers.requireAdminUser();

    const { id } = await params;
    const modalidade = await getModalidadeById(Number(id));

    return Response.json(
      {
        message: "Modalidade encontrada com sucesso!",
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
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const session = await userHelpers.requireAdminUser();

    await rateLimitByIdentifier(`users:create:admin:${session.appUser.id}`, adminMutationRateLimit);

    const { id } = await params;
    const body = await request.json();

    const modalidade = await updateModalidade(body, Number(id));

    return Response.json(
      {
        message: "Modalidade atualizada com sucesso!",
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
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const session = await userHelpers.requireAdminUser();

    await rateLimitByIdentifier(`users:create:admin:${session.appUser.id}`, adminMutationRateLimit);

    const { id } = await params;

    const modalidade = await deleteModalidade(Number(id));

    return Response.json(
      {
        message: "Modalidade deletada com sucesso!",
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
  }
}
