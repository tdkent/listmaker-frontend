import axios from "axios";

import { API_URL } from "../constants/global";
import { NewListReqInt } from "../models/lists";

export const createNewList = async (body: NewListReqInt, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await axios
    .post(`${API_URL}/list/new`, body, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
