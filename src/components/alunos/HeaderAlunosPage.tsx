"use client";

import { Plus, Search } from "lucide-react";

type HeaderAlunosPageProps = {
  filteredCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  onOpenCreatePanel: () => void;
};

export default function HeaderAlunosPage({
  filteredCount,
  search,
  onSearchChange,
  onOpenCreatePanel,
}: HeaderAlunosPageProps) {
  return (
    <div className="space-y-6">
      <section className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
              Gestão de alunos
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Todos os alunos
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Consulte rapidamente os alunos cadastrados, filtre por nome ou
              modalidade e abra o painel lateral para ver detalhes do aluno
              selecionado.
            </p>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Pesquisar por nome, serie ou modalidade"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 focus:bg-white dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredCount} aluno
            {filteredCount === 1 ? "" : "s"} encontrado
            {filteredCount === 1 ? "" : "s"}.
          </p>

          <button
            type="button"
            onClick={onOpenCreatePanel}
            className="cursor-pointer inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#1FA2E1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#178CC5]"
            data-testid="addAluno-button"
          >
            <Plus className="size-4" />
            Adicionar aluno
          </button>
        </div>
      </section>
    </div>
  );
};