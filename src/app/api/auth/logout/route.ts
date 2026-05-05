import { AppError } from "@/server/error/app-errors";
import { authenticatedUserRateLimit } from "@/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/helpers/rate-limit.helper";
import { validateRequestOrigin } from "@/server/helpers/origin.helper";
import { logoutUser } from "@/server/modules/auth/auth.services";
import { userHelpers } from "@/server/modules/users/users.helpers";

export async function POST(request: Request) {
  try {

    await validateRequestOrigin(request);
    
    const session = await userHelpers.getCurrentAppUser();
    await rateLimitByIdentifier(`logout:user:${session.appUser.id}`, authenticatedUserRateLimit);

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
