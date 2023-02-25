import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { ShoppingListInt, ShoppingListItemInt } from "../models/lists";

export const editListName = async (listId: number, list: ShoppingListInt, listName: string) => {
  const body = { ...list, name: listName };
  await axios.put(`${TEST_DB}/lists/${listId}`, body).catch((error: Error | AxiosError) => {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error("An unknown error occurred. Please try again later.");
  });
};

export const addItemToList = async (listId: number, list: ShoppingListInt, itemName: string) => {
  const newItem: ShoppingListItemInt = {
    id: list.items.length * Math.ceil(Math.random() * 100),
    name: itemName,
    isDone: false,
  };
  const body = { ...list, items: [...list.items, newItem] };
  await axios.put(`${TEST_DB}/lists/${listId}`, body).catch((error: Error | AxiosError) => {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error("An unknown error occurred. Please try again later.");
  });
};
