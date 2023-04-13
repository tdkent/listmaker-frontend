import axios from "axios";

import { API_URL } from "../constants/global";
import { ShoppingListInt } from "../models/lists";

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

export const newItem = async (id: number, name: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post(`${API_URL}/item/new/${id}`, { name }, { headers })
    .catch((error) => Promise.reject(error));
};

export const editItem = async (
  listId: number,
  itemId: number,
  name: string,
  listType: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/item/${listId}/${itemId}/${listType}`, { name }, { headers })
    .catch((error) => Promise.reject(error));
};

export const checkItem = async (
  listId: number,
  listType: string,
  itemId: number,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/item/${listId}/${itemId}/check`, { listType }, { headers })
    .catch((error) => Promise.reject(error));
};

export const deleteItem = async (
  listId: number,
  listType: string,
  itemId: number,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .delete(`${API_URL}/item/${listId}/${listType}/${itemId}`, { headers })
    .catch((error) => Promise.reject(error));
};
