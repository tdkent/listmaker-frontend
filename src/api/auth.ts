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

  // stop execution and return error from post request
  //! This step can be removed when working with real backend
  const postResponse: { status: number; statusText: string } = await axios
    .post(`${TEST_DB}/users`, postBody)
    .catch((error: AxiosError) => handleCatch(error));
  if (postResponse.status >= 300 || postResponse.status < 200) {
    return {
      status: postResponse.status,
      statusText: postResponse.statusText,
      data: {} as UserInfoInt,
    };
  }
  // Database returns user info
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
      console.log("error: ", error);
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
