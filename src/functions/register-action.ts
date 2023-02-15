import {
  RegUserStateInterface,
  RegUserInputsEnum,
} from "../models/register-user";

export const registerUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: RegUserStateInterface = {
    userEmail: req.get(RegUserInputsEnum.email),
    userName: req.get(RegUserInputsEnum.username),
    userPassword: req.get(RegUserInputsEnum.password),
    verifyPassword: req.get(RegUserInputsEnum.verify),
  };
  if (!data.userEmail.match(/[@]/)) {
    return { email: "Please enter a valid email address." };
  }
  if (!data.userName || data.userName.length < 4) {
    return {
      username: "Please enter a username that is 4 or more characters long.",
    };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Please enter a password that is 4 or more characters long.",
    };
  }
  if (data.userPassword !== data.verifyPassword) {
    return { password: "Passwords do not match. Please try again." };
  }
  return null;
};
