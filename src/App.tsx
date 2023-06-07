import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import AuthContext, { AuthContextInt } from "./context/AuthContext";
import ModalContext, { ModalContextInt } from "./context/ModalContext";
import ErrorContext, { ErrorContextInt } from "./context/ErrorContext";
import router from "./router/router";
import { StorageDataInt } from "./utils/check-local-storage";

function App() {
  // error context
  const [errorActive, setErrorActive] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<AxiosError | null>(null);
  const toggleError = (value: boolean) => setErrorActive(value);
  const provideData = (value: AxiosError | null) => setErrorData(value);
  const error: ErrorContextInt = {
    active: errorActive,
    data: errorData,
    toggleError,
    provideData,
  };

  // modal context
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [contentId, setContentId] = useState<ModalContextInt["contentId"]>("");
  const toggleModal = (value: boolean) => {
    setModalActive(value);
    // future ref: body-lock-scroll
    // const targetElement = document.getElementById("modal") as HTMLElement;
    // if (value) disableBodyScroll(targetElement);
    // else {
    //   enableBodyScroll(targetElement);
    //   clearAllBodyScrollLocks();
    // }
  };
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
  const [userNickname, setUserNickname] = useState("");
  const login = (token: string, userId: number, userNickname: string) => {
    setToken(token);
    setUserId(userId);
    setUserNickname(userNickname);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify({ userId, userNickname, token }));
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserNickname("");
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
  };
  const user: AuthContextInt = {
    isLoggedIn,
    userId,
    userNickname,
    token,
    login,
    logout,
  };

  // login on refresh
  useEffect(() => {
    const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = Number(storageData.userId);
    const userNickname = storageData.userNickname;
    if (storageData && storageData.userId && storageData.token) {
      login(storageData.token, userId, userNickname);
    }
  }, []);

  return (
    <ModalContext.Provider value={modal}>
      <ErrorContext.Provider value={error}>
        <AuthContext.Provider value={user}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
