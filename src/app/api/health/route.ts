import { getApiHealth } from "@/server/modules/health/health.services";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await getApiHealth();

  return Response.json(health, {
    status: health.healthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
};
