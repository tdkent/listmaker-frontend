// auth response object
export interface UserInfoInt {
  id: number;
  userEmail: string;
  userName: string;
  userPassword: string;
}

export interface UserProfileResInt {
  user: {
    id: number;
    userEmail: string;
    userNickname: string;
  };
}

// profile enum
export enum UserProfileEnum {
  email = "userEmail",
  username = "userName",
}
