import "server-only";

import { prisma } from "@/server/libs/prisma";

type ServiceStatus = "up" | "down";

type HealthCheck = {
  status: ServiceStatus;
  responseTimeMs: number;
};

const DATABASE_TIMEOUT_MS = 3_000;

async function checkDatabase(): Promise<HealthCheck> {
  const startedAt = performance.now();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Database health check timeout."));
      }, DATABASE_TIMEOUT_MS);
    });

    await Promise.race([prisma.$queryRaw`SELECT 1`, timeout]);

    return {
      status: "up",
      responseTimeMs: Math.round(performance.now() - startedAt),
    };
  } catch {
    return {
      status: "down",
      responseTimeMs: Math.round(performance.now() - startedAt),
    };
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export async function getApiHealth() {
  const database = await checkDatabase();
  const healthy = database.status === "up";

  return {
    healthy,
    status: healthy ? ("healthy" as const) : ("unhealthy" as const),
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV ?? "unknown",
    checks: {
      application: {
        status: "up" as const,
      },
      database,
    },
  };
}
