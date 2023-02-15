export interface LoginDefStateInt {
  userNameOrEmail: string;
  userPassword: string;
}

export enum LoginInputsEnum {
  user = "userNameOrEmail",
  password = "userPassword",
}
