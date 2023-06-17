import { DateTime } from "luxon";

export const createRelativeDate = (date: string): string => {
  const relativeDate = DateTime.fromISO(date).toRelativeCalendar()!;
  return relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1);
};

export const createLocalDate = (date: string): string | null => {
  if (date) return DateTime.fromISO(date).toLocaleString();
  return null;
};

export const createTimeDue = (time: string): string | null => {
  if (time) return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
  return null;
};

export const checkDue = (date: string, time: string | null) => {
  if (time) {
    if (DateTime.now().toISODate()! > DateTime.fromISO(date).toISODate()!) return true;
    return (
      DateTime.now().toISODate()! === DateTime.fromISO(date).toISODate()! &&
      DateTime.now().toISOTime()! > DateTime.fromISO(time).toISOTime()!
    );
  }
  return DateTime.now().toISODate()! > DateTime.fromISO(date).toISODate()!;
};
