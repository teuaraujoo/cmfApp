import { handleApiError } from "@/server/error/handle-api-error";
import { getFormOptionsForAdmin } from "@/server/modules/form-options/form-options.queries";

export async function GET() {
  try {
    const data = await getFormOptionsForAdmin();

    return Response.json(
      {
        message: "Opções do formulário carregadas com sucesso!",
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    return handleApiError(err, "Erro ao carregar opções do formulário.");
  }
}
