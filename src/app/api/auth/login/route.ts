import { AppError } from "@/server/error/app-errors";
import { loginRateLimitByEmail, loginRateLimitByIp } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier, rateLimitByIp } from "@/server/security/rate-limit.helper";
import { validateRequestOrigin } from "@/server/security/origin.helper";
import { loginUser } from "@/server/modules/auth/auth.services";

export async function POST(request: Request) {
  try {

    await validateRequestOrigin(request);
    
    const body = await request.json();  

    await rateLimitByIdentifier(`login:email:${String(body.email).toLowerCase()}`, loginRateLimitByEmail);
    await rateLimitByIp(request, loginRateLimitByIp);

    const user = await loginUser(body);

    return Response.json(
      {
        message: "Login realizado com sucesso!",
        data: user,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json({ message: err.message }, { status: err.statusCode });
    }

    return Response.json(
      {
        message: "Erro interno do servidor!",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  };
};
