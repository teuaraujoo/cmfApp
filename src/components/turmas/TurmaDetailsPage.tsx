"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  Layers3,
  Pencil,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TurmaFormDialog from "./TurmaFormDialog";
import type { Aluno ,Modalidade, Professor, TurmaDashboardItem } from "./types";

const diasSemanaFormulario = [
  { label: "Segunda", value: "Segunda" },
  { label: "Terça", value: "Terça" },
  { label: "Quarta", value: "Quarta" },
  { label: "Quinta", value: "Quinta" },
  { label: "Sexta", value: "Sexta" },
  { label: "Sábado", value: "Sábado" },
];


type TurmaDetailsPageProps = {
  turma?: TurmaDashboardItem;
  modalidades: Modalidade[];
  alunos: Aluno[];
  professores: Professor[]
};

export default function TurmaDetailsPage({
  turma,
  modalidades,
  alunos,
  professores
}: TurmaDetailsPageProps) {

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!turma) {
    return (
      <main className="p-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Turma nao encontrada
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A turma mockada solicitada nao existe.
          </p>
          <Link
            href="/dashboard/turmas"
            className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-sky-700 px-3 text-sm font-medium text-white transition-colors hover:bg-sky-600"
          >
            Voltar para turmas
          </Link>
        </section>
      </main>
    );
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Link
                href="/dashboard/turmas"
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-600 dark:text-sky-300"
              >
                <ArrowLeft className="size-4" />
                Voltar para turmas
              </Link>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                Detalhes da turma
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {turma.nome}
              </h1>
            </div>

            <Button
              type="button"
              onClick={() => setEditDialogOpen(true)}
              className="w-full rounded-xl bg-[#1FA2E1] gap-2 px-4 py-5 text-sm font-medium text-white hover:bg-[#178CC5] lg:w-auto"
            >
              <Pencil className="size-4" />
              Editar turma
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Dias e horário"
            value={formatAgenda(turma)}
            icon={<CalendarClock className="size-5" />}
          />
          <SummaryCard
            title="Modalidade"
            value={turma.modalidade}
            icon={<Layers3 className="size-5" />}
          />
          <SummaryCard
            title="Horas semanais"
            value={`${turma.horas_semana}h por semana`}
            icon={<Clock3 className="size-5" />}
          />
          <SummaryCard
            title="Vigência"
            value={`${formatDate(turma.vigencia_inicio)} até ${formatDate(turma.vigencia_fim)}`}
            icon={<CalendarClock className="size-5" />}
          />
          <SummaryCard
            title="Total de alunos"
            value={`${turma.alunos.length} alunos`}
            icon={<Users className="size-5" />}
          />
          <SummaryCard
            title="Professores"
            value={`${turma.professores.length} responsável(eis)`}
            icon={<UserRound className="size-5" />}
          />
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <PeopleList
            title="Alunos da turma"
            description="Alunos vinculados a esta turma."
            people={turma.alunos}
            type="aluno"
          />
          <PeopleList
            title="Professores da turma"
            description="Professor(es) responsável(eis) pela turma."
            people={turma.professores}
            type="professor"
          />
        </div>
      </div>

      {editDialogOpen && (
        <TurmaFormDialog
          key={`edit-turma-form-${turma.id}`}
          open={editDialogOpen}
          mode="edit"
          turma={turma}
          modalidades={modalidades}
          alunos={alunos}
          professores={professores}
          diasSemana={diasSemanaFormulario}
          onOpenChange={setEditDialogOpen}
        />
      )}
    </main>
  );
};

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </article>
  );
};

function PeopleList({
  title,
  description,
  people,
  type,
}: {
  title: string;
  description: string;
  people: TurmaDashboardItem["alunos"] | TurmaDashboardItem["professores"];
  type: "aluno" | "professor";
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        {people.map((person) => (
          <div
            key={`${type}-${person.id}`}
            className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {person.nome}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {"serie" in person ? person.serie : person.materia}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
};

function formatAgenda(turma: TurmaDashboardItem) {
  if (!turma.agenda.length) {
    return "Sem agenda cadastrada";
  }

  return turma.agenda
    .map((agenda, index) => {
      const diaSemana = turma.diasSemana[index];
      const dia = diaSemana ? `${diaSemana}: ` : "";

      return `${dia}${agenda.horario_inicio} - ${agenda.horario_fim}`;
    })
    .join(" | ");
};
