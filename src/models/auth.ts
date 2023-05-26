// Register
export interface RegisterBodyInt {
  userEmail: string;
  userNickname: string;
  userPassword: string;
  verifyPassword: string;
}

// Login
export interface LoginBodyInt {
  userEmail: string;
  userPassword: string;
}

export interface LoginResInt {
  userId: number;
  userEmail: string;
  userNickname: string;
  token: string;
}
