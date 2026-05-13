import { AppError } from "@/server/error/app-errors";
import { authenticatedUserRateLimit } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { logoutUser } from "@/server/modules/auth/auth.services";
import { getCurrentAppUser } from "@/server/modules/auth/auth.services";

export async function POST(request: Request) {
  try {

    await validateRequestOrigin(request);
    
    const session = await getCurrentAppUser();
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
