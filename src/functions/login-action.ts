import {
  LoginUserInputsEnum,
  LoginUserStateInterface,
} from "../models/login-user";

export const loginUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: LoginUserStateInterface = {
    userNameOrEmail: req.get(LoginUserInputsEnum.user),
    userPassword: req.get(LoginUserInputsEnum.password),
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
