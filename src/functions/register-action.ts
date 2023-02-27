import { RegisterInputsEnum } from "../models/auth";

interface FormDataInt {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

export const registerUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: FormDataInt = {
    userEmail: req.get(RegisterInputsEnum.email),
    userName: req.get(RegisterInputsEnum.username),
    userPassword: req.get(RegisterInputsEnum.password),
    verifyPassword: req.get(RegisterInputsEnum.verify),
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
