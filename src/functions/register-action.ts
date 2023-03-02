import { RegisterInputsEnum, RegisterBodyInt } from "../models/auth";
import { AuthFormErrorInt } from "../models/errors";

export const registerUserAction = async ({ request }: any): Promise<AuthFormErrorInt> => {
  const req = await request.formData();
  const data: RegisterBodyInt = {
    userEmail: req.get(RegisterInputsEnum.email),
    userName: req.get(RegisterInputsEnum.username),
    userPassword: req.get(RegisterInputsEnum.password),
    verifyPassword: req.get(RegisterInputsEnum.verify),
  };
  if (!data.userEmail.match(/[@]/)) {
    return {
      isError: true,
      errorType: RegisterInputsEnum.email,
      errorMessage: "Please enter a valid email address.",
    };
  }
  if (!data.userName || data.userName.length < 4) {
    return {
      isError: true,
      errorType: RegisterInputsEnum.username,
      errorMessage: "Please enter a username that is 4 or more characters long.",
    };
  }
  if (data.userPassword.length < 4) {
    return {
      isError: true,
      errorType: RegisterInputsEnum.password,
      errorMessage: "Please enter a password that is 4 or more characters long.",
    };
  }
  if (data.userPassword !== data.verifyPassword) {
    return {
      isError: true,
      errorType: RegisterInputsEnum.password,
      errorMessage: "Passwords do not match. Please try again.",
    };
  }
  return {
    isError: false,
    errorType: "",
    errorMessage: "",
  };
};
