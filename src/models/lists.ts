import { ShoppingListItemInt, TodoListItemInt } from "./item";

// Create New List
export enum AllListTypesEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export enum NewListFormEnum {
  name = "name",
  type = "type",
}

export const newListTypes = [AllListTypesEnum.shop, AllListTypesEnum.todo];

export interface NewListReqInt {
  listName: string;
  listType: string;
}

export interface NewListResInt {
  listId: number;
  listSlug: string;
}

// Created List with Database Id
export interface ListInt extends NewListReqInt {
  id: number;
}

// Fetch All Lists

export interface FetchAllListsInt {
  listId: number;
  listName: string;
  listSlug: string;
  userId: number;
  listType: AllListTypesEnum.shop | AllListTypesEnum.todo;
}

// Fetch Single List

// Note: items will include other item types objects (all packaged in an array)
export interface FetchSingleListInt extends FetchAllListsInt {
  items: ShoppingListItemInt[] | TodoListItemInt[];
}

// List Items
// Shopping List

export interface ShoppingListInt extends ListInt {
  items: any[];
}

// Edit List
export interface EditListReqInt {
  id: number;
  name: string;
}

export enum EditListInputsEnum {
  editName = "edit-list-name",
  newItem = "add-new-item",
  editItem = "edit-item",
  checkItem = "check-item",
}
