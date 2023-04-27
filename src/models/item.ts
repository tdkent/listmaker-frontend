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
  dateCreated: Date;
  dateDue: Date;
  dateCompleted: Date;
  isChecked: boolean;
  age: {
    days: number;
  };
}

export enum ToDoCats {
  home = "Home",
  work = "Work",
  family = "Family",
  errand = "Errand",
  leisure = "Leisure",
}

export const todoItemCats = Object.values(ToDoCats);
