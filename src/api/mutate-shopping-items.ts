import axios from "axios";

import { API_URL } from "../constants/global";

export const newShoppingItem = async (listId: number, itemName: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post(`${API_URL}/shopping/${listId}`, { itemName }, { headers })
    .catch((error) => Promise.reject(error));
};

export const checkShoppingItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/shopping/check`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};

export const editShoppingItem = async (
  listId: number,
  itemId: number,
  itemName: string,
  itemCategory: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/shopping/edit`, { listId, itemId, itemName, itemCategory }, { headers })
    .catch((error) => Promise.reject(error));
};

export const removeShoppingItem = async (listId: number, itemId: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/shopping/remove`, { listId, itemId }, { headers })
    .catch((error) => Promise.reject(error));
};
