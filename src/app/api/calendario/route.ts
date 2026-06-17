import { z } from "zod";

import { handleApiError } from "@/server/error/handle-api-error";
import { getCalendarEventsForAdmin } from "@/server/modules/calendar/calendar.queries";

const calendarRangeSchema = z
  .object({
    start: z.iso.datetime({ offset: true }).transform((value) => new Date(value)),
    end: z.iso.datetime({ offset: true }).transform((value) => new Date(value)),
  })
  .refine(({ start, end }) => start < end, {
    message: "O intervalo inicial deve ser menor que o final.",
  });

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const range = calendarRangeSchema.parse({
      start: url.searchParams.get("start"),
      end: url.searchParams.get("end"),
    });

    const events = await getCalendarEventsForAdmin(range.start, range.end);

    return Response.json({
      message: "Eventos do calendario encontrados com sucesso!",
      data: events,
    });
    
  } catch (error) {
    return handleApiError(error, "Erro ao carregar eventos do calendario.");
  };
};
