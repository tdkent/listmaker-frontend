import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import AuthContext, { AuthContextInt } from "./context/AuthContext";
import ActiveListContext, { ActiveListContextInt } from "./context/ActiveListContext";
import ModalContext, { ModalContextInt, ModalContentIdEnum } from "./context/ModalContext";
import router from "./router/router";
import { StorageDataInt } from "./functions/check-local-storage";
import { ListInt } from "./models/lists";

function App() {
  // modal context
  const [pending, setPending] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [contentId, setContentId] = useState<ModalContextInt["contentId"]>("");
  const toggleModal = (value: boolean) => setModalActive(value);
  const togglePending = (value: boolean) => setPending(value);
  const provideId = (value: ModalContextInt["contentId"]) => setContentId(value);
  const modal: ModalContextInt = {
    active: modalActive,
    pending,
    toggleModal,
    togglePending,
    contentId,
    provideId,
  };

  // auth context
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
  const user: AuthContextInt = {
    isLoggedIn,
    userId,
    token,
    login,
    logout,
  };

  // list context
  const [list, setList] = useState<ListInt>({} as ListInt);
  const addListToContext = (list: ListInt) => {
    setList(list);
  };
  const activeList: ActiveListContextInt = {
    list,
    addListToContext,
  };

  // login on refresh
  useEffect(() => {
    const storageData: StorageDataInt = JSON.parse(localStorage.getItem("userData") || "{}");
    if (storageData && storageData.userId && storageData.token) {
      login(storageData.token, storageData.userId);
    }
  }, []);

  return (
    <ModalContext.Provider value={modal}>
      <AuthContext.Provider value={user}>
        <ActiveListContext.Provider value={activeList}>
          <RouterProvider router={router} />
        </ActiveListContext.Provider>
      </AuthContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
