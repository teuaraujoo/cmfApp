"use client";

import type { FormEvent } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ModalidadeFormDialogProps = {
  open: boolean;
  modalidade: Modalidade | null;
  loading: boolean;
  error: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ModalidadeFormDialog({
  open,
  modalidade,
  loading,
  error,
  onOpenChange,
  onSubmit,
}: ModalidadeFormDialogProps) {
  const isEditing = Boolean(modalidade);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-950 sm:max-w-md">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              {isEditing ? "Editar modalidade" : "Nova modalidade"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Atualize o nome utilizado nos cadastros do sistema."
                : "Informe o nome da modalidade que será disponibilizada no sistema."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-5">
            <Label htmlFor="tipo-modalidade">Nome da modalidade</Label>
            <Input
              id="tipo-modalidade"
              name="tipo"
              defaultValue={modalidade?.tipo ?? ""}
              placeholder="Ex: Presencial Sede"
              minLength={4}
              required
              autoFocus
              className="mt-2 h-11 rounded-xl"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Use um nome claro com pelo menos quatro caracteres.
            </p>
            {error ? (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </p>
            ) : null}
          </div>

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
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-[#1FA2E1] text-white hover:bg-[#178CC5]"
            >
              {loading
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Criar modalidade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
