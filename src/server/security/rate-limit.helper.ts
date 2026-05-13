import { Ratelimit } from "@upstash/ratelimit";
import { AppError } from "../error/app-errors";

// Extrai o IP mais confiável disponível na request.
// Em produção atrás de proxy, o primeiro valor de x-forwarded-for
// costuma representar o cliente original.
function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

// Helper genérico para aplicar o rate limit com qualquer identificador.
// Isso permite limitar por email, por id do usuário autenticado ou por id do admin.
export async function rateLimitByIdentifier(identifier: string, limiter: Ratelimit) {
  const result = await limiter.limit(identifier);

  if (!result.success) {
    throw new AppError("Muitas tentativas. Tente novamente mais tarde.", 429);
  };

  return result;
};

// Mantemos este helper para os casos em que o IP ainda é útil como proteção secundária.
export async function rateLimitByIp(request: Request, limiter: Ratelimit) {
  const ip = getRequestIp(request);
  return rateLimitByIdentifier(ip, limiter);
}
