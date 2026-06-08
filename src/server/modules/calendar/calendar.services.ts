import "server-only";

import { AulasRepositories } from "@/server/modules/aulas/aulas.repositories";
import { calendarWallTimeToInstant } from "@/server/modules/calendar/calendar-date.utils";
import {
  mapAulasToCalendarEvents,
  mapTurmasToCalendarEvents,
} from "@/server/modules/calendar/calendar.mapper";
import { TurmaRepositories } from "@/server/modules/turmas/turmas.repositories";

export async function getCalendarEvents(start: Date, end: Date) {
  const aulaRangeStart = calendarWallTimeToInstant(start);
  const aulaRangeEnd = calendarWallTimeToInstant(end);
  const [aulas, turmas] = await Promise.all([
    AulasRepositories.getAulasByPeriod(aulaRangeStart, aulaRangeEnd),
    TurmaRepositories.getByPeriod(start, end),
  ]);

  return [
    ...mapAulasToCalendarEvents(aulas),
    ...mapTurmasToCalendarEvents(turmas, start, end),
  ].sort((first, second) => first.start.localeCompare(second.start));
};
