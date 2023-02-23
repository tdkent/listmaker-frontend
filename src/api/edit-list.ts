import axios from "axios";

import { TEST_DB } from "../constants/global";
import { ShoppingListInt } from "../models/lists";
import { EditListReducerActionInt } from "../models/edit-list";

export const editListName = async (listId: number, body: ShoppingListInt) => {
  let payload = { list: {} as ShoppingListInt, error: "" };
  await axios.put(`${TEST_DB}/lists/${listId}`, body).catch((err) => {
    payload = { ...payload, error: err.message };
  });
  await axios
    .get(`${TEST_DB}/lists/${listId}`)
    .then((res) => {
      const response: ShoppingListInt = res.data;
      payload = { ...payload, list: response };
    })
    .catch((err) => {
      payload = { ...payload, error: err.message };
    });
  return payload;
};
