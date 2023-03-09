import axios, { AxiosError } from "axios";

import { TEST_DB } from "../constants/global";
import { RegisterBodyInt, LoginBodyInt } from "../models/auth";
import { UserInfoInt } from "../models/user";

export const register = async (body: RegisterBodyInt): Promise<UserInfoInt> => {
  const { userEmail, userName, userPassword } = body;
  const postBody = { userEmail, userName, userPassword };

  await axios.post(`${TEST_DB}/users`, postBody).catch((error) => Promise.reject(error));
  //! Backend will return a response with user data on success
  return axios
    .get(`${TEST_DB}/users?userName=${body.userName}`)
    .then((response) => response.data[0])
    .catch((error) => Promise.reject(error));
};

export const login = async (body: LoginBodyInt): Promise<UserInfoInt> => {
  //! userPassword can be used once backend is created
  const { userNameOrEmail } = body;
  return (
    axios
      //! Update this test for accepting either username or email once backend is ready
      .get(
        `${TEST_DB}/users?${
          userNameOrEmail.match(/[@]/) ? "userEmail" : "userName"
        }=${userNameOrEmail}`
      )
      .then((response) => response.data[0])
      .catch((error: AxiosError) => Promise.reject(error))
  );
};
