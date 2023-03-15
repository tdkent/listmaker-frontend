// Create New List
export enum NewListTypeEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export enum NewListInputsEnum {
  name = "name",
  type = "type",
}

export const newListTypes = [NewListTypeEnum.shop, NewListTypeEnum.todo];

export interface NewListInt {
  userId: number;
  name: string;
  slug: string;
  type: string;
  items: ShoppingListItemInt[] | [];
}

// Created List with Database Id
export interface ListInt extends NewListInt {
  id: number;
}

// List Items
// Shopping List
export interface ShoppingListItemInt {
  id: number;
  name: string;
  isDone: boolean;
}

export interface ShoppingListInt extends ListInt {
  items: ShoppingListItemInt[];
}

// Edit List
export enum EditListInputsEnum {
  editName = "edit-list-name",
}
