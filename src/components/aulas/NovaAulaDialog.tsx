"use client";

import { useState, type FormEvent } from "react";

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
import {
  mockAlunosAula,
  mockModalidadesAula,
  mockProfessoresAula,
} from "@/components/aulas/mock-aulas";
import type { CreateAulaPayload } from "@/components/aulas/types";

type NovaAulaDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAula: (payload: CreateAulaPayload) => void;
};

export function NovaAulaDialog({
  open,
  onOpenChange,
  onCreateAula,
}: NovaAulaDialogProps) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const alunoId = Number(formData.get("aluno_id"));
    const professorId = Number(formData.get("professor_id"));
    const modalidadeId = Number(formData.get("modalidade_id"));
    const data = String(formData.get("data") ?? "");
    const horarioInicio = String(formData.get("horario_inicio") ?? "");
    const horarioFim = String(formData.get("horario_fim") ?? "");

    if (!alunoId || !professorId || !modalidadeId || !data || !horarioInicio || !horarioFim) {
      setError("Preencha todos os campos obrigatorios para criar a aula.");
      return;
    }

    const startedAt = new Date(`${data}T${horarioInicio}`);
    const endedAt = new Date(`${data}T${horarioFim}`);

    if (startedAt >= endedAt) {
      setError("O horario inicial precisa ser menor que o horario final.");
      return;
    }

    onCreateAula({
      aluno_id: alunoId,
      professor_id: professorId,
      modalidade_id: modalidadeId,
      started_at: startedAt.toISOString(),
      ended_at: endedAt.toISOString(),
    });

    event.currentTarget.reset();
    setError("");
    onOpenChange(false);
  }

  function closeDialog() {
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => nextOpen ? onOpenChange(true) : closeDialog()}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-y-auto bg-white dark:bg-gray-950 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 dark:text-white">
            Nova aula
          </DialogTitle>
          <DialogDescription>
            Preencha os campos seguindo o payload usado pelo backend:
            aluno_id, professor_id, modalidade_id, started_at e ended_at.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
            Essa criacao e apenas mockada. O formulario monta o payload real, mas
            adiciona a aula somente na tabela local.
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Aluno
              </span>
              <Select name="aluno_id" required>
                <SelectTrigger className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90">
                  <SelectValue placeholder="Selecione o aluno">
                    {(value) =>
                      mockAlunosAula.find((aluno) => String(aluno.id) === String(value))
                        ?.nome ?? "Selecione o aluno"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Alunos</SelectLabel>
                    {mockAlunosAula.map((aluno) => (
                      <SelectItem key={aluno.id} value={String(aluno.id)}>
                        {aluno.nome} {aluno.extra ? `- ${aluno.extra}` : ""}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Professor
              </span>
              <Select name="professor_id" required>
                <SelectTrigger className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90">
                  <SelectValue placeholder="Selecione o professor">
                    {(value) =>
                      mockProfessoresAula.find(
                        (professor) => String(professor.id) === String(value),
                      )?.nome ?? "Selecione o professor"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Professores</SelectLabel>
                    {mockProfessoresAula.map((professor) => (
                      <SelectItem key={professor.id} value={String(professor.id)}>
                        {professor.nome} {professor.extra ? `- ${professor.extra}` : ""}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modalidade
              </span>
              <Select name="modalidade_id" required>
                <SelectTrigger className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90">
                  <SelectValue placeholder="Selecione a modalidade">
                    {(value) =>
                      mockModalidadesAula.find(
                        (modalidade) => String(modalidade.id) === String(value),
                      )?.tipo ?? "Selecione a modalidade"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modalidades</SelectLabel>
                    {mockModalidadesAula.map((modalidade) => (
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
            >
              Criar aula
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
