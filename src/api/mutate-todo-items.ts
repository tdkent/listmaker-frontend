import axios from "axios";

import { API_URL } from "../constants/global";

export const newTodoItem = async (listId: number, name: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  console.log(listId, name, token);
  return axios
    .post(`${API_URL}/todo/${listId}`, { name }, { headers })
    .catch((error) => Promise.reject(error));
};

export const checkTodoItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/todo/check`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};

export const editShoppingItem = async (
  listId: number,
  itemId: number,
  name: string,
  category: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/shopping/edit`, { listId, itemId, name, category }, { headers })
    .catch((error) => Promise.reject(error));
};

export const removeShoppingItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/shopping/remove`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};
