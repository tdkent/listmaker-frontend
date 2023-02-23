import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthContext, { AuthContextType } from "./context/AuthContext";
import ModalContext, { ModalContextInt } from "./context/ModalContext";
import router from "./router/router";
import { StorageDataInt } from "./functions/check-local-storage";

function App() {
  const [pending, setPending] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const toggleModal = (value: boolean) => setModalActive(value);
  const togglePending = (value: boolean) => setPending(value);
  const modal: ModalContextInt = {
    active: modalActive,
    pending,
    toggleModal,
    togglePending,
  };
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const login = (token: string, userId: string) => {
    setToken(token);
    setUserId(userId);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify({ userId, token }));
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
  };
  const user: AuthContextType = {
    isLoggedIn,
    userId,
    token,
    login,
    logout,
  };

  useEffect(() => {
    const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
    if (storageData && storageData.userId && storageData.token) {
      login(storageData.token, storageData.userId);
    }
  }, []);

  return (
    <ModalContext.Provider value={modal}>
      <AuthContext.Provider value={user}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
