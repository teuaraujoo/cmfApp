"use client";

import { useState } from "react";

import { AulaDeleteDialog } from "@/components/aulas/AulaDeleteDialog";
import { AulaDetailsDialog } from "@/components/aulas/AulaDetailsDialog";
import { AulasSemanaHeader } from "@/components/aulas/AulasSemanaHeader";
import { AulasSemanaStats } from "@/components/aulas/AulasSemanaStats";
import { AulasSemanaTable } from "@/components/aulas/AulasSemanaTable";
import { FinalizarAulaDialog } from "@/components/aulas/FinalizarAulaDialog";
import {
  mockAlunosAula,
  mockAulasSemana,
  mockModalidadesAula,
  mockProfessoresAula,
} from "@/components/aulas/mock-aulas";
import { NovaAulaDialog } from "@/components/aulas/NovaAulaDialog";
import type { AulaSemana, CreateAulaPayload } from "@/components/aulas/types";

export default function AulasSemanaDashboardPage() {
  const [aulas, setAulas] = useState(mockAulasSemana);
  const [selectedAula, setSelectedAula] = useState<AulaSemana | null>(null);
  const [deleteAula, setDeleteAula] = useState<AulaSemana | null>(null);
  const [detailsAula, setDetailsAula] = useState<AulaSemana | null>(null);
  const [notes, setNotes] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const finalizedAulas = aulas.filter((aula) => aula.encerrada).length;
  const upcomingAulas = aulas.filter((aula) => !aula.encerrada).length;
  const totalStudents = new Set(aulas.map((aula) => aula.aluno.id)).size;

  function openFinalizeDialog(aula: AulaSemana) {
    if (aula.encerrada) {
      return;
    }

    setSelectedAula(aula);
    setNotes(aula.anotacoes ?? "");
  }

  function closeFinalizeDialog() {
    setSelectedAula(null);
    setNotes("");
  }

  function handleFinalizeAula() {
    if (!selectedAula) {
      return;
    }

    setAulas((current) =>
      current.map((aula) =>
        aula.id === selectedAula.id
          ? { ...aula, encerrada: true, anotacoes: notes.trim() }
          : aula,
      ),
    );
    closeFinalizeDialog();
  }

  function handleDeleteAula() {
    if (!deleteAula) {
      return;
    }

    setAulas((current) =>
      current.filter((aula) => aula.id !== deleteAula.id),
    );
    setDeleteAula(null);
  }

  function handleCreateAula(payload: CreateAulaPayload) {
    const aluno = mockAlunosAula.find((item) => item.id === payload.aluno_id);
    const professor = mockProfessoresAula.find(
      (item) => item.id === payload.professor_id,
    );
    const modalidade = mockModalidadesAula.find(
      (item) => item.id === payload.modalidade_id,
    );

    const startedAt = new Date(payload.started_at);
    const endedAt = new Date(payload.ended_at);
    const nextId = Math.max(...aulas.map((aula) => aula.id), 100) + 1;

    const newAula: AulaSemana = {
      id: nextId,
      aluno_id: payload.aluno_id,
      professor_id: payload.professor_id,
      modalidade_id: payload.modalidade_id,
      aluno: {
        id: payload.aluno_id,
        nome: aluno?.nome ?? "Aluno nao encontrado",
        email: `aluno-${payload.aluno_id}@mock.com`,
        serie: aluno?.extra ?? "Serie nao informada",
      },
      professor: {
        id: payload.professor_id,
        nome: professor?.nome ?? "Professor nao encontrado",
        materia: professor?.extra ?? "Materia nao informada",
      },
      modalidade: {
        id: payload.modalidade_id,
        tipo: modalidade?.tipo ?? "Modalidade nao encontrada",
      },
      dia: getWeekdayName(startedAt),
      data: payload.started_at.slice(0, 10),
      horario_inicio: formatTime(startedAt),
      horario_fim: formatTime(endedAt),
      encerrada: false,
      anotacoes: payload.notas,
    };

    setAulas((current) => [newAula, ...current]);
  }

  return (
    <main className="p-3 sm:p-5 lg:p-6">
      <div className="space-y-4 sm:space-y-6">
        <AulasSemanaHeader onCreateAula={() => setCreateDialogOpen(true)} />

        <AulasSemanaStats
          finalizedAulas={finalizedAulas}
          upcomingAulas={upcomingAulas}
          totalStudents={totalStudents}
        />

        <AulasSemanaTable
          aulas={aulas}
          onOpenDetails={setDetailsAula}
          onOpenFinalize={openFinalizeDialog}
          onOpenDelete={setDeleteAula}
        />
      </div>

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
      />

      <FinalizarAulaDialog
        aula={selectedAula}
        notes={notes}
        onNotesChange={setNotes}
        onClose={closeFinalizeDialog}
        onFinalize={handleFinalizeAula}
      />

      <AulaDeleteDialog
        aula={deleteAula}
        onClose={() => setDeleteAula(null)}
        onDelete={handleDeleteAula}
      />

      <NovaAulaDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateAula={handleCreateAula}
      />
    </main>
  );
}

function getWeekdayName(date: Date) {
  const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terca-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
  ];

  return weekdays[date.getDay()] ?? "Dia nao informado";
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
