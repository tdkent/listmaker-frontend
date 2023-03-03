import { LoginInputsEnum, LoginBodyInt, AuthResponseInt } from "../models/auth";
import { AuthActionInt } from "../models/auth";
import { login } from "../api/auth";

export const loginUserAction = async ({ request }: any): Promise<AuthActionInt> => {
  const req = await request.formData();
  const data: LoginBodyInt = {
    userNameOrEmail: req.get(LoginInputsEnum.user),
    userPassword: req.get(LoginInputsEnum.password),
  };
  if (!data.userNameOrEmail.length) {
    return {
      isError: true,
      error: {
        type: LoginInputsEnum.user,
        message: "Please enter your username or email.",
      },
      data: {} as AuthResponseInt,
    };
  }
  if (data.userPassword.length < 4) {
    return {
      isError: true,
      error: {
        type: LoginInputsEnum.password,
        message: "Your password should be at least 4 characters long!",
      },
      data: {} as AuthResponseInt,
    };
  }
  const response = await login(data);
  return { isError: false, error: { type: "", message: "" }, data: response };
};
