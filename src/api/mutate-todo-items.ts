import axios from "axios";

import { API_URL } from "../constants/global";

export const newTodoItem = async (listId: number, itemName: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post(`${API_URL}/todo/${listId}`, { itemName }, { headers })
    .catch((error) => Promise.reject(error));
};

export const checkTodoItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/todo/check`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};

export const editTodoItem = async (
  listId: number,
  itemId: number,
  itemName: string,
  itemCategory: string,
  itemLocation: string,
  itemDate: string,
  itemTime: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(
      `${API_URL}/todo/edit`,
      { listId, itemId, itemName, itemCategory, itemLocation, itemDate, itemTime },
      { headers }
    )
    .catch((error) => Promise.reject(error));
};

export const removeTodoItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/todo/remove`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};
