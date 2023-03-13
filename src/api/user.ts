import axios from "axios";

import { TEST_DB } from "../constants/global";
import { UserInfoInt } from "../models/user";

// TODO: fetch will use token provided from auth instead of just userId
export const fetchUserProfile = async (userId: number, token: string): Promise<UserInfoInt> => {
  return axios
    .get(`${TEST_DB}/users/${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
