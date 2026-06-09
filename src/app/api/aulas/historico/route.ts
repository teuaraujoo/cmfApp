import { AppError } from "@/server/error/app-errors";
import { getAulasHistoricoPaginatedForAdmin } from "@/server/modules/aulas/aulas.queries";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const parsedPage = Number.parseInt(url.searchParams.get("page") ?? "1", 10);
        const parsedPageSize = Number.parseInt(url.searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE),10);
        const page = Number.isNaN(parsedPage) ? 1 : Math.max(parsedPage, 1);
        const pageSize = Number.isNaN(parsedPageSize)
            ? DEFAULT_PAGE_SIZE
            : Math.min(Math.max(parsedPageSize, 1), MAX_PAGE_SIZE);
        const search = url.searchParams.get("search")?.trim() || undefined;

        const result = await getAulasHistoricoPaginatedForAdmin(page, pageSize, search);

        return Response.json(
            {
                message: "Aulas encontradas com sucesso!",
                data: result.data,
                pagination: result.pagination,
            },
            { status: 200 },
        );
    } catch (err) {
        if (err instanceof AppError) {
            return Response.json(
                { message: err.message },
                { status: err.statusCode },
            );
        };

        return Response.json(
            {
                message: "Erro ao acessar o banco de dados.",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    };
};
