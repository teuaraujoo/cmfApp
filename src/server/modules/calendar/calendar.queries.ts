import "server-only";

import { requireAdminUser } from "@/server/modules/auth/auth.services";
import { getCalendarEvents } from "@/server/modules/calendar/calendar.services";
import { generalQueriesRateLimit } from "@/server/libs/ratelimit";
import { rateLimitByIdentifier } from "@/server/security/rate-limit.helper";

export async function getCalendarEventsForAdmin(start: Date, end: Date) {
  const session = await requireAdminUser();
  await rateLimitByIdentifier(`calendar:get:admin:${session.appUser.id}`, generalQueriesRateLimit);
  return getCalendarEvents(start, end);
};
