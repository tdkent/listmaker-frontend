import axios from "axios";

import { API_URL } from "../constants/global";
import { UserProfileResInt, EditProfileReqInt } from "../models/user";
import ResMsgInt from "../models/http";

export const fetchUserProfile = async (token: string): Promise<UserProfileResInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get(`${API_URL}/user/profile`, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const editUserProfile = async (
  state: EditProfileReqInt,
  token: string
): Promise<ResMsgInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/user/profile`, state, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const editNickname = async (userNickname: string, token: string): Promise<ResMsgInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/user/nickname`, { userNickname }, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const editPassword = async (
  newPassword: string,
  currentPassword: string,
  token: string
): Promise<ResMsgInt> => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .patch(`${API_URL}/user/password`, { newPassword, currentPassword }, { headers })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
