"use client";

import { useRef, useState } from "react";
import type { EventClickArg, EventContentArg } from "@fullcalendar/core";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import toast from "react-hot-toast";

import type { Aluno } from "@/@types/aluno/aluno.types";
import type { Aula } from "@/@types/aulas/aulas.types";
import type { Modalidade } from "@/@types/modalidade/modalidade.type";
import type { Professor } from "@/@types/professor/professor.types";
import { AulaDeleteDialog } from "@/components/dashboard/aulas/semana/AulaDeleteDialog";
import { AulaDetailsDialog } from "@/components/dashboard/aulas/semana/AulaDetailsDialog";
import { FinalizarAulaDialog } from "@/components/dashboard/aulas/semana/FinalizarAulaDialog";
import { NovaAulaDialog } from "@/components/dashboard/aulas/semana/NovaAulaDialog";
import {
  type CalendarTurmaDetails,
  TurmaCalendarDetailsDialog,
} from "@/components/dashboard/calendar/TurmaCalendarDetailsDialog";
import { useCreateAulaForm } from "@/hooks/aulas/useCreateAulaForm";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { deleteAula, finalizarAula } from "@/services/aulas/aulas.client";

type CalendarProps = {
  alunos: Aluno[];
  professores: Professor[];
  modalidades: Modalidade[];
};

export default function Calendar({
  alunos,
  professores,
  modalidades,
}: CalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<string>();
  const [detailsAula, setDetailsAula] = useState<Aula | null>(null);
  const [finalizeAula, setFinalizeAula] = useState<Aula | null>(null);
  const [deletedAula, setDeletedAula] = useState<Aula | null>(null);
  const [detailsTurma, setDetailsTurma] =
    useState<CalendarTurmaDetails | null>(null);
  const [notes, setNotes] = useState("");
  const { loadCalendarEvents } = useCalendarEvents();
  const {
    error: createError,
    loading: createLoading,
    handleCreateAula,
    resetForm: resetCreateForm,
  } = useCreateAulaForm({
    onSuccess() {
      setCreateDialogOpen(false);
      setInitialDate(undefined);
      refetchCalendarEvents();
    },
  });

  function refetchCalendarEvents() {
    calendarRef.current?.getApi().refetchEvents();
  };

  function openCreateDialog(date?: string) {
    resetCreateForm();
    setInitialDate(date);
    setCreateDialogOpen(true);
  };

  function closeCreateDialog() {
    resetCreateForm();
    setInitialDate(undefined);
    setCreateDialogOpen(false);
  };

  function handleEventClick(clickInfo: EventClickArg) {
    const entityType = clickInfo.event.extendedProps.entityType;

    if (entityType === "turma") {
      setDetailsTurma(toTurmaDetails(clickInfo));
      return;
    }

    setDetailsAula(toAulaDetails(clickInfo));
  };

  function openFinalizeDialog(aula: Aula) {
    setDetailsAula(null);
    setFinalizeAula(aula);
    setNotes(aula.notas ?? "");
  };

  function closeFinalizeDialog() {
    setFinalizeAula(null);
    setNotes("");
  };

  async function handleFinalizeAula(aula: Aula) {
    const result = await toast.promise(finalizarAula(aula.id, notes), {
      loading: "Finalizando aula...",
      success: (response) => response?.message ?? "Aula finalizada!",
      error: (error) => error?.message ?? "Erro ao finalizar aula.",
    });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    closeFinalizeDialog();
    refetchCalendarEvents();
  }

  async function handleDeleteAula(aula: Aula) {
    const result = await toast.promise(deleteAula(aula.id), {
      loading: "Excluindo aula...",
      success: (response) => response?.message ?? "Aula excluida!",
      error: (error) => error?.message ?? "Erro ao excluir aula.",
    });

    if (result?.err) {
      toast.error(result.err);
      return;
    };

    setDeletedAula(null);
    refetchCalendarEvents();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-white/[0.03] dark:shadow-black/20">
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 py-3 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300 sm:px-6">
        <CalendarLegend colorClass="bg-sky-500" label="Turma" />
        <CalendarLegend colorClass="bg-amber-500" label="Aula pendente" />
        <CalendarLegend colorClass="bg-emerald-500" label="Aula concluida" />
      </div>
      <div className="custom-calendar p-3 sm:p-5 lg:p-6">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={ptBrLocale}
          timeZone="UTC"
          firstDay={0}
          dayHeaderFormat={{ weekday: "short" }}
          buttonText={{
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addAulaButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={loadCalendarEvents}
          selectable
          select={(selection) => openCreateDialog(selection.startStr.slice(0, 10))}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addAulaButton: {
              text: "Adicionar aula +",
              click: () => openCreateDialog(),
            },
          }}
        />
      </div>

      {createDialogOpen ? (
        <NovaAulaDialog
          error={createError}
          loading={createLoading}
          alunos={alunos}
          professores={professores}
          modalidades={modalidades}
          initialDate={initialDate}
          open={createDialogOpen}
          onSubmit={handleCreateAula}
          onOpenChange={(open) => {
            if (!open) {
              closeCreateDialog();
            }
          }}
        />
      ) : null}

      <AulaDetailsDialog
        aula={detailsAula}
        onClose={() => setDetailsAula(null)}
        onFinalize={openFinalizeDialog}
        onDelete={(aula) => {
          setDetailsAula(null);
          setDeletedAula(aula);
        }}
      />

      <FinalizarAulaDialog
        aula={finalizeAula}
        notes={notes}
        onNotesChange={setNotes}
        onClose={closeFinalizeDialog}
        onFinalize={handleFinalizeAula}
      />

      <AulaDeleteDialog
        aula={deletedAula}
        onClose={() => setDeletedAula(null)}
        onDelete={handleDeleteAula}
      />

      <TurmaCalendarDetailsDialog
        turma={detailsTurma}
        onClose={() => setDetailsTurma(null)}
      />
    </div>
  );
}

function CalendarLegend({
  colorClass,
  label,
}: {
  colorClass: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 dark:bg-gray-900/70">
      <span className={`size-2 rounded-full ${colorClass}`} />
      {label}
    </span>
  );
};

function toAulaDetails({ event }: EventClickArg): Aula {
  const props = event.extendedProps;

  return {
    id: Number(props.entityId),
    aluno_id: 0,
    professor_id: 0,
    modalidade: String(props.modalidade ?? ""),
    inicio: props.startedAt ? new Date(String(props.startedAt)) : new Date(),
    fim: props.endedAt ? new Date(String(props.endedAt)) : new Date(),
    encerrada: props.status === "Finalizada",
    notas: props.notas ? String(props.notas) : null,
    aluno: {
      nome: String(props.aluno ?? ""),
      serie: props.alunoSerie ? String(props.alunoSerie) : null,
    },
    professor: {
      nome: String(props.professor ?? ""),
      materia: String(props.professorMateria ?? ""),
    },
  };
};

function toTurmaDetails({ event }: EventClickArg): CalendarTurmaDetails {
  const props = event.extendedProps;

  return {
    id: Number(props.entityId),
    nome: String(props.turma ?? ""),
    modalidade: String(props.modalidade ?? ""),
    professor: String(props.professor ?? ""),
    totalAlunos: Number(props.totalAlunos ?? 0),
    status: String(props.status ?? ""),
    vigenciaInicio: String(props.vigenciaInicio ?? ""),
    vigenciaFim: String(props.vigenciaFim ?? ""),
    inicio: event.start ?? new Date(),
    fim: event.end ?? event.start ?? new Date(),
  };
};

function renderEventContent(eventInfo: EventContentArg) {
  const colorClass = `fc-bg-${String(
    eventInfo.event.extendedProps.calendar,
  ).toLowerCase()}`;

  return (
    <div className={`event-fc-color fc-event-main flex ${colorClass}`}>
      <div className="fc-daygrid-event-dot" />
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};
