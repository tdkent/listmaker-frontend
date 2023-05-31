import axios, { AxiosError } from "axios";

import { API_URL } from "../constants/global";
import { RegisterBodyInt, LoginBodyInt, LoginResInt } from "../models/auth";

export const register = async (body: RegisterBodyInt) => {
  const { userEmail, userNickname, userPassword } = body;
  const headers = { "Access-Control-Allow-Origin": "*" };
  return await axios
    .post(
      `${API_URL}/auth/register`,
      {
        userEmail,
        userNickname,
        userPassword,
      },
      { headers }
    )
    .catch((error) => Promise.reject(error));
};

export const login = async (body: LoginBodyInt): Promise<LoginResInt> => {
  return axios
    .post(`${API_URL}/auth/login`, body)
    .then((response) => response.data)
    .catch((error: AxiosError) => Promise.reject(error));
};
