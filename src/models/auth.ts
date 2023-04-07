// Register
export enum RegisterInputsEnum {
  email = "userEmail",
  nickname = "userNickname",
  password = "userPassword",
  verify = "verifyPassword",
}

export interface RegisterBodyInt {
  userEmail: string;
  userNickname: string;
  userPassword: string;
  verifyPassword: string;
}

// Login
export enum LoginInputsEnum {
  email = "userEmail",
  password = "userPassword",
}

export interface LoginBodyInt {
  userEmail: string;
  userPassword: string;
}

export interface LoginResInt {
  message: string;
  userData: {
    userId: number;
    userEmail: string;
    token: string;
  };
}
