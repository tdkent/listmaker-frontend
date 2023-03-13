// auth response object
export interface UserInfoInt {
  id: number;
  userEmail: string;
  userName: string;
  userPassword: string;
}

// profile enum
export enum UserProfileEnum {
  email = "userEmail",
  username = "userName",
}
