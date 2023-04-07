import axios from "axios";

import { API_URL } from "../constants/global";
import { UserInfoInt, UserProfileResInt } from "../models/user";

// TODO: fetch will use token provided from auth instead of just userId
export const fetchUserProfile = async (token: string): Promise<UserProfileResInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get(`${API_URL}/user/profile`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const editUserProfile = async (state: UserInfoInt, token: string): Promise<UserInfoInt> => {
  axios.put(`${API_URL}/users/${state.id}`, state).catch((error) => console.log(error));
  return axios
    .get(`${API_URL}/users/${state.id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
