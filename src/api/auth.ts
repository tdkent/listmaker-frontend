import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { RegisterBodyInt, LoginBodyInt, AuthResponseInt } from "../models/auth";
import { UserInfoInt } from "../models/user";
import handleCatch from "../utils/error-handling";

// const emptyResBody: UserInfoInt = {
//   id: 0,
//   userEmail: "",
//   userName: "",
//   userPassword: "",
// };

export const register = async (body: RegisterBodyInt): Promise<AuthResponseInt> => {
  const { userEmail, userName, userPassword } = body;
  const postBody = { userEmail, userName, userPassword };
  await axios.post(`${TEST_DB}/users`, postBody).catch((error: AxiosError) => handleCatch(error));
  const response = await axios
    .get(`${TEST_DB}/users?userName=${body.userName}`)
    .then((response) => {
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data[0] as UserInfoInt,
      };
    })
    .catch((error: AxiosError) => {
      return handleCatch(error);
    });
  return response;
};

export const login = async (body: LoginBodyInt): Promise<AuthResponseInt> => {
  const { userNameOrEmail, userPassword } = body;
  const response = await axios
    .get(
      `${TEST_DB}/users?${
        userNameOrEmail.match(/[@]/) ? "userEmail" : "userName"
      }=${userNameOrEmail}`
    )
    .then((response) => {
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data[0] as UserInfoInt,
      };
    })
    .catch((error: AxiosError) => {
      return handleCatch(error);
    });
  return response;
};
