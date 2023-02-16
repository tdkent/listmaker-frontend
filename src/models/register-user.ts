export interface RegisterDefStateInt {
  userEmail: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
}

export enum RegisterInputsEnum {
  email = "userEmail",
  username = "userName",
  password = "userPassword",
  verify = "verifyPassword",
}
