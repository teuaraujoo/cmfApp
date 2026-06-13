import { CheckCircle2, Info, Play, Search, Trash2 } from "lucide-react";

import { AulasEmptyState } from "@/components/dashboard/aulas/AulasEmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Aula } from "@/@types/aulas/aulas.types";
import {
  canDeleteAula,
  canFinishAula,
  canStartAula,
  getAulaStatusConfig,
} from "@/components/dashboard/aulas/aula-status";

type AulasSemanaTableProps = {
  aulas: Aula[];
  search: string;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onOpenDetails: (aula: Aula) => void;
  onStart: (aula: Aula) => void;
  onOpenFinalize: (aula: Aula) => void;
  onOpenDelete: (aula: Aula) => void;
};

export function AulasSemanaTable({
  aulas,
  search,
  loading,
  onSearchChange,
  onOpenDetails,
  onStart,
  onOpenFinalize,
  onOpenDelete,
}: AulasSemanaTableProps) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 lg:px-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Agenda semanal
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lista com todas as aulas desta semana.
          </p>
        </div>

        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Pesquisar por aluno, professor ou modalidade"
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 focus:bg-white dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
          />
        </div>
      </div>

      {aulas.length === 0 ? (
        <AulasEmptyState
          title="Nenhuma aula para exibir"
          description="Quando houver aulas cadastradas para esta semana ou a busca encontrar resultados, elas aparecerão nesta tabela."
        />
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {aulas.map((aula) => {
              const status = getAulaStatusConfig(aula.status);

              return (
                <article
                  key={aula.id}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-900/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                        Aula #{aula.id}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                        {aula.aluno.nome}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {aula.aluno.serie ?? "Sem serie"}
                      </p>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold ${status.className}`}
                    >
                      <status.icon className="size-4" />
                      {status.shortLabel}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-xs dark:border-gray-800">
                    <div className="min-w-0">
                      <p className="text-gray-400 dark:text-gray-500">Professor</p>
                      <p className="truncate font-medium text-gray-700 dark:text-gray-300">
                        {aula.professor.nome}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 dark:text-gray-500">Materia</p>
                      <p className="truncate font-medium text-gray-700 dark:text-gray-300">
                        {aula.professor.materia}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(aula)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-sky-50 px-3 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20"
                    >
                      <Info className="size-4" />
                      Detalhes
                    </button>

                    {canStartAula(aula.status) ? (
                      <button
                        type="button"
                        onClick={() => onStart(aula)}
                        disabled={loading}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-sky-50 px-3 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20"
                      >
                        <Play className="size-4" />
                        {loading ? "Iniciando..." : "Iniciar"}
                      </button>
                    ) : null}

                    {canFinishAula(aula) ? (
                      <button
                        type="button"
                        onClick={() => onOpenFinalize(aula)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
                      >
                        <CheckCircle2 className="size-4" />
                        Finalizar
                      </button>
                    ) : null}

                    {canDeleteAula(aula.status) ? (
                      <button
                        type="button"
                        onClick={() => onOpenDelete(aula)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                      >
                        <Trash2 className="size-4" />
                        Excluir
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden max-w-full overflow-x-auto rounded-xl md:block">
          <Table className="w-full min-w-[760px] lg:min-w-full">
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  ID
                </TableCell>
                <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  Aluno
                </TableCell>
                <TableCell isHeader className="hidden py-3 pr-2 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 md:table-cell">
                  Professor
                </TableCell>
                <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  Status
                </TableCell>
                <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  Detalhes
                </TableCell>
                <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  Ações
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                  <span className="sm:hidden">Del</span>
                  <span className="hidden sm:inline">Excluir</span>
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {aulas.map((aula) => {
                const status = getAulaStatusConfig(aula.status);

                return (
                  <TableRow key={aula.id}>
                    <TableCell className="whitespace-nowrap py-3 pr-2 text-xs font-semibold text-gray-800 dark:text-white/90 sm:py-4 sm:pr-4 sm:text-sm">
                      #{aula.id}
                    </TableCell>
                    <TableCell className="max-w-32 truncate whitespace-nowrap py-3 pr-2 text-xs text-gray-600 dark:text-gray-300 sm:max-w-none sm:py-4 sm:pr-4 sm:text-sm">
                      {aula.aluno.nome}
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {aula.aluno.serie ?? "Sem serie"}
                      </p>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap py-4 pr-4 text-sm text-gray-600 dark:text-gray-300 md:table-cell">
                      {aula.professor.nome}
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {aula.professor.materia}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pr-2 sm:py-4 sm:pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${status.className}`}
                      >
                        <status.icon className="size-4 shrink-0" />

                        <span className="sm:hidden">{status.shortLabel}</span>
                        <span className="hidden sm:inline">{status.label}</span>
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pr-2 sm:py-4 sm:pr-4">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(aula)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-sky-50 p-2 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20 sm:rounded-xl sm:px-3 sm:text-sm"
                        aria-label={`Ver detalhes da aula ${aula.id}`}
                      >
                        <Info className="size-4" />
                        <span className="hidden sm:inline">Detalhes</span>
                      </button>
                    </TableCell>
                    <TableCell className="inline-flex gap-2 whitespace-nowrap py-3 pr-2 sm:py-4 sm:pr-4">
                      {canStartAula(aula.status) ? (
                        <button
                          type="button"
                          onClick={() => onStart(aula)}
                          disabled={loading}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-sky-50 p-2 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20 sm:px-3 sm:text-sm"
                          aria-label={`Iniciar aula ${aula.id}`}
                        >
                          <Play className="size-4" />
                          <span className="hidden sm:inline">{loading ? "Iniciando..." : "Iniciar"}</span>
                        </button>
                      ) : null}
                      {canFinishAula(aula) ? (
                        <button
                          type="button"
                          onClick={() => onOpenFinalize(aula)}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-amber-50 p-2 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 sm:px-3 sm:text-sm"
                          aria-label={`Finalizar aula ${aula.id}`}
                        >
                          <CheckCircle2 className="size-4" />
                          <span className="hidden sm:inline">Finalizar</span>
                        </button>
                      ) : null}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 sm:py-4">
                      {canDeleteAula(aula.status) ? (
                        <button
                          type="button"
                          onClick={() => onOpenDelete(aula)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-50 p-2 text-red-700 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                          aria-label={`Excluir aula ${aula.id}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </div>
        </>
      )}
    </section>
  );
}
