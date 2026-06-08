import { Info, Search } from "lucide-react";

import type { Aula } from "@/@types/aulas/aulas.types";
import Badge from "@/components/ui/Badge";
import { AulasEmptyState } from "@/components/dashboard/aulas/AulasEmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatHorarioLocal } from "@/utils/date-utils";

type AulasHistoricoTableProps = {
  aulas: Aula[];
  totalAulas: number;
  search: string;
  onSearchChange: (value: string) => void;
  onOpenDetails: (aula: Aula) => void;
};

export function AulasHistoricoTable({
  aulas,
  totalAulas,
  search,
  onSearchChange,
  onOpenDetails,
}: AulasHistoricoTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-2 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 lg:px-6">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Aulas finalizadas
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Histórico completo de aulas já encerradas.
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
          title="Nenhum histórico encontrado"
          description="As aulas finalizadas aparecerão aqui quando existirem registros encerrados ou quando a busca encontrar resultados."
        />
      ) : (
      <div className="max-w-full overflow-x-auto rounded-xl">
        <Table className="w-full min-w-[720px] lg:min-w-full">
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
                Horario
              </TableCell>
              <TableCell isHeader className="py-3 pr-4 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Detalhes
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {aulas.map((aula) => (
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
                  {aula.inicio.toLocaleDateString("pt-BR")} -{" "}
                  {formatHorarioLocal(aula.inicio)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 pr-4">
                  <Badge color="success" size="sm">
                    Finalizada
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <button
                    type="button"
                    onClick={() => onOpenDetails(aula)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-sky-50 p-2 text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20"
                    aria-label={`Ver detalhes da aula ${aula.id}`}
                  >
                    <Info className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}
    </section>
  );
}
