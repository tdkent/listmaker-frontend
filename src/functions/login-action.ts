import { LoginInputsEnum, LoginBodyInt } from "../models/auth";
import { AuthFormErrorInt } from "../models/errors";

export const loginUserAction = async ({ request }: any): Promise<AuthFormErrorInt> => {
  const req = await request.formData();
  const data: LoginBodyInt = {
    userNameOrEmail: req.get(LoginInputsEnum.user),
    userPassword: req.get(LoginInputsEnum.password),
  };
  if (!data.userNameOrEmail.length) {
    return {
      isError: true,
      errorType: LoginInputsEnum.user,
      errorMessage: "Please enter your username or email.",
    };
  }
  if (data.userPassword.length < 4) {
    return {
      isError: true,
      errorType: LoginInputsEnum.password,
      errorMessage: "Your password should be at least 4 characters long!",
    };
  }
  return { isError: false, errorType: "", errorMessage: "" };
};
