"use client";

import { BookOpen, UsersRound } from "lucide-react";
import type { Professor } from "./types";

type ProfessoresOverviewProps = {
  professores: Professor[];
};

export default function ProfessoresOverview({
  professores,
}: ProfessoresOverviewProps) {
  const total = professores.length;
  const totalsByMateria = professores.reduce<Record<string, number>>(
    (acc, professor) => {
      acc[professor.materia] = (acc[professor.materia] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const materias = Object.entries(totalsByMateria).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
          <UsersRound className="size-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {total}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="size-4 text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Professores por materia
          </p>
        </div>

        <div className="space-y-3">
          {materias.length ? (
            materias.map(([materia, count]) => (
              <div
                key={materia}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900/70"
              >
                <span className="min-w-0 truncate text-sm text-gray-600 dark:text-gray-300">
                  {materia}
                </span>
                <span className="ml-3 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200">
                  {count}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">-</p>
          )}
        </div>
      </div>
    </aside>
  );
};
