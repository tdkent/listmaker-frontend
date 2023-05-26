import { createContext } from "react";

export interface AuthContextInt {
  isLoggedIn: boolean;
  userId: number | null;
  userNickname: string;
  token: string | null;
  login: (token: string, userId: number, userNickname: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInt>({
  isLoggedIn: false,
  userId: null,
  userNickname: "",
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
