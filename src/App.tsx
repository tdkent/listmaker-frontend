import { RouterProvider } from "react-router-dom";
import { useState } from "react";

import AuthContext, { AuthContexType } from "./context/AuthContext";
import { routerAuth, routerNoAuth } from "./router/router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const login = (token: string, userId: number) => {
    setToken(token);
    setUserId(userId);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
  };
  const user: AuthContexType = {
    isLoggedIn,
    userId,
    token,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={user}>
      <RouterProvider router={user.isLoggedIn ? routerAuth : routerNoAuth} />
    </AuthContext.Provider>
  );
}

export default App;
