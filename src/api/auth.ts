import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { RegisterBodyInt, LoginBodyInt } from "../models/auth";
import { UserInfoInt } from "../models/user";

export const register = async (body: RegisterBodyInt): Promise<UserInfoInt> => {
  await axios.post(`${TEST_DB}/users`, body).catch((error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else throw new Error("An unknown error occurred. Please try again.");
  });
  const response = await axios
    .get(`${TEST_DB}/users?userName=${body.userName}`)
    .then((response) => response.data)
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else throw new Error("An unknown error occurred. Please try again.");
    });
  return response[0];
};

export const login = async (body: LoginBodyInt) => {
  console.log("body: ", body);
};
