import axios from "axios";

import { TEST_DB } from "../constants/global";
import { ListInt } from "../models/lists";

export const fetchAllLists = async (userId: number, token: string): Promise<ListInt[]> => {
  return axios
    .get(`${TEST_DB}/lists?userId=${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

// TODO: update this fetch call
export async function fetchList(listId: number): Promise<ListInt> {
  return await axios
    .get(`${TEST_DB}/lists/${listId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
