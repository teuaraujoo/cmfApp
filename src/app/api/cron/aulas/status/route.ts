import { markOverdueAulasAsPending } from "@/server/modules/aulas/aulas.services";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
        return new Response("Unauthorized", {
            status: 401,
        });
    };

    try {
        const result = await markOverdueAulasAsPending();

        return Response.json(
            {
                success: true,
                message: "Status das aulas vencidas verificado com sucesso.",
                data: result,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
            },
        );
    } catch (error) {
        console.error("Erro ao atualizar aulas vencidas:", error);

        return Response.json(
            {
                success: false,
                message: "NÃo foi possÍvel atualizar o status das aulas vencidas.",
            },
            { status: 500 },
        );
    };
};
