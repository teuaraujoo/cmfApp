"use client";

import {
  BookOpen,
  CircleUserRound,
  EllipsisVertical,
  Mail,
  ShieldCheck,
  Pencil,
  ShieldOff,
} from "lucide-react";
import type { Professor } from "@/@types/professor/professor.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfessoresGridProps = {
  professores: Professor[];
  onOpenDetailsPanel: (professor: Professor) => void;
  onEditProfessor: (professor: Professor) => void;
  toggleProfessorStatus: (professor: Professor) => Promise<void>;
};

function ProfessorStatusBadge({ status }: { status: string }) {
  const statusClassName =
    status === "ATIVO"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";

  return (
    <span
      className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}
    >
      {status}
    </span>
  );
};

export default function ProfessoresGrid({
  professores,
  onOpenDetailsPanel,
  onEditProfessor,
  toggleProfessorStatus,
}: ProfessoresGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
      {professores.map((professor) => (
        <article
          key={professor.id}
          className="group rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-sky-500/30 dark:bg-gray-950/40 dark:hover:border-sky-400/50 dark:hover:bg-gray-950/70"
        >
          <div className="flex min-w-0 items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpenDetailsPanel(professor)}
              className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 shadow-sm transition-colors group-hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:group-hover:bg-sky-500/20">
                <CircleUserRound className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="break-words font-medium text-gray-900 dark:text-white">
                    {professor.nome}
                  </p>
                  <ProfessorStatusBadge status={professor.status} />
                </div>

                <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="size-4 shrink-0 text-gray-400 dark:text-gray-500" />
                  <span className="truncate">{professor.email}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-sky-500/10 dark:text-gray-300">
                    <BookOpen className="size-3.5 text-sky-500" />
                    {professor.materia}
                  </span>
                </div>
              </div>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200">
                <EllipsisVertical className="size-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onEditProfessor(professor)}
                  className="cursor-pointer dark:hover:bg-gray-700"
                >
                  <Pencil className="size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    void toggleProfessorStatus(professor);
                  }}
                  className={`${professor.status === "ATIVO" ? "text-red-500" : "text-green-500"} cursor-pointer dark:hover:bg-gray-700`}
                >
                  {professor.status === "ATIVO" ? <ShieldOff /> : <ShieldCheck />}
                  {professor.status === "ATIVO" ? "Desativar" : "Ativar"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </article>
      ))}
    </div>
  );
};
