import { Info, Trash2 } from "lucide-react";

import Badge from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AulaSemana } from "@/components/aulas/types";

type AulasSemanaTableProps = {
  aulas: AulaSemana[];
  onOpenDetails: (aula: AulaSemana) => void;
  onOpenFinalize: (aula: AulaSemana) => void;
  onOpenDelete: (aula: AulaSemana) => void;
};

export function AulasSemanaTable({
  aulas,
  onOpenDetails,
  onOpenFinalize,
  onOpenDelete,
}: AulasSemanaTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-2 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 lg:px-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Agenda semanal
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lista mockada seguindo a estrutura principal de aula, aluno,
            professor e modalidade.
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto rounded-xl">
        <Table className="w-full min-w-[520px] sm:min-w-[760px] lg:min-w-full">
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
                Info
              </TableCell>
              <TableCell isHeader className="py-3 pr-2 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                <span className="sm:hidden">Fim</span>
                <span className="hidden sm:inline">Finalizar</span>
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-xs">
                <span className="sm:hidden">Del</span>
                <span className="hidden sm:inline">Excluir</span>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {aulas.map((aula) => (
              <TableRow key={aula.id}>
                <TableCell className="whitespace-nowrap py-3 pr-2 text-xs font-semibold text-gray-800 dark:text-white/90 sm:py-4 sm:pr-4 sm:text-sm">
                  #{aula.id}
                </TableCell>
                <TableCell className="max-w-32 truncate whitespace-nowrap py-3 pr-2 text-xs text-gray-600 dark:text-gray-300 sm:max-w-none sm:py-4 sm:pr-4 sm:text-sm">
                  {aula.aluno.nome}
                </TableCell>
                <TableCell className="hidden whitespace-nowrap py-4 pr-4 text-sm text-gray-600 dark:text-gray-300 md:table-cell">
                  {aula.professor.nome}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 pr-2 sm:py-4 sm:pr-4">
                  <Badge
                    color={aula.encerrada ? "success" : "warning"}
                    size="sm"
                  >
                    <span className="sm:hidden">
                      {aula.encerrada ? "Ok" : "Pend."}
                    </span>
                    <span className="hidden sm:inline">
                      {aula.encerrada ? "Finalizada" : "Pendente"}
                    </span>
                  </Badge>
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
                <TableCell className="whitespace-nowrap py-3 pr-2 sm:py-4 sm:pr-4">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={aula.encerrada}
                    disabled={aula.encerrada}
                    onClick={() => onOpenFinalize(aula)}
                    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors sm:h-7 sm:w-12 ${
                      aula.encerrada
                        ? "cursor-not-allowed bg-emerald-500"
                        : "cursor-pointer bg-gray-300 hover:bg-sky-300 dark:bg-gray-700 dark:hover:bg-sky-500/60"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 rounded-full bg-white shadow transition-transform sm:size-5 ${
                        aula.encerrada ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 sm:py-4">
                  <button
                    type="button"
                    onClick={() => onOpenDelete(aula)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-50 p-2 text-red-700 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                    aria-label={`Excluir aula ${aula.id}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
