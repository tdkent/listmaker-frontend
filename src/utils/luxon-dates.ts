import { DateTime } from "luxon";

export const createRelativeDate = (date: string): string => {
  const relativeDate = DateTime.fromISO(date).toRelativeCalendar()!;
  return relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1);
};

export const checkDueDate = (date: string): boolean => {
  return DateTime.fromISO(date).toISODate()! < DateTime.now().toISODate()!;
};

export const createLocalDate = (date: string): string | null => {
  if (date) return DateTime.fromISO(date).toLocaleString();
  return null;
};

export const createTimeDue = (time: string): string | null => {
  if (time) return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
  return null;
};
