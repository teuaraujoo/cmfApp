import { CalendarDays, Layers3 } from "lucide-react";
import type { DiaSemana, Turma } from "./types";

type TurmasOverviewProps = {
  turmas: Turma[];
  diasSemana: DiaSemana[];
};

export default function TurmasOverview({
  turmas,
  diasSemana,
}: TurmasOverviewProps) {
  const totalTurmas = turmas.length;
  const turmasPorDia = diasSemana.map((dia) => ({
    dia,
    total: turmas.filter((turma) => turma.diasSemana.includes(dia)).length,
  }));

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
            <Layers3 className="size-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visão geral
            </p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {totalTurmas} turmas
            </h2>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="size-4 text-sky-700 dark:text-sky-300" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Turmas por dia
          </h3>
        </div>

        <div className="space-y-3">
          {turmasPorDia.map(({ dia, total }) => (
            <div
              key={dia}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900/50"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {dia}
              </span>
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
                {total}
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
