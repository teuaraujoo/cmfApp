"use client";

import { Plus, Search } from "lucide-react";

type DiaSemanaFiltro = {
  label: string;
  value: string;
};

type HeaderTurmasPageProps = {
  filteredCount: number;
  search: string;
  diasSemana: DiaSemanaFiltro[];
  selectedDia: string;
  onSearchChange: (value: string) => void;
  onSelectDia: (value: string) => void;
  onOpenCreateDialog: () => void;
};

export default function HeaderTurmasPage({
  filteredCount,
  search,
  diasSemana,
  selectedDia,
  onSearchChange,
  onSelectDia,
  onOpenCreateDialog,
}: HeaderTurmasPageProps) {
  return (
    <div className="space-y-6">
      <section className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
              Gestão de turmas
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Todas as turmas
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Consulte as turmas cadastradas, filtre por dia da semana e acesse
              rapidamente os detalhes de alunos, professores e horários.
            </p>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Pesquisar por nome, dia ou horário"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 focus:bg-white dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredCount} turma{filteredCount === 1 ? "" : "s"} encontrada
          {filteredCount === 1 ? "" : "s"}.
        </p>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectDia("Todas")}
              className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedDia === "Todas"
                  ? "bg-[#1FA2E1] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Todas
            </button>

            {diasSemana.map((dia) => {
              const isSelected = selectedDia === dia.value;

              return (
                <button
                  key={dia.value}
                  type="button"
                  onClick={() => onSelectDia(dia.value)}
                  className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[#1FA2E1] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {dia.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1FA2E1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#178CC5]"
            onClick={onOpenCreateDialog}
          >
            <Plus className="size-4" />
            Adicionar turma
          </button>
        </div>
      </section>
    </div>
  );
}
