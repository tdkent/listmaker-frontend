import axios from "axios";

import { API_URL } from "../constants/global";

export const newTodoSubtask = async (
  itemId: number,
  listId: number,
  taskName: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post(`${API_URL}/todo/${listId}/subtask`, { itemId, taskName }, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
