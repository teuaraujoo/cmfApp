import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/Badge";
import { getAulasForAdmin } from "@/server/modules/aulas/aulas.queries";
import Link from "next/link";

export default async function RecentClasses() {
  const getAulas = await getAulasForAdmin();
  const aulas = getAulas.slice(0, 4);
  const noAulasMessage = "Nenhuma aula foi encontrada para esta semana.";

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Aulas Recentes
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/aulas/semana"
          >
            <button className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              Ver todas
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
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

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {aulas.length <= 0
              ?
              <TableRow>
                <td colSpan={4} className="px-4 py-12">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-400 dark:text-gray-500"
                      >
                        <path
                          d="M5.83334 2.5V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.1667 2.5V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2.5 7.0835H17.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <rect
                          x="2.5"
                          y="3.75"
                          width="15"
                          height="13.75"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
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
                </td>
              </TableRow>
              :
              aulas.map((aula) => (
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
                    <Badge
                      size="sm"
                      color={
                        aula.encerrada ? "error" : "success"
                      }
                    >
                      {aula.encerrada ? 'ENCERRADA' : 'AGENDADA'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
