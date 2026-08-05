"use client";

import { Search } from "lucide-react";

type Props = {
  total: number;
  search: string;
  onSearchChange(value: string): void;
};

export default function PortalAulasHeader({
  total,
  search,
  onSearchChange,
}: Props) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-medium text-sky-600">
          Portal
        </p>

        <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
          Aulas da semana
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Acompanhe sua rotina semanal com horários, professores e alunos.
        </p>
      </div>

      <div className="relative w-full xl:max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar por pessoa, modalidade ou matéria"
          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 focus:bg-white dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
        />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {total} aula{total !== 1 && "s"}
      </p>
    </section>
  );
}
