import Link from "next/link";
import { AlertCircle, Clock3 } from "lucide-react";
import { getAulasNotFinishedForAdmin } from "@/server/modules/aulas/aulas.queries";

export default async function PendingAulasCard() {
  const aulasPendentes = await getAulasNotFinishedForAdmin();
  const totalPendentes = aulasPendentes.length;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Aulas pendentes
          </p>
          <h3 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {totalPendentes}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
          <Clock3 className="size-6" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 size-5 text-amber-500 dark:text-amber-300" />
          <div className="space-y-1">
            <p className="font-medium text-gray-800 dark:text-white/90">
              {totalPendentes === 0
                ? "Nenhuma pendência no momento"
                : totalPendentes === 1
                  ? "Existe 1 aula aguardando encerramento"
                  : `Existem ${totalPendentes} aulas aguardando encerramento`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use esta área para acompanhar aulas agendadas que ainda não foram finalizadas.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link
          href="/dashboard/aulas/pendentes"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Ver pendências
        </Link>
      </div>
    </section>
  );
}
