import type { CalendarEvent } from "@/@types/calendar/calendar.types";
import type { AulasRepositories } from "@/server/modules/aulas/aulas.repositories";
import { formatInstantForCalendar } from "@/server/modules/calendar/calendar-date.utils";
import type { TurmaRepositories } from "@/server/modules/turmas/turmas.repositories";

type AulaCalendarRecord = Awaited<
  ReturnType<typeof AulasRepositories.getAulasByPeriod>
>[number];

type TurmaCalendarRecord = Awaited<
  ReturnType<typeof TurmaRepositories.getByPeriod>
>[number];

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export function mapAulasToCalendarEvents(
  aulas: AulaCalendarRecord[],
): CalendarEvent[] {
  return aulas.map((aula) => {
    const status = aula.encerrada
      ? "FINALIZADA"
      : normalizeAulaStatus(aula.status);

    return {
      id: `aula-${aula.id}`,
      title: `Aula - ${aula.alunos.users.nome}`,
      start: formatInstantForCalendar(aula.started_at),
      end: formatInstantForCalendar(aula.ended_at),
      allDay: false,
      extendedProps: {
        calendar: getAulaCalendarCategory(status),
        entityType: "aula",
        entityId: aula.id,
        modalidade: aula.modalidades.tipo,
        aluno: aula.alunos.users.nome,
        alunoSerie: aula.alunos.serie,
        professor: aula.professores.users.nome,
        professorMateria: aula.professores.materia,
        startedAt: aula.started_at.toISOString(),
        endedAt: aula.ended_at.toISOString(),
        notas: aula.notas,
        aulaStatus: status,
        status: getAulaStatusLabel(status),
      },
    };
  });
};

export function mapTurmasToCalendarEvents(
  turmas: TurmaCalendarRecord[],
  rangeStart: Date,
  rangeEnd: Date,
): CalendarEvent[] {
  return turmas.flatMap((turma) => {
    if (!turma.vigencia_inicio || !turma.vigencia_fim) {
      return [];
    };

    const start = maxDate(
      toUtcDateOnly(turma.vigencia_inicio),
      toUtcDateOnly(rangeStart),
    );
    const end = minDate(
      toUtcDateOnly(turma.vigencia_fim),
      new Date(toUtcDateOnly(rangeEnd).getTime() - ONE_DAY_IN_MS),
    );

    if (start > end) {
      return [];
    }

    const events: CalendarEvent[] = [];

    for (let currentDate = new Date(start); currentDate <= end; currentDate = addUtcDays(currentDate, 1)) {
      for (const agenda of turma.turma_agenda) {
        if (agenda.dia_semana !== currentDate.getUTCDay()) {
          continue;
        };

        const dateKey = formatUtcDateKey(currentDate);
        const startTime = formatDatabaseTime(agenda.horario_inicio);
        const endTime = formatDatabaseTime(agenda.horario_fim);

        events.push({
          id: `turma-${turma.id}-${agenda.id}-${dateKey}`,
          title: `Turma - ${turma.nome}`,
          start: `${dateKey}T${startTime}:00Z`,
          end: `${dateKey}T${endTime}:00Z`,
          allDay: false,
          extendedProps: {
            calendar: "Turma",
            entityType: "turma",
            entityId: turma.id,
            modalidade: turma.modalidades?.tipo ?? "Sem modalidade",
            turma: turma.nome,
            totalAlunos: turma.turma_alunos.length,
            vigenciaInicio: formatUtcDateKey(
              toUtcDateOnly(turma.vigencia_inicio),
            ),
            vigenciaFim: formatUtcDateKey(toUtcDateOnly(turma.vigencia_fim)),
            professor: turma.turma_professores
              .map((item) => item.professores.users.nome)
              .join(", "),
            status: turma.status,
          },
        });
      }
    }

    return events;
  });
};

function formatDatabaseTime(date: Date) {
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
};

function formatUtcDateKey(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
};

function toUtcDateOnly(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};

function addUtcDays(date: Date, days: number) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

function maxDate(first: Date, second: Date) {
  return first > second ? first : second;
};

function minDate(first: Date, second: Date) {
  return first < second ? first : second;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
};

function normalizeAulaStatus(status: string) {
  if (
    status === "AGENDADA" ||
    status === "EM_ANDAMENTO" ||
    status === "PENDENTE_FINALIZAÇÃO" ||
    status === "FINALIZADA"
  ) {
    return status;
  };

  return "AGENDADA";
};

function getAulaCalendarCategory(status: CalendarEvent["extendedProps"]["aulaStatus"]) {
  switch (status) {
    case "EM_ANDAMENTO":
      return "EmAndamento";
    case "PENDENTE_FINALIZAÇÃO":
      return "Pendente";
    case "FINALIZADA":
      return "Finalizada";
    default:
      return "Agendada";
  };
};

function getAulaStatusLabel(status: CalendarEvent["extendedProps"]["aulaStatus"]) {
  switch (status) {
    case "EM_ANDAMENTO":
      return "Em andamento";
    case "PENDENTE_FINALIZAÇÃO":
      return "Pendente de finalização";
    case "FINALIZADA":
      return "Finalizada";
    default:
      return "Agendada";
  };
};
