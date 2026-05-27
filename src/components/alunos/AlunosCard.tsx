"use client";

import { GraduationCap } from "lucide-react";

type AlunoCardItem = {
  id?: number;
  user_id: number;
  nome: string;
  email: string;
  role: string;
  status?: string;
  serie?: string | null;
  modalidade?: unknown;
};

type AlunosCardProps = {
  alunos: AlunoCardItem[];
  onOpenDetailsPanel: (aluno: AlunoCardItem) => void;
};

function AlunoStatusBadge({ status }: { status?: string }) {
  const statusClassName =
    status === "ATIVO"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : "bg-red-200 text-red-700 dark:bg-red-500/10 dark:text-red-300";

  return (
    <span
      className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}
    >
      {status ?? "INATIVO"}
    </span>
  );
}

function formatDisplayValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

export default function AlunosCard({
  alunos,
  onOpenDetailsPanel,
}: AlunosCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {alunos.map((aluno) => (
        <button
          key={aluno.id ?? aluno.user_id}
          type="button"
          onClick={() => onOpenDetailsPanel(aluno)}
          className="cursor-pointer group min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/70 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-800/20 dark:hover:border-sky-900/60 dark:hover:bg-white/[0.04] sm:p-5"
        >
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm transition-colors group-hover:bg-sky-50 dark:bg-gray-800 dark:text-sky-300 dark:group-hover:bg-sky-500/10">
                <GraduationCap className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="break-words font-medium text-gray-900 dark:text-white">
                  {aluno.nome}
                </p>
                <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400 sm:break-words">
                  {aluno.email}
                </p>
              </div>
            </div>

            <div className="flex justify-start sm:justify-end">
              <AlunoStatusBadge status={aluno.status} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900/70">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Serie
              </p>
              <p className="mt-1 break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {aluno.serie ?? "-"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900/70">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Modalidade
              </p>
              <p className="mt-1 break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                {formatDisplayValue(aluno.modalidade)}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
