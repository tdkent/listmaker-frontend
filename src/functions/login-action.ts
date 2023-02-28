import { LoginInputsEnum, LoginBodyInt } from "../models/auth";

export const loginUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: LoginBodyInt = {
    userNameOrEmail: req.get(LoginInputsEnum.user),
    userPassword: req.get(LoginInputsEnum.password),
  };
  if (!data.userNameOrEmail.length) {
    return { email: "Please enter your username or email." };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Your password should be at least 4 characters long!",
    };
  }
  return null;
};
