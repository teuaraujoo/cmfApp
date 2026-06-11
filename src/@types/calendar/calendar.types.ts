import type { AulaStatus } from "@/@types/aulas/aulas.types";

export type CalendarEntityType = "aula" | "turma";

export type CalendarEventCategory =
  | "Turma"
  | "Agendada"
  | "EmAndamento"
  | "Pendente"
  | "Finalizada";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: false;
  extendedProps: {
    calendar: CalendarEventCategory;
    entityType: CalendarEntityType;
    entityId: number;
    modalidade: string;
    aluno?: string;
    alunoSerie?: string | null;
    professor?: string;
    professorMateria?: string;
    startedAt?: string;
    endedAt?: string;
    turma?: string;
    totalAlunos?: number;
    vigenciaInicio?: string;
    vigenciaFim?: string;
    notas?: string | null;
    aulaStatus?: AulaStatus;
    status: string;
  };
};

export type CalendarEventsResponse = {
  message: string;
  data: CalendarEvent[];
};
