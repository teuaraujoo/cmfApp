import "server-only";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// O rate limit depende de credenciais privadas do Upstash/Redis,
// então este arquivo deve existir somente no servidor.

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("As variáveis do Upstash Redis não foram configuradas.");
};

// Reutilizamos uma única conexão HTTP do client do Upstash.
const redis = Redis.fromEnv();

// Limite mais restritivo para autenticação - reduzir bruta force no login
export const loginRateLimitByIp = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  prefix: "ratelimit:login:ip",
});

// Limite mais amplo para mutações autenticadas da aplicação.
// limitadores mais específicos por rota ou por papel de usuário.
export const generalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "ratelimit:general",
});

// Limite principal de login por email
export const loginRateLimitByEmail = new Ratelimit({
  redis, 
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "ratelimit:login:email",
});

// Limite para ações do usuário autenticado
export const authenticatedUserRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "ratelimit:user",
});

// Limite para mutações administrativas por id do admin autenticado.
export const adminMutationRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 h"),
  prefix: "ratelimit:admin",
});
