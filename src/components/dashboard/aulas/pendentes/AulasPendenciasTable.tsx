import { CheckCircle2, Info, Search, Trash2 } from "lucide-react";

import type { Aula } from "@/@types/aulas/aulas.types";
import { AulasEmptyState } from "@/components/dashboard/aulas/AulasEmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAulaStatusConfig } from "@/components/dashboard/aulas/aula-status";

type AulasPendenciasTableProps = {
  aulas: Aula[];
  totalAulas: number;
  search: string;
  onSearchChange: (value: string) => void;
  onOpenDetails: (aula: Aula) => void;
  onOpenFinalize: (aula: Aula) => void;
  onOpenDelete: (aula: Aula) => void;
};

export function AulasPendenciasTable({
  aulas,
  totalAulas,
  search,
  onSearchChange,
  onOpenDetails,
  onOpenFinalize,
  onOpenDelete,
}: AulasPendenciasTableProps) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 lg:px-6">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Lista de pendências
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Aulas que ainda precisam de revisão ou finalizacão.
          </p>
        </div>

        <div className="w-full lg:max-w-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Pesquisar por aluno, professor ou modalidade"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 focus:bg-white dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
            />
          </div>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {aulas.length} de {totalAulas} aulas encontradas.
          </p>
        </div>
      </div>

      {aulas.length === 0 ? (
        <AulasEmptyState
          title="Nenhuma pendência encontrada"
          description="As aulas pendentes aparecerão aqui quando existirem registros em aberto ou quando a busca encontrar resultados."
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
                    <span className={`shrink-0 text-xs font-semibold ${status.className}`}>
                      {status.shortLabel}
                    </span>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-xs dark:border-gray-800">
                    <div className="min-w-0">
                      <dt className="text-gray-400 dark:text-gray-500">Professor</dt>
                      <dd className="truncate font-medium text-gray-700 dark:text-gray-300">
                        {aula.professor.nome}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-gray-400 dark:text-gray-500">Modalidade</dt>
                      <dd className="truncate font-medium text-gray-700 dark:text-gray-300">
                        {aula.modalidade}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(aula)}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-sky-50 px-2 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20"
                      aria-label={`Ver detalhes da aula ${aula.id}`}
                    >
                      <Info className="size-4" />
                      <span className="hidden min-[360px]:inline">Detalhes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenFinalize(aula)}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-2 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
                      aria-label={`Finalizar aula ${aula.id}`}
                    >
                      <CheckCircle2 className="size-4" />
                      <span className="hidden min-[360px]:inline">Finalizar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenDelete(aula)}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                      aria-label={`Excluir aula ${aula.id}`}
                    >
                      <Trash2 className="size-4" />
                      <span className="hidden min-[360px]:inline">Excluir</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden max-w-full overflow-x-auto rounded-xl md:block">
          <Table className="w-full min-w-[680px] lg:min-w-full">
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  ID
                </TableCell>
                <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Aluno
                </TableCell>
                <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Professor
                </TableCell>
                <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Modalidade
                </TableCell>
                <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Ações
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {aulas.map((aula) => {
                const status = getAulaStatusConfig(aula.status);

                return (
                  <TableRow key={aula.id}>
                    <TableCell className="whitespace-nowrap py-4 pr-4 text-sm font-semibold text-gray-800 dark:text-white/90">
                      #{aula.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4 pr-4 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {aula.aluno.nome}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {aula.aluno.serie ?? "Sem serie"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4 pr-4 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {aula.professor.nome}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {aula.professor.materia}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4 pr-4 text-sm text-gray-600 dark:text-gray-300">
                      {aula.modalidade}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4 pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${status.className}`}
                      >
                        <span className="sm:hidden">{status.shortLabel}</span>
                        <span className="hidden sm:inline">{status.label}</span>
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenDetails(aula)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-sky-50 p-2 text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20"
                          aria-label={`Ver detalhes da aula ${aula.id}`}
                        >
                          <Info className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenFinalize(aula)}
                          className="inline-flex cursor-pointer items-center rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
                          aria-label={`Finalizar aula ${aula.id}`}
                        >
                          Finalizar
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenDelete(aula)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-50 p-2 text-red-700 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                          aria-label={`Excluir aula ${aula.id}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
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
