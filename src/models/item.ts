// Shopping List
export interface ShoppingListItemInt {
  itemId: number;
  listId: number;
  userId: number;
  itemName: string;
  permCategory: string;
  tempCategory: string;
  isChecked: boolean;
}

export enum EditItemFormInputsEnum {
  name = "item-name",
  cat = "item-category",
  date = "item-date",
  time = "item-time",
  loc = "item-location",
  check = "check-item",
}

export enum CheckedItemEnum {
  check = "_checked",
}

// To-Do List

export interface TodoListItemInt {
  itemId: number;
  listId: number;
  userId: number;
  itemName: string;
  itemCategory: string;
  dateCreated: string;
  dateDue: string;
  dateCompleted: string;
  isChecked: boolean;
  age: {
    days: number;
  };
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
