import { BookOpenText, ChartColumnIncreasing } from "lucide-react";
import { getAulasCountByModalidadeForAdmin } from "@/server/modules/aulas/aulas.queries";

export default async function StatisticsChart() {
  const data = await getAulasCountByModalidadeForAdmin();
  const maxValue = Math.max(...data.map((item) => item.total), 1);
  const totalAulas = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Aulas por modalidade
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Distribuição atual de aulas individuais por modalidade.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">
          <BookOpenText className="size-4" />
          <span>{totalAulas} aulas registradas</span>
        </div>
      </div>

      {!data.length ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center dark:border-gray-800 dark:bg-gray-800/20">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-800">
            <ChartColumnIncreasing className="size-6 text-gray-400 dark:text-gray-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Nenhum dado para exibir
          </h4>
          <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            O gráfico aparecerá assim que houver aulas cadastradas com modalidade vinculada.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = Math.max((item.total / maxValue) * 100, 8);

            return (
              <div key={item.modalidade_id} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {item.modalidade}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.total} aula{item.total === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1FA2E1] to-[#74C4EB] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
