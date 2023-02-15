import { LoginInputsEnum, LoginDefStateInt } from "../models/login-user";

export const loginUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: LoginDefStateInt = {
    userNameOrEmail: req.get(LoginInputsEnum.user),
    userPassword: req.get(LoginInputsEnum.password),
  };
  if (!data.userNameOrEmail.match(/[@]/)) {
    return { email: "Please enter a valid email address." };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Please enter a password that is 4 or more characters long.",
    };
  }
  return null;
};
