import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { handleApiError } from "@/server/error/handle-api-error";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { createTurma } from "@/server/modules/turmas/turmas.services";
import { getAllTurmasForAdmin } from "@/server/modules/turmas/turmas.queries";
import { validateCsrfToken } from "@/server/security/csrf.helper";

export async function GET() {
  try {

    const turmas = await getAllTurmasForAdmin();

    return Response.json(
      {
        message: "Turmas encontrados com sucesso!",
        data: turmas,
      },
      { status: 200 },
    );
  } catch (err) {
    return handleApiError(err, "Erro ao acessar o banco de dados.");
  };
};

export async function POST(request: Request) {
  try {

    await validateRequestOrigin(request);
    await validateCsrfToken(request);

    const session = await requireAdminUser();
    await rateLimitByIdentifier(`turmas:create:admin:${session.appUser.id}`, adminMutationRateLimit);

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
    return handleApiError(err, "Erro ao acessar o banco de dados.");
  };
};
