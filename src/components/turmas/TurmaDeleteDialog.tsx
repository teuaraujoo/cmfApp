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
import type { Turma } from "./types";

type TurmaDeleteDialogProps = {
  turma: Turma | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TurmaDeleteDialog({
  turma,
  open,
  onOpenChange,
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
            {turma
              ? `Você está prestes a deletar "${turma.nome}". Essa ação ainda não remove dados mockados.`
              : "Selecione uma turma para deletar."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-red-700 text-white hover:bg-red-600"
            onClick={() => onOpenChange(false)}
          >
            Deletar turma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
