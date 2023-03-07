import axios from "axios";

import { TEST_DB } from "../constants/global";
import { UserInfoInt } from "../models/user";

export const fetchUserProfile = async (userId: number, token: string): Promise<UserInfoInt> => {
  return axios
    .get(`${TEST_DB}/users/${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
