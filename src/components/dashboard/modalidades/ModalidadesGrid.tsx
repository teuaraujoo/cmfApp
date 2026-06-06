import { Pencil, Shapes, Trash2 } from "lucide-react";

import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";

type ModalidadesGridProps = {
  modalidades: Modalidade[];
  onEdit: (modalidade: Modalidade) => void;
  onDelete: (modalidade: Modalidade) => void;
};

export default function ModalidadesGrid({ modalidades, onEdit, onDelete }: ModalidadesGridProps) {
  if (!modalidades.length) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 px-6 text-center dark:border-gray-800">
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
          <Shapes className="size-6" />
        </span>
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Nenhuma modalidade cadastrada
        </h2>
        <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          Adicione a primeira modalidade para utilizá-la nos demais cadastros do sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {modalidades.map((modalidade) => (
        <article
          key={modalidade.id}
          className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-sky-500/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Badge color="primary" size="sm">
                {firstWord(modalidade.tipo)}
              </Badge>
              <h2 className="mt-4 truncate text-base font-semibold text-gray-900 dark:text-white">
                {modalidade.tipo}
              </h2>
              <div className="mt-3">
                <Badge color="success" size="sm">ATIVA</Badge>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                title={`Editar ${modalidade.tipo}`}
                aria-label={`Editar ${modalidade.tipo}`}
                onClick={() => onEdit(modalidade)}
                className="cursor-pointer rounded-xl text-gray-500 hover:border-sky-200 hover:text-sky-700 dark:text-gray-400 dark:hover:text-sky-300"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon-lg"
                title={`Excluir ${modalidade.tipo}`}
                aria-label={`Excluir ${modalidade.tipo}`}
                onClick={() => onDelete(modalidade)}
                className="cursor-pointer rounded-xl"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function firstWord(value: string) {
  return value.trim().split(/\s+/)[0] || "Modalidade";
}
