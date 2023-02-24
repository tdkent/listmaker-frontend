import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { ShoppingListInt } from "../models/lists";

export async function fetchList(listId: number): Promise<ShoppingListInt> {
  const response = await axios
    .get(`${TEST_DB}/lists/${listId}`)
    .then((response) => {
      if (!response.data) throw new Error("Could not find any data for that list.");
      return response.data;
    })
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) throw new Error(error.message);
      else throw new Error("An unknown error occurred. Please try again later.");
    });
  return response;
}
