// Create New List
export enum NewListTypeEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export enum NewListFormEnum {
  name = "name",
  type = "type",
}

export const newListTypes = [NewListTypeEnum.shop, NewListTypeEnum.todo];

export interface NewListReqInt {
  name: string;
  type: string;
}

export interface NewListResInt {
  list: { id: number; slug: string };
}

// Created List with Database Id
export interface ListInt extends NewListReqInt {
  id: number;
}

// Fetch All Lists

export interface AllListsInt {
  lists: {
    id: number;
    name: string;
    slug: string;
    userId: number;
    type: NewListTypeEnum.shop | NewListTypeEnum.todo;
  }[];
}

// Fetch Single List

export interface SingleListInt {
  id: number;
  name: string;
  slug: string;
  userId: number;
  type: NewListTypeEnum.shop | NewListTypeEnum.todo;
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
export interface EditListReqInt {
  id: number;
  name: string;
}
export interface EditListPropsInt {
  token: string;
  // TODO: needs to handle any list type
  list: SingleListInt;
}

export enum EditListInputsEnum {
  editName = "edit-list-name",
  newItem = "add-new-item",
  editItem = "edit-item",
  checkItem = "check-item",
}
