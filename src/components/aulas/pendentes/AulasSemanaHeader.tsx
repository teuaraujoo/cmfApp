import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type AulasSemanaHeaderProps = {
  onCreateAula: () => void;
};

export function AulasSemanaHeader({ onCreateAula }: AulasSemanaHeaderProps) {
  return (
    <section className="px-1 py-3 sm:px-2 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
            Gestão de aulas
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Aulas da semana
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Acompanhe as aulas agendadas, consulte detalhes rapidamente e
            finalize aulas com anotações para manter o histórico organizado.
          </p>
        </div>

        <Button
          type="button"
          onClick={onCreateAula}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1FA2E1] px-4 py-5 text-sm font-medium text-white hover:bg-[#178CC5] sm:w-fit"
        >
          <Plus className="size-4" />
          Adicionar nova aula
        </Button>
      </div>
    </section>
  );
};
