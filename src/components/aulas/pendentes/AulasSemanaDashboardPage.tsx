"use client";

import { startTransition, useState } from "react";

import { AulaDeleteDialog } from "@/components/aulas/pendentes/AulaDeleteDialog";
import { AulaDetailsDialog } from "@/components/aulas/pendentes/AulaDetailsDialog";
import { AulasSemanaHeader } from "@/components/aulas/pendentes/AulasSemanaHeader";
import { AulasSemanaStats } from "@/components/aulas/pendentes/AulasSemanaStats";
import { AulasSemanaTable } from "@/components/aulas/pendentes/AulasSemanaTable";
import { FinalizarAulaDialog } from "@/components/aulas/pendentes/FinalizarAulaDialog";
import { NovaAulaDialog } from "@/components/aulas/pendentes/NovaAulaDialog";
import { deleteAula, finalizarAula } from "@/services/aulas/aulas.client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Aluno } from "@/@types/aluno/aluno.types";
import { Professor } from "@/@types/professor/professor.types";
import { Modalidade } from "@/@types/modalidade/modalidade.type";
import { useCreateAulaForm } from "@/hooks/aulas/useCreateAulaForm";
import { Aula } from "@/@types/aulas/aulas.types";

export default function AulasSemanaDashboardPage({ aulas, alunosWithAula, alunos, professores, modalidades }: { aulas: Aula[], alunosWithAula: number, alunos: Aluno[], professores: Professor[], modalidades: Modalidade[] }) {
  const router = useRouter();
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const [deletedAula, setDeleteAula] = useState<Aula | null>(null);
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);
  const [notes, setNotes] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const finalizedAulas = aulas.filter((aula) => aula.encerrada).length;
  const upcomingAulas = aulas.filter((aula) => !aula.encerrada).length;
  const totalStudents = alunosWithAula;
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

  function openCreateDialog() {
    resetCreateForm();
    setCreateDialogOpen(true);
  }

  function closeCreateDialog() {
    resetCreateForm();
    setCreateDialogOpen(false);
  }

  function openFinalizeDialog(aula: Aula) {
    if (aula.encerrada) {
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
    if (!selectedAula) {
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
    if (!deleteAula) {
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
        <AulasSemanaHeader onCreateAula={openCreateDialog} />

        <AulasSemanaStats
          finalizedAulas={finalizedAulas}
          upcomingAulas={upcomingAulas}
          totalStudents={totalStudents}
        />

        <AulasSemanaTable
          aulas={aulas}
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
        aula={selectedAula}
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

      <NovaAulaDialog
        error={createError}
        loading={createLoading}
        alunos={alunos}
        modalidades={modalidades}
        professores={professores}
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
