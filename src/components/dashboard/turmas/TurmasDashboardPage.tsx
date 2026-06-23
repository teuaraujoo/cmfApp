"use client";

import { startTransition, useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import HeaderTurmasPage from "./HeaderTurmasPage";
import TurmaDeleteDialog from "./TurmaDeleteDialog";
import TurmaFormDialog from "./TurmaFormDialog";
import TurmasGrid from "./TurmasGrid";
import TurmasOverview from "./TurmasOverview";
import type { TurmaDashboardItem } from "@/@types/turma/turma.types";
import toast from "react-hot-toast";
import { inactiveTurma, activeTurma } from "@/services/turmas/turmas.client";
import { useRouter } from "next/navigation";
import { useCreateTurmaForm } from "@/hooks/turmas/useCreateTurmaForm";
import { diasSemanaOptions } from "@/utils/date-utils";
import {
  getFormOptions,
  type FormOptions,
} from "@/services/form-options/form-options.client";

type TurmasDashboardPageProps = {
  turmas?: TurmaDashboardItem[];
};

export default function TurmasDashboardPage({
  turmas = [],
}: TurmasDashboardPageProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedDia, setSelectedDia] = useState("Todas");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formOptions, setFormOptions] = useState<FormOptions | null>(null);
  const [formOptionsLoading, setFormOptionsLoading] = useState(false);
  const [formOptionsError, setFormOptionsError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<TurmaDashboardItem | null>(
    null,
  );
  const {
    error: createError,
    loading: createLoading,
    handleCreateTurma,
    resetForm: resetCreateForm,
  } = useCreateTurmaForm({
    onSuccess: () => {
      setCreateDialogOpen(false);
      refreshTurmas();
    }
  });

  const filteredTurmas = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    return turmas.filter((turma) => {
      const matchesDia =
        selectedDia === "Todas" || turma.diasSemana.includes(selectedDia);

      const searchableText = [
        turma.nome,
        ...turma.diasSemana,
        ...turma.agenda.flatMap((agenda) => [
          agenda.horario_inicio,
          agenda.horario_fim,
        ]),
        ...turma.alunos.map((aluno) => aluno.nome),
        ...turma.professores.map((professor) => professor.nome),
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      return matchesDia && (!searchValue || searchableText.includes(searchValue));
    });
  }, [search, selectedDia, turmas]);

  function openDeleteDialog(turma: TurmaDashboardItem) {
    setSelectedTurma(turma);
    setDeleteDialogOpen(true);
  };

  function refreshTurmas() {
    startTransition(() => {
      router.refresh();
    });
  };

  async function loadFormOptions() {
    if (formOptions || formOptionsLoading) {
      return;
    }

    setFormOptionsError("");
    setFormOptionsLoading(true);

    const result = await getFormOptions();

    if (!result || "err" in result) {
      const message = result?.err ?? "Não foi possível carregar dados do formulário.";

      setFormOptionsError(message);
      toast.error(message);
      setFormOptionsLoading(false);
      return;
    }

    setFormOptions(result.data);
    setFormOptionsLoading(false);
  };

  function openCreateDialog() {
    resetCreateForm();
    setCreateDialogOpen(true);
    void loadFormOptions();
  };

  function handleCreateDialogOpenChange(open: boolean) {
    if (!open) {
      resetCreateForm();
      setCreateDialogOpen(false);
      return;
    }

    openCreateDialog();
  };

  async function handleInactiveTurma(turma: TurmaDashboardItem) {
    if (!turma) {
      return;
    };

    const result = await toast.promise(inactiveTurma(turma.id), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    refreshTurmas();
    setDeleteDialogOpen(false);
  };

  async function handleActiveTurma(turmaId: number) {
    if (!turmaId) return;

    const result = await toast.promise(activeTurma(turmaId), {
      loading: 'Carregando...',
      success: (response) => response?.message,
      error: (error) => error?.message || "Error ao conectar com o servidor!",
    })


    if (result?.err) {
      toast.error(result.err);
      return;
    };

    refreshTurmas();
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        <HeaderTurmasPage
          filteredCount={filteredTurmas.length}
          search={search}
          diasSemana={diasSemanaOptions}
          selectedDia={selectedDia}
          onSearchChange={setSearch}
          onSelectDia={setSelectedDia}
          onOpenCreateDialog={openCreateDialog}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            {!filteredTurmas.length ? (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-800/20">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
                  <CalendarX className="size-6 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Nenhuma turma encontrada
                </h3>
                <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                  Ajuste a busca ou selecione outro dia da semana para
                  atualizar os resultados.
                </p>
              </div>
            ) : (
              <TurmasGrid
                turmas={filteredTurmas}
                onOpenDeleteDialog={openDeleteDialog}
                onActive={handleActiveTurma}
              />
            )}
          </section>

          <TurmasOverview turmas={turmas} diasSemana={diasSemanaOptions} />
        </div>
      </div>

      {createDialogOpen && (
        <TurmaFormDialog
          key="create-turma-form"
          open={createDialogOpen}
          mode="create"
          diasSemana={diasSemanaOptions}
          onOpenChange={handleCreateDialogOpenChange}
          modalidades={formOptions?.modalidades ?? []}
          alunos={formOptions?.alunos ?? []}
          professores={formOptions?.professores ?? []}
          error={createError}
          loading={createLoading}
          loadingOptions={formOptionsLoading}
          optionsError={formOptionsError}
          onSubmit={(event) => void handleCreateTurma(event)}
        />
      )}

      <TurmaDeleteDialog
        turma={selectedTurma}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onInactive={handleInactiveTurma}
      />
    </main>
  );
}
