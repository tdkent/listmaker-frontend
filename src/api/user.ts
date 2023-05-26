import axios from "axios";

import { API_URL } from "../constants/global";
import { UserProfileResInt } from "../models/user";

export const fetchUserProfile = async (token: string): Promise<UserProfileResInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get(`${API_URL}/user/profile`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const editNickname = async (userNickname: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/user/nickname`, { userNickname }, { headers })
    .catch((error) => Promise.reject(error));
};

export const editPassword = async (newPassword: string, currentPassword: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/user/password`, { newPassword, currentPassword }, { headers })
    .catch((error) => Promise.reject(error));
};
