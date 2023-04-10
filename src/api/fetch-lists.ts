import axios from "axios";

import { API_URL } from "../constants/global";
import { ListInt, AllListsInt, SingleListInt } from "../models/lists";

export const fetchAllLists = async (token: string): Promise<SingleListInt[]> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get(`${API_URL}/list/fetch`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

// TODO: update this fetch call
export async function fetchList(listId: number, token: string): Promise<SingleListInt> {
  const headers = { Authorization: `Bearer ${token}` };
  return await axios
    .get(`${API_URL}/list/fetch/${listId}`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
