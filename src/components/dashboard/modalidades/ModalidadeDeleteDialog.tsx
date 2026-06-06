"use client";

import { AlertTriangle } from "lucide-react";

import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalidadeDeleteDialogProps = {
  modalidade: Modalidade | null;
  loading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function ModalidadeDeleteDialog({
  modalidade,
  loading,
  open,
  onOpenChange,
  onConfirm,
}: ModalidadeDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-950 sm:max-w-md">
        <DialogHeader>
          <span className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="size-5" />
          </span>
          <DialogTitle className="text-gray-900 dark:text-white">
            Excluir modalidade
          </DialogTitle>
          <DialogDescription>
            Você está prestes a excluir{" "}
            <strong className="text-gray-700 dark:text-gray-200">
              {modalidade?.tipo}
            </strong>
            . Essa ação não pode ser desfeita. Deseja continuar?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={!modalidade || loading}
            onClick={onConfirm}
            className="cursor-pointer bg-red-700 text-white hover:bg-red-600"
          >
            {loading ? "Excluindo..." : "Excluir modalidade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
