import Link from "next/link";
import { CircleUserRound, GraduationCap } from "lucide-react";
import { getAllAlunosForAdmin } from "@/server/modules/users/user.queries";

export default async function RecentStudentsGrid() {
  const alunos = await getAllAlunosForAdmin();
  const recentAlunos = alunos.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Alunos recentes
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Últimos alunos disponíveis para consulta rápida.
          </p>
        </div>

        <Link
          href="/dashboard/alunos"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Ver todos
        </Link>
      </div>

      {!recentAlunos.length ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-800/20">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
            <CircleUserRound className="size-6 text-gray-400 dark:text-gray-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Nenhum aluno encontrado
          </h4>
          <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Os alunos cadastrados aparecerão aqui para consulta rápida na dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentAlunos.map((aluno) => (
            <article
              key={aluno.id}
              className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50/60 dark:border-gray-800 dark:bg-gray-800/20 dark:hover:border-sky-900/60 dark:hover:bg-sky-500/5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-gray-800 dark:text-sky-300">
                  <GraduationCap className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-800 dark:text-white/90">
                    {aluno.nome}
                  </p>
                  <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                    {aluno.email}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-sky-50 px-2.5 py-1 font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                      Série: {aluno.serie ?? "Não informada"}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {aluno.status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
