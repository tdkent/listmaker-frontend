export interface LoginUserStateInterface {
  userNameOrEmail: string;
  userPassword: string;
}

export enum LoginUserInputsEnum {
  user = "userNameOrEmail",
  password = "userPassword",
}
