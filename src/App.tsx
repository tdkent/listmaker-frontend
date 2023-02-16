import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthContext, { AuthContexType } from "./context/AuthContext";
import { routerAuth, routerNoAuth } from "./router/router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const login = (token: string, userId: string) => {
    setToken(token);
    setUserId(userId);
    setIsLoggedIn(true);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
      })
    );
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
  };
  const user: AuthContexType = {
    isLoggedIn,
    userId,
    token,
    login,
    logout,
  };

  useEffect(() => {
    const storageData: {
      userId: string;
      token: string;
    } = JSON.parse(localStorage.getItem("userData") || "{}");
    if (storageData && storageData.userId && storageData.token) {
      login(storageData.token, storageData.userId);
    }
  }, []);
  return (
    <AuthContext.Provider value={user}>
      <RouterProvider router={user.isLoggedIn ? routerAuth : routerNoAuth} />
    </AuthContext.Provider>
  );
}

export default App;
