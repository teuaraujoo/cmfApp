import AulasHistoricoDashboardPage from "@/components/dashboard/aulas/historico/AulasHistoricoDashboardPage";
import { getAulasHistoricoPaginatedForAdmin } from "@/server/modules/aulas/aulas.queries";
import { redirect } from "next/navigation";

type AulasHistoricoPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

const PAGE_SIZE = 20;

export default async function AulasHistoricoPage({ searchParams }: AulasHistoricoPageProps) {
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isNaN(parsedPage) ? 1 : Math.max(parsedPage, 1);
  const search = params.search?.trim() ?? "";

  const result = await getAulasHistoricoPaginatedForAdmin(page, PAGE_SIZE, search || undefined);

  if (result.pagination.totalPages > 0 && page > result.pagination.totalPages) {
    const nextParams = new URLSearchParams();
    nextParams.set("page", String(result.pagination.totalPages));

    if (search) {
      nextParams.set("search", search);
    };

    redirect(`/dashboard/aulas/historico?${nextParams.toString()}`);
  };

  return (
    <AulasHistoricoDashboardPage
      key={`${page}:${search}`}
      aulas={result.data}
      pagination={result.pagination}
      initialSearch={search}
    />
  );
};
