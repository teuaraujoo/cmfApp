import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAulaStatusConfig } from "../aulas/aula-status";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import Link from "next/link";

export default async function RecentClasses() {
  const getAulas = await getAulasForAdmin();
  const aulas = getAulas.slice(0, 4);
  const noAulasMessage = "Nenhuma aula foi encontrada para esta semana.";

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Aulas Recentes
          </h3>
        </div>

        <Link
          href="/dashboard/aulas/semana"
          className="inline-flex shrink-0 items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-4 sm:py-2.5 sm:text-theme-sm"
        >
          Ver todas
        </Link>
      </div>

      {aulas.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 dark:text-gray-500"
            >
              <path d="M5.83334 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14.1667 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2.5 7.0835H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="2.5" y="3.75" width="15" height="13.75" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Sem aulas cadastradas
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {noAulasMessage}
            </p>
          </div>
        </div>
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
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                        {aula.aluno.nome}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {aula.modalidade}
                      </p>
                    </div>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold ${status.className}`}>
                      <status.icon className="size-4" />
                      {status.shortLabel}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3 text-xs dark:border-gray-800">
                    <p className="text-gray-400 dark:text-gray-500">Professor</p>
                    <p className="truncate font-medium text-gray-700 dark:text-gray-300">
                      {aula.professor.nome}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden max-w-full overflow-x-auto md:block">
            <Table className="min-w-[620px]">
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Modalidade
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aluno
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Professor
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {aulas.map((aula) => {
                const status = getAulaStatusConfig(aula.status);
                return (

                  <TableRow key={aula.id} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {aula.modalidade}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {aula.aluno.nome}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {aula.professor.nome}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${status.className}`}
                      >
                        <status.icon className="size-4 shrink-0" />

                        <span className="sm:hidden">{status.shortLabel}</span>
                        <span className="hidden sm:inline">{status.label}</span>
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
