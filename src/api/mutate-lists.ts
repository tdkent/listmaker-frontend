import axios from "axios";

import { TEST_DB } from "../constants/global";
import { ShoppingListInt } from "../models/lists";

// TODO: update fetch calls to require valid tokens in headers

export const editListName = async (token: string, body: ShoppingListInt) => {
  return axios.put(`${TEST_DB}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const deleteList = async (token: string, listId: number) => {
  return axios.delete(`${TEST_DB}/lists/${listId}`).catch((error) => Promise.reject(error));
};

export const addItemToList = async (token: string, body: ShoppingListInt) => {
  return axios.put(`${TEST_DB}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const editItem = async (token: string, body: ShoppingListInt) => {
  return axios.put(`${TEST_DB}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const selectCheckbox = async (token: string, body: ShoppingListInt) => {
  await axios.put(`${TEST_DB}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const deleteItem = async (list: ShoppingListInt, itemId: number) => {
  const updateItems = list.items.filter((item) => item.id !== itemId).sort((a, b) => a.id - b.id);
  const body = { ...list, items: [...updateItems] };
  await axios.put(`${TEST_DB}/lists/${list.id}`, body).catch((error) => Promise.reject(error));
};
