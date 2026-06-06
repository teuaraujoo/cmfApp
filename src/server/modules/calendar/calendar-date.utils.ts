const CALENDAR_TIME_ZONE = "America/Sao_Paulo";

export function formatInstantForCalendar(date: Date) {
  const values = getTimeZoneParts(date);

  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}Z`;
};

export function calendarWallTimeToInstant(date: Date) {
  const wallTimeAsUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const zoneParts = getTimeZoneParts(new Date(wallTimeAsUtc));
  const zoneTimeAsUtc = Date.UTC(
    Number(zoneParts.year),
    Number(zoneParts.month) - 1,
    Number(zoneParts.day),
    Number(zoneParts.hour),
    Number(zoneParts.minute),
    Number(zoneParts.second),
  );
  const offset = zoneTimeAsUtc - wallTimeAsUtc;

  return new Date(wallTimeAsUtc - offset);
};

function getTimeZoneParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CALENDAR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
};
