"use client";

import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import type { AulaPortal } from "@/@types/aulas/aulas.types";
import PortalAulasGrid from "./PortalAulasGrid";
import PortalAulasHeader from "./PortalAulasHeader";
import PortalAulasDetailsDialog from "./PortalAulasDetailsDialog";

type Props = {
  aulas: AulaPortal[]
};

export default function PortalAulasPage({ aulas }: Props) {
  const [search, setSearch] = useState("");
  const [aula, setAula] = useState<AulaPortal | null>(null);

  const filteredAulas = useMemo(() => {
    const value = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return aulas.filter((aula) => {
      const searchable = [
        aula.modalidade,
        aula.professor?.nome || "",
        aula.professor?.materia || "",
        aula.aluno?.nome || "",
        aula.aluno?.serie || ""
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return searchable.includes(value);
    });
  }, [aulas, search]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-5">
      <PortalAulasHeader
        total={filteredAulas.length}
        search={search}
        onSearchChange={setSearch}
      />

      <PortalAulasDetailsDialog
        aula={aula}
        onClose={() => setAula(null)}
      />

      {!filteredAulas.length ? (
        <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <CalendarX className="mb-3 size-10 text-gray-400" />

          <h2 className="font-semibold text-gray-950 dark:text-white">
            Nenhuma aula encontrada
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Nenhuma aula corresponde à pesquisa.
          </p>
        </section>
      ) : (
        <PortalAulasGrid aulas={filteredAulas} onOpenAula={setAula}  />
      )}
    </main>
  );
}
