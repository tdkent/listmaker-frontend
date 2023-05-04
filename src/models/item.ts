// Shopping List
export interface ShoppingListItemInt {
  itemId: number;
  listId: number;
  userId: number;
  itemName: string;
  refCategory: string;
  dispCategory: string;
  isChecked: boolean;
}

export enum EditItemFormInputsEnum {
  name = "item-name",
  cat = "item-category",
  date = "item-date",
  time = "item-time",
  loc = "item-location",
  check = "check-item",
  task = "item-subtask",
  editTask = "edit-subtask",
}

export enum CheckedItemEnum {
  check = "_checked",
}

// To-Do List

export interface SubtaskInt {
  taskId: number;
  itemId: number;
  taskName: string;
  isChecked: boolean;
}

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
  itemTasks: SubtaskInt[];
}

export enum ToDoCats {
  home = "Home",
  work = "Work",
  appoint = "Appointment",
  errand = "Errand",
}

export const todoItemCats = Object.values(ToDoCats);

// Edit Item

export interface EditItemReqInt {
  itemId: number;
  listId: number;
  name: string;
  cat: string;
}
