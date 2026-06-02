"use client";

import Link from "next/link";
import { CalendarClock, Trash2, Users, Eye, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Turma } from "./types";

type TurmasGridProps = {
  turmas: Turma[];
  onOpenDeleteDialog: (turma: Turma) => void;
};

export default function TurmasGrid({
  turmas,
  onOpenDeleteDialog,
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
              <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                {turma.nome}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
                  <CalendarClock className="size-3.5" />
                  {turma.diasSemana.join(" e ")}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {turma.horario}
                </span>
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
                <DropdownMenuItem className="p-0 cursor-pointer hover:bg-gray-700">
                  <Link
                    href={`/dashboard/turmas/${turma.id}`}
                    className="flex w-full items-center gap-2 px-1.5 py-1"
                  >
                    <Eye className="size-4" />
                    Detalhes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onOpenDeleteDialog(turma)}
                  className="cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  Deletar
                </DropdownMenuItem>
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
