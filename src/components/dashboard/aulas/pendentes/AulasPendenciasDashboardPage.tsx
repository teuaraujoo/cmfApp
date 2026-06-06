"use client";

import { useMemo, useState } from "react";

import type { Aula } from "@/@types/aulas/aulas.types";
import { AulaDeleteDialog } from "@/components/dashboard/aulas/semana/AulaDeleteDialog";
import { AulaDetailsDialog } from "@/components/dashboard/aulas/semana/AulaDetailsDialog";
import { FinalizarAulaDialog } from "@/components/dashboard/aulas/semana/FinalizarAulaDialog";
import { AulasPendenciasHeader } from "@/components/dashboard/aulas/pendentes/AulasPendenciasHeader";
import { AulasPendenciasTable } from "@/components/dashboard/aulas/pendentes/AulasPendenciasTable";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { deleteAula, finalizarAula } from "@/services/aulas/aulas.client";
import toast from "react-hot-toast";

export default function AulasPendenciasDashboardPage({ aulas }: { aulas: Aula[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);
  const [finalizeAula, setFinalizeAula] = useState<Aula | null>(null);
  const [deletedAula, setDeleteAula] = useState<Aula | null>(null);
  const [notes, setNotes] = useState("");

  const filteredAulas = useMemo(() => {
    return filterAulas(aulas, search);
  }, [aulas, search]);

  function openFinalizeDialog(aula: Aula) {
    setFinalizeAula(aula);
    setNotes(aula.notas ?? "");
  };

  function closeFinalizeDialog() {
    setFinalizeAula(null);
    setNotes("");
  };

  function refreshAulas() {
    startTransition(() => {
      router.refresh();
    });
  };

  async function handleFinalizeAula(aula: Aula) {
    if (!finalizeAula) {
      return;
    };

    const result = await toast.promise(finalizarAula(aula.id, notes), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    refreshAulas();
    closeFinalizeDialog();
  };

  async function handleDeleteAula(aula: Aula) {
    if (!deletedAula) {
      return;
    };

    const result = await toast.promise(deleteAula(aula.id), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    refreshAulas();
    setDeleteAula(null);
  };

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <AulasPendenciasHeader />

        <AulasPendenciasTable
          aulas={filteredAulas}
          totalAulas={aulas.length}
          search={search}
          onSearchChange={setSearch}
          onOpenDetails={setDetailsAula}
          onOpenFinalize={openFinalizeDialog}
          onOpenDelete={setDeleteAula}
        />
      </div>

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
      />

      <FinalizarAulaDialog
        aula={finalizeAula}
        notes={notes}
        onNotesChange={setNotes}
        onClose={closeFinalizeDialog}
        onFinalize={handleFinalizeAula}
      />

      <AulaDeleteDialog
        aula={deletedAula}
        onClose={() => setDeleteAula(null)}
        onDelete={handleDeleteAula}
      />
    </main>
  );
}

function filterAulas(aulas: Aula[], search: string) {
  const searchValue = normalizeSearch(search);

  if (!searchValue) {
    return aulas;
  };

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
