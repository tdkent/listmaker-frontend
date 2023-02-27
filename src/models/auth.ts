export enum RegisterInputsEnum {
  email = "userEmail",
  username = "userName",
  password = "userPassword",
  verify = "verifyPassword",
}

export enum LoginInputsEnum {
  user = "userNameOrEmail",
  password = "userPassword",
}

export interface AuthReducerActionInt {
  type: string;
  payload: string;
}

export interface RegisterBodyInt {
  userEmail: string;
  userName: string;
  userPassword: string;
}

export interface LoginBodyInt {
  userNameOrEmail: string;
  userPassword: string;
}
