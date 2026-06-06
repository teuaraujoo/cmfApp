import { useCallback } from "react";
import type { EventSourceFunc, EventSourceFuncArg } from "@fullcalendar/core";

import type { CalendarEventsResponse } from "@/@types/calendar/calendar.types";
import apiRoutes from "@/lib/api";

export function useCalendarEvents() {
  const loadCalendarEvents: EventSourceFunc = useCallback(
    async (range: EventSourceFuncArg) => {
      const searchParams = new URLSearchParams({
        start: range.startStr,
        end: range.endStr,
      });

      const response = await fetch(
        `${apiRoutes.calendario}?${searchParams.toString()}`,
        { credentials: "same-origin" },
      );

      const result = (await response.json()) as CalendarEventsResponse;

      if (!response.ok) {
        throw new Error(
          result.message ?? "Nao foi possivel carregar a agenda.",
        );
      };

      return result.data;
    },
    [],
  );

  return { loadCalendarEvents };
};
