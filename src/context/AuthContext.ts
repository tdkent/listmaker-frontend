import { createContext } from "react";

export interface AuthContextInt {
  isLoggedIn: boolean;
  userId: number | null;
  token: string | null;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInt>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
