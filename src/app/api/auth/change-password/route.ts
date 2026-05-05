import { changePassword } from "@/server/auth/auth.services";
import { AppError } from "@/server/error/app-errors";
import { authenticatedUserRateLimit } from "@/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { userHelpers } from "@/server/users/users.helpers";

export async function POST(request: Request) {
  try {
    await validateRequestOrigin(request);
    
    const session = await userHelpers.getCurrentAppUser();
    await rateLimitByIdentifier(`change-password:user:${session.appUser.id}`, authenticatedUserRateLimit);

    const body = await request.json();
    const user = await changePassword(body);

    return Response.json(
      {
        message: "Senha alterada com sucesso!",
        data: user,
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
