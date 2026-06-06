import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getCalendarEvents } from "@/server/modules/calendar/calendar.services";

export async function getCalendarEventsForAdmin(start: Date, end: Date) {
  await requireAdminUser();
  return getCalendarEvents(start, end);
};
