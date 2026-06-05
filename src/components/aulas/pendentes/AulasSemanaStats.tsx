import { CheckCircle2, Clock3, Users } from "lucide-react";
import type { ReactNode } from "react";

type AulasSemanaStatsProps = {
  finalizedAulas: number;
  upcomingAulas: number;
  totalStudents: number;
};

export function AulasSemanaStats({
  finalizedAulas,
  upcomingAulas,
  totalStudents,
}: AulasSemanaStatsProps) {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:gap-4">
      <StatCard
        title="Finalizadas no mês"
        value={finalizedAulas}
        description="Aulas já concluídas no período atual."
        icon={<CheckCircle2 className="size-5" />}
      />
      <StatCard
        title="Próximas aulas"
        value={upcomingAulas}
        description="Aulas ainda pendentes nesta semana."
        icon={<Clock3 className="size-5" />}
      />
      <StatCard
        title="Alunos do curso"
        value={totalStudents}
        description="Total de alunos que fizeram aula individual."
        icon={<Users className="size-5" />}
      />
    </section>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {value}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300 sm:size-12">
          {icon}
        </div>
      </div>
    </article>
  );
}
