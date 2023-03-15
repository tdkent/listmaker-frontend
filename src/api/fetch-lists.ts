import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { ListInt } from "../models/lists";
import handleCatch from "../utils/error-handling";

export const fetchAllLists = async (userId: number, token: string): Promise<ListInt[]> => {
  return axios
    .get(`${TEST_DB}/lists?userId=${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

// TODO: update this fetch call
export async function fetchList(listId: number): Promise<ListInt> {
  const response = await axios
    .get(`${TEST_DB}/lists/${listId}`)
    .then((response) => {
      if (!response.data) throw new Error("Could not find any data for that list.");
      return response.data;
    })
    .catch((error: AxiosError) => handleCatch(error));
  return response;
}
