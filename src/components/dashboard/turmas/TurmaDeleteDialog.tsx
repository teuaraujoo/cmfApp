"use client";

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
import type { TurmaDashboardItem } from "@/@types/turma/turma.types";

type TurmaDeleteDialogProps = {
  turma: TurmaDashboardItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInactive: (turma: TurmaDashboardItem) => Promise<void>
};

export default function TurmaDeleteDialog({
  turma,
  open,
  onOpenChange,
  onInactive
}: TurmaDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-950">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="size-5" />
          </div>
          <DialogTitle className="text-gray-900 dark:text-white">
            Desativar Turma
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {turma ? (
              <>
                Você está prestes a desativar{" "}
                <span className="font-semibold">{turma.nome}</span>.
                Ela não ficará mais disponível para uso no sistema, mas seus
                dados serão preservados e poderão ser reativados futuramente.
                Deseja continuar?
              </>
            ) : (
              "Selecione uma turma para deletar."
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="cursor-pointer bg-red-700 text-white hover:bg-red-600"
            onClick={() => onInactive(turma!)}
          >
            Desativar turma 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
