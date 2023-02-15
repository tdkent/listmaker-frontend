import { createContext } from "react";

export interface AuthContexType {
  isLoggedIn: boolean;
  userId: number | null;
  token: string | null;
  login: (a: string, b: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContexType>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
