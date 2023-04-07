import axios from "axios";

import { API_URL } from "../constants/global";
import { ListInt } from "../models/lists";

export const fetchAllLists = async (token: string): Promise<ListInt[]> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get(`${API_URL}/list/fetch`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

// TODO: update this fetch call
export async function fetchList(listId: number): Promise<ListInt> {
  return await axios
    .get(`${API_URL}/lists/${listId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
