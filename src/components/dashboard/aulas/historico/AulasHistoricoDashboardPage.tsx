"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import type { Aula, AulasPagination } from "@/@types/aulas/aulas.types";
import { AulaDetailsDialog } from "@/components/dashboard/aulas/semana/AulaDetailsDialog";
import { AulasHistoricoHeader } from "@/components/dashboard/aulas/historico/AulasHistoricoHeader";
import { AulasHistoricoTable } from "@/components/dashboard/aulas/historico/AulasHistoricoTable";

type AulasHistoricoDashboardPageProps = {
  aulas: Aula[];
  pagination: AulasPagination;
  initialSearch: string;
};

export default function AulasHistoricoDashboardPage({
  aulas,
  pagination,
  initialSearch,
}: AulasHistoricoDashboardPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (search.trim() === initialSearch) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      const normalizedSearch = search.trim();

      if (normalizedSearch) {
        params.set("search", normalizedSearch);
      }

      params.set("page", "1");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [initialSearch, pathname, router, search]);

  function handlePageChange(page: number) {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (initialSearch) {
      params.set("search", initialSearch);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <AulasHistoricoHeader />

        <AulasHistoricoTable
          aulas={aulas}
          pagination={pagination}
          search={search}
          onSearchChange={setSearch}
          onOpenDetails={setDetailsAula}
          onPageChange={handlePageChange}
          isPending={isPending}
        />
      </div>

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
      />
    </main>
  );
}
