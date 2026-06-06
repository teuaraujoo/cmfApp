import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function AulasHistoricoHeader() {
  return (
    <section className="px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
            Gestão de aulas
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Histórico de aulas
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Consulte aulas já finalizadas, visualize detalhes e acompanhe o
            registro de atendimentos anteriores.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <NavigationButton href="/dashboard/aulas/semana">
            Aulas semanais
          </NavigationButton>
          <NavigationButton href="/dashboard/aulas/pendentes">
            Pendências
          </NavigationButton>
        </div>
      </div>
    </section>
  );
}

function NavigationButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-200 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10 dark:hover:text-sky-300"
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
