import axios from "axios";
import { getGeocode, getLatLng } from "use-places-autocomplete";

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
  itemLocation: string | null,
  itemDate: string,
  itemTime: string | null,
  isRecurring: boolean,
  recurInteger: string,
  recurInterval: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(
      `${API_URL}/todo/edit`,
      {
        listId,
        itemId,
        itemName,
        itemCategory,
        itemLocation,
        itemDate,
        itemTime,
        isRecurring,
        recurInteger,
        recurInterval,
      },
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
