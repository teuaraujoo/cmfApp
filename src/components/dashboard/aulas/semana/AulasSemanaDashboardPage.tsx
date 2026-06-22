"use client";

import { startTransition, useMemo, useState } from "react";

import { AulaDeleteDialog } from "@/components/dashboard/aulas/semana/AulaDeleteDialog";
import { AulaDetailsDialog } from "@/components/dashboard/aulas/semana/AulaDetailsDialog";
import { AulasSemanaHeader } from "@/components/dashboard/aulas/semana/AulasSemanaHeader";
import { AulasSemanaStats } from "@/components/dashboard/aulas/semana/AulasSemanaStats";
import { AulasSemanaTable } from "@/components/dashboard/aulas/semana/AulasSemanaTable";
import { FinalizarAulaDialog } from "@/components/dashboard/aulas/semana/FinalizarAulaDialog";
import { NovaAulaDialog } from "@/components/dashboard/aulas/semana/NovaAulaDialog";
import {
  deleteAula,
  finalizarAula,
  iniciarAula,
} from "@/services/aulas/aulas.client";
import {
  getFormOptions,
  type FormOptions,
} from "@/services/form-options/form-options.client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateAulaForm } from "@/hooks/aulas/useCreateAulaForm";
import { Aula } from "@/@types/aulas/aulas.types";
import { canFinishAula, getAulaStatusConfig } from "@/components/dashboard/aulas/aula-status";

export default function AulasSemanaDashboardPage({ aulas, alunosWithAula }: { aulas: Aula[], alunosWithAula: number }) {
  const router = useRouter();
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const [deletedAula, setDeleteAula] = useState<Aula | null>(null);
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formOptions, setFormOptions] = useState<FormOptions | null>(null);
  const [formOptionsLoading, setFormOptionsLoading] = useState(false);
  const [formOptionsError, setFormOptionsError] = useState("");
  const finalizedAulas = aulas.filter((aula) => aula.status === "FINALIZADA").length;
  const upcomingAulas = aulas.filter((aula) => aula.status === "AGENDADA").length;
  const totalStudents = alunosWithAula;
  const filteredAulas = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (!searchValue) {
      return aulas;
    }

    return aulas.filter((aula) => {
      const searchableText = [
        aula.id,
        aula.aluno.nome,
        aula.aluno.serie,
        aula.professor.nome,
        aula.professor.materia,
        aula.modalidade,
        aula.status,
        getAulaStatusConfig(aula.status).label,
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return searchableText.includes(searchValue);
    });
  }, [aulas, search]);
  const {
    error: createError,
    loading: createLoading,
    handleCreateAula,
    resetForm: resetCreateForm
  } = useCreateAulaForm({
    onSuccess() {
      refreshAulas();
      setCreateDialogOpen(false);
    },
  });

  async function loadFormOptions() {
    if (formOptions || formOptionsLoading) {
      return;
    };

    setFormOptionsError("");
    setFormOptionsLoading(true);

    const result = await getFormOptions();

    if (!result || "err" in result) {
      const message = result?.err ?? "Não foi possível carregar dados do formulário.";

      setFormOptionsError(message);
      toast.error(message);
      setFormOptionsLoading(false);
      return;
    };

    setFormOptions(result.data);
    setFormOptionsLoading(false);
  };

  function openCreateDialog() {
    resetCreateForm();
    setCreateDialogOpen(true);
    void loadFormOptions();
  };

  function closeCreateDialog() {
    resetCreateForm();
    setCreateDialogOpen(false);
  };

  function openFinalizeDialog(aula: Aula) {
    if (!canFinishAula(aula)) {
      return;
    };

    setSelectedAula(aula);
    setNotes(aula.notas ?? "");
  };

  function closeFinalizeDialog() {
    setSelectedAula(null);
    setNotes("");
  };

  function refreshAulas() {
    startTransition(() => {
      router.refresh();
    });
  };

  async function handleFinalizeAula(aula: Aula) {
    setLoading(true);

    if (!selectedAula) {
      setLoading(false);
      return;
    };

    const result = await toast.promise(finalizarAula(aula.id, notes), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      setLoading(false);
      return;
    };

    refreshAulas();
    setLoading(false);
    closeFinalizeDialog();
  };

  async function handleStartAula(aula: Aula) {
    setLoading(true)

    const result = await toast.promise(iniciarAula(aula.id), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      setLoading(false)
      return;
    };

    setLoading(false);
    refreshAulas();
  };

  async function handleDeleteAula(aula: Aula) {
    setLoading(true);

    if (!deletedAula) {
      setLoading(false);
      return;
    };

    const result = await toast.promise(deleteAula(aula.id), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      setLoading(false)
      return;
    };

    refreshAulas();
    setLoading(false);
    setDeleteAula(null);
  };

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <AulasSemanaHeader onCreateAula={openCreateDialog} />

        <AulasSemanaStats
          finalizedAulas={finalizedAulas}
          upcomingAulas={upcomingAulas}
          totalStudents={totalStudents}
        />

        <AulasSemanaTable
          aulas={filteredAulas}
          search={search}
          loading={loading}
          onSearchChange={setSearch}
          onOpenDetails={setDetailsAula}
          onStart={handleStartAula}
          onOpenFinalize={openFinalizeDialog}
          onOpenDelete={setDeleteAula}
        />
      </div>

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
      />

      <FinalizarAulaDialog
        aula={selectedAula}
        notes={notes}
        loading={loading}
        onNotesChange={setNotes}
        onClose={closeFinalizeDialog}
        onFinalize={handleFinalizeAula}
      />

      <AulaDeleteDialog
        aula={deletedAula}
        loading={loading}
        onClose={() => setDeleteAula(null)}
        onDelete={handleDeleteAula}
      />

      <NovaAulaDialog
        key={createDialogOpen ? "aula-dialog-open" : "aula-dialog-closed"}
        error={createError}
        loading={createLoading}
        loadingOptions={formOptionsLoading}
        optionsError={formOptionsError}
        alunos={formOptions?.alunos ?? []}
        modalidades={formOptions?.modalidades ?? []}
        professores={formOptions?.professores ?? []}
        open={createDialogOpen}
        onSubmit={handleCreateAula}
        onOpenChange={(open) => {
          if (open) {
            openCreateDialog();
            return;
          };

          closeCreateDialog();
        }}
      />
    </main>
  );
};
