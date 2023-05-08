export interface TodoListItemInt {
  itemId: number;
  listId: number;
  userId: number;
  itemName: string;
  itemCategory: string;
  itemLocation: string;
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

export enum UnitOptEnum {
  d = "day",
  w = "week",
  m = "month",
  y = "year",
}

export const unitOpt = Object.values(UnitOptEnum);

// Subtasks

export interface SubtaskInt {
  taskId: number;
  itemId: number;
  taskName: string;
  isChecked: boolean;
}
