"use client";

import Link from "next/link";
import { CalendarClock, Users, Eye, EllipsisVertical, ShieldCheck, ShieldOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TurmaDashboardItem } from "@/@types/turma/turma.types";

type TurmasGridProps = {
  turmas: TurmaDashboardItem[];
  onOpenDeleteDialog: (turma: TurmaDashboardItem) => void;
  onActive: (turmaId: number) => Promise<void>
};

function TurmaStatusBadge({ status }: { status: string }) {
  const statusClassName =
    status === "ATIVO"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300";

  return (
    <span
      className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}
    >
      {status === "ATIVO" ? "ATIVA" : "INATIVA"}
    </span>
  );
}

export default function TurmasGrid({
  turmas,
  onOpenDeleteDialog,
  onActive,
}: TurmasGridProps) {

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {turmas.map((turma) => (
        <article
          key={turma.id}
          className="group rounded-2xl border border-gray-200 bg-white p-4 transition-alldark:border-gray-800 dark:bg-gray-950/40 dark:border-sky-500/30"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                  {turma.nome}
                </p>
                <TurmaStatusBadge status={turma.status} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {/* <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
                  {turma.diasSemana.join(" e ")}
                  </span> */}
                {turma.agenda.map((agenda, index) => (
                  <span
                    key={`${turma.id}-agenda-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:bg-sky-500/10"
                  >
                    <CalendarClock className="size-3.5" />
                    {formatAgendaItem(turma.diasSemana[index], agenda)}
                  </span>
                ))}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <EllipsisVertical className="size-5" />
                <span className="sr-only">Abrir ações da turma</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="p-0 cursor-pointer dark:hover:bg-gray-700">
                  <Link
                    href={`/dashboard/turmas/${turma.id}`}
                    className="flex w-full items-center gap-2 px-1.5 py-1"
                  >
                    <Eye className="size-4" />
                    Detalhes
                  </Link>
                </DropdownMenuItem>
                {turma.status === "ATIVO" ?

                  <DropdownMenuItem
                    onClick={() => onOpenDeleteDialog(turma)}
                    className="cursor-pointer text-red-500 dark:hover:bg-gray-700"
                  >
                    <ShieldOff className="size-4" />
                    Desativar
                  </DropdownMenuItem>
                  :
                  <DropdownMenuItem
                    onClick={() => onActive(turma.id)}
                    className="cursor-pointer text-green-500 dark:hover:bg-gray-700"
                  >
                    <ShieldCheck className="size-4" />
                    Ativar
                  </DropdownMenuItem>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Estudantes
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                <Users className="size-4 text-sky-700 dark:text-sky-300" />
                {turma.alunos.length} alunos
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professores
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                {turma.professores.map((professor) => professor.nome).join(", ")}
              </p>
            </div>
          </div>
        </article>
      ))
      }
    </div >
  );
}

function formatAgendaItem(
  diaSemana: string | number | undefined,
  agenda: TurmaDashboardItem["agenda"][number],
) {
  const dia = diaSemana ? `${diaSemana}: ` : "";

  return `${dia}${agenda.horario_inicio} - ${agenda.horario_fim}`;
}
