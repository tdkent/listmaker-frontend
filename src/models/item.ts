// Shopping List
export interface ShoppingListItemInt {
  id: number;
  listId: number;
  userId: number;
  name: string;
  perm_category: string;
  temp_category: string;
  isChecked: boolean;
}

export enum EditItemFormInputsEnum {
  name = "item-name",
  cat = "item-category",
  check = "check-item",
}

export enum CheckedItemEnum {
  check = "__checked",
}

// To-Do List

export interface TodoListItemInt {
  id: number;
  listId: number;
  userId: number;
  name: string;
  category: string;
  dueDate: Date;
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
