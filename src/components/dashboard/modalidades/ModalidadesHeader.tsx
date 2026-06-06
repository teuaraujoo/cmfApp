import { Plus, Shapes } from "lucide-react";

import { Button } from "@/components/ui/button";

type ModalidadesHeaderProps = {
  total: number;
  onCreate: () => void;
};

export default function ModalidadesHeader({ total, onCreate }: ModalidadesHeaderProps) {
  return (
    <header className="flex flex-col gap-5 px-1 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-2 sm:py-5">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-300">
          <Shapes className="size-4" />
          Configuração acadêmica
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Modalidades
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Gerencie as modalidades utilizadas por alunos, professores, turmas e aulas.
        </p>
        <p className="mt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
          {total} modalidade{total === 1 ? "" : "s"} cadastrada{total === 1 ? "" : "s"}
        </p>
      </div>

      <Button
        type="button"
        onClick={onCreate}
        className="h-11 w-full cursor-pointer rounded-xl bg-[#1FA2E1] px-4 text-white hover:bg-[#178CC5] sm:w-fit"
      >
        <Plus className="size-4" />
        Adicionar modalidade
      </Button>
    </header>
  );
}
