import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { ShoppingListInt } from "../models/lists";

export const editListName = async (listId: number, body: ShoppingListInt) => {
  await axios.put(`${TEST_DB}/lists/${listId}`, body).catch((error: Error | AxiosError) => {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error("An unknown error occurred. Please try again later.");
  });
};
