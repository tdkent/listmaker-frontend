import { DateTime } from "luxon";

export const createRelativeDate = (date: string): string => {
  const relativeDate = DateTime.fromISO(date).toRelativeCalendar()!;
  return relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1);
};

export const checkDueDate = (date: string): boolean => {
  return DateTime.fromISO(date) > DateTime.now();
};

export const createCompletedDate = (date: string): string | null => {
  if (date) return DateTime.fromISO(date).toLocaleString();
  return null;
};
