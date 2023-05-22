import { TodoListItemInt } from "./todo";
import { ShoppingListItemInt } from "./shopping";

// Create New List
export enum AllListTypesEnum {
  shop = "Shopping",
  todo = "To-Do",
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

// Edit List
export interface EditListReqInt {
  id: number;
  name: string;
}
