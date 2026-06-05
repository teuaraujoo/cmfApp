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

type AulaDeleteDialogProps = {
  aula: AulasGet | null;
  onClose: () => void;
  onDelete: (aula: AulasGet) => Promise<void>;
};

export function AulaDeleteDialog({
  aula,
  onClose,
  onDelete,
}: AulaDeleteDialogProps) {

  return (
    <Dialog open={Boolean(aula)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white dark:bg-gray-950">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="size-5" />
          </div>
          <DialogTitle className="text-gray-900 dark:text-white">
            Deletar aula
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {aula ? (
              <>
                Você está prestes a deletar a aula{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  #{aula.id}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {aula.aluno.nome}
                </span>
                . Essa ação não e reversível, tem certeza que deseja continuar?
              </>
            ) : (
              "Selecione uma aula para deletar."
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="cursor-pointer bg-red-700 text-white hover:bg-red-600"
            onClick={() => void onDelete(aula!)}
            disabled={!aula}
          >
            Deletar aula
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
