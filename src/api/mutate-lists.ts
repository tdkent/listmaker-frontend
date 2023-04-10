import axios from "axios";

import { API_URL } from "../constants/global";
import { ShoppingListInt, SingleListInt, EditListReqInt } from "../models/lists";

// TODO: update fetch calls to require valid tokens in headers

export const editList = async (id: number, name: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/list/edit/${id}`, { name }, { headers })
    .catch((error) => Promise.reject(error));
};

export const deleteList = async (id: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .delete(`${API_URL}/list/delete/${id}`, { headers })
    .catch((error) => Promise.reject(error));
};

export const addItemToList = async (token: string, body: ShoppingListInt) => {
  return axios.put(`${API_URL}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const editItem = async (token: string, body: ShoppingListInt) => {
  return axios.put(`${API_URL}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const selectCheckbox = async (token: string, body: ShoppingListInt) => {
  await axios.put(`${API_URL}/lists/${body.id}`, body).catch((error) => Promise.reject(error));
};

export const deleteItem = async (list: ShoppingListInt, itemId: number) => {
  const updateItems = list.items.filter((item) => item.id !== itemId).sort((a, b) => a.id - b.id);
  const body = { ...list, items: [...updateItems] };
  await axios.put(`${API_URL}/lists/${list.id}`, body).catch((error) => Promise.reject(error));
};
