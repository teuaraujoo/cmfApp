"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check, GraduationCap, UserRound } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Aluno } from "@/@types/aluno/aluno.types";
import { Modalidade } from "@/@types/modalidade/modalidade.type";
import { Professor } from "@/@types/professor/professor.types";

type NovaAulaDialogProps = {
  error: string;
  loading: boolean
  open: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onOpenChange: (open: boolean) => void;
  alunos: Aluno[];
  professores: Professor[];
  modalidades: Modalidade[];
  initialDate?: string;
};

export function NovaAulaDialog({
  error,
  loading,
  open,
  onSubmit,
  onOpenChange,
  alunos,
  professores,
  modalidades,
  initialDate,
}: NovaAulaDialogProps) {
  const [selectedAlunoId, setSelectedAlunoId] = useState<number | null>(null);
  const [selectedProfessorId, setSelectedProfessorId] = useState<number | null>(null);

  function toggleAluno(alunoId: number) {
    setSelectedAlunoId((current) => (current === alunoId ? null : alunoId));
  };

  function toggleProfessor(professorId: number) {
    setSelectedProfessorId((current) =>
      current === professorId ? null : professorId,
    );
  };

  function closeDialog() {
    setSelectedAlunoId(null);
    setSelectedProfessorId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => nextOpen ? onOpenChange(true) : closeDialog()}>
      <DialogContent className="side-panel-scroll max-h-[92vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-y-auto bg-white dark:bg-gray-950 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Nova aula
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova aula
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={onSubmit}>
          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <input
            type="hidden"
            name="aluno"
            value={selectedAlunoId ?? ""}
          />
          <input
            type="hidden"
            name="professor"
            value={selectedProfessorId ?? ""}
          />

          <SelectionSection
            title="Aluno da aula"
            description="Selecione apenas um aluno para está aula individual."
            icon={<UserRound className="size-4" />}
            selectedCount={selectedAlunoId ? 1 : 0}
          >
            {alunos.map((aluno) => {
              const selected = selectedAlunoId === aluno.id;
              const disabled = selectedAlunoId !== null && !selected;

              return (
                <button
                  key={aluno.id}
                  type="button"
                  onClick={() => toggleAluno(aluno.id!)}
                  disabled={disabled}
                  className={selectionCardClassName(selected, disabled)}
                >
                  <div className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {aluno.nome}
                    </span>
                    <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                      {aluno.serie}
                    </span>
                  </div>
                  <SelectionBadge selected={selected} disabled={disabled} />
                </button>
              );
            })}
          </SelectionSection>

          <SelectionSection
            title="Professor da aula"
            description="Selecione apenas um professor responsável pela aula."
            icon={<GraduationCap className="size-4" />}
            selectedCount={selectedProfessorId ? 1 : 0}
          >
            {professores.map((professor) => {
              const selected = selectedProfessorId === professor.id;
              const disabled = selectedProfessorId !== null && !selected;

              return (
                <button
                  key={professor.id}
                  type="button"
                  onClick={() => toggleProfessor(professor.id)}
                  disabled={disabled}
                  className={selectionCardClassName(selected, disabled)}
                >
                  <div className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {professor.nome}
                    </span>
                    <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                      {professor.materia}
                    </span>
                  </div>
                  <SelectionBadge selected={selected} disabled={disabled} />
                </button>
              );
            })}
          </SelectionSection>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modalidade
              </span>
              <Select name="modalidade" required>
                <SelectTrigger className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90">
                  <SelectValue placeholder="Selecione a modalidade">
                    {(value) =>
                      modalidades.find(
                        (modalidade) => String(modalidade.id) === String(value),
                      )?.tipo ?? "Selecione a modalidade"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modalidades</SelectLabel>
                    {modalidades.map((modalidade) => (
                      <SelectItem key={modalidade.id} value={String(modalidade.id)}>
                        {modalidade.tipo}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Data da aula
              </span>
              <Input
                type="date"
                name="data"
                defaultValue={initialDate}
                required
                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Horario inicial
              </span>
              <Input
                type="time"
                name="horario_inicio"
                required
                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Horario final
              </span>
              <Input
                type="time"
                name="horario_fim"
                required
                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
              />
            </label>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-[#1FA2E1] text-white hover:bg-[#178CC5]"
              disabled={loading}
            >
              {loading ? "Criando aula..." : "Criar aula"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SelectionSection({
  title,
  description,
  icon,
  selectedCount,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  selectedCount: number;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/40">
      <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
              {icon}
            </span>
            {title}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-200 dark:ring-gray-800">
          {selectedCount} selecionado
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

function SelectionBadge({
  selected,
  disabled,
}: {
  selected: boolean;
  disabled: boolean;
}) {
  if (selected) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-700 px-2 py-1 text-xs font-semibold text-white">
        <Check className="size-3" />
        Selecionado
      </span>
    );
  }

  if (disabled) {
    return (
      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        Bloqueado
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      Selecionar
    </span>
  );
}

function selectionCardClassName(selected: boolean, disabled: boolean) {
  return cn(
    "flex min-w-0 max-w-full items-center gap-3 rounded-xl border p-3 transition-all",
    selected &&
    "border-sky-500 bg-sky-50 shadow-sm dark:border-sky-400/50 dark:bg-sky-500/10",
    disabled &&
    "cursor-not-allowed border-gray-200 bg-gray-50 opacity-55 dark:border-gray-800 dark:bg-gray-900/60",
    !selected &&
    !disabled &&
    "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10",
  );
}
