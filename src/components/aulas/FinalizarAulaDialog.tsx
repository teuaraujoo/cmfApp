import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AulasGet } from "@/components/aulas/types";
import { formatHorarioLocal } from "@/utils/date-utils";

type FinalizarAulaDialogProps = {
  aula: AulasGet | null;
  notes: string;
  onNotesChange: (notes: string) => void;
  onClose: () => void;
  onFinalize: (aulas: AulasGet) => Promise<void>;
};

export function FinalizarAulaDialog({
  aula,
  notes,
  onNotesChange,
  onClose,
  onFinalize,
}: FinalizarAulaDialogProps) {
  return (
    <Dialog open={Boolean(aula)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-white dark:bg-gray-950">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="size-5" />
          </div>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Finalizar aula
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {aula ? (
              <>
                Você está finalizando a aula{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  #{aula.id}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {aula.aluno.nome}
                </span>
                . Depois disso ela será marcada como concluída. Tem certeza que
                deseja continuar?
              </>
            ) : (
              "Selecione uma aula para finalizar."
            )}
          </DialogDescription>
        </DialogHeader>

        {aula ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {aula.aluno.nome} com {aula.professor.nome}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {`${aula.inicio.toLocaleDateString("pt-BR")} de ${formatHorarioLocal(aula.inicio)} às ${formatHorarioLocal(aula.fim)}`}
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Anotações da aula
              </span>
              <textarea
                value={notes}
                onChange={(event) => onNotesChange(event.target.value)}
                placeholder="Ex: conteudo revisado, dificuldades, proximos passos..."
                className="min-h-32 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-300 dark:border-gray-800 dark:bg-gray-900/70 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-sky-700"
              />
            </label>
          </div>
        ) : null}

        <DialogFooter className="gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => void onFinalize(aula!)}
            className="cursor-pointer bg-red-700 text-white hover:bg-red-600"
          >
            Finalizar aula
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
