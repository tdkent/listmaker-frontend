import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import AuthContext, { AuthContextInt } from "./context/AuthContext";
import ModalContext, { ModalContextInt } from "./context/ModalContext";
import router from "./router/router";
import { StorageDataInt } from "./utils/check-local-storage";

function App() {
  // modal context
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [contentId, setContentId] = useState<ModalContextInt["contentId"]>("");
  const toggleModal = (value: boolean) => setModalActive(value);
  const provideId = (value: ModalContextInt["contentId"]) => setContentId(value);
  const modal: ModalContextInt = {
    active: modalActive,
    toggleModal,
    contentId,
    provideId,
  };

  // auth context
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const login = (token: string, userId: number) => {
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
  const user: AuthContextInt = {
    isLoggedIn,
    userId,
    token,
    login,
    logout,
  };

  // login on refresh
  useEffect(() => {
    const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = Number(storageData.userId);
    if (storageData && storageData.userId && storageData.token) {
      login(storageData.token, userId);
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
