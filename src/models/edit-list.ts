import { ShoppingListInt } from "./lists";

export interface EditListInitialStateInt {
  loading: boolean;
  error: string;
  list: ShoppingListInt;
}

export enum EditListActionTypesEnum {
  fetchSuccess = "FETCH_SUCCESS",
  fetchError = "FETCH_ERROR",
  notFoundError = "NOT_FOUND_ERROR",
  editListName = "EDIT_LIST_NAME",
}

export interface EditListReducerActionInt {
  type: EditListActionTypesEnum;
  error?: string;
  payload?: ShoppingListInt;
}

export const initialState: EditListInitialStateInt = {
  loading: true,
  error: "",
  list: {} as ShoppingListInt,
};
