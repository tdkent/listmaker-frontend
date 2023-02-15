export interface RegUserStateInterface {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

export enum RegUserInputsEnum {
  email = "userEmail",
  username = "userName",
  password = "userPassword",
  verify = "verifyPassword",
}
