import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { handleApiError } from "@/server/error/handle-api-error";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { adminMutationRateLimit } from "@/server/libs/ratelimit";
import { createModalidade } from "@/server/modules/modalidades/modalidades.services";
import { getAllModalidadesForAdmin } from "@/server/modules/modalidades/modalidades.queries";
import { validateCsrfToken } from "@/server/security/csrf.helper";

export async function GET() {
  try {

    const modalidades = await getAllModalidadesForAdmin();

    return Response.json(
      {
        message: "Modalidades encontrados com sucesso!",
        data: modalidades,
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
    return handleApiError(err, "Erro ao acessar o banco de dados.");
  };
};
