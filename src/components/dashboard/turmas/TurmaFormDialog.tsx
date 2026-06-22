"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { CalendarClock, Check, UserRound, UsersRound } from "lucide-react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { TurmaAgenda } from "@/@types/turma/turma.types";
import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import type { TurmaDashboardItem } from "@/@types/turma/turma.types";
import { Aluno } from "@/@types/aluno/aluno.types";
import { Professor } from "@/@types/professor/professor.types";

type DiaSemanaFiltro = {
  id: number;
  label: string;
  filterValue: string;
};

type TurmaFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  turma?: TurmaDashboardItem | null;
  diasSemana: DiaSemanaFiltro[];
  modalidades: Modalidade[];
  alunos: Aluno[];
  professores: Professor[];
  error: string;
  loading: boolean;
  loadingOptions?: boolean;
  optionsError?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function TurmaFormDialog({
  open,
  mode,
  turma,
  diasSemana,
  modalidades,
  alunos,
  professores,
  error,
  loading,
  loadingOptions = false,
  optionsError = "",
  onOpenChange,
  onSubmit
}: TurmaFormDialogProps) {

  function getDiaSemanaId(value: string | number | undefined) {
    if (value === undefined || value === null) {
      return "";
    };

    const option = diasSemana.find(
      (dia) =>
        String(dia.id) === String(value) ||
        dia.filterValue === String(value) ||
        dia.label === String(value),
    );

    return option ? String(option.id) : "";
  };

  const [selectedAlunos, setSelectedAlunos] = useState<number[]>(
    () => turma?.alunos.map((aluno) => aluno.id) ?? [],
  );
  const [selectedProfessores, setSelectedProfessores] = useState<number[]>(
    () => turma?.professores.map((professor) => professor.id) ?? [],
  );
  const [primeiroDiaSemana, setPrimeiroDiaSemana] = useState(() => getDiaSemanaId(turma?.diasSemana[0]));
  const [segundoDiaSemana, setSegundoDiaSemana] = useState(() => getDiaSemanaId(turma?.diasSemana[1]));

  const [primeiroHorarioInicio, setPrimeiroHorarioInicio] = useState(
    () => turma?.agenda[0]?.horario_inicio ?? "",
  );
  const [primeiroHorarioFim, setPrimeiroHorarioFim] = useState(
    () => turma?.agenda[0]?.horario_fim ?? "",
  );
  const [segundoHorarioInicio, setSegundoHorarioInicio] = useState(
    () => turma?.agenda[1]?.horario_inicio ?? "",
  );
  const [segundoHorarioFim, setSegundoHorarioFim] = useState(
    () => turma?.agenda[1]?.horario_fim ?? "",
  );

  function toggleAluno(alunoId: number) {
    setSelectedAlunos((current) =>
      current.includes(alunoId)
        ? current.filter((id) => id !== alunoId)
        : [...current, alunoId],
    );
  };

  function toggleProfessor(professorId: number) {
    setSelectedProfessores((current) =>
      current.includes(professorId)
        ? current.filter((id) => id !== professorId)
        : [...current, professorId],
    );
  };

  function calculateHours(agenda: TurmaAgenda[] | undefined) {
    if (!agenda?.length) {
      return "";
    };

    let minutosTotais = 0;

    for (const item of agenda) {
      if (!item.horario_inicio || !item.horario_fim) {
        return "";
      };

      const [inicioHora, inicioMinuto] = item.horario_inicio.split(":").map(Number);
      const [fimHora, fimMinuto] = item.horario_fim.split(":").map(Number);

      const inicio = inicioHora * 60 + inicioMinuto;
      const fim = fimHora * 60 + fimMinuto;

      if (fim <= inicio) {
        return "";
      };

      minutosTotais += fim - inicio;
    };

    return minutosTotais / 60;
  };

  const isEditing = mode === "edit";
  const agendaAtual = [
    primeiroDiaSemana
      ? {
        horario_inicio: primeiroHorarioInicio,
        horario_fim: primeiroHorarioFim,
      }
      : null,
    segundoDiaSemana
      ? {
        horario_inicio: segundoHorarioInicio,
        horario_fim: segundoHorarioFim,
      }
      : null,
  ].filter(Boolean) as TurmaAgenda[];
  const horasSemana = calculateHours(agendaAtual);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="side-panel-scroll flex max-h-[92vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-hidden bg-white p-0 dark:bg-gray-950 sm:max-w-5xl">
        <form
          onSubmit={onSubmit}
          className="flex max-h-[92vh] min-h-0 w-full min-w-0 flex-col overflow-hidden"
        >
          <DialogHeader className="shrink-0 border-b border-gray-200 p-5 dark:border-gray-800 sm:p-6">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? "Editar turma" : "Cadastrar turma"}
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              {isEditing ? "Atualize os dados abaixo e salve as alterações" : "Preencha os campos abaixo para criar uma turma"}
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overflow-x-hidden p-5 sm:p-6">
            {loadingOptions ? (
              <p className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                Carregando alunos, professores e modalidades...
              </p>
            ) : null}

            {optionsError ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                {optionsError}
              </p>
            ) : null}

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
              <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome da turma
                </span>
                <Input
                  name="nome"
                  defaultValue={turma?.nome}
                  placeholder="Ex: Turma Intensiva ENEM"
                  className="h-11 rounded-xl mt-2"
                  required
                />
              </label>

              <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Modalidade
                </span>
                <Select
                  name="modalidade"
                  defaultValue={turma?.modalidade_id ? String(turma.modalidade_id) : undefined}
                >
                  <SelectTrigger
                    disabled={loadingOptions || modalidades.length === 0}
                    className="h-11 w-full rounded-xl mt-2"
                  >
                    <SelectValue placeholder="Selecione a modalidade" >
                      {(value) =>
                        modalidades.find(
                          (modalidade) => String(modalidade.id) === String(value),
                        )?.tipo ?? "Selecione a modalidade"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {modalidades.map((modalidade) => (
                      <SelectItem key={modalidade.id} value={String(modalidade.id)}>
                        {modalidade.tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Inicio da vigencia
                </span>
                <Input
                  name="vigenciaInicio"
                  type="date"
                  defaultValue={turma?.vigencia_inicio}
                  className="h-11 rounded-xl mt-2"
                  required
                />
              </label>

              <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fim da vigencia
                </span>
                <Input
                  name="vigenciaFim"
                  type="date"
                  defaultValue={turma?.vigencia_fim}
                  className="h-11 rounded-xl mt-2"
                  required
                />
              </label>
            </div>

            <section className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/40">
              <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                      <CalendarClock className="size-4" />
                    </span>
                    Agenda da turma
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Configure o dia e o horário de cada encontro da turma.
                  </p>
                </div>

                <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-200 dark:ring-gray-800">
                  {horasSemana || 0}h semanais
                </span>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                <AgendaCard
                  title="1º dia"
                  description="Primeiro encontro semanal da turma."
                  diasSemana={diasSemana}
                  diaValue={primeiroDiaSemana}
                  inicioValue={primeiroHorarioInicio}
                  fimValue={primeiroHorarioFim}
                  required
                  onDiaChange={setPrimeiroDiaSemana}
                  onInicioChange={setPrimeiroHorarioInicio}
                  onFimChange={setPrimeiroHorarioFim}
                />

                <AgendaCard
                  title="2º dia"
                  description="Segundo encontro semanal, caso exista."
                  diasSemana={diasSemana}
                  diaValue={segundoDiaSemana}
                  inicioValue={segundoHorarioInicio}
                  fimValue={segundoHorarioFim}
                  required={Boolean(segundoDiaSemana)}
                  onDiaChange={setSegundoDiaSemana}
                  onInicioChange={setSegundoHorarioInicio}
                  onFimChange={setSegundoHorarioFim}
                />
              </div>
            </section>

            <input
              name="horasSemana"
              type="hidden"
              value={horasSemana}
            />

            <input
              type="hidden"
              name="turma_agenda.0.dia_semana"
              value={primeiroDiaSemana}
            />
            <input
              type="hidden"
              name="turma_agenda.0.horario_inicio"
              value={primeiroHorarioInicio}
            />
            <input
              type="hidden"
              name="turma_agenda.0.horario_fim"
              value={primeiroHorarioFim}
            />
            <input
              type="hidden"
              name="turma_agenda.1.dia_semana"
              value={segundoDiaSemana}
            />
            <input
              type="hidden"
              name="turma_agenda.1.horario_inicio"
              value={segundoHorarioInicio}
            />
            <input
              type="hidden"
              name="turma_agenda.1.horario_fim"
              value={segundoHorarioFim}
            />

            {selectedAlunos.map((alunoId, index) => (
              <input
                key={alunoId}
                type="hidden"
                name={`turma_alunos.${index}.aluno_id`}
                value={alunoId}
              />
            ))}

            {selectedProfessores.map((professorId, index) => (
              <input
                key={professorId}
                type="hidden"
                name={`turma_professores.${index}.professor_id`}
                value={professorId}
              />
            ))}

            <SelectionSection
              title="Alunos disponiveis"
              description="Clique nos cards para adicionar ou remover alunos da turma."
              icon={<UsersRound className="size-4" />}
              selectedCount={selectedAlunos.length}
            >
              {loadingOptions ? (
                <SelectionLoading />
              ) : null}

              {!loadingOptions && alunos.length === 0 ? (
                <SelectionEmptyMessage message="Nenhum aluno disponivel para selecao." />
              ) : null}

              {alunos.map((aluno) => {
                const selected = aluno.id != null && selectedAlunos.includes(aluno.id);

                return (
                  <button
                    key={aluno.id}
                    type="button"
                    onClick={() => toggleAluno(aluno.id!)}
                    className={selectionCardClassName(selected)}
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {aluno.nome}
                      </span>
                      <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                        {aluno.serie}
                      </span>
                    </div>
                    <SelectionBadge selected={selected} />
                  </button>
                );
              })}
            </SelectionSection>

            <SelectionSection
              title="Professores disponiveis"
              description="Selecione os professores responsaveis pela turma."
              icon={<UserRound className="size-4" />}
              selectedCount={selectedProfessores.length}
            >
              {loadingOptions ? (
                <SelectionLoading />
              ) : null}

              {!loadingOptions && professores.length === 0 ? (
                <SelectionEmptyMessage message="Nenhum professor disponivel para selecao." />
              ) : null}

              {professores.map((professor) => {
                const selected = professor.id != null && selectedProfessores.includes(professor.id);

                return (
                  <button
                    key={professor.id}
                    type="button"
                    onClick={() => toggleProfessor(professor.id)}
                    className={selectionCardClassName(selected)}
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {professor.nome}
                      </span>
                      <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                        {professor.materia}
                      </span>
                    </div>
                    <SelectionBadge selected={selected} />
                  </button>
                );
              })}
            </SelectionSection>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <DialogFooter className="border border-gray-200 dark:border-gray-800 shrink-0 gap-3 bg-gray-50 px-5 py-4 dark:bg-gray-900/10 sm:gap-3 sm:px-6">
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
              className=" bg-sky-700 text-white hover:bg-sky-600 mb-[1rem] cursor-pointer"
              disabled={loading || loadingOptions || Boolean(optionsError)}
            >
              {loading
                ?
                isEditing ? "Salvando..." : "Criando..."
                :
                isEditing ? "Salvar alterações" : "Criar turma"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AgendaCard({
  title,
  description,
  diasSemana,
  diaValue,
  inicioValue,
  fimValue,
  required,
  onDiaChange,
  onInicioChange,
  onFimChange,
}: {
  title: string;
  description: string;
  diasSemana: DiaSemanaFiltro[];
  diaValue: string;
  inicioValue: string;
  fimValue: string;
  required?: boolean;
  onDiaChange: (value: string) => void;
  onInicioChange: (value: string) => void;
  onFimChange: (value: string) => void;
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/60">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="min-w-0 space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Dia da semana
          </span>
          <Select
            value={diaValue}
            onValueChange={(value) => {
              if (value) onDiaChange(value);
            }}
          >
            <SelectTrigger className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Selecione o dia">
                {(value) =>
                  diasSemana.find((dia) => String(dia.id) === String(value))
                    ?.filterValue ?? "Selecione o dia"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {diasSemana.map((dia) => (
                <SelectItem key={dia.id} value={String(dia.id)}>
                  {dia.filterValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="min-w-0 space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Horário inicial
          </span>
          <Input
            type="time"
            value={inicioValue}
            onChange={(event) => onInicioChange(event.target.value)}
            className="h-11 rounded-xl"
            required={required}
          />
        </label>

        <label className="min-w-0 space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Horário final
          </span>
          <Input
            type="time"
            value={fimValue}
            onChange={(event) => onFimChange(event.target.value)}
            className="h-11 rounded-xl"
            required={required}
          />
        </label>
      </div>
    </article>
  );
}

function SelectionLoading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[66px] animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950/60"
        />
      ))}
    </>
  );
}

function SelectionEmptyMessage({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-3 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-400 md:col-span-2 xl:col-span-3">
      {message}
    </p>
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
          {selectedCount} selecionados
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

function SelectionBadge({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-700 px-2 py-1 text-xs font-semibold text-white">
        <Check className="size-3" />
        Adicionado
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      Adicionar
    </span>
  );
}

function selectionCardClassName(selected: boolean) {
  return cn(
    "flex min-w-0 max-w-full items-center gap-3 rounded-xl border p-3 transition-all hover:-translate-y-0.5",
    selected
      ? "border-sky-500 bg-sky-50 shadow-sm dark:border-sky-400/50 dark:bg-sky-500/10"
      : "border-gray-200 bg-white hover:border-sky-200 hover:bg-sky-50/70 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10",
  );
};
