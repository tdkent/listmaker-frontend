// Register
export enum RegisterInputsEnum {
  email = "userEmail",
  username = "userName",
  password = "userPassword",
  verify = "verifyPassword",
}

export interface RegisterBodyInt {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

// Login
export enum LoginInputsEnum {
  user = "userNameOrEmail",
  password = "userPassword",
}

export interface LoginBodyInt {
  userNameOrEmail: string;
  userPassword: string;
}
