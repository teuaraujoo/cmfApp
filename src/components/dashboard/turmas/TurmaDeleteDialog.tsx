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
  onDelete: (turma: TurmaDashboardItem) => Promise<void>
};

export default function TurmaDeleteDialog({
  turma,
  open,
  onOpenChange,
  onDelete
}: TurmaDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-950">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="size-5" />
          </div>
          <DialogTitle className="text-gray-900 dark:text-white">
            Deletar turma
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {turma ? (
              <>
                Você está prestes a deletar{" "}
                <span className="font-semibold">{turma.nome}</span>. Essa ação não é reversível, tem certeza que deseja deletar essa turma?
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
            onClick={() => onDelete(turma!)}
          >
            Deletar turma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
