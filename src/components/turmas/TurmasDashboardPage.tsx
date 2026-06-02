"use client";

import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import HeaderTurmasPage from "./HeaderTurmasPage";
import TurmaDeleteDialog from "./TurmaDeleteDialog";
import TurmaFormDialog from "./TurmaFormDialog";
import TurmasGrid from "./TurmasGrid";
import TurmasOverview from "./TurmasOverview";
import { mockTurmas } from "./mock";
import type { DiaSemana, Turma } from "./types";

const diasSemana: DiaSemana[] = [
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

export default function TurmasDashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedDia, setSelectedDia] = useState<"Todas" | DiaSemana>("Todas");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);

  const filteredTurmas = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return mockTurmas.filter((turma) => {
      const matchesDia =
        selectedDia === "Todas" || turma.diasSemana.includes(selectedDia);

      const searchableText = [
        turma.nome,
        ...turma.diasSemana,
        turma.horario,
        ...turma.alunos.map((aluno) => aluno.nome),
        ...turma.professores.map((professor) => professor.nome),
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return matchesDia && (!searchValue || searchableText.includes(searchValue));
    });
  }, [search, selectedDia]);

  function openDeleteDialog(turma: Turma) {
    setSelectedTurma(turma);
    setDeleteDialogOpen(true);
  }

  return (
    <main className="p-6">
      <div className="space-y-6">
        <HeaderTurmasPage
          filteredCount={filteredTurmas.length}
          search={search}
          diasSemana={diasSemana}
          selectedDia={selectedDia}
          onSearchChange={setSearch}
          onSelectDia={setSelectedDia}
          onOpenCreateDialog={() => setCreateDialogOpen(true)}
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
              />
            )}
          </section>

          <TurmasOverview turmas={mockTurmas} diasSemana={diasSemana} />
        </div>
      </div>

      <TurmaFormDialog
        open={createDialogOpen}
        mode="create"
        diasSemana={diasSemana}
        onOpenChange={setCreateDialogOpen}
      />

      <TurmaDeleteDialog
        turma={selectedTurma}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </main>
  );
}
