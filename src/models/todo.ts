export interface TodoListItemInt {
  itemId: number;
  listId: number;
  userId: number;
  itemName: string;
  itemCategory: string;
  itemLocation: string;
  itemCoords: google.maps.LatLngLiteral | null;
  dateCreated: string;
  dateDue: string;
  timeDue: string;
  dateCompleted: string;
  isChecked: boolean;
  isRecurring: boolean;
  recurVal: string;
  dateRecurring: string;
  itemTasks: SubtaskInt[];
}

export enum ToDoCats {
  home = "Home",
  work = "Work",
  appoint = "Appointment",
  errand = "Errand",
}

export const todoItemCats = Object.values(ToDoCats);

// Repeat

export const recurIntegerOpt = (n: number) => {
  let arr: number[] = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
};

export enum RecurIntervalSEnum {
  d = "day",
  w = "week",
  m = "month",
  y = "year",
}

export enum RecurIntervalPEnum {
  d = "days",
  w = "weeks",
  m = "months",
  y = "years",
}

export const recurIntervalOptS = Object.values(RecurIntervalSEnum);

export const recurIntervalOptP = Object.values(RecurIntervalPEnum);

// Subtasks

export interface SubtaskInt {
  taskId: number;
  itemId: number;
  taskName: string;
  isChecked: boolean;
}
