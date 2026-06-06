"use client";

import { useMemo, useState } from "react";

import type { Aula } from "@/@types/aulas/aulas.types";
import { AulaDetailsDialog } from "@/components/dashboard/aulas/semana/AulaDetailsDialog";
import { AulasHistoricoHeader } from "@/components/dashboard/aulas/historico/AulasHistoricoHeader";
import { AulasHistoricoTable } from "@/components/dashboard/aulas/historico/AulasHistoricoTable";

export default function AulasHistoricoDashboardPage({ aulas }: { aulas: Aula[] }) {
  const [search, setSearch] = useState("");
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);

  const filteredAulas = useMemo(() => {
    return filterAulas(aulas, search);
  }, [aulas, search]);

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <AulasHistoricoHeader />

        <AulasHistoricoTable
          aulas={filteredAulas}
          totalAulas={aulas.length}
          search={search}
          onSearchChange={setSearch}
          onOpenDetails={setDetailsAula}
        />
      </div>

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
      />
    </main>
  );
}

function filterAulas(aulas: Aula[], search: string) {
  const searchValue = normalizeSearch(search);

  if (!searchValue) {
    return aulas;
  }

  return aulas.filter((aula) => {
    const searchableText = normalizeSearch(
      [
        aula.id,
        aula.aluno.nome,
        aula.aluno.serie,
        aula.professor.nome,
        aula.professor.materia,
        aula.modalidade,
        aula.encerrada ? "finalizada" : "pendente",
      ].join(" "),
    );

    return searchableText.includes(searchValue);
  });
};

function normalizeSearch(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
