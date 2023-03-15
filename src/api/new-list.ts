import axios from "axios";

import { TEST_DB } from "../constants/global";
import { NewListInt, ListInt } from "../models/lists";

export const createNewList = async (token: string, body: NewListInt): Promise<ListInt> => {
  console.log(token, body);
  // TODO: token will be sent to db
  await axios
    .post(`${TEST_DB}/lists`, body)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
  // TODO: db will return necessary info rather than requiring second fetch
  return axios
    .get(`${TEST_DB}/lists?slug=${body.slug}`)
    .then((response) => response.data[0])
    .catch((error) => Promise.reject(error));
};
